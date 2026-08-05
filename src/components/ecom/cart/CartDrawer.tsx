import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../state/cartStore";
import CartItemComponent from "./CartItem";
import CartSummary from "./CartSummary";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

export default function CartDrawer({
    isOpen,
    onClose,
    onCheckout,
}: CartDrawerProps) {
    const items = useCartStore((s) => s.items);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer — slides in from LEFT to avoid bot widget overlap */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 z-[999] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={20} className="text-rose-500" />
                                <h2 className="text-lg font-bold text-gray-900">
                                    Your Cart
                                    {items.length > 0 && (
                                        <span className="text-sm font-normal text-gray-400 ml-2">
                                            ({items.length} {items.length === 1 ? "item" : "items"})
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={18} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        {items.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 px-6">
                                <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                    <ShoppingBag size={32} className="text-gray-300" />
                                </div>
                                <p className="text-lg font-medium text-gray-500 mb-1">
                                    Cart is empty
                                </p>
                                <p className="text-sm text-center">
                                    Add items to get started. You can also ask our voice bot to add
                                    products for you!
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Items */}
                                <div className="flex-1 overflow-y-auto px-6">
                                    {items.map((item) => (
                                        <CartItemComponent key={item.product.id} item={item} />
                                    ))}
                                </div>

                                {/* Summary + CTA */}
                                <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                                    <CartSummary />
                                    <button
                                        onClick={() => {
                                            onCheckout();
                                            onClose();
                                        }}
                                        className="w-full py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-rose-500/30"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
