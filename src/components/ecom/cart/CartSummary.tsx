import { useCartStore } from "../state/cartStore";

export default function CartSummary() {
    const totalPrice = useCartStore((s) => s.totalPrice());
    const discountedTotal = useCartStore((s) => s.discountedTotal());
    const savings = totalPrice - discountedTotal;
    const deliveryFee = discountedTotal > 999 ? 0 : 99;

    return (
        <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                Price Summary
            </h4>

            <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            {savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>−₹{Math.round(savings).toLocaleString("en-IN")}</span>
                </div>
            )}

            <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">
                    ₹{Math.round(discountedTotal + deliveryFee).toLocaleString("en-IN")}
                </span>
            </div>

            {savings > 0 && (
                <p className="text-xs text-green-600 font-medium text-center pt-1">
                    🎉 You save ₹{Math.round(savings).toLocaleString("en-IN")} on this order!
                </p>
            )}
        </div>
    );
}
