import { useState } from "react";
import { Phone } from "lucide-react";

interface AvatarCardProps {
  name: string;
  role: string;
  image: string;
  active?: boolean;
  onClick?: () => void;
}

function AvatarCard({
  name,
  role,
  image,
  active = false,
  onClick,
}: AvatarCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        w-[170px] p-4 rounded-2xl cursor-pointer
        transition-all duration-300
        flex flex-col items-center text-center
        ${active ? "glass-card ring-2 ring-primary" : "glass"}
      `}
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-xl object-cover mb-3"
      />

      <p className="text-sm font-semibold">{name}</p>
      <span className="text-xs text-muted-foreground mt-1">{role}</span>
    </div>
  );
}

export default function VoiceWidget() {
  const [activeAgent, setActiveAgent] = useState("SRK");

  const agents = [
    { name: "SRK", role: "AI Assistant", image: "/avatars/srk.png" },
    { name: "Sales", role: "Sales Agent", image: "/avatars/sales.png" },
    { name: "CEO", role: "Executive", image: "/avatars/ceo.png" },
    { name: "CTO", role: "Tech Lead", image: "/avatars/cto.png" },
  ];

  return (
    <>
      {/* AGENT SELECTOR */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="glass-card rounded-3xl p-4 shadow-xl">
          <div className="grid grid-cols-2 gap-4">
            {agents.map((agent) => (
              <AvatarCard
                key={agent.name}
                name={agent.name}
                role={agent.role}
                image={agent.image}
                active={activeAgent === agent.name}
                onClick={() => setActiveAgent(agent.name)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING TALK BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => alert(`Talking to ${activeAgent}`)}
          className="
            flex items-center gap-3
            bg-primary text-primary-foreground
            px-6 py-4 rounded-full font-semibold
            transition-all duration-300
            hover:scale-105
            hover:shadow-[0_0_25px_rgba(124,77,255,0.5)]
          "
        >
          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          Let’s Talk
        </button>
      </div>
    </>
  );
}
