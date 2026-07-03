import AITeam from "@/components/widgets/AITeam";
import TryLiveDemo from "@/components/TryLiveDemo";
import { GlobalMeshBackground } from "@/components/GlobalMeshBackground";
import { motion } from "framer-motion";

export function TryNowPage() {
  return (
    <div className="min-h-screen pt-32 pb-32 px-4 relative overflow-x-hidden bg-background">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-60">
        <GlobalMeshBackground />
      </div>

      {/* Deep Context Glows */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Live Experience
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
              AI Team
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            Choose an avatar below to experience the human-like fluidity and intelligence of VoiceDots conversational AI.
          </p>
        </motion.div>

        <AITeam />
      </div>

      <TryLiveDemo />
    </div>
  );
}