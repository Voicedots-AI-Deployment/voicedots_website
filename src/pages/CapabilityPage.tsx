import { ArrowLeft, ArrowRight, Headphones, PhoneCall, Send, UserCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

const capabilityDetails = {
  'inbound-calls': {
    title: 'Inbound Calls',
    eyebrow: 'AI voice support',
    description: 'Give callers a natural way to ask questions and get help. Voice assistants can respond to common requests and guide callers to the next step.',
    points: ['Answer common questions through conversation', 'Guide callers to relevant information', 'Offer a clear path to your team when needed'],
    icon: PhoneCall,
  },
  'outbound-campaigns': {
    title: 'Outbound Campaigns',
    eyebrow: 'Proactive conversations',
    description: 'Reach people with conversational voice campaigns for follow-ups, reminders, and other customer communications.',
    points: ['Start timely follow-up conversations', 'Share reminders and useful updates', 'Capture responses for your team to review'],
    icon: Send,
  },
  'lead-qualification': {
    title: 'Lead Qualification',
    eyebrow: 'Understand customer needs',
    description: 'Use a guided voice conversation to understand what a prospect is looking for and collect the details your team needs for follow-up.',
    points: ['Ask relevant questions in a natural order', 'Collect prospect details during the conversation', 'Help your team prioritize follow-up'],
    icon: UserCheck,
  },
  '24-7-support': {
    title: '24/7 Support',
    eyebrow: 'Help whenever it is needed',
    description: 'Make helpful voice assistance available beyond business hours, so people can find answers and next steps when your team is away.',
    points: ['Provide answers to common questions at any time', 'Share consistent information across conversations', 'Direct requests to your team when human help is needed'],
    icon: Headphones,
  },
} as const;

export function CapabilityPage() {
  const { slug } = useParams();
  const capability = slug ? capabilityDetails[slug as keyof typeof capabilityDetails] : undefined;

  if (!capability) return <Navigate to="/" replace />;

  const Icon = capability.icon;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-16 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <article className="relative mx-auto max-w-5xl">
        <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <div className="grid gap-12 rounded-[2rem] border border-border/60 bg-card/60 p-7 shadow-xl shadow-primary/5 backdrop-blur-xl md:grid-cols-[1.2fr_0.8fr] md:p-14">
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Icon size={28} />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">{capability.eyebrow}</p>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">{capability.title}</h1>
            <p className="text-lg leading-relaxed text-muted-foreground">{capability.description}</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90">
              Discuss your use case <ArrowRight size={17} />
            </Link>
          </div>
          <div className="self-center rounded-2xl border border-border/60 bg-background/70 p-6 md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-foreground">How it can help</h2>
            <ul className="space-y-5">
              {capability.points.map((point) => (
                <li key={point} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
}
