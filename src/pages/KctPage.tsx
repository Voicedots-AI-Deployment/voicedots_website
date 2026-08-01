import { useEffect, useState } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Users, Map, Clock, Globe2, ShieldCheck, Zap,
  MessageSquare, ChevronRight, ChevronDown, Menu, X, Phone, Mail, MapPin,
  Mic, Building2, FlaskConical, Cpu, Award, Star, ArrowRight,
  BarChart3, Lightbulb, Target, Heart,
} from "lucide-react";

/**
 * Client demo page: Kumaraguru College of Technology (voicedots.io/kct).
 * Premium landing page showcasing Voicedots AI integration with KCT.
 * Hidden route — not linked from the main Voicedots navigation.
 */

/* ───────── BRAND PALETTE ───────── */
const C = {
  navy:     "#0c2340",
  navyDark: "#071628",
  blue:     "#1a5faa",
  blueLight:"#2d7dd2",
  gold:     "#d4a843",
  goldLight:"#f0d48a",
  white:    "#ffffff",
  slate50:  "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
};

/* ───────── DATA ───────── */
const NAV = ["About", "Academics", "Admissions", "Research", "Placements", "Campus Life"];

const AUDIENCES = [
  { icon: Users,         color: "#3b82f6", name: "Parents",   tagline: "Get updates anytime.",         desc: "Stay informed about your child's progress, events, exam schedules, and campus news — all through a simple conversation." },
  { icon: GraduationCap, color: "#8b5cf6", name: "Students",  tagline: "Ask doubts. Get answers.",     desc: "Access academic resources, check schedules, find study materials, and resolve queries 24/7 without waiting in queues." },
  { icon: BookOpen,      color: "#06b6d4", name: "Faculties",  tagline: "Share info. Simplify tasks.", desc: "Streamline administrative tasks, share announcements, and let AI handle routine queries so you can focus on teaching." },
  { icon: Map,           color: "#f59e0b", name: "Visitors",  tagline: "Find info. Navigate easily.",   desc: "Get instant campus navigation, department directions, event details, and visitor guidelines without asking around." },
];

const FEATURES = [
  { icon: Clock,       name: "24/7 Smart Support",                   desc: "Always-on AI assistant that never sleeps — ready to help day or night, weekdays and weekends." },
  { icon: Globe2,      name: "Multi-language Conversations",         desc: "Communicate in Tamil, Hindi, English, or any language you're comfortable with — Kumaraguru AI understands all." },
  { icon: ShieldCheck, name: "Secure & Connected Campus Systems",    desc: "Safely integrated with KCT's infrastructure — your data is encrypted and never shared outside." },
  { icon: BarChart3,   name: "Real-time Information & Updates",      desc: "Live data from the campus — exam results, event updates, placement drives, and more in real time." },
  { icon: Lightbulb,   name: "One AI for Everyone. Always Here.",    desc: "A single intelligent assistant serving every stakeholder on campus — students, parents, faculty, and visitors." },
];

const DEPARTMENTS = [
  { icon: Cpu,          name: "Computer Science & Engineering",  programs: "B.E., M.E., Ph.D." },
  { icon: FlaskConical, name: "Electronics & Communication",     programs: "B.E., M.E." },
  { icon: Building2,    name: "Mechanical Engineering",           programs: "B.E., M.E., Ph.D." },
  { icon: Lightbulb,    name: "Artificial Intelligence & DS",     programs: "B.Tech., M.Tech." },
  { icon: Target,       name: "Information Technology",           programs: "B.Tech., M.Tech." },
  { icon: FlaskConical, name: "Biotechnology",                    programs: "B.Tech., M.Tech., Ph.D." },
];

const STATS = [
  { value: "37+",     label: "Years of Excellence" },
  { value: "10,000+", label: "Students on Campus" },
  { value: "500+",    label: "Recruiting Companies" },
  { value: "98%",     label: "Placement Rate" },
  { value: "150+",    label: "Faculty Members" },
  { value: "50+",     label: "Research Labs" },
];

const TESTIMONIALS = [
  { name: "Priya R.", role: "Parent", quote: "I can check my daughter's schedule and campus events instantly without calling anyone. Kumaraguru AI is truly a game changer for parents." },
  { name: "Karthik S.", role: "B.E. CSE, 3rd Year", quote: "Asking doubts at 2 AM during exam prep and getting instant answers? This is what every college should have." },
  { name: "Dr. Meena K.", role: "Faculty, ECE Dept.", quote: "I used to spend hours answering the same questions. Now the AI handles routine queries and I can focus on research." },
];

