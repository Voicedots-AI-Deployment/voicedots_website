import { useRef } from 'react';
import {
  ShoppingCart,
  HeartPulse,
  Cpu,
  BookOpen,
  Home,
  Globe,
  // ArrowRight,
  // Headset,
  Briefcase
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

export function WhoCanUseSection() {
  const industries = [
    {
      name: 'Educational Institutions',
      icon: BookOpen,
      image: 'https://plus.unsplash.com/premium_photo-1733353256078-54e117018245?auto=format&fit=crop&w=800&q=80',
      desc: 'Automate student admissions, course inquiries, and fee reminders.',
      metrics: [
        { value: '40% ↑', label: 'Enrollment' },
        { value: '24/7', label: 'Student Support' }
      ]
    },
    {
      name: 'Jewellery Stores',
      icon: ShoppingCart,
      image: 'https://images.unsplash.com/photo-1650389236412-e7413cbcf2fe?auto=format&fit=crop&w=800&q=80',
      desc: 'Handle appointment bookings for exclusive viewings and gold scheme inquiries.',
      metrics: [
        { value: '25% ↑', label: 'Store Visits' },
        { value: '3x', label: 'Faster Bookings' }
      ]
    },
    {
      name: 'Real Estate',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      desc: 'Qualify property buyers instantly and schedule site visits automatically.',
      metrics: [
        { value: '3x ↑', label: 'Site Visits' },
        { value: '60k+', label: 'Leads Processed' }
      ]
    },
    {
      name: 'Healthcare',
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
      desc: 'Manage patient appointments, post-care follow-ups, and clinic FAQs.',
      metrics: [
        { value: '45% ↓', label: 'No-Shows' },
        { value: '50% ↑', label: 'Patient Retention' }
      ]
    },
    {
      name: 'Manufacturing',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      desc: 'Streamline vendor communications, order status, and dispatch updates.',
      metrics: [
        { value: '30% ↓', label: 'Support Costs' },
        { value: '1.5x', label: 'Supply Efficiency' }
      ]
    },
    {
      name: 'Travel Agencies',
      icon: Globe,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      desc: 'Provide instant itinerary details, booking confirmations, and vacation deals.',
      metrics: [
        { value: '1.8x ↑', label: 'Package Sales' },
        { value: '89%', label: 'Self-Serve Rate' }
      ]
    },
    {
      name: 'Retail & E-commerce',
      icon: ShoppingCart,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      desc: 'Drive repeat purchases with voice-activated reordering and order tracking.',
      metrics: [
        { value: '35% ↑', label: 'Repeat Orders' },
        { value: '90%', label: 'Query Deflection' }
      ]
    },
    {
      name: 'SaaS / B2B',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      desc: 'Automate initial sales qualifying calls and book high-intent meetings.',
      metrics: [
        { value: '2.5x ↑', label: 'Meetings Booked' },
        { value: '4x', label: 'Lower CAC' }
      ]
    },
    {
      name: 'Finance & Insurance',
      icon: Briefcase, // Note: might want to add Shield or Landmark, but Briefcase works for Finance.
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
      desc: 'Assist with policy renewals, premium reminders, and secure balance checks.',
      metrics: [
        { value: '60% ↑', label: 'Policy Renewals' },
        { value: '95%', label: 'Compliance' }
      ]
    }
  ];

  return (
    <section className="py-16 overflow-hidden relative" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 mb-16 relative z-10">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              VoiceDots adapts seamlessly wherever conversations matter, delivering measurable impact from day one.
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden group">

        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />

        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap gap-6 py-4 px-3">
          {industries.map((item, index) => (
            <div
              key={index}
              className="
                relative shrink-0 w-[320px] md:w-[400px] h-[480px] rounded-[32px] overflow-hidden group/card
                shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-500
              "
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/card:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              {/* Dark Gradient Overlay for text readability (matches VoiceDots purple theme) */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/95 via-violet-900/60 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-between whitespace-normal h-full">

                {/* Header (Icon + Title) */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl tracking-tight drop-shadow-md">
                    {item.name}
                  </h3>
                </div>

                {/* Content at Bottom */}
                <div className="mt-auto z-10 space-y-6">
                  {/* Description Box */}
                  <div className="relative">
                    <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed drop-shadow-md before:content-[''] before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-1 before:bg-primary before:rounded-full pl-0">
                      {item.desc}
                    </p>
                  </div>

                  {/* Subtle divider */}
                  <div className="h-px w-full bg-white/20" />

                  {/* Metrics Grid */}
                  <div className="flex justify-between items-end">
                    {item.metrics.map((metric, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
                          {metric.value}
                        </span>
                        <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Read Story Link */}
                  <div className="absolute bottom-6 right-8 opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                    {/* <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                      <ArrowRight className="w-5 h-5" />
                    </div> */}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Minimal Animated Wrapper
interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function AnimateOnScroll({ children, delay = 0, className = "" }: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
