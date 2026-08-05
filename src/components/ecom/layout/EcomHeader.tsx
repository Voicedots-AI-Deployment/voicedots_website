import { ShoppingBag, Search, Heart, Menu, X } from "lucide-react";
import { useCartStore } from "../state/cartStore";
import { type Category, CATEGORIES } from "../data/mockProducts";
import { useState } from "react";

interface EcomHeaderProps {
    activeCategory: Category;
    onCategoryChange: (cat: Category) => void;
    onCartOpen: () => void;
    searchQuery: string;
    onSearchChange: (q: string) => void;
}

export default function EcomHeader({
    activeCategory,
    onCategoryChange,
    onCartOpen,
    searchQuery,
    onSearchChange,
}: EcomHeaderProps) {
    const totalItems = useCartStore((s) => s.totalItems());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const categoryLabels: Record<Category, string> = {
        all: "All",
        tops: "Tops",
        jeans: "Jeans",
        dresses: "Dresses",
        shoes: "Shoes",
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            {/* Top promotional banner */}
            <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 text-white text-center text-xs font-medium py-1.5 tracking-wide">
                🔥 FLAT 50% OFF on first order &bull; Use code <span className="font-bold">VOICE50</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Main header row */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden p-1 text-gray-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <a href="/ecom" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center">
                                <ShoppingBag size={16} className="text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent hidden sm:inline">
                                VoiceShop
                            </span>
                        </a>
                    </div>

                    {/* Desktop Categories */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full transition-all duration-200 ${activeCategory === cat
                                        ? "bg-rose-50 text-rose-600"
                                        : "text-gray-600 hover:text-rose-500 hover:bg-rose-50/50"
                                    }`}
                            >
                                {categoryLabels[cat]}
                            </button>
                        ))}
                    </nav>

                    {/* Search + Cart */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative hidden sm:block">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search products..."
                                className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>

                        <button className="p-2 text-gray-500 hover:text-rose-500 transition-colors relative">
                            <Heart size={20} />
                        </button>

                        {/* Cart */}
                        <button
                            onClick={onCartOpen}
                            className="p-2 text-gray-500 hover:text-rose-500 transition-colors relative"
                        >
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile search */}
                <div className="sm:hidden pb-3">
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search for brands, products..."
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-300 text-gray-800 placeholder:text-gray-400"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    onCategoryChange(cat);
                                    setMobileMenuOpen(false);
                                }}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${activeCategory === cat
                                        ? "bg-rose-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                                    }`}
                            >
                                {categoryLabels[cat]}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
