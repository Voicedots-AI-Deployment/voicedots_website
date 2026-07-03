export interface AvatarConfig {
  name: string;
  role: string;
  animation: string;
}

interface AvatarConfigRowProps {
  index: number;
  config: AvatarConfig;
  onChange: (index: number, field: keyof AvatarConfig, value: string) => void;
}

const ANIMATION_OPTIONS = [
  {
    label: "SRK",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/srk_avatar.lottie",
  },
  {
    label: "Sales",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/sales.lottie",
  },
  {
    label: "Doctor",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/doctor.lottie",
  },
  {
    label: "Nurse",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/nurse.lottie",
  },
  {
    label: "Receptionist",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/receptionist.lottie",
  },
  {
    label: "Support",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/support.lottie",
  },
  {
    label: "Service",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/service.lottie",
  },
  {
    label: "Loan",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/loan.lottie",
  },
  {
    label: "Scheme",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/scheme.lottie",
  },
  {
    label: "General",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/general.lottie",
  },
  {
    label: "UG Guide",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/ug_guide.lottie",
  },
  {
    label: "PG Guide",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/pg_guide.lottie",
  },
  {
    label: "CEO",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/ceo.lottie",
  },
  {
    label: "CTO",
    url: "https://cdn.jsdelivr.net/gh/pratikix/animations/cto.lottie",
  },
]

export { ANIMATION_OPTIONS };

export function AvatarConfigRow({ index, config, onChange }: AvatarConfigRowProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-3 transition-all duration-300">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {index + 1}
        </div>
        <span className="text-sm font-semibold text-foreground">
          Agent {index + 1}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Agent Name */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Agent Name
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm transition-shadow"
            placeholder="e.g. Sales Bot"
          />
        </div>

        {/* Role */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Avatar
          </label>
          <select
            value={config.animation}
            onChange={(e) => onChange(index, "animation", e.target.value)}
            className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm appearance-none cursor-pointer"
          >
            {ANIMATION_OPTIONS.map((opt) => (
              <option key={opt.url} value={opt.url}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
