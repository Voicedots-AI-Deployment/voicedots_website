import { motion } from 'framer-motion';
import {
  Mic,
  BrainCircuit,
  RefreshCw,
  UserCircle2,
  MousePointerClick,
  TrendingUp,
  Globe2,
  Database,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    title: 'Human-like AI Voice Conversations',
    description:
      'Engage site visitors instantly with natural, latency-free voice interactions that perfectly mimic human agents.',
    icon: Mic,
  },
  {
    title: 'Emotion-Aware Intelligence',
    description:
      'Our AI analyzes sentiment in real-time and dynamically adapts its tone, empathy, and response style.',
    icon: BrainCircuit,
  },
  {
    title: 'Context-Aware Multi-Turn',
    description:
      'Voicebots that remember past interactions, hold complex context, and intuitively guide users through multi-step journeys.',
    icon: RefreshCw,
  },
  {
    title: 'AI Avatars (Single or Multiple)',
    description:
      'Enhance the visual experience with life-like, lip-synced 3D avatars acting as the face of your brand.',
    icon: UserCircle2,
  },
  {
    title: 'Smart Website Guidance',
    description:
      'The AI speaks while simultaneously navigating pages, proactively highlighting elements, and steering users visually.',
    icon: MousePointerClick,
  },
  {
    title: 'Intelligent Lead Generation',
    description:
      'Automatically qualify prospects during conversations and funnel high-intent leads directly into your CRM.',
    icon: TrendingUp,
  },
  {
    title: 'Multilingual & Regional Support',
    description:
      'Speak to your global audience in over 50 languages with authentic, localized regional accents.',
    icon: Globe2,
  },
  {
    title: 'Secure Knowledge-Trained AI',
    description:
      "Custom-trained exclusively on your company's data, ensuring responses are always accurate and brand-safe.",
    icon: Database,
  },
  {
    title: 'Enterprise-Grade Security',
    description:
      'Built with robust encryption and strict compliance to protect sensitive conversational data and privacy.',
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-16 px-4 bg-background overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Core Platform
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-foreground tracking-tight">
            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Features</span> Built for
            <br className="hidden md:block" /> Voice-First Experiences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            Everything you need to deploy, scale, and optimize AI voice
            interactions on your website.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-8 rounded-[2rem] glass-card border border-white/20 dark:border-white/5 bg-background/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)] overflow-hidden"
            >
              {/* Internal Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] dark:from-primary/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Top border highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-purple-400 group-hover:w-1/2 transition-all duration-500 rounded-b-full opacity-0 group-hover:opacity-100" />

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-white/40 dark:border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-500 relative z-10">
                <feature.icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-foreground transition-colors duration-500 relative z-10">
                {feature.title}
              </h3>

              <p className="text-base text-muted-foreground group-hover:text-foreground/90 transition-colors duration-500 leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
