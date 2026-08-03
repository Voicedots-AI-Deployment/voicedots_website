import { useEffect } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Users, Map, Clock, Globe2, ShieldCheck, Zap,
  MessageSquare, Mic, ArrowRight, BarChart3, Lightbulb, MapPin, Phone, Mail
} from "lucide-react";

const NAV = ["About", "Academics", "Admissions", "Research", "Placements", "Campus Life"];

const AUDIENCES = [
  { icon: Users,         color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", name: "Parents",   tagline: "Get updates anytime.",         desc: "Stay informed about your child's progress, events, exam schedules, and campus news — all through a simple conversation." },
  { icon: GraduationCap, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-900/20", name: "Students",  tagline: "Ask doubts. Get answers.",     desc: "Access academic resources, check schedules, find study materials, and resolve queries 24/7 without waiting in queues." },
  { icon: BookOpen,      color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-900/20", name: "Faculties",  tagline: "Share info. Simplify tasks.", desc: "Streamline administrative tasks, share announcements, and let AI handle routine queries so you can focus on teaching." },
  { icon: Map,           color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", name: "Visitors",  tagline: "Find info. Navigate easily.",   desc: "Get instant campus navigation, department directions, event details, and visitor guidelines without asking around." },
];

const FEATURES = [
  { icon: Clock,       name: "24/7 Smart Support",                   desc: "Always-on AI assistant that never sleeps — ready to help day or night, weekdays and weekends." },
  { icon: Globe2,      name: "Multi-language Conversations",         desc: "Communicate in Tamil, Hindi, English, or any language you're comfortable with — Kumaraguru AI understands all." },
  { icon: ShieldCheck, name: "Secure & Connected Campus Systems",    desc: "Safely integrated with KCT's infrastructure — your data is encrypted and never shared outside." },
  { icon: BarChart3,   name: "Real-time Information & Updates",      desc: "Live data from the campus — exam results, event updates, placement drives, and more in real time." },
  { icon: Lightbulb,   name: "One AI for Everyone. Always Here.",    desc: "A single intelligent assistant serving every stakeholder on campus — students, parents, faculty, and visitors." },
];



export default function KctPage() {
  const { openWidget } = useDemoWidget();

  useEffect(() => {
    openWidget("Kumaraguru College of Technology");
    window.scrollTo(0, 0);
  }, [openWidget]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans antialiased overflow-x-hidden transition-colors duration-300">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.08] dark:opacity-[0.04]" style={{ background: `radial-gradient(circle, #2d7dd2, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.03]" style={{ background: `radial-gradient(circle, #d4a843, transparent 70%)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.12] text-slate-900 dark:text-white mb-6">
                Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-blue-400 dark:to-blue-200">Kumaraguru AI</span>
                <br />Your Campus, Now Smarter.
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-lg">
                Parents, Students, Faculties and Visitors can talk to <strong className="text-slate-800 dark:text-slate-200">Kumaraguru AI</strong> instantly in <strong className="text-slate-800 dark:text-slate-200">any language</strong>. One AI. Endless Conversations. Smarter Campus.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="group flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                >
                  <Mic size={18} /> Talk to Kumaraguru AI
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <svg className="w-full -mb-1 text-white dark:text-slate-950" viewBox="0 0 1440 80" fill="none"><path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 40V80H0V40Z" fill="currentColor" /></svg>
      </section>



      {/* ═══════ WHO CAN USE — AUDIENCE CARDS ═══════ */}
      <section id="audiences" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              For Everyone
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
              One AI for the Entire Campus
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Kumaraguru AI serves every stakeholder — delivering instant, personalized support in any language.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCES.map((aud, i) => (
              <motion.div
                key={aud.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ${aud.bg} ${aud.color}`}
                >
                  <aud.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{aud.name}</h3>
                <p className={`text-sm font-semibold mb-3 ${aud.color}`}>{aud.tagline}</p>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{aud.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Talk. Ask. Done.
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">Three simple steps to get any information from your campus.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Say Hello", desc: "Open the Kumaraguru AI chat widget on the KCT website — it's always there, ready to listen.", icon: MessageSquare },
              { step: "02", title: "Ask Anything", desc: "Type or speak in any language — about admissions, schedules, departments, placements, or campus life.", icon: Mic },
              { step: "03", title: "Get Instant Answers", desc: "Receive accurate, real-time responses powered by AI trained on KCT's official campus data.", icon: Zap },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {i < 2 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-slate-200 dark:border-slate-800" />}

                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md relative z-10 bg-gradient-to-br from-slate-900 to-blue-600 dark:from-slate-800 dark:to-blue-900">
                  <item.icon size={32} className="text-white" />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2 text-amber-500">STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES GRID ═══════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              Smart Campus
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Smarter Campus Features
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Everything you need for an AI-powered educational experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-sm bg-gradient-to-br from-slate-900 to-blue-600 dark:from-slate-800 dark:to-blue-900">
                  <f.icon size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{f.name}</h4>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              One AI. Endless Conversations.
              <br /><span className="text-blue-600 dark:text-blue-400">Smarter Campus.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Experience the future of campus communication. Talk to Kumaraguru AI right now — it's live on this page!
            </p>
            <button
              className="group inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03] bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              <Mic size={20} /> Start a Conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-slate-950 dark:bg-black text-white/70 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-900 text-amber-400 border border-amber-500/30">KCT</div>
                <div>
                  <div className="font-bold text-white text-sm leading-tight">Kumaraguru College<br />of Technology</div>
                </div>
              </div>
              <p className="text-xs text-white/40 italic">Character is Life · Estd. 1984</p>
            </div>

            {/* Contact */}
            <div className="text-sm space-y-3">
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-amber-500" />
                <span>Saravanampatti, Coimbatore,<br />Tamil Nadu 641049</span>
              </div>
              <div className="flex items-center gap-2.5"><Phone size={14} className="text-amber-500" /> +91 422 266 1100</div>
              <div className="flex items-center gap-2.5"><Mail size={14} className="text-amber-500" /> info@kct.ac.in</div>
            </div>

            {/* Quick Links */}
            <div className="text-sm">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="grid grid-cols-1 gap-2 text-white/50">
                {NAV.map((n) => <a key={n} href="#" className="hover:text-white transition-colors">{n}</a>)}
              </div>
            </div>

            {/* Powered by */}
            <div className="text-sm">
              <h4 className="text-white font-semibold mb-4">AI Powered By</h4>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Zap size={14} className="text-white" />
                </div>
                <span className="font-bold text-white">VoiceDots</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Let Your Website Talk, Literally.
                <br /><a href="https://voicedots.io" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">voicedots.io</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© {new Date().getFullYear()} Kumaraguru College of Technology. All Rights Reserved.</span>
            <span>Demo experience powered by <strong className="text-white/50">VoiceDots AI</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
