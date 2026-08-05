import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, type CartItem as CartItemType } from "../state/cartStore";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCartStore();
    const discountedPrice = Math.round(
        item.product.price * (1 - item.product.discount / 100)
    );

    return (
        <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
            {/* Thumbnail */}
            <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    {item.product.brand}
                </p>
                <h4 className="text-sm font-medium text-gray-800 truncate">
                    {item.product.name}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                    {item.selectedSize} &bull; {item.selectedColor}
                </p>

                <div className="flex items-center justify-between mt-3">
                    {/* Price */}
                    <div>
                        <span className="text-sm font-bold text-gray-900">
                            ₹{(discountedPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.product.discount > 0 && (
                            <span className="text-xs text-gray-400 line-through ml-1.5">
                                ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <Plus size={12} />
                        </button>
                        <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ml-1"
                        >
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
