import { useState, useEffect } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, UserPlus, PlayCircle, Menu, ChevronRight, ChevronLeft, Search } from "lucide-react";

/* ===== DMK DATA (INLINED) ===== */
const DMK_DATA = {
    landingPageCarousel: [
        {
            imageDesktop: "https://dmksite.blob.core.windows.net/prod-dmk-strapi-replica/assets/OTN_website_9089838fb3",
            altText: "DMK | Dravida Munnetra Kazhagam"
        },
        {
            imageDesktop: "https://dmk.blob.core.windows.net/website/assets/5_1_d8362d3dbc",
            altText: "DMK | Dravida Munnetra Kazhagam"
        },
        {
            imageDesktop: "https://dmk.blob.core.windows.net/website/assets/1920x1080_web_2_a2ccda9d28",
            altText: "DMK | Dravida Munnetra Kazhagam"
        },
        {
            imageDesktop: "https://dmk.blob.core.windows.net/website/assets/RU_copy_f01152a719",
            altText: "DMK | Dravida Munnetra Kazhagam"
        },
        {
            imageDesktop: "https://dmk.blob.core.windows.net/website/assets/des_022_copy_2_ecd69b2389",
            altText: "DMK | Dravida Munnetra Kazhagam"
        }
    ],
    timeline: [
        { year: "1924", title: "Vaikom Satyagraha", description: "Thanthai Periyar participated in the Vaikom Satyagraha...", era: "Thanthai Periyar", image: "https://dmk.blob.core.windows.net/website/assets/small_4_444ac70569" },
        { year: "1925", title: "Periyar Joins Justice Party", description: "Thanthai Periyar joins the Justice Party in 1925...", era: "Thanthai Periyar", image: "https://dmk.blob.core.windows.net/website/assets/5_6aabc67a6d" },
        { year: "1944", title: "Dravidar Kazhagam", description: "Thanthai Periyar formed 'Dravidar Kazhagam'...", era: "Thanthai Periyar", image: "https://dmk.blob.core.windows.net/website/assets/small_8_76ab006245" },
        { year: "1949", title: "Birth of DMK", description: "Formation of the Dravida Munnetra Kazhagam (DMK)...", era: "Perarignar Anna", image: "https://dmk.blob.core.windows.net/website/assets/11_bde1ea599d" },
        { year: "1967", title: "Chief Minister of Tamil Nadu", description: "DMK propelled to victory in 1967...", era: "Perarignar Anna", image: "https://dmk.blob.core.windows.net/website/assets/small_18_a864f093ab" },
        { year: "1969", title: "Birth of Tamil Nadu", description: "Renaming of Madras State to Tamil Nadu...", era: "Perarignar Anna", image: "https://dmk.blob.core.windows.net/website/assets/small_22_055917ef82" },
        { year: "1969", title: "First term as CM", description: "Kalaignar became Chief Minister...", era: "Muthamizharignar Kalaignar", image: "https://dmk.blob.core.windows.net/website/assets/small_26_6d96f8064f" },
        { year: "2021", title: "Chief Minister of Tamil Nadu", description: "Thalapathy led the victorious Secular Progressive Alliance...", era: "Thalapathy", image: "https://dmk.blob.core.windows.net/website/assets/small_41_bf2f5abfc6" }
    ],
    achievementsData: [
        { title: "Pudhumai Penn", thumbnail: "https://dmk.blob.core.windows.net/website/assets/thumbnail_1_8679dab428" },
        { title: "Makkalai Thedi Maruthuvam", thumbnail: "https://dmk.blob.core.windows.net/website/assets/thumbnail_3_c7c245ffa1" },
        { title: "Uzhavar Nalan", thumbnail: "https://dmk.blob.core.windows.net/website/assets/thumbnail_6_91a9d13184" },
        { title: "Naan Mudhalvan", thumbnail: "https://dmk.blob.core.windows.net/website/assets/thumbnail_4_58eace2ede" }
    ],
    ourStrengthData: {
        en: [
            { count: "2.5 Cr+", label: "Party Members" },
            { count: "25", label: "Wings" },
            { count: "126", label: "Legislative Assembly Members" },
            { count: "22", label: "LokSabha Members" },
            { count: "11", label: "RajyaSabha Members" }
        ],
        ta: [
            { count: "2 கோடி+", label: "கழக உறுப்பினர்கள்" },
            { count: "25", label: "சார்பு அணிகள்" },
            { count: "126", label: "சட்டமன்ற உறுப்பினர்கள்" },
            { count: "22", label: "மக்களவை உறுப்பினர்கள்" },
            { count: "11", label: "மாநிலங்களவை உறுப்பினர்கள்" }
        ]
    },
    joinUsData: {
        en: {
            description: "Sign up to become a member and make a positive impact in your community and beyond. Let's collaborate to build a stronger Tamil Nadu, driven by the inclusive ideals of the Dravidian model."
        },
        ta: {
            description: "வளமான தமிழ்நாட்டை உருவாக்கும் உறுப்பினராக சேர பதிவு செய்யவும். அனைவரும் இணைந்து சமூக மாற்றத்தை ஏற்படுத்துவோம்."
        }
    }
};

