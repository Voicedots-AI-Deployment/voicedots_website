import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BusinessImpactSection() {
    const [activeTab, setActiveTab] = useState<'internal' | 'outbound' | 'inbound'>('internal');

    // We map the user's requested data to the different tabs to make the UI interactive
    // like the reference image, while still including all the requested data.
    const tabData = {
        internal: [
            {
                metric: "90%",
                symbol: "↓",
                title: "Reduced Support Dependency",
                description: "Most customer queries are resolved instantly by AI avatars, significantly lowering reliance on support teams."
            },
            {
                metric: "100%",
                symbol: "",
                title: "Automation of Repetitive Workflows",
                description: "From FAQs to onboarding journeys—routine processes run seamlessly without manual intervention."
            },
            {
                metric: "99%",
                symbol: "+",
                title: "Precision in Every Interaction",
                description: "Deliver consistent, accurate, and context-aware responses across every conversation and touchpoint."
            }
        ],
        outbound: [
            {
                metric: "3–4X",
                symbol: "↑",
                title: "Higher Lead Qualification Quality",
                description: "Identify, filter, and prioritize high-intent prospects in real time—so your team focuses only on opportunities that matter."
            },
            {
                metric: "0",
                symbol: "Missed Leads",
                title: "Always-On Engagement Engine",
                description: "Every visitor is engaged instantly, regardless of time, traffic, or volume—ensuring no opportunity slips through."
            }
        ],
        inbound: [
            {
                metric: "90%",
                symbol: "↓",
                title: "Reduced Support Dependency",
                description: "Most customer queries are resolved instantly by AI avatars, significantly lowering reliance on support teams."
            },
            {
                metric: "100%",
                symbol: "",
                title: "Automation of Repetitive Workflows",
                description: "From FAQs to onboarding journeys—routine processes run seamlessly without manual intervention."
            }
        ]
    };

    return (
        <section className="py-20 px-4 bg-background relative overflow-hidden border-t border-border">
            {/* Subtle modern radial gradient matching VoiceDots theme */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--wave-1),transparent_50%)] pointer-events-none opacity-40 dark:opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--wave-2),transparent_50%)] pointer-events-none opacity-40 dark:opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Area */}
                <AnimateOnScroll>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="flex items-center gap-4">
                            {/* Primary accent line */}
                            <div className="w-1.5 h-10 bg-primary rounded-full" />
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                                Business Impact <span className="text-muted-foreground">(ROI)</span>
                            </h2>
                        </div>

                        <div className="max-w-md text-muted-foreground text-sm md:text-base leading-relaxed">
                            Today's businesses don't just adopt AI—they expect it to deliver measurable impact from day one. Voicedots is built to directly influence your bottom line—by cutting operational costs, accelerating decision-making, and unlocking new revenue opportunities.
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* Tab Selector */}
                <AnimateOnScroll delay={0.1}>
                    <div className="inline-flex items-center p-1.5 bg-muted/50 rounded-full border border-border mb-20 backdrop-blur-sm">
                        {(['internal', 'outbound', 'inbound'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                  px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300
                  ${activeTab === tab
                                        ? 'bg-background text-foreground shadow-sm border border-border/50'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80'
                                    }
                `}
                            >
                                {tab === 'internal' ? 'INTERNAL WORKFLOWS' : tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </AnimateOnScroll>

                {/* Metrics Grid */}
                <AnimateOnScroll delay={0.2}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-24 min-h-[220px]">
                        {tabData[activeTab].map((item, index) => (
                            <div
                                key={`${activeTab}-${index}`}
                                className="relative pl-6 border-l border-border animate-in fade-in slide-in-from-bottom-4 duration-700"
                                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                            >
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-5xl md:text-6xl font-medium text-primary tracking-tighter">
                                        {item.metric}
                                    </span>
                                    {item.symbol && (
                                        <span className="text-xl md:text-2xl font-semibold text-primary">
                                            {item.symbol}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-medium text-foreground mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </AnimateOnScroll>

                {/* CTA Button */}
                <AnimateOnScroll delay={0.3}>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-primary/20"
                    >
                        SCHEDULE A CUSTOM DEMO
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </AnimateOnScroll>

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
