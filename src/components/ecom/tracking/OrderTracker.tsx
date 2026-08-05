import { motion } from "framer-motion";
import {
    Package,
    Truck,
    CheckCircle,
    Box,
    MapPin,
    ArrowLeft,
    XCircle,
    RotateCcw,
} from "lucide-react";
import { useOrderStore } from "../state/orderStore";
import { ORDER_TIMELINE } from "../data/mockOrders";

interface OrderTrackerProps {
    orderId: string;
    onBack: () => void;
}

const STEP_ICONS: Record<string, React.ReactNode> = {
    Ordered: <Package size={18} />,
    Packed: <Box size={18} />,
    Shipped: <Truck size={18} />,
    "Out for Delivery": <MapPin size={18} />,
    Delivered: <CheckCircle size={18} />,
};

export default function OrderTracker({ orderId, onBack }: OrderTrackerProps) {
    const order = useOrderStore((s) => s.getOrder(orderId));
    const cancelOrder = useOrderStore((s) => s.cancelOrder);
    const initiateReturn = useOrderStore((s) => s.initiateReturn);

    if (!order) {
        return (
            <div className="max-w-lg mx-auto py-20 px-4 text-center">
                <p className="text-lg text-gray-500 mb-4">Order not found</p>
                <p className="text-sm text-gray-400 mb-6">
                    Order ID: <span className="font-mono font-semibold">{orderId}</span>
                </p>
                <button
                    onClick={onBack}
                    className="text-rose-500 font-semibold hover:underline flex items-center gap-1 mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Shopping
                </button>
            </div>
        );
    }

    const isCancelled = order.status === "Cancelled";
    const isReturned = order.status === "Return Initiated";
    const activeStepIdx = ORDER_TIMELINE.indexOf(order.status as any);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto py-8 px-4"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Shopping
            </button>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 mb-1">
                            Order Tracking
                        </h1>
                        <p className="text-sm text-gray-400">
                            Order ID:{" "}
                            <span className="font-mono font-semibold text-gray-600">
                                {order.orderId}
                            </span>
                        </p>
                    </div>

                    {isCancelled && (
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full">
                            <XCircle size={16} />
                            Cancelled
                        </span>
                    )}
                    {isReturned && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 text-sm font-semibold px-4 py-2 rounded-full">
                            <RotateCcw size={16} />
                            Return Initiated
                        </span>
                    )}
                </div>

                {/* Timeline */}
                {!isCancelled && !isReturned && (
                    <div className="relative mb-10">
                        {/* Progress bar */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                        <div
                            className="absolute left-6 top-0 w-0.5 bg-green-500 transition-all duration-700"
                            style={{
                                height:
                                    activeStepIdx >= 0
                                        ? `${(activeStepIdx / (ORDER_TIMELINE.length - 1)) * 100}%`
                                        : "0%",
                            }}
                        />

                        <div className="space-y-8">
                            {ORDER_TIMELINE.map((step, i) => {
                                const isCompleted = i <= activeStepIdx;
                                const isActive = i === activeStepIdx;

                                return (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 relative"
                                    >
                                        {/* Circle */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${isActive
                                                ? "bg-green-500 text-white shadow-lg shadow-green-500/30 scale-110"
                                                : isCompleted
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-100 text-gray-400"
                                                }`}
                                        >
                                            {STEP_ICONS[step]}
                                        </div>

                                        <div>
                                            <p
                                                className={`text-sm font-semibold ${isCompleted ? "text-gray-900" : "text-gray-400"
                                                    }`}
                                            >
                                                {step}
                                            </p>
                                            {isActive && (
                                                <p className="text-xs text-green-600 font-medium mt-0.5">
                                                    Current Status
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Items */}
                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
                        Items in this Order
                    </h3>
                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center gap-4 bg-gray-50 rounded-xl p-3"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {item.brand} &bull; {item.size} &bull; Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-gray-900">
                                    ₹
                                    {Math.round(
                                        item.price * (1 - item.discount / 100) * item.quantity
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery info */}
                <div className="border-t border-gray-100 mt-6 pt-6 grid sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                            Delivery Address
                        </p>
                        <p className="text-sm text-gray-700">
                            {order.address.fullName}
                            <br />
                            {order.address.addressLine}
                            <br />
                            {order.address.city} — {order.address.pincode}
                            <br />
                            📞 {order.address.phone}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                            Order Summary
                        </p>
                        <p className="text-sm text-gray-700">
                            Placed: {new Date(order.placedAt).toLocaleDateString("en-IN")}
                            <br />
                            Estimated: {new Date(order.estimatedDelivery).toLocaleDateString("en-IN")}
                            <br />
                            Total: <span className="font-bold">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                        </p>
                    </div>
                </div>

                {/* Actions */}
                {!isCancelled && !isReturned && (
                    <div className="border-t border-gray-100 mt-6 pt-6 flex flex-wrap gap-3">
                        {order.status !== "Delivered" && (
                            <button
                                onClick={() => cancelOrder(orderId)}
                                className="px-6 py-2.5 rounded-full border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-all"
                            >
                                Cancel Order
                            </button>
                        )}
                        {order.status === "Delivered" && (
                            <button
                                onClick={() => initiateReturn(orderId)}
                                className="px-6 py-2.5 rounded-full border-2 border-amber-200 text-amber-600 text-sm font-semibold hover:bg-amber-50 transition-all"
                            >
                                Initiate Return
                            </button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
