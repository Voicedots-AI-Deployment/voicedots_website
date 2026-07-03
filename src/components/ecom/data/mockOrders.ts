export type OrderStatus =
    | "Ordered"
    | "Packed"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled"
    | "Return Initiated";

export const ORDER_TIMELINE: OrderStatus[] = [
    "Ordered",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
];

export interface OrderItem {
    productId: string;
    name: string;
    brand: string;
    image: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface Address {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    pincode: string;
}

export interface Order {
    orderId: string;
    items: OrderItem[];
    status: OrderStatus;
    address: Address;
    placedAt: string; // ISO date
    estimatedDelivery: string; // ISO date
    totalAmount: number;
}

// Pre-seeded demo order
export const SEED_ORDER: Order = {
    orderId: "VD-20260219-001",
    items: [
        {
            productId: "top-001",
            name: "Relaxed Fit Linen Shirt",
            brand: "H&M",
            image:
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=480&q=80",
            size: "M",
            color: "White",
            quantity: 1,
            price: 1999,
            discount: 30,
        },
        {
            productId: "shoe-001",
            name: "Retro Running Sneakers",
            brand: "Nike",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=480&q=80",
            size: "UK 9",
            color: "White/Grey",
            quantity: 1,
            price: 8995,
            discount: 20,
        },
    ],
    status: "Shipped",
    address: {
        fullName: "Rahul Sharma",
        phone: "9876543210",
        addressLine: "42, MG Road, Koramangala",
        city: "Bangalore",
        pincode: "560034",
    },
    placedAt: "2026-02-17T10:30:00Z",
    estimatedDelivery: "2026-02-22T18:00:00Z",
    totalAmount: 8595,
};