/* ───────── COMPONENT ───────── */
export default function KctPage() {
  const { openWidget } = useDemoWidget();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    openWidget("Kumaraguru College of Technology");
    window.scrollTo(0, 0);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden">

      {/* ═══════ TOP BAR ═══════ */}
      <div style={{ background: C.navyDark }} className="text-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          <span className="truncate">🎓 Admissions Open 2026 · UG & PG Programs · Apply Now</span>
          <span className="hidden md:flex items-center gap-5 shrink-0 text-white/60">
            <a href="tel:+914222661100" className="inline-flex items-center gap-1.5 hover:text-white transition"><Phone size={11} /> +91 422 266 1100</a>
            <a href="mailto:info@kct.ac.in" className="inline-flex items-center gap-1.5 hover:text-white transition"><Mail size={11} /> info@kct.ac.in</a>
          </span>
        </div>
      </div>

      {/* ═══════ NAVIGATION ═══════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-md bg-white/95" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-sm border"
              style={{ background: C.navy, color: C.goldLight, borderColor: C.gold + "40" }}
            >
              KCT
            </div>
            <div className="leading-tight hidden sm:block">
              <div className="font-bold text-sm" style={{ color: C.navy }}>Kumaraguru College of Technology</div>
              <div className="text-[10px] tracking-wide" style={{ color: C.slate500 }}>Character is Life · Estd. 1984</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n} href="#" className="text-sm font-medium transition-colors hover:text-blue-600" style={{ color: C.slate600 }}>{n}</a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className="text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
              style={{ background: C.navy, color: C.white }}
            >
              Apply Now
            </button>
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} style={{ color: C.navy }} /> : <Menu size={22} style={{ color: C.navy }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t overflow-hidden" style={{ borderColor: C.slate200 }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV.map((n) => (
                  <a key={n} href="#" className="py-2.5 text-sm font-medium" style={{ color: C.slate700 }}>{n}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDark} 55%, #0e2d5a 100%)` }}>
        {/* Decorative orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ background: `radial-gradient(circle, ${C.blueLight}, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${C.gold}, transparent 70%)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-widest uppercase text-white/80 mb-8 backdrop-blur-sm">
                <Zap size={13} className="text-yellow-400" />
                <span>Voicedots AI × KCT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.12] text-white mb-6">
                Meet <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})` }}>Kumaraguru AI</span>
                <br />Your Campus, Now Smarter.
              </h1>

              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
                Parents, Students, Faculties and Visitors can talk to <strong className="text-white/90">Kumaraguru AI</strong> instantly in <strong className="text-white/90">any language</strong>. One AI. Endless Conversations. Smarter Campus.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="group flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  style={{ background: C.gold, color: C.navyDark }}
                >
                  <Mic size={18} /> Talk to Kumaraguru AI
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border border-white/25 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm">
                  Explore Campus
                </button>
              </div>
            </motion.div>

            {/* Right — AI visual */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:flex justify-center">
              <div className="relative">
                {/* Animated rings */}
                <div className="absolute inset-0 w-80 h-80 rounded-full border border-blue-400/15 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-6 rounded-full border border-purple-400/15 animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute inset-12 rounded-full border border-cyan-400/10 animate-[spin_15s_linear_infinite]" />

                {/* Central card */}
                <div className="relative w-80 h-80 rounded-3xl bg-white/[0.06] backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-2xl">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg" style={{ background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})` }}>
                    <MessageSquare size={38} className="text-white" />
                  </div>
                  <div className="text-white/90 text-lg font-semibold mb-1">Hello! I am</div>
                  <div className="text-2xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})` }}>
                    Kumaraguru AI
                  </div>
                  <div className="text-white/50 text-sm mt-2">How can I help you today?</div>

                  {/* Floating badges */}
                  <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-3 -left-3 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Globe2 size={10} /> Multi-lang
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <svg className="w-full -mb-1" viewBox="0 0 1440 80" fill="none"><path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 40V80H0V40Z" fill={C.white} /></svg>
      </section>


      {/* ═══════ STATS BAR ═══════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="text-center py-4"
              >
                <div className="text-3xl md:text-4xl font-extrabold" style={{ color: C.navy }}>{s.value}</div>
                <div className="text-xs font-medium mt-1" style={{ color: C.slate500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ WHO CAN USE — AUDIENCE CARDS ═══════ */}
      <section id="audiences" className="py-20 md:py-28" style={{ background: C.slate50 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: C.blue + "12", color: C.blue }}>
              For Everyone
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.navy }}>
              One AI for the Entire Campus
            </h2>
            <p className="text-lg" style={{ color: C.slate500 }}>
              Kumaraguru AI serves every stakeholder — delivering instant, personalized support in any language.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDIENCES.map((aud, i) => (
              <motion.div
                key={aud.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                  style={{ background: aud.color + "14", color: aud.color }}
                >
                  <aud.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: C.navy }}>{aud.name}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: aud.color }}>{aud.tagline}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.slate500 }}>{aud.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* BG pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0c2340 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: C.gold + "18", color: C.gold }}>
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.navy }}>
              Talk. Ask. Done.
            </h2>
            <p className="text-lg" style={{ color: C.slate500 }}>Three simple steps to get any information from your campus.</p>
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
                {/* Connector line */}
                {i < 2 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed" style={{ borderColor: C.slate200 }} />}

                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md relative z-10" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.blue})` }}>
                  <item.icon size={32} className="text-white" />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: C.gold }}>STEP {item.step}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: C.navy }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.slate500 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ FEATURES GRID ═══════ */}
      <section className="py-20 md:py-28" style={{ background: `linear-gradient(180deg, ${C.slate50} 0%, ${C.white} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: C.blue + "12", color: C.blue }}>
              Smart Campus
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.navy }}>
              Smarter Campus Features
            </h2>
            <p className="text-lg" style={{ color: C.slate500 }}>
              Everything you need for an AI-powered educational experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-sm" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.blue})` }}>
                  <f.icon size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: C.navy }}>{f.name}</h4>
                <p className="text-sm leading-relaxed" style={{ color: C.slate500 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ DEPARTMENTS ═══════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: C.gold + "18", color: "#b8860b" }}>
              Academics
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.navy }}>
              Departments & Programs
            </h2>
            <p className="text-lg" style={{ color: C.slate500 }}>
              Explore world-class departments with cutting-edge curricula. Ask Kumaraguru AI for details about any program.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start gap-4 bg-white rounded-xl p-6 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.navy + "0d", color: C.navy }}>
                  <d.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 group-hover:text-blue-700 transition-colors" style={{ color: C.navy }}>{d.name}</h4>
                  <p className="text-xs font-medium" style={{ color: C.slate500 }}>{d.programs}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ ABOUT KCT ═══════ */}
      <section className="py-20 md:py-28" style={{ background: C.slate50 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: C.blue + "12", color: C.blue }}>
                About KCT
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6" style={{ color: C.navy }}>
                37 Years of Shaping Tomorrow's Leaders
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: C.slate600 }}>
                Kumaraguru College of Technology, established in 1984 by Ramanandha Adigalar Foundation, Coimbatore, is an
                Autonomous institution affiliated to Anna University. Accredited by NAAC with 'A++' grade,
                KCT stands as one of South India's premier engineering institutions.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: C.slate600 }}>
                With a sprawling 150-acre green campus, state-of-the-art labs, internationally collaborated research centres,
                and a 98% placement rate — KCT continues to innovate in both education and technology. Now, with Voicedots AI,
                the campus is smarter than ever.
              </p>
              <ul className="space-y-3">
                {["NAAC A++ Accredited", "NBA Accredited Programs", "NIRF Ranked Institution", "Industry-Academia Partnerships", "International Research Collaborations"].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm font-medium" style={{ color: C.slate700 }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: C.blue + "15", color: C.blue }}>
                      <ChevronRight size={12} />
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { n: "Vision", t: "To be a globally recognized institution nurturing innovative leaders." },
                { n: "Mission", t: "To impart quality education with ethical values and social commitment." },
                { n: "Values", t: "Character, Competence, Commitment, and Community service." },
                { n: "AI Campus", t: "Powered by Voicedots — making every interaction smarter." },
              ].map((card, i) => (
                <div
                  key={card.n}
                  className={`rounded-2xl p-6 flex flex-col justify-end min-h-[180px] ${i === 3 ? 'col-span-2' : ''}`}
                  style={{ background: i === 3 ? `linear-gradient(135deg, ${C.navy}, ${C.blue})` : C.navy, color: C.white }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: C.gold + "30" }}>
                    {i === 0 ? <Star size={16} style={{ color: C.goldLight }} /> :
                     i === 1 ? <Target size={16} style={{ color: C.goldLight }} /> :
                     i === 2 ? <Heart size={16} style={{ color: C.goldLight }} /> :
                     <Zap size={16} style={{ color: C.goldLight }} />}
                  </div>
                  <div className="font-bold text-lg mb-1">{card.n}</div>
                  <div className="text-xs text-white/70 leading-relaxed">{card.t}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: C.blue + "12", color: C.blue }}>
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: C.navy }}>
              What People Are Saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} fill={C.gold} stroke={C.gold} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: C.slate600 }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: C.navy, color: C.goldLight }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: C.navy }}>{t.name}</div>
                    <div className="text-xs" style={{ color: C.slate500 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════ CTA BANNER ═══════ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyDark} 100%)` }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              One AI. Endless Conversations.
              <br /><span style={{ color: C.goldLight }}>Smarter Campus.</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
              Experience the future of campus communication. Talk to Kumaraguru AI right now — it's live on this page!
            </p>
            <button
              className="group inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03]"
              style={{ background: C.gold, color: C.navyDark }}
            >
              <Mic size={20} /> Start a Conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>


      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: C.navyDark }} className="text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs" style={{ background: C.navy, color: C.goldLight, border: `1px solid ${C.gold}30` }}>KCT</div>
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
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: C.gold }} />
                <span>Saravanampatti, Coimbatore,<br />Tamil Nadu 641049</span>
              </div>
              <div className="flex items-center gap-2.5"><Phone size={14} style={{ color: C.gold }} /> +91 422 266 1100</div>
              <div className="flex items-center gap-2.5"><Mail size={14} style={{ color: C.gold }} /> info@kct.ac.in</div>
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
