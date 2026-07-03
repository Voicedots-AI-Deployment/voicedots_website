import { motion } from "framer-motion";

const INDUSTRIES = [
  "Voicedots",
  "Healthcare",
  "Real Estate",
  "E-Commerce",
  "Education",
  "Automobile",
  "Travel",
  "DMK",
  "Balaji Medical College",
  "Chitkara University",
  "MGR University",
  "Sri Lalithambigai Medical College & Hospital",
  "S.A College of Arts & Science",
];

const GOLDEN_INDUSTRIES = ["E-Commerce", "Travel"];

export const INDUSTRY_USAGE: Record<string, string> = {
  Voicedots: "Experience the power of our AI assistant.",
  Healthcare: "Assist patients, book appointments, and answer medical queries",
  "Real Estate": "Handle property inquiries, schedule site visits, and qualify leads",
  "E-Commerce": "Automate order support, returns, and product recommendations",
  Education: "Guide students, manage admissions, and answer course queries",
  Automobile: "Manage test drive bookings and vehicle service requests",
  Travel: "Plan trips, handle bookings, and provide travel assistance",
  DMK: "Engage with the DMK AI Team for political insights, historical information, and scheme details",
  "Balaji Medical College": "Access information about Balaji Medical College's Admissions",
  "Chitkara University": "Get information about Chitkara University's UG and PG courses, and admissions",
  "MGR University": "Get information about MGR University's courses, and admissions",
  "Sri Lalithambigai Medical College & Hospital": "Get information about Sri Lalithambigai Medical College & Hospital",
  "S.A College of Arts & Science": "Get information about S.A College of Arts & Science",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function IndustryGrid({
  onSelect,
}: {
  onSelect: (industry: string) => void;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
    >
      {INDUSTRIES.map((i) => {
        const isGolden = GOLDEN_INDUSTRIES.includes(i);

        return (
          <motion.button
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(i)}
            className={`
              group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden
              glass-card backdrop-blur-xl
              ${isGolden
                ? `
                    bg-[#DFC578]/10 dark:bg-[#2A220F]/40
                    border border-[#BF932A]/40 dark:border-[#B8922E]/40
                    hover:border-[#E6C77A] dark:hover:border-[#E0B84C]
                    shadow-[0_0_30px_rgba(223,197,120,0.15)]
                    hover:shadow-[0_15px_40px_rgba(223,197,120,0.3)]
                  `
                : `
                    bg-background/40 hover:bg-background/60
                    border border-white/20 dark:border-white/5
                    hover:border-primary/50 dark:hover:border-primary/40
                    hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.25)]
                  `
              }
            `}
          >
            {/* Internal Hover Gradient */}
            <div
              className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  ${isGolden
                  ? 'bg-gradient-to-br from-[#DFC578]/20 to-transparent'
                  : 'bg-gradient-to-br from-primary/[0.04] dark:from-primary/[0.08] to-transparent'
                }
                `}
            />

            {/* Top border highlight */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 transition-all duration-500 rounded-b-full opacity-0 group-hover:opacity-100 w-0 group-hover:w-1/2 ${isGolden ? 'bg-gradient-to-r from-[#BF932A] to-[#E6C77A]' : 'bg-gradient-to-r from-primary to-purple-400'}`} />

            {isGolden && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E6C77A]/20 blur-[30px] rounded-full pointer-events-none group-hover:bg-[#E6C77A]/40 transition-colors duration-500" />
            )}

            <h3 className={`font-semibold text-lg mb-2 relative z-10 transition-colors duration-500 ${isGolden ? 'text-[#BF932A] dark:text-[#E6C77A]' : 'text-foreground'}`}>
              {i}
            </h3>

            <p className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 leading-relaxed relative z-10">
              {INDUSTRY_USAGE[i]}
            </p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
