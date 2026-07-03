import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Product } from "../data/mockProducts";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartState {
    items: CartItem[];

    // Actions
    addToCart: (
        product: Product,
        size?: string,
        color?: string,
        qty?: number
    ) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

    // Derived helpers
    totalItems: () => number;
    totalPrice: () => number;
    discountedTotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, size, color, qty = 1) => {
                const selectedSize = size || product.availableSizes[0] || "";
                const selectedColor = color || product.colors[0] || "";

                set((state) => {
                    const existing = state.items.find(
                        (i) =>
                            i.product.id === product.id &&
                            i.selectedSize === selectedSize &&
                            i.selectedColor === selectedColor
                    );

                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.product.id === product.id &&
                                    i.selectedSize === selectedSize &&
                                    i.selectedColor === selectedColor
                                    ? { ...i, quantity: i.quantity + qty }
                                    : i
                            ),
                        };
                    }

                    return {
                        items: [
                            ...state.items,
                            { product, quantity: qty, selectedSize, selectedColor },
                        ],
                    };
                });
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.product.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }
                set((state) => ({
                    items: state.items.map((i) =>
                        i.product.id === productId ? { ...i, quantity } : i
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

            discountedTotal: () =>
                get().items.reduce((sum, i) => {
                    const discounted =
                        i.product.price * (1 - i.product.discount / 100);
                    return sum + discounted * i.quantity;
                }, 0),
        }),
        {
            name: "voicedots-ecom-cart",
        }
    )
);
