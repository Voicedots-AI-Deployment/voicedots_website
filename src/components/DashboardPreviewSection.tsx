import { motion, Variants } from 'framer-motion';

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

export function DashboardPreviewSection() {
    const cards = [
        {
            title: "360° Website Performance",
            description: "Track everything that matters—from daily visitors and engagement trends to the overall impact on your website growth and visibility.",
            // Placeholder image simulating a futuristic graph
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        },
        {
            title: "Real-Time Interaction Tracking",
            description: "Monitor every conversation users have with your AI avatar—listen to voice interactions or review them as text for deeper insights.",
            // Image simulating waveforms/audio
            image: "https://images.unsplash.com/photo-1595598237436-bf64a3bf18cd?q=80&w=870?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        },
        {
            title: "Conversation Intelligence",
            description: "Understand user intent, behavior patterns, and interaction quality to continuously improve engagement and outcomes.",
            // Image simulating neural networks/nodes
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        },
        {
            title: "Lead Management, Simplified",
            description: "Access all captured leads in one place with complete details—name, contact information, and intent level—ready for immediate action.",
            // Image simulating CRM/profiles
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        },
        {
            title: "Visual Analytics & Reports",
            description: "View performance through clean graphs and dashboards—track traffic, conversations, and conversions with clarity.",
            // Image simulating charts
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        },
        {
            title: "Instant Action & Follow Ups",
            description: "Initiate calls, respond to leads, and take action directly from the dashboard—no switching between tools.",
            // Image simulating fast action/communication
            image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3"
        }
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-background">
            {/* Background ambient lighting */}
            <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <AnimateOnScroll className="mb-20 max-w-4xl">
                    <p className="text-sm font-bold tracking-widest uppercase mb-4 text-primary">
                        ANALYTICS & TRACKING
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-5xl font-semibold mb-6 text-foreground tracking-tight leading-tight">
                        See What's Really Happening on <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
                            Your Website
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                        From visitor activity to real conversations and leads—get a clear, real-time view of everything happening on your website.
                    </p>
                </AnimateOnScroll>

                {/* 3-Column Card Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex flex-col rounded-3xl overflow-hidden glass-card border border-white/10 dark:border-white/5 bg-background/40 hover:bg-background/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 group"
                        >
                            {/* Image Container with Floating Animation */}
                            <div className="relative h-56 md:h-64 w-full bg-muted/50 overflow-hidden flex items-center justify-center p-6">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 z-10 pointer-events-none" />

                                <motion.img
                                    animate={{
                                        y: [0, -8, 0],
                                    }}
                                    transition={{
                                        duration: 4 + (idx % 3), // Stagger the floating math slightly
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover rounded-xl shadow-lg border border-white/10 relative z-0 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-[15px]">
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
