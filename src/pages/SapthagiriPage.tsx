import { useEffect } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion } from "framer-motion";
import {
  Cpu, FlaskConical, Briefcase, Stethoscope, Building2,
  Library, Trophy, MonitorSmartphone, BedDouble,
  Phone, Mail, MapPin, ChevronRight, Menu,
} from "lucide-react";

/**
 * Client demo page: Sapthagiri NPS University (voicedots.io/sapthagiri).
 * A lightweight visual mock of the client's own website (snpsu.edu.in) so the
 * demo shows how the VoiceDots widget looks embedded on THEIR site.
 * The widget itself is the global <AIDemoWidget>, switched to this client's
 * agent via openWidget("Sapthagiri NPS University").
 */

const NAVY = "#0a2a52";
const NAVY_DARK = "#071e3d";
const GOLD = "#f5a623";

const NAV = ["About SNPSU", "Admissions", "Academics", "Placements", "Campus", "Research"];

const SCHOOLS = [
  { icon: Cpu, name: "Engineering & Technology", desc: "B.E. and M.Tech programs across core and emerging branches." },
  { icon: FlaskConical, name: "Applied Sciences", desc: "BCA, MCA and science specialisations with modern labs." },
  { icon: Briefcase, name: "Management Studies", desc: "BBA, B.Com and MBA options with industry linkages." },
  { icon: Stethoscope, name: "Medicine", desc: "MBBS, MD, MS, DM and M.Ch programs at Sapthagiri Hospital." },
  { icon: Building2, name: "Sapthagiri Hospital", desc: "A teaching hospital powering clinical learning and care." },
];

const STATS = [
  { n: "100%", l: "Placement for eligible students" },
  { n: "200+", l: "Recruiters visit campus" },
  { n: "12+", l: "Global partner universities" },
  { n: "5", l: "University schools" },
];

const FACILITIES = [
  { icon: Library, name: "Library & Digital Resources" },
  { icon: Trophy, name: "Sports & Culture" },
  { icon: MonitorSmartphone, name: "Digital Classrooms" },
  { icon: BedDouble, name: "Hostel & Dining" },
];

export default function SapthagiriPage() {
  const { openWidget } = useDemoWidget();

  useEffect(() => {
    openWidget("Sapthagiri NPS University");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: NAVY_DARK }} className="text-white text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <span className="truncate">Admissions Open 2026 · UG & PG Programs · Apply before the last date</span>
          <span className="hidden md:flex items-center gap-4 shrink-0">
            <span className="inline-flex items-center gap-1"><Phone size={12} /> 9900072632</span>
            <span className="inline-flex items-center gap-1"><Mail size={12} /> admissions@snpsu.edu.in</span>
          </span>
        </div>
      </div>

      {/* NAV */}
      <header style={{ background: NAVY }} className="text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ background: GOLD }} className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#0a2a52]">S</div>
            <div className="leading-tight">
              <div className="font-bold text-sm md:text-base">Sapthagiri NPS University</div>
              <div className="text-[10px] md:text-xs text-white/70">Where Education Creates Professionals</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <a key={n} href="#" className="text-white/85 hover:text-white transition-colors">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button style={{ background: GOLD }} className="text-[#0a2a52] font-semibold text-sm px-4 py-2 rounded-md hover:brightness-95 transition">Apply Now</button>
            <Menu className="lg:hidden text-white" size={22} />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DARK} 100%)` }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span style={{ color: GOLD }} className="text-xs font-semibold tracking-widest uppercase">Sapthagiri NPS University</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-3 mb-5">
              Where Education Creates Professionals
            </h1>
            <p className="text-lg text-white/80 mb-8">
              A multidisciplinary university offering cutting-edge programs in Engineering,
              Management, Applied Sciences and Medicine — instilling deep knowledge, leadership
              and real-world skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <button style={{ background: GOLD }} className="text-[#0a2a52] font-semibold px-6 py-3 rounded-md hover:brightness-95 transition">Apply Now</button>
              <button className="border border-white/40 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition">Enquire Now</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: GOLD }} className="text-[#0a2a52]">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-extrabold">{s.n}</div>
              <div className="text-xs md:text-sm font-medium mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SCHOOLS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 style={{ color: NAVY }} className="text-3xl font-bold">Our University Schools</h2>
          <p className="text-slate-500 mt-3">Inspiring knowledge, innovation, and excellence across disciplines.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCHOOLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div style={{ background: `${NAVY}12` }} className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <s.icon size={24} style={{ color: NAVY }} />
              </div>
              <h3 className="font-semibold text-lg" style={{ color: NAVY }}>{s.name}</h3>
              <p className="text-sm text-slate-500 mt-2">{s.desc}</p>
              <a href="#" style={{ color: GOLD }} className="inline-flex items-center gap-1 text-sm font-semibold mt-4">
                Explore <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 style={{ color: NAVY }} className="text-3xl font-bold mb-4">Championing Holistic Growth</h2>
            <p className="text-slate-600 mb-6">
              Sapthagiri NPS University stands at the forefront of multidisciplinary education,
              offering programs focused on instilling deep knowledge, problem-solving skills,
              leadership, and effective communication through innovative methods.
            </p>
            <ul className="space-y-3">
              {["Campus and Infrastructure", "Industry-aligned Academic Programs", "Skill Development Linkages", "Holistic Student Development"].map((p) => (
                <li key={p} className="flex items-start gap-2 text-slate-700">
                  <ChevronRight size={18} style={{ color: GOLD }} className="mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ n: "Dr. K.P Gopalkrishna", t: "Chairman" }, { n: "Shri. G Dayananda", t: "Chancellor" }].map((l) => (
              <div key={l.n} style={{ background: NAVY }} className="text-white rounded-xl p-6 flex flex-col justify-end min-h-[180px]">
                <div style={{ background: GOLD }} className="w-12 h-12 rounded-full mb-4" />
                <div className="font-semibold">{l.n}</div>
                <div className="text-xs text-white/70">{l.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 style={{ color: NAVY }} className="text-3xl font-bold">Our Recruiters and Industry Partners</h2>
        <p className="text-slate-500 mt-3 mb-10">200+ companies visit campus every year, with 100% placement for eligible students.</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-medium">
              Recruiter
            </div>
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 style={{ color: NAVY }} className="text-3xl font-bold text-center mb-3">A Campus That Inspires Growth</h2>
          <p className="text-slate-500 text-center mb-10">Life at Sapthagiri NPS University.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FACILITIES.map((f) => (
              <div key={f.name} className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <f.icon size={28} style={{ color: GOLD }} className="mx-auto mb-3" />
                <div className="font-medium text-sm" style={{ color: NAVY }}>{f.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: NAVY_DARK }} className="text-white/80">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-bold text-white text-lg mb-2">Sapthagiri NPS University</div>
            <p className="text-sm text-white/60">Where Education Creates Professionals</p>
          </div>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2"><MapPin size={16} style={{ color: GOLD }} /> #14/5, Chikkasandra, Hesarghatta Main Road, Bengaluru</div>
            <div className="flex items-center gap-2"><Phone size={16} style={{ color: GOLD }} /> 9900072632</div>
            <div className="flex items-center gap-2"><Mail size={16} style={{ color: GOLD }} /> admissions@snpsu.edu.in</div>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-white mb-2">Quick Links</div>
            <div className="grid grid-cols-2 gap-1 text-white/60">
              {NAV.map((n) => <a key={n} href="#" className="hover:text-white">{n}</a>)}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 text-center text-xs text-white/40 py-4">
          Demo experience powered by VoiceDots · © Sapthagiri NPS University
        </div>
      </footer>
    </div>
  );
}
