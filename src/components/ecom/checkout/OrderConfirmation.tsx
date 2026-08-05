import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

interface OrderConfirmationProps {
    orderId: string;
    onTrackOrder: (orderId: string) => void;
    onContinueShopping: () => void;
}

export default function OrderConfirmation({
    orderId,
    onTrackOrder,
    onContinueShopping,
}: OrderConfirmationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto py-20 px-4 text-center"
        >
            {/* Animated check */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
            >
                <CheckCircle size={48} className="text-green-500" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Placed! 🎉
                </h1>
                <p className="text-gray-500 mb-6">
                    Thank you for your order. We'll start preparing it right away.
                </p>

                {/* Order ID */}
                <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-5 py-3 mb-8">
                    <Package size={16} className="text-rose-500" />
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="text-sm font-bold text-gray-900">{orderId}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => onTrackOrder(orderId)}
                        className="px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold flex items-center gap-2 transition-all shadow-lg"
                    >
                        Track Order
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={onContinueShopping}
                        className="px-8 py-3.5 rounded-full border-2 border-gray-200 text-gray-600 font-semibold hover:border-rose-300 hover:text-rose-500 transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
