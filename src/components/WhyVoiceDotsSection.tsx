import React from 'react';
import { CheckCircle2, Mic, Volume2 } from 'lucide-react';

export function WhyVoiceDotsSection() {
  const benefits = [
    '24/7 Availability - Never miss a lead',
    'Instant Response Time',
    'Multilingual Support (50+ Languages)',
    'Seamless CRM Integration',
    'Customizable Voice Personas',
    'Detailed Analytics & Insights',
    'GDPR & HIPAA Compliant',
    'No-Code Setup',
  ];

  return (
    <section className="min-h-screen pt-16 pb-16 px-4 bg-muted/40 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Why Choose <span className="text-primary">VoiceDots?</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                In a world where speed matters, VoiceDots gives your business the
                competitive edge. Replace static forms with dynamic, engaging
                voice conversations that convert.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <AnimateOnScroll key={index} delay={index * 0.04}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative glass-card p-8 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-primary/10 animate-pulse" />
                  <div
                    className="absolute w-48 h-48 rounded-full border border-primary/20 animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <div
                    className="absolute w-32 h-32 rounded-full border border-primary/30 animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center py-8">
                  <div className="relative mb-8">
                    <div className="absolute -inset-8 bg-primary/10 rounded-full animate-ping opacity-50" />
                    <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse" />

                    <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-violet-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(124,77,255,0.5)]">
                      <Mic className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 h-16 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-primary to-violet-400 rounded-full animate-pulse"
                        style={{
                          height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}px`,
                          animationDuration: `${0.3 + Math.random() * 0.4}s`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-primary mb-4">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">AI Voice Active</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 w-full mt-4">
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-green-500">
                        +45%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Conversion
                      </div>
                    </div>
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-blue-500">
                        4.9/5
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rating
                      </div>
                    </div>
                    <div className="text-center p-3 glass rounded-xl">
                      <div className="text-2xl font-bold text-primary">
                        &lt;1s
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Response
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
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
