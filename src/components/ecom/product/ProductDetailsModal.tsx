import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { type Product } from "../data/mockProducts";
import { useCartStore } from "../state/cartStore";

interface ProductDetailsModalProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetailsModal({
    product,
    onClose,
}: ProductDetailsModalProps) {
    const addToCart = useCartStore((s) => s.addToCart);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [imageIdx, setImageIdx] = useState(0);
    const [addedFeedback, setAddedFeedback] = useState(false);

    if (!product) return null;

    const discountedPrice = Math.round(
        product.price * (1 - product.discount / 100)
    );

    const handleAddToCart = () => {
        addToCart(
            product,
            selectedSize || product.availableSizes[0],
            selectedColor || product.colors[0]
        );
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1500);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="grid md:grid-cols-2">
                        {/* Image side */}
                        <div className="relative bg-gray-100 aspect-square md:aspect-auto">
                            <img
                                src={product.images[imageIdx]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Image nav */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setImageIdx(
                                                (imageIdx - 1 + product.images.length) %
                                                product.images.length
                                            )
                                        }
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setImageIdx((imageIdx + 1) % product.images.length)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </>
                            )}

                            {/* Thumbnails */}
                            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setImageIdx(i)}
                                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === imageIdx
                                                ? "border-rose-500 scale-110"
                                                : "border-white/60 opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Discount badge */}
                            {product.discount > 0 && (
                                <span className="absolute top-4 left-4 bg-rose-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>

                        {/* Details side */}
                        <div className="p-6 md:p-8 flex flex-col">
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="self-end p-2 hover:bg-gray-100 rounded-full transition-colors mb-2"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>

                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                                {product.brand}
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                {product.name}
                            </h2>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-0.5 bg-green-600 text-white text-sm font-semibold px-2 py-0.5 rounded">
                                    {product.rating}
                                    <Star size={12} fill="white" />
                                </div>
                                <span className="text-sm text-gray-400">
                                    {Math.floor(Math.random() * 500 + 100)} ratings
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-gray-900">
                                    ₹{discountedPrice.toLocaleString("en-IN")}
                                </span>
                                {product.discount > 0 && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through">
                                            ₹{product.price.toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-sm font-semibold text-green-600">
                                            ({product.discount}% off)
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Material */}
                            <p className="text-xs text-gray-400 mb-6">
                                <span className="font-semibold text-gray-500">Material:</span>{" "}
                                {product.material}
                            </p>

                            {/* Size Selector */}
                            <div className="mb-5">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                    Select Size
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[44px] h-10 px-3 rounded-full text-sm font-medium border-2 transition-all ${selectedSize === size
                                                    ? "border-rose-500 bg-rose-50 text-rose-600"
                                                    : "border-gray-200 text-gray-600 hover:border-rose-300"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selector */}
                            <div className="mb-8">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                    Select Color
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${selectedColor === color
                                                    ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                                                    : "border-gray-200 text-gray-600 hover:border-rose-300"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                disabled={addedFeedback}
                                className={`w-full py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 ${addedFeedback
                                        ? "bg-green-500 text-white"
                                        : "bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-rose-500/30"
                                    }`}
                            >
                                {addedFeedback ? (
                                    <>
                                        <Check size={18} />
                                        Added to Cart!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={18} />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
