import { useEffect } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Briefcase, Mic } from "lucide-react";

/**
 * Client demo page: Sapthagiri NPS University.
 * Mirrors the /dmk pattern — a branded landing that switches the global
 * demo widget to this client's agent so visitors can talk to it directly.
 */
export default function SapthagiriPage() {
    const { openWidget } = useDemoWidget();

    useEffect(() => {
        openWidget("Sapthagiri NPS University");
        window.scrollTo(0, 0);
    }, []);

    const teams = [
        { icon: GraduationCap, name: "About Us", desc: "History, campus, accreditations and life at SNPSU." },
        { icon: BookOpen, name: "Courses", desc: "UG & PG programmes, specialisations and curriculum." },
        { icon: Users, name: "Admissions", desc: "Eligibility, application process, fees and intakes." },
        { icon: Briefcase, name: "Placements", desc: "Recruiters, packages and career support." },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* HERO */}
            <section className="relative overflow-hidden pt-28 pb-20 px-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative max-w-3xl mx-auto"
                >
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                        Voicedots AI Demo
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Sapthagiri NPS University
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        Meet the university's AI voice team. Ask anything about the
                        university, courses, admissions or placements — out loud.
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-3 text-sm">
                        <Mic size={16} className="text-primary" />
                        <span>Open the widget in the corner, pick a team member and start talking</span>
                    </div>
                </motion.div>
            </section>

            {/* TEAM GRID */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teams.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                            className="rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
                        >
                            <t.icon size={28} className="text-primary mb-4" />
                            <h3 className="font-semibold text-lg mb-2">{t.name}</h3>
                            <p className="text-sm text-muted-foreground">{t.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
