import { motion } from 'framer-motion';
import { Search, FormInput, ListFilter, Repeat, Zap, Bot, Users, Headset, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

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
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function ProblemSolutionSection() {
    const problemsDontWant = [
        { icon: Search, text: "Search endlessly through pages" },
        { icon: FormInput, text: "Fill long forms and wait for callbacks" },
        { icon: ListFilter, text: "Navigate complex menus" },
        { icon: Repeat, text: "Repeat queries across channels" },
    ];

    const problemsExpect = [
        { icon: Zap, text: "Instant answers" },
        { icon: Bot, text: "Natural interaction" },
        { icon: Users, text: "Personalized guidance" },
        { icon: Headset, text: "Human-like support" },
    ];

    const solutionFeatures = [
        "It listens automatically.",
        "It understands context.",
        "It responds instantly.",
        "It guides seamlessly.",
        "It converts reliably.",
    ];

    const transformations = [
        { from: "Navigation", to: "Conversation" },
        { from: "Waiting", to: "Instant Responses" },
        { from: "Drop-offs", to: "Conversions" },
    ];

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const fadeUpItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-background">
            {/* Background elements to match the site's overall premium look without the red */}
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <AnimateOnScroll className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-8 border border-primary/20">
                        <Sparkles className="w-4 h-4 ml-[-4px]" />
                        The Evolution
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground leading-tight">
                        From Silent Websites to <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-violet-400">
                            Intelligent Conversations
                        </span>
                    </h2>
                </AnimateOnScroll>

                {/* Core Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">

                    {/* THE PROBLEM CARD - Muted and Gray instead of Red */}
                    <AnimateOnScroll delay={0.1} className="h-full">
                        <div className="h-full flex flex-col rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden glass-card transition-all duration-500 border-border/50 bg-muted/30 backdrop-blur-xl group hover:border-border/80 blur-0">

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-bold tracking-wide uppercase mb-8 w-fit border border-border/50">
                                    <AlertCircle className="w-4 h-4" />
                                    The Old Way
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-snug">
                                    Websites Today Are Silent. <br /> Your Customers Are Not.
                                </h3>

                                <p className="text-muted-foreground text-lg mb-10">
                                    Modern users don't behave the way static websites are built.
                                </p>

                                <div className="space-y-10 flex-1">
                                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h4 className="text-base font-semibold text-foreground mb-5 opacity-80 uppercase tracking-wider text-sm">They don't want to:</h4>
                                        <ul className="space-y-4">
                                            {problemsDontWant.map((item, i) => (
                                                <motion.li variants={fadeUpItem} key={i} className="flex items-center gap-4 text-muted-foreground transition-colors hover:text-foreground">
                                                    <div className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                                                        <item.icon className="w-4 h-4 text-muted-foreground/70" />
                                                    </div>
                                                    <span>{item.text}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <h4 className="text-base font-semibold text-foreground mb-5 opacity-80 uppercase tracking-wider text-sm">Instead, they expect:</h4>
                                        <ul className="space-y-4">
                                            {problemsExpect.map((item, i) => (
                                                <motion.li variants={fadeUpItem} key={i} className="flex items-center gap-4 text-foreground/80 transition-colors hover:text-foreground">
                                                    <div className="w-8 h-8 rounded-full bg-background/50 border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                                                        <item.icon className="w-4 h-4 text-primary/70" />
                                                    </div>
                                                    <span className="font-medium">{item.text}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                                <div className="mt-12 p-6 rounded-2xl bg-background/40 border border-border/50 text-center">
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        And when they don't get it — they leave. <br />
                                        <span className="text-foreground font-semibold">This is where businesses lose conversions.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* THE SOLUTION CARD - Vibrant and Primary colored */}
                    <AnimateOnScroll delay={0.2} className="h-full">
                        <div className="h-full flex flex-col rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden glass-card hover:-translate-y-2 transition-all duration-500 border-primary/30 bg-background/60 backdrop-blur-2xl group shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)] hover:shadow-[0_40px_80px_-15px_rgba(124,58,237,0.3)]">
                            {/* Animated Background Gradients */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-primary/15 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110" />

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold tracking-wide uppercase mb-8 w-fit shadow-lg shadow-primary/20">
                                    <CheckCircle2 className="w-4 h-4" />
                                    The VoiceDots Way
                                </div>

                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                                    Turn Your Website Into a Real-Time Conversational Interface
                                </h3>

                                <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                                    Voicedots is not just a voicebot. It is a fully intelligent, AI-driven conversational layer that sits seamlessly on top of your existing website.
                                </p>

                                <div className="space-y-6 flex-1 mt-auto">
                                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        {solutionFeatures.map((text, i) => (
                                            <motion.div
                                                variants={fadeUpItem}
                                                key={i}
                                                className="flex items-center gap-5 mb-8 group/item"
                                            >
                                                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shrink-0 group-hover/item:bg-primary/20 transition-colors border border-primary/20">
                                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                    <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_rgba(124,58,237,0.6)]" />
                                                </div>
                                                <span className="text-xl md:text-2xl font-semibold text-foreground/90 group-hover/item:text-foreground transition-colors tracking-tight">{text}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                </div>

                {/* The Transformation Footer - More elegant */}
                <AnimateOnScroll delay={0.3}>
                    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 w-full justify-center mb-12">
                            {transformations.map((t, i) => (
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    key={i}
                                    className="flex items-center justify-between md:justify-center gap-4 px-6 md:px-8 py-5 rounded-2xl glass-card border-border/50 bg-background/50 backdrop-blur-xl flex-1 md:flex-none"
                                >
                                    <span className="text-muted-foreground font-medium text-lg">{t.from}</span>
                                    <ArrowRight className="w-6 h-6 text-primary shrink-0" />
                                    <span className="text-foreground font-bold text-lg">{t.to}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center p-8 md:p-12 rounded-[2.5rem] glass-card border-primary/20 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-2xl w-full max-w-4xl relative overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 relative z-10 tracking-tight">Every visitor interaction becomes:</h3>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-10 text-primary font-semibold relative z-10">
                                <span className="flex items-center justify-center gap-3 text-lg bg-primary/10 px-6 py-3 rounded-full border border-primary/20"><CheckCircle2 className="w-5 h-5" /> A conversation</span>
                                <span className="flex items-center justify-center gap-3 text-lg bg-primary/10 px-6 py-3 rounded-full border border-primary/20"><CheckCircle2 className="w-5 h-5" /> A qualified lead</span>
                                <span className="flex items-center justify-center gap-3 text-lg bg-primary/10 px-6 py-3 rounded-full border border-primary/20"><CheckCircle2 className="w-5 h-5" /> A measurable outcome</span>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>

            </div>
        </section>
    );
}
