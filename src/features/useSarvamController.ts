import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VerifiedSession } from "@/components/modals/LoginModal";

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
const STUDENT_API = import.meta.env.VITE_STUDENT_DEMO_API_URL || "https://voice.voicedots.io/student-demo/v1";
const GEMINI_AGENTS = new Set([
    "",
    "voicedots_agent_6m9osxmfvp3u42yjnsgd8dgo5aconsv4",
    "voicedots_agent_dscet9m2q1h8z5t6w3v0pajcylrbsfde",
]);
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
    if (this.accLen >= 640 * this.ratio) {
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
    type StudentIntent = "fee" | "marks" | "attendance" | "academic_review" | "academic_contacts";
    const [rollModalKind, setRollModalKind] = useState<StudentIntent>("fee");
    const lookupIntentRef = useRef<StudentIntent>("fee");
    const attendancePeriodRef = useRef<"today" | "week" | "month" | "semester">("today");
    const avatarsRef = useRef<Avatar[]>([]);
    // Set once the visitor verifies their registered number. While it holds a
    // student, lookups use that student's identifiers and the roll-number popup
    // never opens — the same experience the telephone caller already gets.
    const linkedStudentRef = useRef<VerifiedSession["students"][number] | null>(null);

    // transport refs
    const wsRef = useRef<WebSocket | null>(null);
    const micCtxRef = useRef<AudioContext | null>(null);
    const playCtxRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const playerNodeRef = useRef<AudioWorkletNode | null>(null);
    const micNodeRef = useRef<AudioWorkletNode | null>(null);
    const micMutedRef = useRef(false);

    const navigate = useNavigate();

    const sendJSON = (obj: any) => {
        const ws = wsRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
    };

    const [tableState, setTableState] = useState({
        isOpen: false,
        isLoading: false,
        data: [] as Record<string, unknown>[],
        title: "Data",
        emptyMessage: "" as string,
    });

    const rowsForStudentRecord = (payload: any, intent: StudentIntent) => {
        const common = { Student: payload.student_name, Department: payload.department, "Academic Year": payload.academic_year };
        if (intent === "marks") {
            return (payload.subjects || []).map((s: any) => ({ ...common, Semester: payload.semester, Subject: s.subject, Marks: s.marks, Grade: s.grade,
                Result: payload.overall_result, SGPA: payload.semester_gpa, CGPA: payload.overall_cgpa }));
        }
        if (intent === "attendance" && Array.isArray(payload.hours)) {
            return payload.hours.map((h: any) => ({ ...common, Period: payload.period, Hour: h.hour, Time: h.time, Subject: h.subject, Status: h.status,
                "Hours Conducted": payload.hours_conducted, "Hours Present": payload.hours_present, "Hours Absent": payload.hours_absent,
                Eligibility: payload.eligibility_status }));
        }
        if (intent === "attendance" && Array.isArray(payload.days)) {
            return payload.days.map((d: any) => ({ ...common, Period: payload.period, Day: d.day,
                "Hours Conducted": d.hours_conducted, "Hours Present": d.hours_present, "Hours Absent": d.hours_absent,
                "Overall %": payload.attendance_percentage, Eligibility: payload.eligibility_status }));
        }
        if (intent === "attendance") return [{ ...common, Period: payload.period,
            "Days Conducted": payload.days_conducted, "Days Attended": payload.days_attended, "Days Absent": payload.days_absent,
            "Day Attendance %": payload.day_attendance_percentage, "Hours Conducted": payload.hours_conducted,
            "Hours Attended": payload.hours_attended, "Hours Absent": payload.hours_absent,
            "Hour Attendance %": payload.hour_attendance_percentage, Eligibility: payload.eligibility_status }];
        if (intent === "academic_review") {
            const actions = (payload.agreed_actions || []).map((a: any) => `${a.action} (${a.owner}, ${a.status}, due ${a.due_date})`).join("; ");
            return [{ ...common, "Review Date": payload.review_date, "Reviewed By": payload.reviewed_by,
                "Reviewer Role": payload.reviewer_role, Summary: payload.parent_visible_summary,
                "Recorded Factors": (payload.recorded_factors || []).join("; "), "Student Concerns": payload.student_concerns,
                "Agreed Actions": actions, "Next Review": payload.next_review_date,
                "Parent Meeting Recommended": payload.parent_meeting_recommended ? "Yes" : "No" }];
        }
        if (intent === "academic_contacts") {
            const rows: Record<string, unknown>[] = [];
            for (const [subject, contact] of Object.entries(payload.subject_faculty || {}) as [string, any][]) {
                rows.push({ ...common, Responsibility: "Subject Faculty", Subject: subject, Name: contact.name,
                    "Official Email": contact.official_email, Extension: contact.extension });
            }
            for (const [key, label] of [["class_advisor", "Class Advisor"], ["hod", "HOD"], ["academic_dean", "Academic Dean"]] as const) {
                const contact = payload[key];
                if (contact) rows.push({ ...common, Responsibility: label, Subject: "All subjects", Name: contact.name,
                    "Official Email": contact.official_email, Extension: contact.extension });
            }
            return rows;
        }
        return [{ ...common, "Tuition Fee": payload.tuition_fee, "Hostel Fee": payload.hostel_fee,
            "Transport Fee": payload.transport_fee, "Other Charges": payload.other_charges, "Total Fee": payload.total_fee,
            "Amount Paid": payload.amount_paid, "Outstanding Balance": payload.outstanding_balance, "Next Due Date": payload.next_due_date }];
    };

    // Shared backend: identifier → fee/marks/attendance → table. Reached either
    // from the typed roll-number popup or straight from a verified session.
    const runStudentLookup = async (rollNo: string) => {
        const intent = lookupIntentRef.current;
        const titleSuffix = intent === "marks" ? "Exam Results" : intent === "attendance"
            ? `${attendancePeriodRef.current[0].toUpperCase()}${attendancePeriodRef.current.slice(1)} Attendance`
            : intent === "academic_review" ? "Academic Review"
            : intent === "academic_contacts" ? "Academic Contacts" : "Student Fee Details";
        setTableState({ isOpen: true, isLoading: true, data: [], title: `${rollNo} ${titleSuffix}`, emptyMessage: "" });
        try {
            const period = intent === "attendance" ? `?period=${attendancePeriodRef.current}` : "";
            const response = await fetch(`${STUDENT_API}/records/${intent}/${encodeURIComponent(rollNo.trim())}${period}`);
            if (!response.ok) throw new Error(`Student lookup failed (${response.status})`);
            const result: any = await response.json();
            const rows = result.status === "found" ? rowsForStudentRecord(result, intent) : [];
            const emptyMessage = rows.length === 0
                ? `No records found for "${rollNo.trim()}".` + (intent === "marks"
                    ? " Exam results need the student's Register Number (e.g. SP23EEU194), which is different from the fee roll number."
                    : " Fee and attendance lookups need the student's college Roll Number (e.g. SPC25ENU018).")
                : "";
            setTableState((prev) => ({ ...prev, isLoading: false, data: rows, emptyMessage }));
            // Tell the bot the outcome NOW (table just appeared) so it acknowledges
            // promptly instead of only when the user closes the panel.
            sendJSON({ type: "FEE_RESULT", status: rows.length ? "shown" : "empty",
                       intent: lookupIntentRef.current, rollNo: rollNo.trim() });
        } catch (err) {
            console.error("Error fetching student record:", err);
            setTableState((prev) => ({ ...prev, isLoading: false }));
            sendJSON({ type: "FEE_RESULT", status: "error", intent: lookupIntentRef.current, rollNo: rollNo.trim() });
        }
    };

    const handleRollNumberSubmit = async (rollNo: string) => {
        setRollModalOpen(false);
        if (!rollNo?.trim()) return;
        await runStudentLookup(rollNo);
    };

    // Marks are keyed by register number, everything else by roll number — the
    // verified student carries both, so the visitor never has to know which.
    const linkedIdentifier = (intent: StudentIntent) => {
        const s = linkedStudentRef.current;
        if (!s) return null;
        return intent === "marks" ? s.registration_number : s.roll_number;
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
        // The bot was already told the outcome ("shown"/"empty") when the table
        // appeared (see handleRollNumberSubmit), so closing just dismisses the panel.
        setTableState((prev) => ({ ...prev, isOpen: false }));
    };

    const handleLoginSuccess = async (session?: VerifiedSession) => {
        // A verified number identifies the guardian for the rest of the call, so
        // hand the token to the agent: it greets them by name and stops asking
        // for identifiers. Without a session the visitor chose the typed route.
        if (session?.sessionToken && session.students?.length) {
            linkedStudentRef.current = session.students.length === 1 ? session.students[0] : null;
            sendJSON({ type: "STUDENT_SESSION", token: session.sessionToken });
        }
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
        // Mic and playback share one context now, so close it once.
        micCtxRef.current = null;
        playCtxRef.current?.close().catch(() => {}); playCtxRef.current = null;
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
            const rawIntent = msg.args?.intent;
            const intent: StudentIntent = ["marks", "attendance", "academic_review", "academic_contacts"].includes(rawIntent)
                ? rawIntent : "fee";
            lookupIntentRef.current = intent;
            if (["today", "week", "month", "semester"].includes(msg.args?.period)) {
                attendancePeriodRef.current = msg.args.period;
            }
            setRollModalKind(intent);

            // Already verified earlier in this call: go straight to the record,
            // exactly as the phone agent does for a recognised caller ID.
            const known = linkedIdentifier(intent);
            if (known) {
                sendJSON({ type: "LOGIN_RESULT", status: "success", intent });
                await runStudentLookup(known);
                return;
            }

            const loginPromise = new Promise<string>((resolve) => { loginResolverRef.current = resolve; });
            setLoginOpen(true);
            sendJSON({ type: "POPUP_STATE", open: true });
            const status = await loginPromise;
            setLoginOpen(false);
            sendJSON({ type: "LOGIN_RESULT", status, intent });
            if (status !== "success") return;
            // The modal may have just verified a number; use it without a popup.
            const verified = linkedIdentifier(intent);
            if (verified) await runStudentLookup(verified);
            else setRollModalOpen(true);
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

            // Play straight out of the audio graph. This used to go through a
            // MediaStreamDestination into an <audio> element so the echo
            // canceller would treat it as a stream — but that path runs the
            // browser's live-stream playout engine, which speeds playback up
            // whenever a backlog builds. Gemini streams faster than realtime, so
            // a backlog always builds at the start of a call, and the engine
            // drained it by playing the opening seconds fast (heard as a raised
            // pitch that settles). A direct connection plays at exactly the
            // context rate, always. Mic capture keeps echoCancellation on, which
            // still references the device's render stream.
            playerNode.connect(playCtx.destination);

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: true },
            });
            streamRef.current = stream;

            // Mic shares the playback context. Two contexts at different rates
            // (24k playback, 48k device) meant the browser resampled one of them
            // onto the shared output device, which coloured the agent's voice at
            // the start of a call. One context, one rate, no resampling. The mic
            // worklet derives its ratio from `sampleRate`, so 24k is fine, and
            // createMediaStreamSource converts the 48k device stream for us.
            const micCtx = playCtx;
            micCtxRef.current = micCtx;
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
                // The node has to be connected to something to keep running, but
                // that destination is now the speakers — so route it through a
                // silent gain rather than trusting the worklet never to emit.
                const micSink = micCtx.createGain();
                micSink.gain.value = 0;
                micNode.connect(micSink);
                micSink.connect(micCtx.destination);

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
        // The verified identity belongs to one call only; the next visitor on
        // this browser must verify again.
        linkedStudentRef.current = null;
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
