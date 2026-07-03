import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlobalMeshBackground } from './GlobalMeshBackground';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-12 overflow-hidden"
      style={{
        backgroundImage: 'var(--page-gradient)',
        fontFamily: '"Inter", sans-serif'
      }}
    >

      {/* Global Voice Gradient Background for Hero Section only (Light mode only) */}
      <div className="absolute inset-0 z-0 dark:hidden">
        <GlobalMeshBackground />
      </div>

      {/* Global Voice Gradient Background */}
      <div className="voice-gradient-bg" />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">

        {/* 🎵 Voice Waveform */}
        <div className="flex items-center justify-center gap-1 h-12 mb-4">
          {[2, 3, 4, 6, 8, 10, 12, 10, 8, 6, 4, 3].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-violet-400 to-purple-600"
              style={{
                height: `${h * 4}px`,
                animation: 'wave 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.08}s`,
                opacity: 0.9,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h1
          className="
            text-6xl md:text-8xl font-bold tracking-tighter mb-6
            text-transparent bg-clip-text
            bg-gradient-to-b
            from-foreground to-foreground/60
          "
        >
          <img
            src="/voicedotslogo.svg"
            alt="V"
            className="h-[1.1em] w-auto inline-block align-middle -translate-y-[0.1em] mr-[-0.3em] filter drop-shadow-[0_0_4px_rgba(139,92,246,0.5)]"
          />oiceDots
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Let Your Website Talk –{' '}
          <span className="text-primary font-semibold">Literally</span>.
          <br />
          <span className="block mt-4 text-base md:text-lg">
            AI-Powered Avatar Voicebots that answer, assist, and convert — even while you sleep.
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Primary CTA */}
          <Link
            to="/try-now"
            className="
              group relative overflow-hidden inline-flex items-center gap-2
              px-8 py-4 rounded-full font-bold text-lg
              bg-gradient-to-r from-primary to-purple-600 text-white
              border border-white/20
              shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)]
              hover:shadow-[0_20px_40px_-10px_rgba(124,58,237,0.8)]
              hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* Premium Shine Effect */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out" />

            <span className="relative z-10">Try Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2" strokeWidth={2.5} />
          </Link>

          {/* Secondary CTA */}
          <Link
            to="/try-on-website"
            className="
              group relative overflow-hidden inline-flex items-center gap-2
              px-8 py-4 rounded-full font-bold text-lg
              bg-background/40 backdrop-blur-xl
              border border-violet-300/50 dark:border-white/10
              text-foreground
              hover:border-primary/50
              shadow-sm hover:shadow-[0_10px_40px_-15px_rgba(124,58,237,0.4)]
              transition-all duration-300
            "
          >
            {/* Sliding background fill */}
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

            <Play className="w-5 h-5 fill-current text-primary relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" />
            <span className="relative z-10">
              Try on Your Website
            </span>
          </Link>
        </div>

        {/* Trust Badge */}
        <div
          className="
            mt-16 inline-flex items-center gap-2
            px-4 py-2 rounded-full
            glass-card
            border-violet-200 dark:border-white/10
          "
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Powering next-gen web experiences.
          </span>
        </div>
      </div>

      {/* Smooth Transition to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
