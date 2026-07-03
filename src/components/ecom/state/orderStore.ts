import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    type Order,
    type OrderItem,
    type Address,
    type OrderStatus,
    SEED_ORDER,
} from "../data/mockOrders";
import { useCartStore, type CartItem } from "./cartStore";

interface OrderState {
    orders: Order[];

    placeOrder: (address: Address) => string; // returns orderId
    cancelOrder: (orderId: string) => void;
    initiateReturn: (orderId: string) => void;
    getOrder: (orderId: string) => Order | undefined;
    updateStatus: (orderId: string, status: OrderStatus) => void;
}

function cartItemToOrderItem(ci: CartItem): OrderItem {
    return {
        productId: ci.product.id,
        name: ci.product.name,
        brand: ci.product.brand,
        image: ci.product.images[0],
        size: ci.selectedSize,
        color: ci.selectedColor,
        quantity: ci.quantity,
        price: ci.product.price,
        discount: ci.product.discount,
    };
}

function generateOrderId(): string {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `VD-${date}-${rand}`;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [SEED_ORDER],

            placeOrder: (address) => {
                const cartItems = useCartStore.getState().items;
                if (cartItems.length === 0) return "";

                const orderId = generateOrderId();
                const items = cartItems.map(cartItemToOrderItem);
                const totalAmount = items.reduce((s, i) => {
                    return s + i.price * (1 - i.discount / 100) * i.quantity;
                }, 0);

                const estimated = new Date();
                estimated.setDate(estimated.getDate() + 5);

                const order: Order = {
                    orderId,
                    items,
                    status: "Ordered",
                    address,
                    placedAt: new Date().toISOString(),
                    estimatedDelivery: estimated.toISOString(),
                    totalAmount: Math.round(totalAmount),
                };

                set((state) => ({ orders: [order, ...state.orders] }));
                useCartStore.getState().clearCart();
                return orderId;
            },

            cancelOrder: (orderId) => {
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.orderId === orderId ? { ...o, status: "Cancelled" as OrderStatus } : o
                    ),
                }));
            },

            initiateReturn: (orderId) => {
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.orderId === orderId
                            ? { ...o, status: "Return Initiated" as OrderStatus }
                            : o
                    ),
                }));
            },

            getOrder: (orderId) => get().orders.find((o) => o.orderId === orderId),

            updateStatus: (orderId, status) => {
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.orderId === orderId ? { ...o, status } : o
                    ),
                }));
            },
        }),
        {
            name: "voicedots-ecom-orders",
        }
    )
);
