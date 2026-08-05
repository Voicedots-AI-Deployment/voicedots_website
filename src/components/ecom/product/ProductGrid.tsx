import { type Product, type Category, PRODUCTS } from "../data/mockProducts";
import ProductCard from "./ProductCard";
import { useMemo } from "react";

interface ProductGridProps {
    category: Category;
    searchQuery: string;
    onViewProduct: (product: Product) => void;
}

export default function ProductGrid({
    category,
    searchQuery,
    onViewProduct,
}: ProductGridProps) {
    const filtered = useMemo(() => {
        let result = PRODUCTS;

        if (category !== "all") {
            result = result.filter((p) => p.category === category);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.brand.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
            );
        }

        return result;
    }, [category, searchQuery]);

    if (filtered.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try a different search or category</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product, i) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onViewProduct={onViewProduct}
                    index={i}
                />
            ))}
        </div>
    );
}
