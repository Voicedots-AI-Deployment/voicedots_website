import { Star, Eye, ShoppingBag } from "lucide-react";
import { type Product } from "../data/mockProducts";
import { useCartStore } from "../state/cartStore";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
    onViewProduct: (product: Product) => void;
    index?: number;
}

export default function ProductCard({
    product,
    onViewProduct,
    index = 0,
}: ProductCardProps) {
    const addToCart = useCartStore((s) => s.addToCart);
    const discountedPrice = Math.round(
        product.price * (1 - product.discount / 100)
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Discount badge */}
                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewProduct(product);
                            }}
                            className="bg-white text-gray-800 px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50 transition-all shadow-lg transform translate-y-3 group-hover:translate-y-0 duration-300"
                        >
                            <Eye size={14} />
                            View
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="bg-rose-500 text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-600 transition-all shadow-lg transform translate-y-3 group-hover:translate-y-0 duration-300 delay-75"
                        >
                            <ShoppingBag size={14} />
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Info */}
            <div
                className="p-4 cursor-pointer"
                onClick={() => onViewProduct(product)}
            >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {product.brand}
                </p>
                <h3 className="text-sm font-medium text-gray-800 truncate mb-2 group-hover:text-rose-600 transition-colors">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                        ₹{discountedPrice.toLocaleString("en-IN")}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                            ₹{product.price.toLocaleString("en-IN")}
                        </span>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                    <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        <span>{product.rating}</span>
                        <Star size={10} fill="white" />
                    </div>
                    <span className="text-xs text-gray-400">
                        {product.colors.length} colors
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
