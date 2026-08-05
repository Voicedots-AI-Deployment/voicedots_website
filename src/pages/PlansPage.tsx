import { useState } from 'react';
import { Clock, Plane, Shield, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalMeshBackground } from '@/components/GlobalMeshBackground';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Launch',
    icon: Clock,
    tagline: 'For Innovators Exploring AI Voice Technology',
    features: [
      'Commercial License',
      'Instant Voice Cloning',
      '20 Studio Projects',
      '30 min Text-to-Speech',
      '50 min Conversational AI',
    ],
    highlighted: false,
  },
  {
    name: 'Ascend',
    icon: Plane,
    tagline: 'For Making Premium, Scalable Content',
    features: [
      'Professional Voice Cloning',
      'Up to 192 kbps Audio',
      'Usage-Based Billing',
      '100 min Text-to-Speech',
      '250 min Conversational AI',
    ],
    highlighted: true,
  },
  {
    name: 'Command',
    icon: Shield,
    tagline: 'For Rapidly Scaling Brands & Enterprises',
    features: [
      'Full Customization',
      'API & Integrations',
      'Low-Latency TTS',
      '3 Voice Clones',
      'Enterprise Scale Usage',
    ],
    highlighted: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

export function PlansPage() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Determine which plan is functionally active based on hover or highlight status
  const getIsActive = (index: number, highlighted: boolean) => {
    if (hoveredIndex !== null) return hoveredIndex === index;
    return highlighted;
  };

  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-4 relative overflow-hidden bg-background">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 dark:hidden opacity-60">
        <GlobalMeshBackground />
      </div>

      {/* Additional ambient glows for deep aesthetic */}
      <div className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-primary">
            Pricing Plans
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Plan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent pricing that scales effortlessly with your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center"
        >
          {plans.map((plan, index) => {
            const isActive = getIsActive(index, plan.highlighted);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                className="relative"
              >
                {/* 
                  The center recommended card is typically taller or scaled slightly for emphasis 
                  We scale it via CSS transform to pop out
                */}
                <div
                  className={`
                    relative flex flex-col rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 overflow-hidden
                    ${isActive ? 'md:scale-105 z-10' : 'z-0'}
                    ${isActive
                      ? 'glass-card border-primary/40 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.3)] bg-background/60 backdrop-blur-2xl -translate-y-2'
                      : 'glass-card border-white/20 dark:border-white/5 bg-background/40 backdrop-blur-xl hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Internal Glow for active card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/[0.04] dark:from-primary/[0.08] to-transparent pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Gradient Border Glow for the dynamically active card */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent p-[2px] pointer-events-none [mask-image:linear-gradient(to_bottom,white,white)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary before:to-transparent before:-z-10 before:-m-[2px] before:rounded-[2.5rem]" />
                  )}

                  {/* Most Popular Badge */}
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-400 text-white text-xs font-bold px-4 py-1.5 rounded-b-xl shadow-lg flex items-center gap-1.5 z-20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Most Popular
                    </div>
                  )}

                  {/* Icon Block */}
                  <div
                    className={`
                      w-16 h-16 mb-6 rounded-2xl flex items-center justify-center transition-all duration-500 z-10
                      ${isActive ? 'bg-primary shadow-[0_0_20px_rgba(124,58,237,0.4)] scale-110' : 'bg-primary/10 border border-primary/20'}
                    `}
                  >
                    <plan.icon className={`w-8 h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-primary'}`} strokeWidth={isActive ? 2 : 1.5} />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-foreground z-10">
                    {plan.name}
                  </h2>

                  <p className="text-sm font-medium text-primary mb-8 z-10 min-h-[40px]">
                    {plan.tagline}
                  </p>

                  <div className="flex-1 space-y-4 mb-10 z-10">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-4 text-base transition-colors duration-300 ${isActive ? 'text-foreground/90' : 'text-muted-foreground'}`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-primary/20' : 'bg-primary/10'}`}>
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/contact')}
                    className={`
                      relative w-full h-14 rounded-2xl text-base font-bold transition-all duration-300 z-10 overflow-hidden
                      ${isActive
                        ? 'bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)]'
                        : 'bg-muted/80 text-foreground hover:bg-muted border border-border/50'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-[150%] animate-[shimmer_2s_infinite]" />
                    )}
                    GET STARTED
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
