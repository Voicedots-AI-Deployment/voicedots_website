import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic,
    Database,
    UserPlus,
    CheckCircle2,
    Mail,
    Speaker,
    Users
} from 'lucide-react';

// ─── Capability data ──────────────────────────────────────────────────────────
const capabilities = [
    {
        number: '01',
        title: 'Voice-Based Website Navigation',
        description:
            'Let users navigate your entire website using natural voice input — no clicks, no typing, just conversation.',
        icon: Mic,
    },
    {
        number: '02',
        title: 'Real-Time Database Interaction',
        description:
            'Fetch and update data instantly through conversational voice queries. Your backend, talking back.',
        icon: Database,
    },
    {
        number: '03',
        title: 'Lead Collection via Voice',
        description:
            'Capture user details naturally during conversations. No forms — just fluid, human exchange.',
        icon: UserPlus,
    },
    {
        number: '04',
        title: 'Smart Validation',
        description:
            'Validate user inputs intelligently before submission. Catch errors in real time, in natural language.',
        icon: CheckCircle2,
    },
    {
        number: '05',
        title: 'Automated Emails & Notifications',
        description:
            'Trigger emails and alerts automatically after voice actions. Your assistant closes the loop.',
        icon: Mail,
    },
    {
        number: '06',
        title: 'Custom Voices',
        description:
            'Choose voice styles that match your brand identity. Calm, energetic, authoritative — yours to define.',
        icon: Speaker,
    },
    {
        number: '07',
        title: 'Multiple AI Avatars',
        description:
            'Deploy different AI avatars for different roles — support, sales, onboarding. One platform, many faces.',
        icon: Users,
    },
];

// ─── Sticky Visual Panel ────────────────────────────────────────────────────────
function VisualPanel({ activeIndex }: { activeIndex: number }) {
    const cap = capabilities[activeIndex];
    const ActiveIcon = cap.icon;

    return (
        <div
            className="relative w-full max-w-md mx-auto aspect-square rounded-[2rem] overflow-hidden select-none glass-card border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center bg-background/50 backdrop-blur-2xl transition-all duration-700"
        >
            {/* Ambient Animated Glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <motion.div
                key={`glow-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"
            />

            {/* Step counter */}
            <div className="absolute top-8 left-8 z-10 flex flex-col">
                <span className="text-sm font-bold tracking-widest text-primary mb-1">
                    {cap.number} <span className="text-primary/40 font-normal">/ 07</span>
                </span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    Feature
                </span>
            </div>

            {/* Progress bar (top edge) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50">
                <div
                    className="h-full bg-gradient-to-r from-primary to-purple-400"
                    style={{
                        width: `${((activeIndex + 1) / capabilities.length) * 100}%`,
                        transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                    }}
                />
            </div>

            {/* Center Animated Icon */}
            <div className="relative z-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="relative flex items-center justify-center w-28 h-28 rounded-3xl bg-background/80 shadow-2xl border border-white/20 dark:border-white/5"
                    >
                        {/* Subtle pulsing ring behind icon */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-3xl border border-primary/30"
                        />

                        <ActiveIcon className="w-14 h-14 text-primary" strokeWidth={1.5} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Title overlay bottom */}
            <div className="absolute bottom-8 left-8 right-8 z-10 text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="text-lg md:text-xl font-semibold leading-snug text-foreground tracking-tight"
                    >
                        {cap.title}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function CapabilitiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const N = capabilities.length;

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % N);
        }, 4000); // cycle every 4 seconds

        return () => clearInterval(interval);
    }, [isPaused, N]);

    return (
        <section className="bg-background relative py-20 lg:py-32 overflow-hidden">
            <div className="flex flex-col relative w-full">
                {/* Section header */}
                <div className="relative z-10 text-center px-6 mb-16 shrink-0">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold tracking-widest uppercase mb-3 text-primary"
                    >
                        Powerful Capabilities
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-5xl font-semibold leading-tight text-foreground tracking-tight max-w-3xl mx-auto"
                    >
                        Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">VoiceDots</span> can{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">do for you</span>
                    </motion.h2>
                </div>

                {/* Two-column layout on Desktop, single col on Mobile */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start px-6 lg:px-12 max-w-7xl mx-auto w-full gap-12 lg:gap-16">

                    {/* LEFT — Visual Panel (Sticky on Desktop) */}
                    <div className="w-full lg:w-[45%] flex-shrink-0 lg:sticky lg:top-32 order-1 lg:order-none">
                        <VisualPanel activeIndex={activeIndex} />
                    </div>

                    {/* RIGHT — Capability list */}
                    <div
                        className="w-full lg:w-[55%] flex flex-col justify-center gap-0 order-2 lg:order-none"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {capabilities.map((cap, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={cap.number}
                                    onClick={() => setActiveIndex(index)}
                                    className="py-5 px-4 sm:px-6 transition-all duration-300 cursor-pointer border-b border-border/30 relative overflow-hidden group"
                                >
                                    <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                                        {/* Number */}
                                        <span
                                            className={`text-base sm:text-lg font-mono font-bold tabular-nums mt-0.5 flex-shrink-0 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-muted-foreground/30 group-hover:text-primary/50'}`}
                                            style={{ minWidth: '2.5rem' }}
                                        >
                                            {cap.number}
                                        </span>

                                        <div className="flex-1">
                                            {/* Title */}
                                            <h3
                                                className={`text-base sm:text-lg md:text-xl font-semibold leading-snug transition-transform duration-500 ${isActive ? 'text-foreground translate-x-1 sm:translate-x-2' : 'text-muted-foreground group-hover:text-foreground/80 group-hover:translate-x-1'}`}
                                            >
                                                {cap.title}
                                            </h3>

                                            {/* Expanding description using Framer Motion */}
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: isActive ? 'auto' : 0,
                                                    opacity: isActive ? 1 : 0,
                                                    marginTop: isActive ? 8 : 0
                                                }}
                                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <p className={`text-sm md:text-base leading-relaxed text-muted-foreground transition-transform duration-500 ${isActive ? 'translate-x-1 sm:translate-x-2' : ''}`}>
                                                    {cap.description}
                                                </p>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Active Highlight Background */}
                                    <motion.div
                                        initial={false}
                                        animate={{ opacity: isActive ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 bg-primary/[0.03] dark:bg-primary/[0.05] -z-10 rounded-xl"
                                    />

                                    {/* Active Left Border Glow */}
                                    <motion.div
                                        initial={false}
                                        animate={{ height: isActive ? '100%' : '0%' }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute left-0 top-0 w-1 bg-gradient-to-b from-primary to-purple-400 rounded-full"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
