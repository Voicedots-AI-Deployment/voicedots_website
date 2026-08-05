import IndustryGrid from "./IndustryGrid";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion } from "framer-motion";

export default function TryLiveDemo() {
  const { openWidget } = useDemoWidget();

  return (
    <section className="mt-40 max-w-6xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
          Try <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Live Demo</span>
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
          Select your industry below to instantly experience how VoiceDots can transform your customer interactions.
        </p>
      </motion.div>

      <IndustryGrid onSelect={(i) => openWidget(i)} />
    </section>
  );
}