/* ===== DMK PAGE COMPONENT ===== */
export function DmkPage() {
    const [lang, setLang] = useState<"en" | "ta">("en");
    const [currentSlide, setCurrentSlide] = useState(0);
    const { openWidget } = useDemoWidget();

    useEffect(() => {
        openWidget("DMK");
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % DMK_DATA.landingPageCarousel.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % DMK_DATA.landingPageCarousel.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + DMK_DATA.landingPageCarousel.length) % DMK_DATA.landingPageCarousel.length);

    const navItems = [
        "Home", "History of DMK", "Ideology", "Organization", "Elected Representatives", "Achievements", "Gallery", "Media"
    ]

    return (
        <div className="font-sans text-slate-900 bg-white min-h-screen relative">
            {/* ===== HEADER ===== */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className="w-16 h-16 relative">
                            <img src="./public/dmk_logo.png" alt="DMK Logo" className="w-full h-full object-contain" onError={(e) => {
                                // Fallback if generic image fails (usually wikipedia hotlink protection)
                                (e.target as HTMLImageElement).src = "https://pbs.twimg.com/profile_images/1117767393452445698/Hk4v3wQ-_400x400.jpg"
                            }} />
                        </div>

                        <div className="hidden md:block">
                            <h1 className="text-2xl font-bold text-red-600 leading-none tracking-tight">DMK</h1>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-black pt-1">DRAVIDA MUNNETRA KAZHAGAM</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-tight text-slate-700">
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={`#${item.replace(/\s+/g, '').toLowerCase()}`}
                                className={`hover:text-red-600 transition-colors ${idx === 0 ? 'text-red-600' : ''}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-600 hover:text-red-600">
                            <Search size={20} />
                        </button>

                        {/* Lang Toggle */}
                        <button
                            onClick={() => setLang(l => l === 'en' ? 'ta' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition text-xs font-bold uppercase"
                        >
                            <Globe size={14} />
                            {lang === 'en' ? 'TA' : 'EN'}
                        </button>

                        <button className="hidden md:flex bg-red-600 text-white px-6 py-2.5 rounded shadow-lg hover:bg-red-700 transition font-bold text-sm items-center gap-2 uppercase tracking-wide">
                            <UserPlus size={16} />
                            Join Now
                        </button>

                        <button className="lg:hidden p-2 text-slate-700">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ===== HERO SLIDER ===== */}
            <section className="relative w-full h-[350px] md:h-[calc(100vh-140px)] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={DMK_DATA.landingPageCarousel[currentSlide].imageDesktop}
                        alt="Hero Banner"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    />
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2 z-10">
                    {DMK_DATA.landingPageCarousel.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? 'w-10 bg-red-600' : 'w-2 bg-white/50 hover:bg-white'}`}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 flex  justify-between items-center px-4 pointer-events-none">
                    <button onClick={prevSlide} className="pointer-events-auto p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur transition-all"><ChevronLeft size={24} /></button>
                    <button onClick={nextSlide} className="pointer-events-auto p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur transition-all"><ChevronRight size={24} /></button>
                </div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="bg-[#cc0000] text-white py-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 text-center divide-x-0 md:divide-x divide-white/20 relative z-10">
                    {DMK_DATA.ourStrengthData[lang].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-2">
                            <span className="text-3xl md:text-5xl font-black mb-1 leading-none">{item.count}</span>
                            <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold opacity-80">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== LEGACY / TIMELINE ===== */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Legacy</h2>
                        <div className="w-24 h-1 bg-red-600 mx-auto" />
                    </div>

                    {/* Timeline Scroll */}
                    <div className="flex overflow-x-auto gap-8 pb-12 snap-x px-4 no-scrollbar">
                        {DMK_DATA.timeline.map((item, i) => (
                            <div key={i} className="min-w-[320px] bg-white rounded-none shadow-xl overflow-hidden snap-center flex-shrink-0 border-t-8 border-red-600 group hover:shadow-2xl transition-all duration-300">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                                    <div className="absolute top-4 left-4 bg-black text-white font-black text-sm px-3 py-1">{item.year}</div>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-bold text-xl mb-3 text-slate-800 leading-tight min-h-[56px]">{item.title}</h3>
                                    <div className="h-1 w-12 bg-gray-200 mb-4" />
                                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{item.description}</p>
                                    <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                                            <Globe size={14} />
                                        </div>
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{item.era}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ACHIEVEMENTS ===== */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            <span className="text-red-600">Dravidian Model</span> Achievements
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Transforming Tamil Nadu through inclusive growth, social justice, and progressive governance.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {DMK_DATA.achievementsData.map((item, i) => (
                            <div key={i} className="group cursor-pointer relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-black">
                                <img src={item.thumbnail} className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-60 transition-opacity" alt={item.title} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayCircle size={32} className="text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-12">
                                    <h3 className="font-bold text-white text-lg leading-tight border-l-4 border-red-600 pl-3">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== JOIN US ===== */}
            <section className="py-28 bg-[#1a1a1a] text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-red-900/10 skew-x-12" />
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        {lang === 'en' ? 'JOIN THE MOVEMENT' : 'இயக்கத்தில் இணையுங்கள்'}
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed font-light">
                        {DMK_DATA.joinUsData[lang].description}
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-none font-black text-lg shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase tracking-widest">
                        {lang === 'en' ? 'REGISTER NOW' : 'உறுப்பினர் ஆகுங்கள்'}
                    </button>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-black text-slate-500 py-16 text-sm border-t border-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact</h4>
                            <p className="mb-2">Anna Arivalayam,</p>
                            <p className="mb-2">268-269, Anna Salai,</p>
                            <p>Teynampet, Chennai - 600018</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-red-500 transition">About Party</a></li>
                                <li><a href="#" className="hover:text-red-500 transition">Leadership</a></li>
                                <li><a href="#" className="hover:text-red-500 transition">History</a></li>
                                <li><a href="#" className="hover:text-red-500 transition">Manifesto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Media</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:text-red-500 transition">Press Releases</a></li>
                                <li><a href="#" className="hover:text-red-500 transition">Gallery</a></li>
                                <li><a href="#" className="hover:text-red-500 transition">Videos</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Follow Us</h4>
                            <div className="flex gap-4">
                                {/* Social placeholders */}
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-red-600 transition cursor-pointer">X</div>
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-red-600 transition cursor-pointer">fb</div>
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center hover:bg-red-600 transition cursor-pointer">in</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center pt-8 border-t border-gray-900 text-xs text-gray-600">
                        <p>&copy; {new Date().getFullYear()} Dravida Munnetra Kazhagam. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
