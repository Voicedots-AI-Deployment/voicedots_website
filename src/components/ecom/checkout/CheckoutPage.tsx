import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft, CreditCard } from "lucide-react";
import { useCartStore } from "../state/cartStore";
import { useOrderStore } from "../state/orderStore";
import CartSummary from "../cart/CartSummary";
import { type Address } from "../data/mockOrders";

interface CheckoutPageProps {
    onBack: () => void;
    onOrderPlaced: (orderId: string) => void;
}

export default function CheckoutPage({
    onBack,
    onOrderPlaced,
}: CheckoutPageProps) {
    const items = useCartStore((s) => s.items);
    const placeOrder = useOrderStore((s) => s.placeOrder);

    const [address, setAddress] = useState<Address>({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        pincode: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

    const validate = (): boolean => {
        const e: typeof errors = {};
        if (!address.fullName.trim()) e.fullName = "Name is required";
        if (!address.phone.trim() || address.phone.length < 10)
            e.phone = "Valid phone number required";
        if (!address.addressLine.trim()) e.addressLine = "Address is required";
        if (!address.city.trim()) e.city = "City is required";
        if (!address.pincode.trim() || address.pincode.length < 5)
            e.pincode = "Valid pincode required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validate()) return;
        const orderId = placeOrder(address);
        if (orderId) onOrderPlaced(orderId);
    };

    const updateField = (field: keyof Address, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center">
                <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
                <button
                    onClick={onBack}
                    className="text-rose-500 font-semibold hover:underline"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto py-8 px-4"
        >
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Shopping
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Address Form */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <MapPin size={18} className="text-rose-500" />
                            <h2 className="text-lg font-bold text-gray-900">
                                Delivery Address
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                label="Full Name"
                                value={address.fullName}
                                error={errors.fullName}
                                onChange={(v) => updateField("fullName", v)}
                                placeholder="John Doe"
                            />
                            <InputField
                                label="Phone Number"
                                value={address.phone}
                                error={errors.phone}
                                onChange={(v) => updateField("phone", v)}
                                placeholder="9876543210"
                                type="tel"
                            />
                            <InputField
                                label="Address"
                                value={address.addressLine}
                                error={errors.addressLine}
                                onChange={(v) => updateField("addressLine", v)}
                                placeholder="123, Main Street, Area"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="City"
                                    value={address.city}
                                    error={errors.city}
                                    onChange={(v) => updateField("city", v)}
                                    placeholder="Bangalore"
                                />
                                <InputField
                                    label="Pincode"
                                    value={address.pincode}
                                    error={errors.pincode}
                                    onChange={(v) => updateField("pincode", v)}
                                    placeholder="560001"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Items preview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                            Order Items ({items.length})
                        </h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {items.map((item) => (
                                <div key={item.product.id} className="flex items-center gap-3">
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className="w-12 h-14 rounded-lg object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {item.product.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {item.selectedSize} &bull; Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <CartSummary />

                    <button
                        onClick={handlePlaceOrder}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-rose-500/30"
                    >
                        <CreditCard size={18} />
                        Place Order
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Reusable input ─── */
function InputField({
    label,
    value,
    error,
    onChange,
    placeholder,
    type = "text",
}: {
    label: string;
    value: string;
    error?: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl text-sm border-2 transition-all focus:outline-none bg-gray-50 text-gray-800 placeholder:text-gray-400 ${error
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-rose-400"
                    }`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
