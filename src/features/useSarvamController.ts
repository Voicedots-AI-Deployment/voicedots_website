import { useCallback, useRef, useState } from "react";
import { createDBClient } from "@/api/dbClient";
import { useNavigate } from "react-router-dom";

/**
 * Sarvam low-latency voice controller.
 *
 * Drop-in replacement for useLiveKitController: same returned interface, same
 * tool/popup/ERP behaviour — only the transport differs. Instead of a LiveKit
 * room it holds a WebSocket to the Sarvam pipeline backend, streams mic PCM up
 * and plays streamed PCM back. The backend speaks the SAME
 * {type:"TOOL_CALL", function, args} protocol, so the widget UI is unchanged.
 */

const WS_URL = import.meta.env.VITE_SARVAM_WS_URL || "wss://voice.voicedots.io/ws";
// Website bot is migrated to the Gemini pipeline; other agents on this controller
// (e.g. Sapthagiri) stay on Sarvam until their own cutover.
const GEMINI_WS = import.meta.env.VITE_GEMINI_WS_URL || "wss://voice.voicedots.io/gemini/ws";
const GEMINI_AGENTS = new Set(["", "voicedots_agent_6m9osxmfvp3u42yjnsgd8dgo5aconsv4"]);
const MIC_SAMPLE_RATE = 16000;
const AGENT_SAMPLE_RATE = 24000;

// All audio processing lives in AudioWorklets (audio thread): the website's main
// thread is busy with React/Lottie rendering, and main-thread audio (ScriptProcessor
// or per-chunk source scheduling) glitches whenever it janks. The player keeps a
// small ring buffer and re-primes after underruns; the mic downsamples to 16k.
const WORKLET_SRC = `
class PcmPlayer extends AudioWorkletProcessor {
  constructor() {
    super();
    this.queue = []; this.offset = 0; this.buffered = 0; this.primed = false;
    // First utterance of the call primes with a larger buffer (~300ms): at call
    // start the TTS/network path is cold and a 120ms buffer underruns repeatedly,
    // which sounds like stutter for the first few seconds. Later turns keep the
    // small buffer for latency.
    this.firstPrime = true;
    this.port.onmessage = (e) => {
      if (e.data === "clear") { this.queue = []; this.offset = 0; this.buffered = 0; this.primed = false; return; }
      const int16 = new Int16Array(e.data);
      const f = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) f[i] = int16[i] / 32768;
      this.queue.push(f); this.buffered += f.length;
    };
  }
  process(inputs, outputs) {
    const out = outputs[0][0];
    if (!this.primed) {
      const need = this.firstPrime ? 7200 : 2880;       // ~300ms first, ~120ms after
      if (this.buffered >= need) { this.primed = true; this.firstPrime = false; }
      else { out.fill(0); return true; }
    }
    let i = 0;
    while (i < out.length && this.queue.length) {
      const cur = this.queue[0];
      const n = Math.min(out.length - i, cur.length - this.offset);
      out.set(cur.subarray(this.offset, this.offset + n), i);
      i += n; this.offset += n; this.buffered -= n;
      if (this.offset >= cur.length) { this.queue.shift(); this.offset = 0; }
    }
    if (i < out.length) {
      out.fill(0, i);
      if (!this.queue.length) { this.primed = false; this.port.postMessage("drained"); }
    }
    return true;
  }
}
registerProcessor("pcm-player", PcmPlayer);

class MicCapture extends AudioWorkletProcessor {
  constructor() {
    super();
    this.acc = []; this.accLen = 0;
    this.ratio = sampleRate / ${MIC_SAMPLE_RATE};
  }
  process(inputs) {
    const inp = inputs[0] && inputs[0][0];
    if (!inp) return true;
    this.acc.push(new Float32Array(inp)); this.accLen += inp.length;
    if (this.accLen >= 2048 * this.ratio) {
      const all = new Float32Array(this.accLen);
      let o = 0; for (const a of this.acc) { all.set(a, o); o += a.length; }
      this.acc = []; this.accLen = 0;
      const outLen = Math.floor(all.length / this.ratio);
      const out = new Int16Array(outLen);
      for (let i = 0; i < outLen; i++) {
        const from = Math.floor(i * this.ratio);
        const to = Math.min(Math.floor((i + 1) * this.ratio), all.length);
        let s = 0; for (let j = from; j < to; j++) s += all[j];
        const v = Math.max(-1, Math.min(1, s / Math.max(1, to - from)));
        out[i] = v < 0 ? v * 0x8000 : v * 0x7fff;
      }
      this.port.postMessage(out.buffer, [out.buffer]);
    }
    return true;
  }
}
registerProcessor("mic-capture", MicCapture);
`;
const workletUrl = () => URL.createObjectURL(new Blob([WORKLET_SRC], { type: "application/javascript" }));

