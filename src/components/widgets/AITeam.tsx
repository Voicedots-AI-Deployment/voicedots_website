import { Mic, MicOff, Square, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AnimationController, { AvatarHandle } from "@/features/AnimationController";
import { useConversationController } from "@/features/conversationController";
import { useLiveKitController } from "@/features/useLiveKitController";
import { useDemoWidget } from "@/config/demoWidgetState";
import DataCollectionModal from "@/components/modals/DataCollectionModal";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface Avatar {
  lottieSrc: string;
  name: string;
  role: string;
  agent_id: string;
  active?: boolean;
}

/* ================= DATA ================= */

const AVATARS: Avatar[] = [
  {
    lottieSrc: "/animations/sales.lottie",
    name: "Maya",
    role: "Sales Representative",
    agent_id: "agent_4801khn16d8af3nb1adnsb8yc7dm",
  },
  {
    lottieSrc: "/animations/srk.lottie",
    name: "SRK",
    role: "Voice Ambassador",
    agent_id: "agent_4801khk5ztw2frfa513gr3tknrmq",
    active: true,
  },
  {
    lottieSrc: "/animations/ceo.lottie",
    name: "Sai",
    role: "Senior Developer",
    agent_id: "abcdefghi",
  },
];

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

/* ================= COMPONENT ================= */

export default function AITeam({ compact = false }: { compact?: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeAgentId, setActiveAgentId] = useState<string>("");

  const { industry } = useDemoWidget();
  const elevenLabsController = useConversationController();
  const liveKitController = useLiveKitController();
  const livekitIndustries = [
    "Education"
  ];
  const isLiveKitActive = livekitIndustries.includes(industry || "");
  const conversationState = isLiveKitActive ? liveKitController : elevenLabsController;

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
    // handleUserDataCollected,
    userData,
    dataConfirmed,
  } = conversationState;

  const avatarRefs = useRef<Record<string, AvatarHandle | null>>({});

  /* ================= AVATAR TALK SYNC ================= */

  useEffect(() => {
    const currentAvatar = avatarRefs.current[activeAgentId];
    if (!currentAvatar) return;

    if (isSpeaking) {
      currentAvatar.startTalking();
    } else {
      currentAvatar.stopTalking();
    }

    if (!isConnected) currentAvatar.stopTalking();
  }, [isSpeaking, activeAgentId, isConnected]);

  /* ================= ACTIONS ================= */

  const startConversation = (agent_id: string) => {
    setError(null);
    setActiveAgentId(agent_id);
    start(agent_id, [{ name: AVATARS.find(a => a.agent_id === agent_id)?.name || "Agent" }]);
  };

  const stopConversation = () => {
    stop();
    setActiveAgentId("");
  };

  /* ================= UI ================= */

  return (
    <>
      <DataCollectionModal
        isOpen={dataCollectionOpen}
        title={tableState.title}
        onClose={() => setDataCollectionOpen(false)}
        data={userData}
        confirmed={dataConfirmed}
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`grid ${compact ? "grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
          }`}
      >
        {AVATARS.map((a) => {
          const isThisActive = activeAgentId === a.agent_id;
          const isActive = hovered !== null ? hovered === a.name : a.active ?? false;
          const isDimmed = hovered !== null && hovered !== a.name;

          return (
            <motion.div
              variants={itemVariants}
              key={a.name}
              onMouseEnter={() => {
                setHovered(a.name);
                if (!isConnected) avatarRefs.current[a.agent_id]?.triggerHover();
              }}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={() => {
                setHovered(a.name);
                if (!isConnected) avatarRefs.current[a.agent_id]?.triggerHover();
              }}
              className={`
                group relative rounded-[2rem] overflow-hidden p-6
                transition-all duration-500
                ${isActive ? "glass-card border-primary/40 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] bg-background/60 backdrop-blur-2xl -translate-y-2" : "glass-card border-white/20 dark:border-white/5 bg-background/40 backdrop-blur-xl hover:-translate-y-1"}
                ${isDimmed ? "opacity-50 scale-[0.98]" : "opacity-100 scale-100"}
              `}
            >
              {/* Internal Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] dark:from-primary/[0.08] to-transparent pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              />

              {/* Top border highlight */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-purple-400 transition-all duration-500 rounded-b-full ${isActive ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}`} />

              {/* Avatar */}
              <div className={`h-[220px] mb-4 flex justify-center items-end relative z-10 transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
                <AnimationController
                  lottieSrc={a.lottieSrc}
                  ref={(el) => (avatarRefs.current[a.agent_id] = el)}
                />
              </div>

              {/* Content */}
              <div className="text-center relative z-10">
                <h3 className="text-2xl font-bold mb-1 text-foreground">{a.name}</h3>
                <p className="text-sm text-primary font-medium mb-6">{a.role}</p>

                {/* ================= ACTION AREA ================= */}

                {/* 1️⃣ CONNECTING STATE */}
                {isThisActive && isConnecting && !isConnected && (
                  <button
                    disabled
                    className="
                      w-full h-12 rounded-2xl
                      flex items-center justify-center gap-3
                      bg-background/80 text-foreground font-semibold
                      border border-border/50
                      backdrop-blur-md
                    "
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    Connecting…
                  </button>
                )}

                {/* 2️⃣ IDLE STATE (NOT CONNECTED) */}
                {!isConnected && !isConnecting && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isConnecting}
                    onClick={() => startConversation(a.agent_id)}
                    className={`
                      relative w-full h-12 rounded-2xl
                      flex items-center justify-center gap-2
                      text-base font-bold overflow-hidden
                      transition-all duration-300
                      ${isActive
                        ? 'bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] border-primary/50'
                        : 'bg-muted/80 text-foreground hover:bg-muted border border-border/50'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[150%] animate-[shimmer_2s_infinite]" />
                    )}
                    <Mic className="w-5 h-5" />
                    Talk to me
                  </motion.button>
                )}

                {/* 3️⃣ CONNECTED STATE (NO TALK BUTTON HERE ✅) */}
                {isThisActive && isConnected && (
                  <div className="flex gap-3">
                    {/* MUTE */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMic}
                      className={`
                        flex-1 h-12 rounded-2xl
                        flex items-center justify-center
                        border backdrop-blur-md transition-all
                        ${micMuted
                          ? "bg-red-500/10 border-red-500/40 text-red-500 hover:bg-red-500/20"
                          : "bg-background/80 border-border/50 text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      {micMuted ? (
                        <MicOff className="h-5 w-5" />
                      ) : (
                        <Mic className="h-5 w-5" />
                      )}
                    </motion.button>

                    {/* STOP */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopConversation}
                      className="
                        flex-1 h-12 rounded-2xl
                        flex items-center justify-center gap-2
                        font-bold text-base
                        bg-red-500 text-white
                        border border-red-600/50
                        shadow-[0_8px_25px_rgba(239,68,68,0.35)]
                      "
                    >
                      <Square className="w-4 h-4 fill-current" />
                      Stop
                    </motion.button>
                  </div>
                )}

                {/* ERROR */}
                {isThisActive && error && (
                  <p className="mt-4 text-xs font-medium text-red-500 bg-red-500/10 rounded-lg py-2 px-3 border border-red-500/20">{error}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
