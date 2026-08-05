import {
  Mic,
  MicOff,
  Loader2,
  Square,
} from "lucide-react";
import { useConversationController } from "@/features/conversationController";
import AnimationController, {
  AvatarHandle,
} from "@/features/AnimationController";
import { useEffect, useRef, useState } from "react";
import DataCollectionModal from "@/components/modals/DataCollectionModal";

type BotCount = 1 | 2 | 4;

interface Props {
  botCount: BotCount;
  activeAgent: string;
  setActiveAgent: React.Dispatch<React.SetStateAction<string>>;
  showWidget: boolean;
  teamName: string;
  config?: {
    title: string;
    avatars: { name: string; role: string; image: string }[];
    agent_id?: string;
  };
}

/* ===== TEAM CONFIG ===== */
const TEAM = {
  agent_id: "agent_3401khjm0ktme70aq0w63sdmwxv6",
  avatars: [
    { id: "SRK", name: "Admissions", image: "./animations/srk.lottie" },
    { id: "SALES", name: "Sales", image: "./animations/sales.lottie" },
    { id: "CEO", name: "CEO", image: "./animations/ceo.lottie" },
    { id: "CTO", name: "CTO", image: "./animations/cto.lottie" },
  ],
};

export function TryOnWebsiteBotWidget({
  botCount,
  activeAgent,
  // setActiveAgent,
  showWidget,
  teamName,
  config,
}: Props) {
  const effectiveTeam = config
    ? {
      agent_id: config.agent_id ?? TEAM.agent_id,
      avatars: config.avatars.map((a) => ({
        id: a.name,
        name: a.role,
        image: a.image,
      })),
    }
    : TEAM;

  const {
    start,
    stop,
    isConnected,
    isConnecting,
    isSpeaking,
    toggleMic,
    micMuted,
    error,
    setError,
    tableState,
    dataCollectionOpen,
    setDataCollectionOpen,
    handleUserDataCollected,
    userData,
  } = useConversationController();

  const [minimized, setMinimized] = useState(false);
  const avatarRefs = useRef<Record<string, AvatarHandle | null>>({});

  const [timeLeft, setTimeLeft] = useState<number>(360);

  const avatars = effectiveTeam.avatars.slice(0, botCount);
  const activeAvatar =
    effectiveTeam.avatars.find((a) => a.name === activeAgent) || avatars[0];

  const startConversation = () => {
    setError(null);
    start(effectiveTeam.agent_id, avatars);
  };

  const stopConversation = () => {
    stop();
    avatarRefs.current[activeAgent]?.stopTalking();
  };

  useEffect(() => {
    if (!activeAgent) return;
    isSpeaking
      ? avatarRefs.current[activeAgent]?.startTalking()
      : avatarRefs.current[activeAgent]?.stopTalking();

    if (!isConnected) avatarRefs.current[activeAgent]?.stopTalking();
  }, [isSpeaking, activeAgent, isConnected]);

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

  if (!showWidget) return null;

  return (
    <>
      <DataCollectionModal
        isOpen={dataCollectionOpen}
        title={tableState.title}
        onClose={() => setDataCollectionOpen(false)}
        data={userData}
        onSubmit={handleUserDataCollected}
      />
      <div className="absolute bottom-4 left-[8px] cursor-pointer z-50">
        {!minimized && (
          <div
            className="
              w-[320px] h-auto rounded-3xl
              bg-white/85 dark:bg-zinc-900/85
              backdrop-blur-md
              ring-1 ring-violet-300/40
              shadow-[0_20px_60px_rgba(124,77,255,0.30)]
              overflow-hidden flex flex-col
            "
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-violet-200/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                  {teamName} AI Team
                </h3>

                {/* The Timer */}
                {isConnected && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-mono font-medium bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-full border border-violet-100 dark:border-violet-800">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMinimized(true)}
                className="text-slate-500 hover:text-slate-700"
              >
                ⤢
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 p-5">
              {/* SINGLE BOT */}
              {botCount === 1 ? (
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="w-44 h-44 rounded-3xl bg-white ring-2 ring-primary/80 flex items-center justify-center"
                    onMouseEnter={() => { !isConnected && avatarRefs.current[activeAvatar.id]?.triggerHover() }}
                  >
                    <AnimationController
                      lottieSrc={activeAvatar.image}
                      ref={(el) =>
                        (avatarRefs.current[activeAvatar.id] = el)
                      }
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-base text-slate-800">
                      {activeAvatar.name}
                    </p>
                  </div>
                </div>
              ) : (
                /* MULTI BOT GRID */
                <div className="grid grid-cols-2 gap-4">
                  {avatars.map((a) => (
                    <div
                      key={a.name}
                      // onClick={() => setActiveAgent(a.name)}
                      onMouseEnter={() => { !isConnected && avatarRefs.current[a.id]?.triggerHover(); }}
                      className={`
                        rounded-2xl bg-white/90 p-3 text-center cursor-pointer transition
                        ${activeAgent === a.name
                          ? "ring-2 ring-primary"
                          : "hover:ring-1 hover:ring-primary/40"
                        }
                      `}
                    >
                      <div className="h-24 flex items-center justify-center mb-2">
                        <AnimationController
                          lottieSrc={a.image}
                          ref={(el) =>
                            (avatarRefs.current[a.id] = el)
                          }
                        />
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        {a.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA BAR */}
            <div className="px-5 pb-5 pt-4 border-t border-violet-200/50">
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
          </div>
        )}

        {/* MINIMIZED PILL */}
        {minimized && (
          <button
            onClick={() => setMinimized(false)}
            className="
              flex items-center gap-3
              px-4 py-2 rounded-full
              bg-white/85 backdrop-blur-md
              border border-violet-300/30
              shadow-[0_8px_30px_rgba(124,77,255,0.25)]
            "
          >
            <div
              className={`h-9 w-9 rounded-full bg-primary ${isSpeaking ? "animate-pulse scale-110" : ""
                }`}
            />
            <span className="text-sm font-medium text-slate-800">
              {teamName}
            </span>
          </button>
        )}
      </div>
    </>
  );
}
