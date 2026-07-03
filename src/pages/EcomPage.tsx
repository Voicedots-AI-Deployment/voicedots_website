import { useState, useEffect, useCallback } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";
import { PRODUCTS, type Product, type Category } from "@/components/ecom/data/mockProducts";
import { useCartStore } from "@/components/ecom/state/cartStore";

import EcomLayout from "@/components/ecom/layout/EcomLayout";
import ProductGrid from "@/components/ecom/product/ProductGrid";
import ProductDetailsModal from "@/components/ecom/product/ProductDetailsModal";
import CartDrawer from "@/components/ecom/cart/CartDrawer";
import CheckoutPage from "@/components/ecom/checkout/CheckoutPage";
import OrderConfirmation from "@/components/ecom/checkout/OrderConfirmation";
import OrderTracker from "@/components/ecom/tracking/OrderTracker";

type EcomView =
    | { type: "shop" }
    | { type: "checkout" }
    | { type: "confirmation"; orderId: string }
    | { type: "tracking"; orderId: string };

/**
 * Global ecomActions interface for voice bot integration.
 * Attached to window so ElevenLabs agents can control the UI.
 */
declare global {
    interface Window {
        ecomActions?: {
            addToCart: (productId: string, size?: string, color?: string) => void;
            removeFromCart: (productId: string) => void;
            openProduct: (productId: string) => void;
            openCart: () => void;
            checkout: () => void;
            trackOrder: (orderId: string) => void;
        };
    }
}

export default function EcomPage() {
    const { openWidget } = useDemoWidget();

    const [view, setView] = useState<EcomView>({ type: "shop" });
    const [category, setCategory] = useState<Category>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // ── Activate bot widget (same pattern as DmkPage) ──
    useEffect(() => {
        openWidget("E-Commerce");
    }, []);

    // ── View helpers ──
    const goToShop = useCallback(() => {
        setView({ type: "shop" });
    }, []);

    const goToCheckout = useCallback(() => {
        setView({ type: "checkout" });
    }, []);

    const goToConfirmation = useCallback((orderId: string) => {
        setView({ type: "confirmation", orderId });
    }, []);

    const goToTracking = useCallback((orderId: string) => {
        setView({ type: "tracking", orderId });
    }, []);

    const openProductModal = useCallback((product: Product) => {
        setSelectedProduct(product);
    }, []);

    const openCart = useCallback(() => {
        setCartOpen(true);
    }, []);

    // ── Attach window.ecomActions ──
    useEffect(() => {
        const addToCart = useCartStore.getState().addToCart;
        const removeFromCart = useCartStore.getState().removeFromCart;

        window.ecomActions = {
            addToCart: (productId: string, size?: string, color?: string) => {
                const product = PRODUCTS.find((p) => p.id === productId);
                if (product) {
                    addToCart(product, size, color);
                }
            },
            removeFromCart: (productId: string) => {
                removeFromCart(productId);
            },
            openProduct: (productId: string) => {
                const product = PRODUCTS.find((p) => p.id === productId);
                if (product) {
                    setView({ type: "shop" });
                    setSelectedProduct(product);
                }
            },
            openCart: () => {
                setCartOpen(true);
            },
            checkout: () => {
                setView({ type: "checkout" });
            },
            trackOrder: (orderId: string) => {
                setView({ type: "tracking", orderId });
            },
        };

        return () => {
            delete window.ecomActions;
        };
    }, []);

    return (
        <EcomLayout
            activeCategory={category}
            onCategoryChange={(cat) => {
                setCategory(cat);
                if (view.type !== "shop") setView({ type: "shop" });
            }}
            onCartOpen={openCart}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
        >
            {/* ── Product Grid (Home) ── */}
            {view.type === "shop" && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    {/* Hero banner */}
                    <div className="mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400 p-8 sm:p-12 text-white relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=50')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                        <div className="relative z-10 max-w-xl">
                            <p className="text-sm font-semibold uppercase tracking-widest mb-2 opacity-80">
                                AI-Powered Fashion
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
                                Shop with your Voice
                            </h1>
                            <p className="text-base opacity-90 leading-relaxed">
                                Ask our AI stylist for recommendations, add items to cart, and checkout — all by voice.
                            </p>
                        </div>
                    </div>

                    <ProductGrid
                        category={category}
                        searchQuery={searchQuery}
                        onViewProduct={openProductModal}
                    />
                </div>
            )}

            {/* ── Checkout ── */}
            {view.type === "checkout" && (
                <CheckoutPage
                    onBack={goToShop}
                    onOrderPlaced={goToConfirmation}
                />
            )}

            {/* ── Confirmation ── */}
            {view.type === "confirmation" && (
                <OrderConfirmation
                    orderId={view.orderId}
                    onTrackOrder={goToTracking}
                    onContinueShopping={goToShop}
                />
            )}

            {/* ── Tracking ── */}
            {view.type === "tracking" && (
                <OrderTracker orderId={view.orderId} onBack={goToShop} />
            )}

            {/* ── Product Modal ── */}
            {selectedProduct && (
                <ProductDetailsModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {/* ── Cart Drawer ── */}
            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                onCheckout={goToCheckout}
            />
        </EcomLayout>
    );
}