type Avatar = { name: string; role?: string; image?: string };

export function useSarvamController() {
    const [micMuted, setMicMuted] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const startingRef = useRef(false);
    const loginResolverRef = useRef<((status: string) => void) | null>(null);

    const [activeAvatar, setActiveAvatar] = useState<string | null>(null);
    const [demoCategory] = useState<string>("Voicedots");
    const [error, setError] = useState<string | null>(null);

    const [loginOpen, setLoginOpen] = useState(false);
    const [dataCollectionOpen, setDataCollectionOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [dataConfirmed, setDataConfirmed] = useState(false);
    const [ticketOpen, setTicketOpen] = useState(false);
    const [ticketData] = useState<any>(null);

    const [rollModalOpen, setRollModalOpen] = useState(false);
    const [rollModalKind, setRollModalKind] = useState<"fee" | "marks">("fee");
    const lookupIntentRef = useRef<"fee" | "marks">("fee");
    const avatarsRef = useRef<Avatar[]>([]);

    // transport refs
    const wsRef = useRef<WebSocket | null>(null);
    const micCtxRef = useRef<AudioContext | null>(null);
    const playCtxRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const playerNodeRef = useRef<AudioWorkletNode | null>(null);
    const micNodeRef = useRef<AudioWorkletNode | null>(null);
    const playDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
    const audioElRef = useRef<HTMLAudioElement | null>(null);
    const micMutedRef = useRef(false);

    const navigate = useNavigate();

    const sendJSON = (obj: any) => {
        const ws = wsRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
    };

    const studentClient = createDBClient(
        "https://insproplus.com/erpdevapi/api/voicebot/get_query_result",
        "STPDEV",
        "myCVi6BSCVqHgAPdfxntPeY5IqS2YNZXRjZUk8pmL8prVQ6JmEospYLE8u8u5",
        "VOICEBOT"
    );

    const [tableState, setTableState] = useState({
        isOpen: false,
        isLoading: false,
        data: [] as Record<string, unknown>[],
        title: "Data",
        emptyMessage: "" as string,
    });

    // ── ERP: roll-number submit → fee/marks lookup → table ──
    const handleRollNumberSubmit = async (rollNo: string) => {
        setRollModalOpen(false);
        if (!rollNo?.trim()) return;
        const isMarks = lookupIntentRef.current === "marks";
        const query = isMarks ? "SP_GetStudentExamResults" : "GetStudentFeeBalance";
        const paramName = isMarks ? "@RegNo" : "@RollNo";
        const titleSuffix = isMarks ? "Exam Results" : "Student Fee Balance";
        setTableState({ isOpen: true, isLoading: true, data: [], title: `${rollNo} ${titleSuffix}`, emptyMessage: "" });
        try {
            const result: any = await studentClient.callDatabase({
                query, isProcedure: true, parameters: { [paramName]: rollNo.trim() },
            } as any);
            const rows = Array.isArray(result) ? result : (Array.isArray(result?.data) ? result.data : []);
            const emptyMessage = rows.length === 0
                ? `No records found for "${rollNo.trim()}".` + (isMarks
                    ? " Marks lookups need the student's Register Number (e.g. SP22CSU177), which is different from the fee roll number."
                    : " Please check the roll number and try again.")
                : "";
            setTableState((prev) => ({ ...prev, isLoading: false, data: rows, emptyMessage }));
        } catch (err) {
            console.error("Error fetching fee balance:", err);
            setTableState((prev) => ({ ...prev, isLoading: false }));
            sendJSON({ type: "FEE_RESULT", status: "error", intent: lookupIntentRef.current, rollNo: rollNo.trim() });
        }
    };

    const handleRollNumberCancel = async () => {
        setRollModalOpen(false);
        sendJSON({ type: "FEE_RESULT", status: "cancelled", intent: lookupIntentRef.current });
    };

    const handleUserDataCollected = async (data: any) => {
        setUserData(data);
        sendJSON({ type: "USER_DATA", data });
        sendJSON({ type: "POPUP_STATE", open: false });
        setDataCollectionOpen(false);
    };

    const ticketResponse = async (res: any) => {
        setTicketOpen(false);
        sendJSON({ type: "TICKET_DATA", data: res });
    };

    const closeTable = () => {
        const _title = String(tableState.title || "");
        const wasFee = tableState.isOpen && (_title.includes("Fee Balance") || _title.includes("Exam Results"));
        setTableState((prev) => ({ ...prev, isOpen: false }));
        if (wasFee) {
            const status = tableState.data.length > 0 ? "shown" : "empty";
            sendJSON({ type: "FEE_RESULT", status, intent: lookupIntentRef.current });
        }
    };

    const handleLoginSuccess = async () => {
        if (loginResolverRef.current) { loginResolverRef.current("success"); loginResolverRef.current = null; }
    };
    const handleLoginFailure = async () => {
        if (loginResolverRef.current) { loginResolverRef.current("failed"); loginResolverRef.current = null; }
    };

    const navigation = (id: string) => {
        if (!id) return;
        if (id.toLowerCase() !== "home") navigate(`/${id}`);
        else { window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/"); }
    };

    const toggleMic = async () => {
        const next = !micMutedRef.current;
        micMutedRef.current = next;
        setMicMuted(next);
        streamRef.current?.getAudioTracks().forEach((t) => (t.enabled = !next));
    };

    const playAudioChunk = (buf: ArrayBuffer) => {
        const ctx = playCtxRef.current;
        if (ctx?.state === "suspended") ctx.resume().catch(() => {});
        playerNodeRef.current?.port.postMessage(buf, [buf]);
    };

    // Barge-in / stop: flush the worklet's queue.
    const stopPlayback = () => {
        playerNodeRef.current?.port.postMessage("clear");
    };

    const cleanup = () => {
        stopPlayback();
        wsRef.current?.close(); wsRef.current = null;
        streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null;
        micCtxRef.current?.close().catch(() => {}); micCtxRef.current = null;
        playCtxRef.current?.close().catch(() => {}); playCtxRef.current = null;
        audioElRef.current?.pause(); audioElRef.current = null;
        playDestRef.current = null;
        playerNodeRef.current = null; micNodeRef.current = null;
        startingRef.current = false;
        setIsConnected(false); setIsSpeaking(false); setIsConnecting(false);
        setActiveAvatar(null);
    };

    // ── Tool calls from the agent (same protocol as the LiveKit path) ──
    const handleToolCall = async (msg: any) => {
        if (msg.function === "openValidationPopup") {
            setDataConfirmed(false);
            setUserData({
                name: msg.args?.name ?? "", email: msg.args?.email ?? "", phone: msg.args?.phone ?? "",
            });
            setDataCollectionOpen(true);
            sendJSON({ type: "POPUP_STATE", open: true });
        } else if (msg.function === "updateField") {
            const f = msg.args?.field, v = msg.args?.value;
            if (f && v !== undefined) setUserData((prev: any) => ({ ...prev, [f]: v }));
        } else if (msg.function === "confirmSave") {
            setDataConfirmed(true);
            setUserData((prev: any) => { if (prev) sendJSON({ type: "USER_DATA", data: prev }); return prev; });
            setTimeout(() => { setDataCollectionOpen(false); setDataConfirmed(false); }, 2000);
        } else if (msg.function === "navigateToSection") {
            const section = msg.args?.section_name || msg.args?.section || msg.args?.id || "";
            if (section) navigation(section);
        } else if (msg.function === "glowAvatar" && msg.args?.name) {
            // Persona keys don't always match widget avatar names (about_us→SRK,
            // product_specialist→Sales) — resolve against the active demo's avatars.
            const raw = String(msg.args.name);
            const keyMap: Record<string, string> = {
                about_us: "About", admissions: "Admission", clinical_facilities: "Clinical",
                courses: "Courses", product_specialist: "Sales",
            };
            const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
            const candidates = [raw, keyMap[raw] ?? "", raw === "about_us" ? "SRK" : ""].filter(Boolean);
            let mappedName = keyMap[raw] || raw;
            for (const c of candidates) {
                const hit = avatarsRef.current.find((a) => norm(a.name) === norm(c));
                if (hit) { mappedName = hit.name; break; }
            }
            setActiveAvatar(mappedName);
        } else if (msg.function === "endCall") {
            // Let whatever is still queued (the goodbye) finish before tearing down:
            // the player worklet posts "drained" when its buffer empties.
            const node = playerNodeRef.current;
            if (node) {
                let done = false;
                const finish = () => { if (!done) { done = true; cleanup(); } };
                node.port.addEventListener("message", (e) => { if (e.data === "drained") setTimeout(finish, 300); });
                node.port.start();
                setTimeout(finish, 10000);   // failsafe
            } else {
                cleanup();
            }
        } else if (msg.function === "appointmentBooked") {
            console.log("[Tool] Appointment booked:", msg.args);
        } else if (msg.function === "requestLogin") {
            const intent = msg.args?.intent === "marks" ? "marks" : "fee";
            lookupIntentRef.current = intent;
            setRollModalKind(intent);
            const loginPromise = new Promise<string>((resolve) => { loginResolverRef.current = resolve; });
            setLoginOpen(true);
            sendJSON({ type: "POPUP_STATE", open: true });
            const status = await loginPromise;
            setLoginOpen(false);
            if (status === "success") setRollModalOpen(true);
            sendJSON({ type: "LOGIN_RESULT", status, intent });
        }
    };

    const start = useCallback(async (agentId: string, avatars: Avatar[]) => {
        if (startingRef.current) return;
        if (isConnected || isConnecting) return;
        startingRef.current = true;
        avatarsRef.current = avatars;
        setIsConnecting(true);
        setError(null);

        try {
            // Audio contexts MUST be created (and resumed) inside the click
            // gesture — creating them later in ws.onopen leaves them suspended
            // under the browser autoplay policy and the agent plays silently.
            const playCtx = new AudioContext({ sampleRate: AGENT_SAMPLE_RATE });
            playCtxRef.current = playCtx;
            await playCtx.resume().catch(() => {});
            const url = workletUrl();
            await playCtx.audioWorklet.addModule(url);
            const playerNode = new AudioWorkletNode(playCtx, "pcm-player");
            playerNodeRef.current = playerNode;

            // Route agent audio via an <audio> element so the browser's echo
            // canceller subtracts it from the mic.
            const playDest = playCtx.createMediaStreamDestination();
            playDestRef.current = playDest;
            playerNode.connect(playDest);
            const audioEl = new Audio();
            audioEl.srcObject = playDest.stream;
            audioEl.play().catch((e) => console.warn("audio playback blocked:", e));
            audioElRef.current = audioEl;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: true },
            });
            streamRef.current = stream;

            // Mic context at the browser's native rate; the worklet downsamples.
            const micCtx = new AudioContext();
            micCtxRef.current = micCtx;
            await micCtx.resume().catch(() => {});
            await micCtx.audioWorklet.addModule(url);
            URL.revokeObjectURL(url);

            // Pass the agent so the multi-tenant backend serves THIS client's
            // bot (personas/KB/greeting). No agent = the default website bot.
            // Website agent -> Gemini pipeline; others -> Sarvam (until migrated).
            const base = GEMINI_AGENTS.has(agentId || "") ? GEMINI_WS : WS_URL;
            const wsUrl = agentId ? `${base}${base.includes("?") ? "&" : "?"}agent=${encodeURIComponent(agentId)}` : base;
            const ws = new WebSocket(wsUrl);
            ws.binaryType = "arraybuffer";
            wsRef.current = ws;

            ws.onopen = () => {
                const source = micCtx.createMediaStreamSource(stream);
                const micNode = new AudioWorkletNode(micCtx, "mic-capture");
                micNodeRef.current = micNode;
                micNode.port.onmessage = (e) => {
                    if (ws.readyState !== WebSocket.OPEN || micMutedRef.current) return;
                    ws.send(e.data);
                };
                source.connect(micNode);
                micNode.connect(micCtx.destination);   // keeps the node running (outputs silence)

                setIsConnected(true);
                setIsConnecting(false);
                startingRef.current = false;
            };

            ws.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) { playAudioChunk(event.data); return; }
                try {
                    const msg = JSON.parse(event.data);
                    if (msg.type === "TOOL_CALL") {
                        await handleToolCall(msg);
                    } else if (msg.type === "UserStartedSpeaking") {
                        stopPlayback();   // barge-in: silence queued agent audio
                        setIsSpeaking(false);
                    } else if (msg.type === "Latency") {
                        setIsSpeaking(true);
                    } else if (msg.type === "AgentAudioDone") {
                        setIsSpeaking(false);
                    } else if (msg.type === "Error") {
                        console.error("Agent error:", msg);
                        setError(msg.description || "Agent error");
                    }
                } catch (e) {
                    console.error("Error parsing agent message", e);
                }
            };

            ws.onclose = () => cleanup();
            ws.onerror = () => { setError("Connection failed"); cleanup(); };
        } catch (err: any) {
            console.error("Sarvam connection error:", err);
            setError(err?.message || "Failed to start conversation");
            cleanup();
        }
    }, [isConnected, isConnecting]);

    const stop = async () => {
        cleanup();
    };

    return {
        start,
        stop,
        isConnected,
        isConnecting,
        isSpeaking,
        activeAvatar,
        setActiveAvatar,
        toggleMic,
        micMuted,
        error,
        setError,
        tableState,
        closeTable,
        loginOpen,
        setLoginOpen,
        handleLoginSuccess,
        handleLoginFailure,
        dataCollectionOpen,
        setDataCollectionOpen,
        handleUserDataCollected,
        userData,
        setUserData,
        dataConfirmed,
        demoCategory,
        ticketOpen,
        setTicketOpen,
        ticketData,
        ticketResponse,
        rollModalOpen,
        setRollModalOpen,
        rollModalKind,
        handleRollNumberSubmit,
        handleRollNumberCancel,
    };
}
