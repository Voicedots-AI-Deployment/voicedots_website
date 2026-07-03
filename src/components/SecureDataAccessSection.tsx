import { motion } from 'framer-motion';
import { ShieldCheck, UserCog, Database, Zap } from 'lucide-react';

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SecureDataAccessSection() {
    const securityPillars = [
        { icon: ShieldCheck, title: "Authenticated", desc: "Identity verified instantly" },
        { icon: UserCog, title: "Role-aware", desc: "Access matched to permissions" },
        { icon: Database, title: "Securely retrieved", desc: "Encrypted data fetching" },
        { icon: Zap, title: "Instantly delivered", desc: "Real-time conversational output" },
    ];

    const useCases = [
        "a student checking fees",
        "a customer viewing order details",
        "a staff member accessing internal data"
    ];

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-background">
            {/* Background glow effects to give a secure, tech-focused vibe */}
            <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[40rem] h-[40rem] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
                <AnimateOnScroll className="text-center mb-16 max-w-4xl mx-auto">
                    <p className="text-sm font-bold tracking-widest uppercase mb-4 text-emerald-500 dark:text-emerald-400">
                        SECURE DATA ACCESS & REAL-TIME RESPONSES
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-8 text-foreground tracking-tight leading-tight">
                        Enterprise grade security meets <br className="hidden md:block" /> real time conversational experience.
                    </h2>
                    <div className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto space-y-2">
                        <p className="font-medium text-foreground">Not every question is generic.</p>
                        <p className="font-medium text-foreground mb-6">Not every answer should be public.</p>
                    </div>
                </AnimateOnScroll>

                {/* The Bridging Paragraph */}
                <AnimateOnScroll delay={0.1}>
                    <div className="max-w-3xl mx-auto text-center mb-20 p-8 rounded-[2rem] glass-card border-white/10 dark:border-white/5 bg-background/40 backdrop-blur-xl shadow-xl relative overflow-hidden group">
                        {/* Subtle interactive hover highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed relative z-10">
                            Voicedots bridges the gap between conversational AI and secure business data, allowing users to access personalized, real-time information — <span className="text-emerald-500 dark:text-emerald-400 font-bold border-b border-emerald-500/30">only when they are authorized to do so.</span>
                        </p>
                    </div>
                </AnimateOnScroll>

                {/* Use Cases vs Pillars Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Use Cases Context */}
                    <AnimateOnScroll delay={0.2} className="space-y-8">
                        <h3 className="text-2xl font-semibold text-foreground leading-snug">
                            Whether it's...
                        </h3>
                        <ul className="space-y-4">
                            {useCases.map((useCase, index) => (
                                <li key={index} className="flex items-center gap-4 text-lg text-muted-foreground">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 shrink-0" />
                                    {useCase}
                                </li>
                            ))}
                        </ul>
                        <p className="text-xl font-medium text-foreground border-l-4 border-emerald-500 pl-4 py-1">
                            ...every interaction is:
                        </p>
                    </AnimateOnScroll>

                    {/* Right Side: The 4 Security Pillars Grid */}
                    <AnimateOnScroll delay={0.3}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {securityPillars.map((pillar, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-2xl glass-card border border-border bg-card/60 hover:bg-card/80 transition-colors duration-300 group flex flex-col gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
                                        <pillar.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg mb-1">{pillar.title}</h4>
                                        <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>

                </div>

            </div>
        </section>
    );
}
