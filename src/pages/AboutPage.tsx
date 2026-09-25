import { ArrowRight, Mic2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AboutSection } from '@/components/AboutSection';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 text-center">
        <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Mic2 size={28} />
          </div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">About VoiceDots</p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Conversations that help businesses move forward
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            VoiceDots builds AI voice experiences that help people get answers, complete tasks, and connect with organizations through natural conversation.
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90">
            Talk with our team <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <AboutSection />
    </div>
  );
}
