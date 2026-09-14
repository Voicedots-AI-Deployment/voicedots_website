import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  GraduationCap,
  Mic,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const studentPortalUrl =
  import.meta.env.VITE_STUDENT_DASHBOARD_URL ||
  (import.meta.env.DEV ? "http://localhost:5175" : "/student/");

export function InterviewsPage() {
  return (
    <div className="pt-36 pb-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-12 items-center py-8 sm:py-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium px-4 py-2">
              <GraduationCap size={16} /> VoiceDots for students
            </span>
            <h1 className="font-outfit text-5xl sm:text-6xl font-medium tracking-tight leading-[1.1] mt-7">
              Your next chapter.
              <br />
              <span className="text-primary">A more confident you.</span>
            </h1>
            <p className="text-muted-foreground text-base leading-7 max-w-lg mt-6">
              Prepare for the opportunities ahead with personalized AI
              interviews, thoughtful feedback, and a student workspace that
              keeps your progress in one place.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={studentPortalUrl}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90"
              >
                Open student dashboard <ArrowRight size={17} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent"
              >
                For colleges <BriefcaseBusiness size={16} />
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-5">
              Already enrolled by your college? Sign in or activate your student
              account.
            </p>
          </div>
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border/60 relative overflow-hidden">
            <div className="absolute -top-20 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <span className="flex items-center gap-1 text-xl font-semibold">
                  <img
                    src="/voicedotslogo.svg"
                    alt=""
                    className="w-8 h-8 -mr-2"
                  />
                  oiceDots
                </span>
                <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 rounded-full py-1.5 px-3">
                  Student workspace
                </span>
              </div>
              <div className="py-8">
                <span className="text-xs uppercase tracking-widest text-primary">
                  One conversation at a time
                </span>
                <h2 className="text-3xl font-medium mt-3">
                  Meet your next opportunity
                  <br />
                  with confidence.
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  {
                    Icon: FileText,
                    title: "Bring your experience",
                    description: "Your resume is the starting point.",
                  },
                  {
                    Icon: Mic,
                    title: "Practice with your panel",
                    description: "Four perspectives, tailored to your role.",
                  },
                  {
                    Icon: Sparkles,
                    title: "Make feedback your next step",
                    description: "See your strengths and areas to improve.",
                  },
                ].map(({ Icon, title, description }, i) => (
                  <div
                    key={title}
                    className="flex gap-4 items-center bg-background/60 rounded-xl border border-border/60 p-4"
                  >
                    <span className="p-2.5 rounded-xl text-primary bg-primary/10">
                      <Icon size={20} />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center text-xs text-muted-foreground mt-6">
                <ShieldCheck size={16} className="text-primary" /> Your
                interviews and feedback stay connected to your student account.
              </div>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-primary">
              A workspace that grows with you
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium mt-4">
              Prepare. Practice. Move forward.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {[
              {
                Icon: Mic,
                title: "Personalized interviews",
                text: "Practice with HR, domain, industry, and hiring-manager perspectives, grounded in your resume and target role.",
                items: [
                  "Resume and job-description preparation",
                  "Live voice conversations",
                  "Resume interrupted sessions",
                ],
              },
              {
                Icon: BriefcaseBusiness,
                title: "Campus opportunities",
                text: "See eligible drives from your college and prepare for your assigned placement interviews.",
                items: [
                  "College-managed eligibility",
                  "Your assigned interview schedule",
                  "Placement results when released",
                ],
              },
              {
                Icon: FileText,
                title: "Feedback with direction",
                text: "Review your interview reports and understand what your assessed skills mean for your next step.",
                items: [
                  "Personal performance reports",
                  "Strengths and improvement areas",
                  "Evidence-based placement readiness",
                ],
              },
            ].map(({ Icon, title, text, items }) => (
              <article
                key={title}
                className="glass-card border border-border/60 rounded-2xl p-7"
              >
                <Icon className="text-primary mb-5" size={26} />
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground leading-6 mt-3">
                  {text}
                </p>
                <ul className="space-y-3 mt-6">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs">
                      <Check size={15} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="text-center glass-card rounded-3xl border border-primary/20 p-8 sm:p-12 mt-8">
          <h2 className="text-3xl font-medium">
            Give your next interview a better beginning.
          </h2>
          <p className="text-sm text-muted-foreground mt-4">
            Your student dashboard is ready when you are.
          </p>
          <a
            href={studentPortalUrl}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-medium mt-7"
          >
            Go to student dashboard <ArrowRight size={17} />
          </a>
        </section>
      </div>
    </div>
  );
}
