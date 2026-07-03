import { useRef } from 'react';
import { Mic, Cpu, MessageSquare, UserCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: 'Voice Input',
      description: 'User speaks naturally to the assistant over the phone or web.',
      icon: Mic,
    },
    {
      title: 'AI Processing',
      description: 'AI understands context, tone, and intent in milliseconds.',
      icon: Cpu,
    },
    {
      title: 'Smart Response',
      description: 'Delivers a fluid, human-like conversational response.',
      icon: MessageSquare,
    },
    {
      title: 'Lead Qualification',
      description: 'Seamlessly qualifies, categorizes, and logs leads into your CRM.',
      icon: UserCheck,
    }
  ];

  return (
    <section className="py-16 md:py-20 px-4 relative overflow-hidden bg-background" ref={containerRef}>
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-foreground"
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            From natural voice input to automated lead qualification — instantly.
          </motion.p>
        </div>

        <div className="relative">
          {/* Base connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-[3rem] md:top-[3rem] lg:top-[3rem] left-[12%] right-[12%] h-1 bg-muted rounded-full overflow-hidden">
            {/* Animated filling line */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary via-purple-400 to-pink-400 rounded-full"
              style={{ width: lineWidth }}
            />
          </div>

          {/* Base connecting line (Mobile/Tablet) */}
          <div className="lg:hidden absolute top-[5%] bottom-[5%] left-[2.3rem] md:left-[2.8rem] w-1 bg-muted rounded-full overflow-hidden">
            {/* Animated filling line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-purple-400 to-pink-400 rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-8 w-full lg:w-1/4 group"
              >
                {/* Icon Container with glowing effect */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-20 h-20 md:w-24 md:h-24 glass-card border border-white/20 dark:border-white/10 rounded-2xl flex items-center justify-center relative z-10 shadow-xl group-hover:-translate-y-2 transition-transform duration-500 bg-background/50 backdrop-blur-xl">
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center border-4 border-background shadow-lg z-20">
                    {index + 1}
                  </div>
                </div>

                {/* Text Content */}
                <div className="pt-2 lg:pt-0">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
