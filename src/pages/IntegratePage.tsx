import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Palette, Sparkles, Info } from "lucide-react";
import {
  AvatarConfigRow,
  ANIMATION_OPTIONS,
  type AvatarConfig,
} from "@/components/integrate/AvatarConfigRow";
import { LiveWidgetPreview } from "@/components/integrate/LiveWidgetPreview";
import { SnippetGenerator } from "@/components/integrate/SnippetGenerator";

/* ================= ANIMATION VARIANTS ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

/* ================= DEFAULT CONFIG ================= */
const DEFAULT_AVATARS: AvatarConfig[] = [
  { name: "SRK", role: "SRK", animation: ANIMATION_OPTIONS[0].url },
  { name: "Sales", role: "Sales", animation: ANIMATION_OPTIONS[1].url },
  { name: "CTO", role: "CTO", animation: ANIMATION_OPTIONS[2].url },
  { name: "CEO", role: "CEO", animation: ANIMATION_OPTIONS[3].url },
];

const AGENT_COUNTS = [1, 2, 3, 4] as const;
const DEFAULT_AGENT_ID = "agent_6501khr45gyrfwa82p19v5m71ffg";
const DEFAULT_THEME_COLOR = "#9966FE";

/* ================= MAGNETIC HOVER CARD ================= */
function MagneticCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================= PAGE COMPONENT ================= */
export function IntegratePage() {
  const navigate = useNavigate();

  // --- Form State ---
  const [widgetTitle, setWidgetTitle] = useState("Voicedots AI Team");
  const [agentCount, setAgentCount] = useState<number>(4);
  const [avatars, setAvatars] = useState<AvatarConfig[]>(DEFAULT_AVATARS);
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR);
  const [agentId, setAgentId] = useState(DEFAULT_AGENT_ID);
  const [agentPosition, setAgentPosition] = useState<"right" | "left">("right");

  // --- Handlers ---
  const handleAgentCountChange = useCallback(
    (count: number) => {
      setAgentCount(count);
    },
    []
  );

  const handleAvatarChange = useCallback(
    (index: number, field: keyof AvatarConfig, value: string) => {
      setAvatars((prev) =>
        prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
      );
    },
    []
  );

  const activeAvatars = avatars.slice(0, agentCount);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 relative bg-background">
      {/* ========== MODERN BACKGROUND (no wave) ========== */}
      {/* Light mode: subtle gradient mesh */}
      <div className="absolute inset-0 z-0 dark:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(147,51,234,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(147,51,234,0.05),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent" />
      </div>
      {/* Dark mode: subtle glow orbs */}
      <div className="absolute inset-0 z-0 hidden dark:block">
        <div className="absolute top-1/4 right-1/4 w-[50rem] h-[50rem] bg-violet-500/[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* ================= HEADER ================= */}
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Integration Guide
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            How to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Integrate
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Configure your VoiceDots AI widget and generate the integration snippet in seconds.
          </p>
        </motion.div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* ========= LEFT: CONFIGURATION FORM ========= */}
          <motion.div variants={itemVariants} className="w-full lg:w-3/5 space-y-6">
            <MagneticCard className="perspective-[1200px]">
              <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-8 transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)]">
                {/* Widget Title */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Widget Title{" "}
                    <span className="text-muted-foreground/60">
                      (appears at the top of your chatbot)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all duration-200 hover:border-primary/30"
                    placeholder="e.g. Voicedots AI Team"
                  />
                </div>

                {/* Number of Agents */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-3">
                    Number of Agents
                  </label>
                  <div className="flex gap-2">
                    {AGENT_COUNTS.map((n) => (
                      <motion.button
                        key={n}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAgentCountChange(n)}
                        className={`
                          flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                          ${agentCount === n
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted border border-border hover:border-primary/30"
                          }
                        `}
                      >
                        {n}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Avatar Configuration Rows */}
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-muted-foreground">
                    Avatar Configuration
                  </label>
                  {activeAvatars.map((config, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <AvatarConfigRow
                        index={i}
                        config={config}
                        onChange={handleAvatarChange}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Button Color */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    <Palette className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                    Button Color
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <input
                        type="color"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border border-border cursor-pointer shadow-sm"
                      />
                      <div
                        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ boxShadow: `0 0 15px ${themeColor}40` }}
                      />
                    </div>
                    <input
                      type="text"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all duration-200 hover:border-primary/30"
                      placeholder="#9966FE"
                    />
                  </div>
                </div>

                {/* Custom Animation Request */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    navigate(
                      "/contact?message=" +
                      encodeURIComponent("I want custom animation for my avatars")
                    )
                  }
                  className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 border border-primary/20 hover:border-primary/40 transition-all duration-200 hover:shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  I want a custom animation
                </motion.button>

                {/* Agent ID */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Agent ID
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={agentId}
                      onChange={(e) => setAgentId(e.target.value)}
                      className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-all duration-200 hover:border-primary/30"
                      placeholder="e.g. agent_..."
                    />
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigate(
                          "/contact?message=" +
                          encodeURIComponent(
                            "I want to create my own custom agent"
                          )
                        )
                      }
                      className="whitespace-nowrap px-4 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-all duration-200 flex items-center gap-1.5 hover:shadow-md"
                    >
                      Need your own Agent ID?
                    </motion.button>
                  </div>
                </div>

                {/* Widget Position */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-3">
                    Widget Position
                    <span className="text-muted-foreground/60 ml-1.5">
                      (which side of the screen)
                    </span>
                  </label>
                  <div className="flex gap-2">
                    {(["left", "right"] as const).map((pos) => (
                      <motion.button
                        key={pos}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAgentPosition(pos)}
                        className={`
                          flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all duration-200
                          ${agentPosition === pos
                            ? "bg-primary text-white shadow-md shadow-primary/20"
                            : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted border border-border hover:border-primary/30"
                          }
                        `}
                      >
                        {pos}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Generate Snippet */}
                <SnippetGenerator
                  title={widgetTitle}
                  agentId={agentId}
                  themeColor={themeColor}
                  avatars={activeAvatars}
                  pos={agentPosition}
                />

                {/* WordPress Note */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 transition-all duration-200 hover:shadow-md hover:border-blue-500/30"
                >
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Using WordPress?</span>{" "}
                    {/* Make sure you have the Single Page Reload (AJAX) plugin{" "} */}
                    Our
                    <span className="font-semibold text-primary">'Wordpress Plugin'</span> coming soon.
                  </p>
                </motion.div>
              </div>
            </MagneticCard>
          </motion.div>

          {/* ========= RIGHT: LIVE WIDGET PREVIEW (STICKY) ========= */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-2/5 lg:sticky lg:top-28 h-fit self-start"
          >
            <LiveWidgetPreview
              title={widgetTitle}
              themeColor={themeColor}
              avatars={activeAvatars}
              agentId={agentId}
              pos={agentPosition}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
