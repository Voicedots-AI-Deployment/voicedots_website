import { createPortal } from "react-dom";
import { Mic, MicOff, Lock, Loader2, Square } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDemoWidget } from "@/config/demoWidgetState";
import { DEMO_AVATARS } from "@/config/demoConfig";
import AnimationController, { AvatarHandle } from "@/features/AnimationController";
import { useConversationController } from "@/features/conversationController";
import { useLiveKitController } from "@/features/useLiveKitController";
import { useSarvamController } from "@/features/useSarvamController";
import { useRef, useEffect, useState } from "react";
import { LoginModal } from "@/components/modals/LoginModal";
import DataTableModal from "@/components/modals/DataTableModal";
import DataCollectionModal from "@/components/modals/DataCollectionModal";
import RollNumberModal from "@/components/modals/RollNumberModal";
import TicketModal from "../modals/TicketModal";

export default function AIDemoWidget() {
  const location = useLocation();

  const {
    minimized,
    industry,
    setIndustry,
    minimizeWidget,
    expandWidget,
  } = useDemoWidget();

  const elevenLabsController = useConversationController();
  const liveKitController = useLiveKitController();
  const sarvamController = useSarvamController();

  // Hide widget on the integrate page (it has its own preview widget)
  // Moved after hook calls to follow the Rules of Hooks
  if (location.pathname === "/integrate") {
    return null;
  }

  // ElevenLabs is no longer used — every bot that has a LiveKit agent is routed
  // through the LiveKit controller.
  // Our own demo bot runs on the low-latency Sarvam pipeline; client bots stay
  // on LiveKit so they're untouched by that migration.
  const sarvamIndustries = ["Voicedots", "Sapthagiri NPS University"];
  const livekitIndustries = [
    "Balaji Medical College",
    "S.A College of Arts & Science",
    "Chitkara University",
    "MGR University",
    "Sri Lalithambigai Medical College & Hospital",
    "Dhanalakshmi College of Engineering & Technology",
  ];
  const isSarvamActive = sarvamIndustries.includes(industry || "");
  const isLiveKitActive = livekitIndustries.includes(industry || "");

  const conversationState = isSarvamActive
    ? sarvamController
    : isLiveKitActive
      ? liveKitController
      : elevenLabsController;

  const {
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
  } = conversationState;

  const avatarRefs = useRef<Record<string, AvatarHandle | null>>({});
  const prevCategoryRef = useRef<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(360);

  const startConversation = () => {
    setActiveAvatar(avatars[0].name);
    setError(null);
    start(agent_id ?? "", avatars);
  };

  const stopConversation = () => {
    stop();
    avatarRefs.current[activeAvatar ?? ""]?.stopTalking();
  };

  useEffect(() => {
    if (prevCategoryRef.current === null) {
      prevCategoryRef.current = demoCategory;
    }

    if (prevCategoryRef.current !== demoCategory) {
      stopConversation();
      prevCategoryRef.current = demoCategory;
      setIndustry(demoCategory);
    }

    if (!activeAvatar) return;

    if (isSpeaking && !isImage) {
      avatarRefs.current[activeAvatar]?.startTalking();
    } else {
      avatarRefs.current[activeAvatar]?.stopTalking();
    }

    if (!isConnected) avatarRefs.current[activeAvatar]?.stopTalking();
  }, [isSpeaking, activeAvatar, demoCategory, isConnected]);

  if (!industry) return null;

  const demo = DEMO_AVATARS[industry];
  if (!demo || !demo.avatars) return null;

  const { title, avatars, agent_id, comingSoon, isImage } = demo;
  if (!avatars || avatars.length === 0) return null;

  const isSingleBot = avatars.length === 1;

  // Timer Logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isConnected) {
      setTimeLeft(360); // Reset to 6 mins on every new connection
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isConnected]);

  // Helper to format 360 -> "6:00"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return createPortal(
    <>
      {/* ================= MODALS ================= */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />

      <DataTableModal
        isOpen={tableState.isOpen}
        isLoading={tableState.isLoading}
        data={tableState.data}
        title={tableState.title}
        emptyMessage={tableState.emptyMessage}
        onClose={closeTable}
      />

      <DataCollectionModal
        isOpen={dataCollectionOpen}
        title="Your Details"
        onClose={() => setDataCollectionOpen(false)}
        data={userData}
        confirmed={dataConfirmed}
        editable
        onSubmit={(d) => {
          handleUserDataCollected(d);
          setDataCollectionOpen(false);
        }}
      />

      <TicketModal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        student={ticketData}
        submit={ticketResponse}
      />

      <RollNumberModal
        isOpen={rollModalOpen}
        isLoading={tableState.isLoading && rollModalOpen}
        onClose={handleRollNumberCancel}
        onSubmit={handleRollNumberSubmit}
        kind={rollModalKind}
      />

      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* ================= OPEN WIDGET ================= */}
        <div
          className={`
            absolute right-4 sm:right-6 bottom-4 sm:bottom-6
            w-[calc(100vw-2rem)] sm:w-[360px]
            max-h-[90vh]
            flex flex-col
            rounded-3xl
            glass-card
            ring-1 ring-violet-300/60
            shadow-[0_0_60px_rgba(124,77,255,0.35)]
            overflow-hidden
            transition-all duration-200
            ${minimized ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 pointer-events-auto"}
          `}
        >
          {/* ================= HEADER (RESTORED) ================= */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-violet-200 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{title}</h3>

              {/* The Timer */}
              {isConnected && (
                <span className="ml-2 px-2 py-0.5 text-xs font-mono font-medium bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-full border border-violet-100 dark:border-violet-800">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>

            <button
              onClick={minimizeWidget}
              className="text-muted-foreground hover:text-foreground transition"
              aria-label="Minimize"
            >
              {/* ORIGINAL ICON (RESTORED) */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>

          {/* ================= BODY ================= */}
          <div className={`flex-1 ${comingSoon ? "relative" : ""}`}>
            <div
              className={`
                flex-1
                overflow-y-auto sm:overflow-visible
                ${comingSoon ? "blur-sm pointer-events-none" : ""}
              `}
            >
              {/* ================= AVATARS ================= */}

              {isSingleBot ? (
                /* ===== SINGLE BOT (BIGGER BUT SAME RHYTHM) ===== */
                <div className="p-4 sm:p-5">
                  <div className={`
                      rounded-2xl bg-white/30 text-center p-6 transition-all duration-300
                      ${isConnected && activeAvatar === avatars[0].name
                      ? "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-white/50"
                      : ""}
                    `}>
                    <div
                      className="h-32 sm:h-36 flex items-center justify-center mb-3"
                      onMouseEnter={() => { !isConnected && (avatarRefs.current[avatars[0].name]?.triggerHover()); }

                      }
                    >
                      {isImage ? (
                        <img
                          src={avatars[0].image}
                        />) : (
                        <AnimationController
                          lottieSrc={avatars[0].image}
                          ref={(el) =>
                            (avatarRefs.current[avatars[0].name] = el)
                          }
                        />)}
                    </div>

                    <p className="text-sm font-medium">
                      {avatars[0].role}
                    </p>
                  </div>
                </div>
              ) : (
                /* ===== MULTI BOT (UNCHANGED) ===== */
                <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5">
                  {avatars.map((a) => (
                    <div
                      key={a.name}
                      className={`
                        rounded-2xl bg-white/30 text-center p-4 transition-all duration-300
                        ${isConnected && activeAvatar === a.name
                          ? "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-white/50 scale-[1.02]"
                          : "hover:bg-white/40"}
                      `}
                    >
                      <div
                        className="h-24 sm:h-28 flex items-center justify-center mb-3"
                        onMouseEnter={() => { !isConnected && (avatarRefs.current[a.name]?.triggerHover()); }
                        }
                      >
                        {isImage ? (
                          <img
                            src={a.image}
                          />) : (
                          <AnimationController
                            lottieSrc={a.image}
                            ref={(el) =>
                              (avatarRefs.current[a.name] = el)
                            }
                          />)}
                      </div>

                      <p className="text-sm font-medium">{a.role}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= CTA ================= */}
              {!isConnected ? (
                <button
                  className="
                    mx-4 sm:mx-5 mb-4 sm:mb-5
                    h-12 w-[calc(100%-2rem)]
                    rounded-full
                    bg-primary text-primary-foreground
                    flex items-center justify-start gap-3
                    pl-3
                  "
                  onClick={startConversation}
                >
                  {/* LOGO — THIS WAS INVISIBLE BEFORE */}
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
                    <img
                      src="/voicedotslogo.svg"
                      alt="VoiceDots"
                      className="h-4 w-4"
                    />
                  </div>

                  {isConnecting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <span className="font-medium">Let’s Talk</span>
                  )}
                </button>


              ) : (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="flex items-center gap-3 w-full">
                    {/* MIC BUTTON */}
                    <button
                      onClick={toggleMic}
                      className="
                        h-12 w-12 rounded-full
                        bg-white
                        flex items-center justify-center
                        shadow
                        shrink-0
                      "
                    >
                      {micMuted ? (
                        <MicOff className="h-5 w-5 text-red-500" />
                      ) : (
                        <Mic className="h-5 w-5 text-slate-700" />
                      )}
                    </button>

                    {/* END CALL — FULL PILL */}
                    <button
                      onClick={stopConversation}
                      className="
                        flex-1 h-12
                        rounded-full
                        bg-red-500 text-white
                        flex items-center justify-center gap-2
                      "
                    >
                      <Square className="w-4 h-4 fill-current" />
                      End Call
                    </button>
                  </div>
                </div>
              )}

            </div>

            {error && (
              <p className="px-5 pb-3 text-[10px] text-red-500">{error}</p>
            )}

            {comingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                <Lock className="w-8 h-8 text-primary" />
              </div>
            )}
          </div>
        </div>

        {/* ================= MINIMIZED PILL ================= */}
        {minimized && (
          <div
            className="
              fixed right-4 sm:right-6 bottom-4 sm:bottom-6
              z-[10001]
              pointer-events-auto
              flex items-center gap-3
              px-4 py-2
              rounded-full
              bg-white/60 dark:bg-white/10
              backdrop-blur-xl
              border border-violet-300/30 dark:border-white/10
              shadow-[0_8px_30px_rgba(124,77,255,0.25)]
            "
          >
            <button onClick={expandWidget} className="flex items-center gap-2">
              <div
                className={`
                  h-9 w-9 rounded-full
                  bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500
                  flex items-center justify-center
                  transition-all duration-300
                  ${isSpeaking && isConnected
                    ? "shadow-[0_0_20px_rgba(124,77,255,0.8)] animate-pulse"
                    : "shadow-[0_0_12px_rgba(124,77,255,0.6)]"}
                `}
              >
                <div className="h-4 w-4 rounded-full bg-white/70" />
              </div>
              <span className="text-sm font-medium">VoiceDots</span>
            </button>
            {isConnected && (
              <>
                <div className="h-6 w-px bg-violet-400/30 dark:bg-white/20" />

                <button
                  onClick={toggleMic}
                  className={`
                    h-8 w-8 rounded-full
                    flex items-center justify-center
                    ${micMuted
                      ? "bg-red-500/20 text-red-400"
                      : "bg-violet-500/10 text-violet-600 dark:text-violet-300 hover:bg-violet-500/20"
                    }
                  `}
                >
                  {micMuted ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={stop}
                  className="
                    h-8 w-8 rounded-full
                    flex items-center justify-center
                    bg-red-500/20 text-red-400
                    hover:bg-red-500/30
                  "
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
