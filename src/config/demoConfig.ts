export const DEMO_AVATARS: Record<
  string,
  { title: string; avatars: any[]; agent_id?: string; comingSoon?: boolean, isImage?: boolean }
> = {
  "Voicedots": {
    title: "Voicedots AI Team",
    avatars: [
      { name: "SRK", role: "Voice Ambassador", image: "./animations/srk.lottie" },
      { name: "Sales", role: "Product Specialist", image: "./animations/sales.lottie" },
      { name: "CEO", role: "CEO", image: "./animations/ceo.lottie" },
      { name: "CTO", role: "CTO", image: "./animations/cto.lottie" },

    ],
    agent_id: "voicedots_agent_6m9osxmfvp3u42yjnsgd8dgo5aconsv4",
  },

  "Education": {
    title: "Education AI Team",
    avatars: [
      { name: "SRK", role: "Voice Ambassador", image: "./animations/srk.lottie" },
      { name: "Receptionist", role: "Counsellor", image: "./animations/receptionist.lottie" },
      { name: "Professor", role: "Academic Faculty", image: "./animations/support.lottie" },
      { name: "Placement Coordinator", role: "Training & Coordinator", image: "./animations/ceo.lottie" },
    ],
    agent_id: "agent_3001khn17xgqefftaq5s52pd6akx",
  },

  "E-Commerce": {
    title: "E-Commerce AI Team",
    avatars: [
      { name: "Stylist", role: "Personal Shopper", image: "/avatars/ecom/Stylist.png" },
      { name: "Expert", role: "Product Specialist", image: "/avatars/ecom/Expert.png" },
      { name: "Tracker", role: "Logistics Coordinator", image: "/avatars/ecom/Tracker.png" },
      { name: "Resolver", role: "Returns & Refunds Agent", image: "/avatars/ecom/Resolver.png" },
    ],
    isImage: true,
    agent_id: "agent_0201khtbs031e2vshn14te6wj52w",
  },

  "Healthcare": {
    title: "Healthcare AI Team",
    avatars: [
      { name: "SRK", role: "Voice Ambassador", image: "./animations/srk.lottie" },
      { name: "Administration", role: "Administration", image: "./animations/receptionist.lottie" },
      { name: "Doctor", role: "Doctor", image: "./animations/doctor.lottie" },
      { name: "Nurse", role: "Nurse", image: "./animations/nurse.lottie" },
    ],
    agent_id: "agent_1801khn183ymfwfb10srh1jecke1"
  },

  "Real Estate": {
    title: "Real Estate AI Team",
    avatars: [
      { name: "SRK", role: "Inquiries", image: "./animations/srk.lottie" },
      { name: "Sales", role: "Property Sales", image: "./animations/sales.lottie" },
      { name: "Loans", role: "Loan & Finance", image: "./animations/loan.lottie" },
      { name: "Supports", role: "Market Insights", image: "./animations/support.lottie" },
    ],
    agent_id: "agent_7201khn17nkffnxs7xp5s3pvej3x"
  },

  "Automobile": {
    title: "Automobile AI Team",
    avatars: [
      { name: "SRK", role: "Showroom", image: "./animations/srk.lottie" },
      { name: "General", role: "Automobile General", image: "./animations/general.lottie" },
      { name: "Service", role: "Maintenance", image: "./animations/service.lottie" },
      { name: "Finance", role: "Automobile Finance", image: "./animations/loan.lottie" },
    ],
    agent_id: "agent_9201khn18fchfc99fw2hs9srbkkx"
  },

  "Travel": {
    title: "Travel AI Team",
    avatars: [
      { name: "Planner", role: "Itinerary", image: "/avatars/ecom/Stylist.png" },
      { name: "Booker", role: "Reservations", image: "/avatars/ecom/Expert.png" },
      { name: "Guide", role: "Local Info", image: "/avatars/automobile/loans.png" },
      { name: "Support", role: "Trip Assistance", image: "/avatars/healthcare/admin.png" },
    ],
    comingSoon: true,
  },

  "DMK": {
    title: "DMK AI Team",
    avatars: [
      { name: "Karunanidhi", role: "M. Karunanidhi", image: "/animations/karunanidhi.lottie" },
      { name: "MK Stalin", role: "M.K. Stalin", image: "/animations/mkstalin.lottie" },
      { name: "Udhayanidhi", role: "M. Udhayanidhi", image: "/animations/udhayanidhi.lottie" },
      { name: "Schemes", role: "Schemes Officer", image: "/animations/scheme.lottie" },
    ],
    agent_id: "agent_8101khm01yt6fwytcddnvbzbj9c1"
  },

  "Balaji Medical College": {
    title: "Balaji Medical College AI Bot",
    avatars: [
      { name: "SRK", role: "Admissions Officer", image: "/animations/ug_guide.lottie" },
    ],
    // agent_id: "agent_8401khknc6avfsm90v6jyeg75y59"
    agent_id: "voicedots_agent_j7s2m9q4v1x8z6k5a3d0r2p9w4b7c"
  },

  "Chitkara University": {
    title: "Chitkara University",
    avatars: [
      { name: "About", role: "About", image: "/animations/sales.lottie" },
      { name: "Support", role: "Support", image: "/animations/srk.lottie" },
      { name: "UG", role: "UG Guide", image: "/animations/ug_guide.lottie" },
      { name: "PG", role: "PG Guide", image: "/animations/pg_guide.lottie" },
    ],
    agent_id: "voicedots_agent_0hzqiz5dnqgtpf0siz8y4soasg4hyoi7",
  },

  "MGR University": {
    title: "MGR University",
    avatars: [
      { name: "About", role: "About Us", image: "/animations/sales.lottie" },
      { name: "Courses", role: "Courses", image: "/animations/general.lottie" },
      { name: "Admissions", role: "Admissions Assistant", image: "/animations/srk.lottie" },
      { name: "Placement", role: "Placement Assistant", image: "/animations/cto.lottie" },


    ],
    agent_id: "voicedots_agent_y80sr5tl1wf6slwdgo24g78nx01uks4n",
  },

  "Sri Lalithambigai Medical College & Hospital": {
    title: "Sri Lalithambigai Medical College & Hospital",
    avatars: [
      { name: "About", role: "About", image: "./animations/sales.lottie" },
      { name: "Admission", role: "Admissions", image: "/animations/srk.lottie" },
      { name: "Courses", role: "Courses", image: "/animations/loan.lottie" },
      { name: "Clinical", role: "Clinical Facilities", image: "/animations/doctor.lottie" }
    ],
    agent_id: "voicedots_agent_xziy53avs4wjii8a2m5veegs3hc73bpo",
  },
  "S.A College of Arts & Science": {
    title: "S.A College of Arts & Science",
    avatars: [
      { name: "About", role: "About us", image: "/animations/sales.lottie" },
      { name: "Placement", role: "Placement", image: "/animations/srk.lottie" },
      { name: "UG", role: "UG Admissions", image: "/animations/ceo.lottie" },
      { name: "PG", role: "PG Admissions", image: "/animations/pg_guide.lottie" },
    ],
    agent_id: "voicedots_agent_8kqz4m2h1n9d7x5t3w0v6pajcylrbsfe",
  },

  "Dhanalakshmi College of Engineering & Technology": {
    title: "Dhanalakshmi College of Engineering & Technology",
    avatars: [
      { name: "About", role: "About Us", image: "/animations/sales.lottie" },
      { name: "Courses", role: "Courses", image: "/animations/general.lottie" },
      { name: "Admission", role: "Admissions Assistant", image: "/animations/srk.lottie" },
      { name: "Placement", role: "Placement Assistant", image: "/animations/cto.lottie" },
    ],
    agent_id: "voicedots_agent_dscet9m2q1h8z5t6w3v0pajcylrbsfde",
  },
}