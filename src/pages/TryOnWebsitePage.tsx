import React, { useState } from "react";
import { Search, Globe, Lock, ChevronDown } from "lucide-react";
import { TryOnWebsiteBotWidget } from "@/components/widgets/TryOnWebsiteBotWidget";
import { INDUSTRY_USAGE } from "@/components/IndustryGrid";
import { DEMO_AVATARS } from "@/config/demoConfig";
import { GlobalMeshBackground } from "@/components/GlobalMeshBackground";
import { motion } from "framer-motion";

/* ===== Helper: URL → Brand Name ===== */
const getTeamNameFromUrl = (url: string) => {
  try {
    const normalized = url.startsWith("http")
      ? url
      : `https://${url}`;

    const hostname = new URL(normalized).hostname;
    const domain = hostname.replace(/^www\./, "").split(".")[0];

    if (!domain) return "AI";

    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch {
    return "AI";
  }
};

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
  hidden: { opacity: 0, y: 30, scale: 0.98 },
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

export function TryOnWebsitePage() {
  const [url, setUrl] = useState("");
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  const [activeAgent, setActiveAgent] = useState("SRK");
  const [botCount, setBotCount] = useState<1 | 2 | 4>(4);

  const [teamName, setTeamName] = useState("AI");
  const [selectedIndustry, setSelectedIndustry] = useState("Voicedots");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setShowWidget(false);

    setTimeout(() => {
      let formattedUrl = url;
      if (!formattedUrl.startsWith("http")) {
        formattedUrl = `https://${formattedUrl}`;
      }

      setLoadedUrl(formattedUrl);
      setTeamName(getTeamNameFromUrl(formattedUrl));
      setIsLoading(false);

      // show widget slightly after iframe load
      setTimeout(() => setShowWidget(true), 700);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 relative flex flex-col items-center bg-background overflow-x-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-60">
        <GlobalMeshBackground />
      </div>

      {/* Deep Context Glows */}
      <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* ================= HEADER ================= */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Live Preview
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Try VoiceDots on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Your Website
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your website URL below to instantly preview how our conversational AI widget seamlessly integrates with your brand.
          </p>
        </motion.div>

        {/* ================= URL INPUT + BOT COUNT ================= */}
        <motion.form variants={itemVariants} onSubmit={handleSubmit} className="w-full max-w-4xl mb-16">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* URL Input */}
            <div className="flex-1 w-full md:w-auto">
              <div className="flex items-center bg-background/60 backdrop-blur-2xl rounded-[2rem] p-1.5 sm:p-2 pl-4 sm:pl-6 border border-white/20 dark:border-white/5 shadow-[0_15px_40px_-15px_rgba(124,58,237,0.15)] transition-all hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.25)] hover:border-primary/30">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 sm:mr-4 shrink-0" />

                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL (e.g., example.com)"
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-foreground text-base sm:text-lg placeholder:text-muted-foreground/70"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="
                    shrink-0
                    bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-sm sm:text-lg
                    px-4 sm:px-8 py-2.5 sm:py-3 rounded-[1.5rem] sm:rounded-full
                    flex items-center gap-1.5 sm:gap-2
                    shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]
                    transition-all
                    disabled:opacity-70 disabled:pointer-events-none
                  "
                >
                  {isLoading ? "Loading..." : <><span className="hidden sm:inline">Preview</span><span className="sm:hidden">Go</span> <Search size={18} className="stroke-[3] sm:w-[20px] sm:h-[20px]" /></>}
                </motion.button>
              </div>
            </div>

            {/* Quick Settings Row */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center">
              {/* Bot Selector */}
              <div className="flex w-fit justify-center items-center bg-background/60 backdrop-blur-xl rounded-[1.5rem] p-1.5 border border-white/10 dark:border-white/5 mx-auto sm:mx-0 shadow-sm">
                {[1, 2, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setBotCount(n as 1 | 2 | 4)}
                    className={`
                      px-5 py-2.5 rounded-[1.2rem] text-sm font-semibold transition-all whitespace-nowrap
                      ${botCount === n
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }
                    `}
                  >
                    {n} Bot{n > 1 ? "s" : ""}
                  </button>
                ))}
              </div>

              {/* Industry Dropdown */}
              <div className="relative w-full sm:w-auto" onMouseLeave={() => setIsDropdownOpen(false)}>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center bg-background/60 backdrop-blur-xl rounded-[1.5rem] px-6 py-3.5 border border-white/10 dark:border-white/5 cursor-pointer min-w-[200px] justify-between shadow-sm hover:bg-background/80 transition-colors"
                >
                  <span className="text-sm font-semibold mr-3 text-foreground">
                    {selectedIndustry}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                <div className={`absolute top-full right-0 pt-3 w-full min-w-[220px] transition-all duration-300 z-50 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="max-h-72 overflow-y-auto rounded-2xl bg-background/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.2)] p-2">
                    {Object.keys(INDUSTRY_USAGE).map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => {
                          setSelectedIndustry(ind);
                          setIsDropdownOpen(false);
                          // Reset active agent to first in new list to avoid glitches
                          const newAvatars = DEMO_AVATARS[ind]?.avatars || [];
                          if (newAvatars.length > 0) {
                            setActiveAgent(newAvatars[0].name);
                          }
                        }}
                        className={`
                          w-full text-left px-4 py-3 rounded-xl text-sm transition-all font-medium
                          ${selectedIndustry === ind
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                          }
                        `}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.form>

        {/* ================= BROWSER PREVIEW ================= */}
        <motion.div
          variants={itemVariants}
          className="
            w-full h-[750px] rounded-[2rem] overflow-hidden relative
            pointer-events-auto z-10
            border border-white/20 dark:border-white/10
            bg-zinc-950 text-white
            dark:bg-[#0a0a0a] dark:text-foreground
            shadow-[0_30px_100px_-20px_rgba(124,58,237,0.4)]
          "
        >
          {/* Top border glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          {/* Browser chrome */}
          <div
            className="
              h-12 flex items-center px-5 gap-4
              bg-zinc-900 text-white
              border-b border-white/5
              dark:bg-[#111] dark:text-foreground
              relative z-20
            "
          >
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
              <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
              <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
            </div>

            <div
              className="
                flex-1 max-w-xl mx-auto h-7 rounded-lg text-sm px-4
                flex items-center justify-center gap-2
                bg-zinc-950 text-zinc-400
                border border-white/5
                dark:bg-[#000]
                dark:text-muted-foreground
                shadow-inner
              "
            >
              <Lock className="w-4 h-4 opacity-70" strokeWidth={2.5} />
              <span className="truncate font-medium">
                {loadedUrl || "https://voicedots.io/demo"}
              </span>
            </div>

            {/* Empty space to balance the header */}
            <div className="w-[66px]" />
          </div>

          {/* Page iframe */}
          <div className="relative h-[calc(100%-48px)] bg-white w-full">
            {loadedUrl ? (
              <iframe
                src={loadedUrl}
                sandbox="allow-scripts allow-same-origin allow-forms"
                className="w-full h-full border-0 relative z-0"
                title="Preview Website"
              />
            ) : (
              <div className="flex flex-col h-full items-center justify-center text-muted-foreground bg-zinc-50 dark:bg-zinc-900/50">
                <Globe size={64} className="mb-6 opacity-20" />
                <p className="font-medium text-lg text-zinc-400">Enter a URL to preview your custom VoiceDots integration</p>
              </div>
            )}
          </div>
          {/* ===== PREVIEW WIDGET ===== */}
          <TryOnWebsiteBotWidget
            botCount={botCount}
            activeAgent={activeAgent}
            setActiveAgent={setActiveAgent}
            showWidget={showWidget}
            teamName={teamName}
            config={DEMO_AVATARS[selectedIndustry]}
          />
        </motion.div>
        {/* ================= END PREVIEW ================= */}
      </motion.div>
    </div>
  );
}
