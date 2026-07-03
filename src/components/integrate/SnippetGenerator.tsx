import { useState } from "react";
import { Code2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AvatarConfig } from "./AvatarConfigRow";

interface SnippetGeneratorProps {
  title: string;
  agentId: string;
  themeColor: string;
  avatars: AvatarConfig[];
  pos: "left" | "right";
}

export function SnippetGenerator({
  title,
  agentId,
  themeColor,
  avatars,
  pos,
}: SnippetGeneratorProps) {
  const [showSnippet, setShowSnippet] = useState(false);
  const [copied, setCopied] = useState(false);

  const logo: string =
    "https://cdn.jsdelivr.net/gh/pratikix/animations/voicedotslogo.svg";

  const configObj = {
    title,
    agentId,
    themeColor,
    logo,
    pos,
    avatars: avatars.map((a) => ({
      name: a.name,
      role: a.role,
      avatar: a.animation,
    })),
  };

  const snippet = `<voicedots-ai config='${JSON.stringify(configObj, null, 2)}'>
  </voicedots-ai>
  <script src="https://unpkg.com/voicedots-ai-widget"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = snippet;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Generate Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowSnippet(true)}
        className="w-full h-14 rounded-2xl text-base font-bold transition-all duration-300 bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.6)]"
      >
        <Code2 className="w-5 h-5" />
        Generate Integration Code
      </motion.button>

      {/* Snippet Output */}
      <AnimatePresence>
        {showSnippet && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Dark Code Block */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-700/50 shadow-2xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700/70">
                <div className="flex items-center gap-3">
                  {/* Traffic light dots */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-400">
                      integration.html
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    copied
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </motion.button>
              </div>

              {/* Code Content */}
              <div className="p-5 bg-zinc-900 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed text-zinc-200 whitespace-pre-wrap break-all">
                  <code>{snippet}</code>
                </pre>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-3 flex items-start gap-2 px-1">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary font-bold">i</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Paste this code anywhere in your website's HTML{" "}
                <code className="text-primary font-semibold bg-primary/5 px-1 py-0.5 rounded">&lt;body&gt;</code> tag.
                The widget will automatically render on your page.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
