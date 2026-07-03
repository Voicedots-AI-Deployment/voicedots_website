import { type ReactNode } from "react";
import EcomHeader from "./EcomHeader";
import EcomFooter from "./EcomFooter";
import { type Category } from "../data/mockProducts";

interface EcomLayoutProps {
    children: ReactNode;
    activeCategory: Category;
    onCategoryChange: (cat: Category) => void;
    onCartOpen: () => void;
    searchQuery: string;
    onSearchChange: (q: string) => void;
}

export default function EcomLayout({
    children,
    activeCategory,
    onCategoryChange,
    onCartOpen,
    searchQuery,
    onSearchChange,
}: EcomLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
            <EcomHeader
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
                onCartOpen={onCartOpen}
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
            />
            <main className="flex-1">{children}</main>
            <EcomFooter />
        </div>
    );
}
