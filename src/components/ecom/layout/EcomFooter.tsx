import { ShoppingBag } from "lucide-react";

export default function EcomFooter() {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-auto">
            {/* Top bar */}
            <div className="border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center">
                                <ShoppingBag size={16} className="text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">VoiceShop</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            AI-powered shopping experience.
                            <br />
                            Talk to shop, style, and track.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Shop
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">New Arrivals</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Trending</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Sale</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Help
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">FAQs</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Returns</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Sizing Guide</span></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Connect
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Instagram</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Twitter</span></li>
                            <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Pinterest</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} VoiceShop by VoiceDots. All rights reserved.</p>
                <p>Powered by AI Voice Commerce</p>
            </div>
        </footer>
    );
}
