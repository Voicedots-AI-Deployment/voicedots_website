
export function PerformanceMetricsSection() {
    const metrics = [
        {
            metric: "70%",
            title: "Reduction in Processing Time",
            description: "Automate repetitive conversations and eliminate delays, so your teams focus only on what truly matters."
        },
        {
            metric: "3X",
            title: "Faster Workflow Completion",
            description: "From enquiry to resolution, conversations move instantly—no waiting, no bottlenecks."
        },
        {
            metric: "50%",
            title: "Less Human Intervention",
            description: "Routine queries, lead qualification, and support interactions handled autonomously with precision."
        },
        {
            metric: "2X",
            title: "Higher Operational Throughput",
            description: "Handle more customers, more queries, and more transactions—without increasing team size."
        },
        {
            metric: "99%",
            title: "Accuracy You Can Trust",
            description: "Deliver consistent, reliable responses powered by intelligent AI and structured knowledge systems."
        },
        {
            metric: "24/7",
            title: "Always-On Availability",
            description: "Never miss a lead or support request—your AI avatar is always ready, always responsive."
        },
        {
            metric: "0",
            title: "Scale Without Expanding Teams",
            description: "Grow operations effortlessly without the need for additional hiring or training."
        }
    ];

    return (
        <section className="py-24 overflow-hidden relative">
            <div className="px-4 max-w-6xl mx-auto text-center mb-16 relative z-20">
                <AnimateOnScroll>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Performance <span className="text-violet-600 dark:text-violet-400">Metrics</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Designed to make every process faster, every interaction smarter, and every outcome more efficient.
                    </p>
                </AnimateOnScroll>
            </div>

            {/* The scrolling marquee with gradient background matching the image */}
            <div className="relative w-full z-10">
                {/* Full-width violet gradient stripe background */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-600 to-transparent dark:via-violet-800 opacity-90 pointer-events-none -z-10" />

                {/* Mask fades the scrolling text at the left and right edges */}
                <div className="flex overflow-hidden group py-28 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max animate-scroll gap-24 px-8 hover:[animation-play-state:paused] items-center">
                        {/* Render two identical sets of items for a seamless loop */}
                        {[...metrics, ...metrics].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center min-w-[320px] max-w-[380px] transition-transform duration-300 hover:scale-105"
                            >
                                <div className="text-[5rem] md:text-[6rem] lg:text-[7rem] font-light leading-none mb-6 text-white tracking-tighter drop-shadow-sm">
                                    {item.metric}
                                </div>
                                <div className="text-xl md:text-2xl font-medium text-white mb-3 text-center drop-shadow-sm">
                                    {item.title}
                                </div>
                                <div className="text-sm md:text-base text-white/90 text-center leading-relaxed px-4">
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


import { motion } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function AnimateOnScroll({
  children,
  delay = 0,
  className = "",
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
