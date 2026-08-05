import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'VoiceDots increased our lead conversion by 40% in the first month. The voice quality is indistinguishable from a human.',
      author: 'Sarah Jenkins',
      role: 'Marketing Director, TechFlow',
    },
    {
      quote:
        'Setup was incredibly easy. We just pasted the snippet and our AI agent was live. Our support team loves it.',
      author: 'Michael Chen',
      role: 'CTO, StartUp Inc',
    },
    {
      quote:
        'The multilingual support is a game changer for our global customers. Highly recommended!',
      author: 'Elena Rodriguez',
      role: 'Head of Sales, GlobalSoft',
    },
  ];

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="py-16 px-4 bg-muted/40 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 0.08}>
              <div className="h-full flex flex-col glass-card rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />

                <p className="text-muted-foreground leading-relaxed mb-8 relative z-10">
                  “{item.quote}”
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center font-bold text-primary-foreground shadow-[0_0_20px_rgba(124,77,255,0.4)]">
                    {getInitials(item.author)}
                  </div>

                  <div>
                    <div className="font-semibold">{item.author}</div>
                    <div className="text-sm text-primary">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
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
