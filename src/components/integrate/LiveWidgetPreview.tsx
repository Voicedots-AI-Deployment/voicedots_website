import { useRef } from "react";
import AnimationController, { AvatarHandle } from "@/features/AnimationController";
import type { AvatarConfig } from "./AvatarConfigRow";

interface LiveWidgetPreviewProps {
  title: string;
  themeColor: string;
  avatars: AvatarConfig[];
  agentId: string;
  pos: "left" | "right";
}

/* ========== Avatar Grid Layout Helper ========== */
function AvatarGrid({
  avatars,
  activeAvatar,
  isConnected,
  avatarRefs,
}: {
  avatars: AvatarConfig[];
  activeAvatar: string | null;
  isConnected: boolean;
  avatarRefs: React.MutableRefObject<Record<string, AvatarHandle | null>>;
}) {
  const count = avatars.length;

  // 1 bot: single centered
  if (count === 1) {
    const a = avatars[0];
    return (
      <div className="p-4 sm:p-5">
        <div
          className={`
            rounded-2xl bg-white/30 dark:bg-white/5 text-center p-6 transition-all duration-300
            ${isConnected && activeAvatar === a.name
              ? "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-white/50 dark:bg-white/10"
              : "hover:bg-white/40 dark:hover:bg-white/8"
            }
          `}
        >
          <div
            className="h-32 sm:h-36 flex items-center justify-center mb-3"
            onMouseEnter={() => {
              if (!isConnected) avatarRefs.current[a.name]?.triggerHover();
            }}
          >
            <AnimationController
              lottieSrc={a.animation}
              ref={(el) => (avatarRefs.current[a.name] = el)}
            />
          </div>
          <p className="text-sm font-medium">{a.name}</p>
          <p className="text-xs text-muted-foreground">{a.role}</p>
        </div>
      </div>
    );
  }

  // 2 bots: side by side
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5">
        {avatars.map((a) => (
          <AvatarCard
            key={a.name}
            avatar={a}
            isActive={isConnected && activeAvatar === a.name}
            isConnected={isConnected}
            avatarRefs={avatarRefs}
          />
        ))}
      </div>
    );
  }

  // 3 bots: top 2 side by side, 3rd centered
  if (count === 3) {
    return (
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {avatars.slice(0, 2).map((a) => (
            <AvatarCard
              key={a.name}
              avatar={a}
              isActive={isConnected && activeAvatar === a.name}
              isConnected={isConnected}
              avatarRefs={avatarRefs}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="w-1/2">
            <AvatarCard
              avatar={avatars[2]}
              isActive={isConnected && activeAvatar === avatars[2].name}
              isConnected={isConnected}
              avatarRefs={avatarRefs}
            />
          </div>
        </div>
      </div>
    );
  }

  // 4+ bots: 2x2 grid
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-5">
      {avatars.map((a) => (
        <AvatarCard
          key={a.name}
          avatar={a}
          isActive={isConnected && activeAvatar === a.name}
          isConnected={isConnected}
          avatarRefs={avatarRefs}
        />
      ))}
    </div>
  );
}

/* ========== Single Avatar Card ========== */
function AvatarCard({
  avatar,
  isActive,
  isConnected,
  avatarRefs,
}: {
  avatar: AvatarConfig;
  isActive: boolean;
  isConnected: boolean;
  avatarRefs: React.MutableRefObject<Record<string, AvatarHandle | null>>;
}) {
  return (
    <div
      className={`
        rounded-2xl bg-white/30 dark:bg-white/5 text-center p-4 transition-all duration-300
        ${isActive
          ? "ring-2 ring-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-white/50 dark:bg-white/10 scale-[1.02]"
          : "hover:bg-white/40 dark:hover:bg-white/8"
        }
      `}
    >
      <div
        className="h-24 sm:h-28 flex items-center justify-center mb-3"
        onMouseEnter={() => {
          if (!isConnected) avatarRefs.current[avatar.name]?.triggerHover();
        }}
      >
        <AnimationController
          lottieSrc={avatar.animation}
          ref={(el) => (avatarRefs.current[avatar.name] = el)}
        />
      </div>
      <p className="text-sm font-medium">{avatar.name}</p>
      <p className="text-xs text-muted-foreground">{avatar.role}</p>
    </div>
  );
}

/* ========== Main Widget Preview ========== */
export function LiveWidgetPreview({
  title,
  themeColor,
  avatars,
  pos,
}: LiveWidgetPreviewProps) {
  const avatarRefs = useRef<Record<string, AvatarHandle | null>>({});

  return (
    <>
      <div className="relative w-full">
        {/* Live Preview Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Preview
          </span>
        </div>

        {/* Widget Container — mirrors AIDemoWidget exactly */}
        <div
          className="
            w-full sm:w-[360px] mx-auto
            flex flex-col
            rounded-3xl
            glass-card
            ring-1 ring-violet-300/60
            shadow-[0_0_60px_rgba(124,77,255,0.35)]
            overflow-hidden
            transition-all duration-500 ease-in-out
          "
          style={{
            marginLeft: pos === "right" ? "auto" : "0",
            marginRight: pos === "left" ? "auto" : "0",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-violet-200 dark:border-violet-800/50 shrink-0">
            <h3 className="font-semibold">{title || "Your Widget Title"}</h3>
          </div>

          {/* Body: Avatars */}
          <div className="flex-1">
            <AvatarGrid
              avatars={avatars}
              activeAvatar={"activeAvatar"}
              isConnected={false}
              avatarRefs={avatarRefs}
            />
            <button
              className="
                mx-4 sm:mx-5 mb-4 sm:mb-5
                h-12 w-[calc(100%-2rem)]
                rounded-full
                text-white
                flex items-center justify-start gap-3
                pl-3
                transition-all duration-300
                hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]
              "
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 8px 25px -8px ${themeColor}80`,
              }}
            >
              {/* Logo */}
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <img
                  src="/voicedotslogo.svg"
                  alt="VoiceDots"
                  className="h-4 w-4"
                />
              </div>
              <span className="font-medium">Let’s Talk</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
