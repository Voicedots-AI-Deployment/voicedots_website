import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);

      const currentCount = value * easeOut;
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const stats = [
    {
      value: 18,
      suffix: '+',
      title: 'Years',
      label: 'Of proven expertise in building scalable technology solutions',
      delay: 0
    },
    {
      value: 600,
      suffix: '+',
      title: 'Clients',
      label: 'Successfully served across industries',
      delay: 0.1
    },
    {
      prefix: '#',
      value: 1,
      suffix: '',
      title: 'in India',
      label: 'AI Avatar Voicebot development leadership',
      delay: 0.2
    },
    {
      value: 10,
      suffix: 'M+',
      title: 'Interactions',
      label: 'Handled seamlessly by our AI systems',
      delay: 0.3
    },
    {
      value: 99,
      suffix: '%',
      title: 'Accuracy',
      label: 'Reliable, consistent, and context-aware responses',
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-foreground">
              Your Trusted <span className="text-primary">AI Partner</span>
            </h1>
          </div>
        </AnimateOnScroll>

        {/* STATS GRID */}
        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 w-full text-center lg:text-left">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} delay={stat.delay}>
              <div className="flex flex-col transition-all hover:-translate-y-1 w-full">
                <div className="text-[4rem] xl:text-[4.5rem] font-bold text-primary mb-3 tracking-tighter mx-auto lg:mx-0 leading-none">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={2000 + index * 200}
                  />
                </div>
                {/* Title */}
                <div className="text-xl font-semibold text-foreground mb-2">
                  {stat.title}
                </div>
                {/* Description */}
                <div className="text-sm text-muted-foreground leading-relaxed lg:max-w-xs mx-auto lg:mx-0">
                  {stat.label}
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
