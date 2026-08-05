import { useCallback, useRef, useState } from "react";
import { Room, RoomEvent, Participant, VideoPresets, RemoteParticipant, RemoteTrackPublication, RemoteTrack } from "livekit-client";
import { createDBClient } from "@/api/dbClient";
import { useNavigate } from "react-router-dom";

type Avatar = {
    name: string;
    role?: string;
    image?: string;
};

export function useLiveKitController() {
    const [micMuted, setMicMuted] = useState(false);
    const [room, setRoom] = useState<Room | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const startingRef = useRef(false);

    const loginResolverRef = useRef<((status: string) => void) | null>(null);

    const [activeAvatar, setActiveAvatar] = useState<string | null>(null);
    const [demoCategory, setDemoCategory] = useState<string>("Voicedots");
    const [error, setError] = useState<string | null>(null);

    const [loginOpen, setLoginOpen] = useState(false);

    // DATA COLLECTION STATE
    const [dataCollectionOpen, setDataCollectionOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [dataConfirmed, setDataConfirmed] = useState(false);
    const [ticketOpen, setTicketOpen] = useState(false);
    const [ticketData, setTicketData] = useState<any>(null);

    // Roll-number popup for the ERP student-fee flow (typed entry, no STT)
    const [rollModalOpen, setRollModalOpen] = useState(false);
    // Which ERP lookup the roll-number popup should perform: "fee" or "marks".
    const [rollModalKind, setRollModalKind] = useState<"fee" | "marks">("fee");
    const lookupIntentRef = useRef<"fee" | "marks">("fee");
    // Avatars of the currently running demo, for glowAvatar name resolution.
    const avatarsRef = useRef<Avatar[]>([]);

    const navigate = useNavigate();

    // ERP client for student data lookups (mirrors the ElevenLabs path in
    // conversationController.ts so the fee flow works on the LiveKit path too).
    const studentClient = createDBClient(
        "https://insproplus.com/erpdevapi/api/voicebot/get_query_result",
        "STPDEV",
        "myCVi6BSCVqHgAPdfxntPeY5IqS2YNZXRjZUk8pmL8prVQ6JmEospYLE8u8u5",
        "VOICEBOT"
    );

    // Roll-number popup submit → fetch fee OR rank details from the ERP and show the table.
    const handleRollNumberSubmit = async (rollNo: string) => {
        setRollModalOpen(false);
        if (!rollNo?.trim()) return;
        const isMarks = lookupIntentRef.current === "marks";
        // Fees: GetStudentFeeBalance(@RollNo) | Marks/Results: SP_GetStudentExamResults(@RegNo)
        const query = isMarks ? "SP_GetStudentExamResults" : "GetStudentFeeBalance";
        const paramName = isMarks ? "@RegNo" : "@RollNo";
        const titleSuffix = isMarks ? "Exam Results" : "Student Fee Balance";
        setTableState({ isOpen: true, isLoading: true, data: [], title: `${rollNo} ${titleSuffix}`, emptyMessage: "" });
        try {
            const result: any = await studentClient.callDatabase({
                query,
                isProcedure: true,
                parameters: { [paramName]: rollNo.trim() },
            } as any);
            const rows = Array.isArray(result)
                ? result
                : (Array.isArray(result?.data) ? result.data : []);
            const emptyMessage = rows.length === 0
                ? `No records found for "${rollNo.trim()}".` + (isMarks
                    ? " Marks lookups need the student's Register Number (e.g. SP22CSU177), which is different from the fee roll number."
                    : " Please check the roll number and try again.")
                : "";
            setTableState((prev) => ({ ...prev, isLoading: false, data: rows, emptyMessage }));
            // Note: re-engagement is triggered when the user CLOSES the fee popup
            // (see closeTable), not here — so the agent stays quiet while they read it.
        } catch (err) {
            console.error("Error fetching fee balance:", err);
            setTableState((prev) => ({ ...prev, isLoading: false }));
            if (room && room.localParticipant) {
                const payload = new TextEncoder().encode(JSON.stringify({ type: "FEE_RESULT", status: "error", intent: lookupIntentRef.current, rollNo: rollNo.trim() }));
                await room.localParticipant.publishData(payload, { reliable: true });
            }
        }
    };

    // User closed the roll/register-number popup WITHOUT submitting — tell the
    // agent the lookup was cancelled so it re-engages instead of waiting in silence.
    const handleRollNumberCancel = async () => {
        setRollModalOpen(false);
        if (room && room.localParticipant) {
            const payload = new TextEncoder().encode(JSON.stringify({ type: "FEE_RESULT", status: "cancelled", intent: lookupIntentRef.current }));
            await room.localParticipant.publishData(payload, { reliable: true });
        }
    };

    const handleUserDataCollected = async (data: any) => {
        setUserData(data);

        // Send confirmed data back to LiveKit via DataChannel
        if (room && room.localParticipant) {
            const payload = new TextEncoder().encode(JSON.stringify({
                type: "USER_DATA",
                data: data
            }));
            await room.localParticipant.publishData(payload, { reliable: true });
        }

        console.log("Collected user data (auto-saved):", data);
    };

    const ticketResponse = async (res: any) => {
        setTicketOpen(false);

        if (room && room.localParticipant) {
            const payload = new TextEncoder().encode(JSON.stringify({
                type: "TICKET_DATA",
                data: res
            }));
            await room.localParticipant.publishData(payload, { reliable: true });
        }

        console.log(res);
    };

    const [tableState, setTableState] = useState({
        isOpen: false,
        isLoading: false,
        data: [] as Record<string, unknown>[],
        title: "Data",
        emptyMessage: "" as string
    });

    const closeTable = () => {
        const _title = String(tableState.title || "");
        const wasFee = tableState.isOpen && (_title.includes("Fee Balance") || _title.includes("Exam Results"));
        setTableState(prev => ({ ...prev, isOpen: false }));
        // When the user closes the fee popup, tell the agent so it re-engages the conversation.
        // "empty" (no rows) lets the agent say the number wasn't found instead of claiming success.
        if (wasFee && room && room.localParticipant) {
            const status = tableState.data.length > 0 ? "shown" : "empty";
            const payload = new TextEncoder().encode(JSON.stringify({ type: "FEE_RESULT", status, intent: lookupIntentRef.current }));
            room.localParticipant.publishData(payload, { reliable: true });
        }
    };

    const handleLoginSuccess = async () => {
        if (loginResolverRef.current) {
            loginResolverRef.current('success');
            loginResolverRef.current = null;
        }
    };
    const handleLoginFailure = async () => {
        if (loginResolverRef.current) {
            loginResolverRef.current('failed');
            loginResolverRef.current = null;
        }
    };

    const navigation = (id: string) => {
        if (!id) return;

        if (id.toLowerCase() !== "home") {
            navigate(`/${id}`);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate("/");
        }
    };

    const toggleMic = async () => {
        if (!room || !room.localParticipant) return;
        const isMuted = !micMuted;
        setMicMuted(isMuted);

        try {
            await room.localParticipant.setMicrophoneEnabled(!isMuted);
        } catch (e) {
            console.error("Failed to toggle mic", e);
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
            // 1. Fetch token from our new remote token server
            const response = await fetch(`https://token.voicedots.io/getToken?agent_id=${agentId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch token");
            }

            const { token, room_name, ws_url } = await response.json();

            // 2. Connect to LiveKit Room
            const newRoom = new Room({
                adaptiveStream: true,
                dynacast: true,
                videoCaptureDefaults: {
                    resolution: VideoPresets.h720.resolution,
                },
            });

            // Handle Agent Speaking State (Rough approximation based on audio tracks/events)
            newRoom.on(RoomEvent.ActiveSpeakersChanged, (speakers: Participant[]) => {
                // If any remote participant is speaking, we assume the agent is speaking
                const remoteSpeaker = speakers.find((p) => p instanceof RemoteParticipant);
                setIsSpeaking(!!remoteSpeaker);
            });

            // Handle Audio Track Subscription for Playback
            newRoom.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
                if (track.kind === "audio") {
                    const audioElement = track.attach();
                    // Attach the created audio element to the DOM so it can play
                    document.body.appendChild(audioElement);
                }
            });

            newRoom.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
                const attachedElements = track.detach();
                attachedElements.forEach(el => el.remove());
            });

            // Data channel for custom tool calls from Agent -> Frontend
            newRoom.on(RoomEvent.DataReceived, async (payload: Uint8Array, participant?: RemoteParticipant, kind?: any, topic?: string) => {
                try {
                    const msg = JSON.parse(new TextDecoder().decode(payload));
                    console.log("Received data from agent:", msg);

                    if (msg.type === "TOOL_CALL") {
                        if (msg.function === "openValidationPopup") {
                            setDataConfirmed(false);
                            setUserData({
                                name: msg.args?.name ?? "",
                                email: msg.args?.email ?? "",
                                phone: msg.args?.phone ?? "",
                            });
                            setDataCollectionOpen(true);
                        } else if (msg.function === "updateField") {
                            // Real-time single field update from agent
                            const fieldName = msg.args?.field;
                            const fieldValue = msg.args?.value;
                            if (fieldName && fieldValue !== undefined) {
                                console.log(`[Tool] Updating field: ${fieldName} = ${fieldValue}`);
                                setUserData((prev: any) => ({
                                    ...prev,
                                    [fieldName]: fieldValue,
                                }));
                            }
                        } else if (msg.function === "confirmSave") {
                            // Agent confirmed data accuracy — auto-save
                            console.log("[Tool] Data confirmed by agent — auto-saving");
                            setDataConfirmed(true);
                            // Auto-save the current data
                            setUserData((prev: any) => {
                                if (prev) {
                                    // Send confirmed data back to agent
                                    if (newRoom && newRoom.localParticipant) {
                                        const confirmPayload = new TextEncoder().encode(JSON.stringify({
                                            type: "USER_DATA",
                                            data: prev
                                        }));
                                        newRoom.localParticipant.publishData(confirmPayload, { reliable: true });
                                    }
                                }
                                return prev;
                            });
                            // Close modal after brief delay to show confirmation
                            setTimeout(() => {
                                setDataCollectionOpen(false);
                                setDataConfirmed(false);
                            }, 2000);
                        } else if (msg.function === "navigateToSection") {
                            const section = msg.args?.section_name || msg.args?.id || "";
                            if (section) {
                                console.log(`[Tool] Navigating to section: ${section}`);
                                navigation(section);
                            }
                        } else if (msg.function === "glowAvatar" && msg.args?.name) {
                            // Subagent names from the agent don't always match the widget
                            // avatar names (e.g. ceo→CEO, product_specialist→Sales), so
                            // resolve candidates against the active demo's avatar list.
                            const raw = String(msg.args.name);
                            const keyMap: Record<string, string> = {
                                "about_us": "About",
                                "admissions": "Admission",
                                "clinical_facilities": "Clinical",
                                "courses": "Courses",
                                "product_specialist": "Sales"
                            };
                            const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
                            const candidates = [raw, keyMap[raw] ?? "", raw === "about_us" ? "SRK" : ""].filter(Boolean);
                            let mappedName = keyMap[raw] || raw;
                            for (const c of candidates) {
                                const hit = avatarsRef.current.find((a) => norm(a.name) === norm(c));
                                if (hit) { mappedName = hit.name; break; }
                            }
                            console.log(`Setting active avatar to: ${mappedName} (from ${raw})`);
                            setActiveAvatar(mappedName);
                        } else if (msg.function === "endCall") {
                            console.log("[Tool] Agent initiated end call");
                            if (newRoom) {
                                await newRoom.disconnect();
                            }
                            setRoom(null);
                            setIsConnected(false);
                            setIsSpeaking(false);
                            setActiveAvatar(null);
                            startingRef.current = false;
                        } else if (msg.function === "appointmentBooked") {
                            console.log("[Tool] Appointment booked:", msg.args);
                        } else if (msg.function === "requestLogin") {
                            // Agent requested authentication — remember what to look up
                            // (fee vs rank), show the login modal, then report the result.
                            const intent = msg.args?.intent === "marks" ? "marks" : "fee";
                            lookupIntentRef.current = intent;
                            setRollModalKind(intent);
                            const loginPromise = new Promise<string>((resolve) => {
                                loginResolverRef.current = resolve;
                            });
                            setLoginOpen(true);
                            // Tell the agent a blocking popup is on screen so the silence
                            // watchdog doesn't prompt/disconnect while the user types.
                            if (newRoom && newRoom.localParticipant) {
                                const popupPayload = new TextEncoder().encode(JSON.stringify({ type: "POPUP_STATE", open: true }));
                                await newRoom.localParticipant.publishData(popupPayload, { reliable: true });
                            }
                            const status = await loginPromise;
                            setLoginOpen(false);
                            // On success, open the roll-number popup (typed entry) for the fee lookup.
                            if (status === "success") {
                                setRollModalOpen(true);
                            }
                            if (newRoom && newRoom.localParticipant) {
                                const resultPayload = new TextEncoder().encode(JSON.stringify({
                                    type: "LOGIN_RESULT",
                                    status,
                                    intent,
                                }));
                                await newRoom.localParticipant.publishData(resultPayload, { reliable: true });
                            }
                        } else if (msg.function === "getStudentFeeBalance") {
                            // ERP student fee lookup (mirrors the ElevenLabs client tool).
                            const rollNo = msg.args?.rollNo || msg.args?.roll_no || "";
                            setTableState({ isOpen: true, isLoading: true, data: [], title: `${rollNo} Student Fee Balance`, emptyMessage: "" });
                            try {
                                const result = await studentClient.callDatabase({
                                    query: "GetStudentFeeBalance",
                                    isProcedure: true,
                                    parameters: { "@RollNo": rollNo },
                                } as any);
                                const rows = Array.isArray(result)
                                    ? result
                                    : (Array.isArray((result as any)?.data) ? (result as any).data : []);
                                setTableState((prev) => ({ ...prev, isLoading: false, data: rows }));
                            } catch (err) {
                                console.error("Error fetching fee balance:", err);
                                setTableState((prev) => ({ ...prev, isLoading: false }));
                            }
                        }
                    }
                } catch (e) {
                    console.error("Error parsing data message", e);
                }
            });

            // Set LiveKit Cloud WebSocket URL from backend, with local fallback just in case
            const livekitUrl = ws_url || import.meta.env.VITE_LIVEKIT_URL || "wss://demo-n9jya6si.livekit.cloud";

            await newRoom.connect(livekitUrl, token);

            // Publish Microphone
            await newRoom.localParticipant.setMicrophoneEnabled(true);
            setMicMuted(false);

            setRoom(newRoom);
            setIsConnected(true);

        } catch (err: any) {
            console.error("LiveKit connection error:", err);
            setError(err.message || "Failed to start conversation");
        } finally {
            startingRef.current = false;
            setIsConnecting(false);
        }
    }, [isConnected, isConnecting]);

    const stop = async () => {
        startingRef.current = false;

        if (room) {
            await room.disconnect();
            setRoom(null);
        }

        setIsConnected(false);
        setIsSpeaking(false);
        setActiveAvatar(null);
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
        handleRollNumberCancel
    };
}
