"use client";

import React from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product.types";

interface ShopGridProps {
  allProducts: Product[];
}

const ShopGrid = ({ allProducts }: ShopGridProps) => {
  const filters = useAppSelector((state) => state.products.filters);

  // Apply all filters to the product list
  const filteredProducts = React.useMemo(() => {
    return allProducts.filter((product) => {
      // Calculate discounted price
      const finalPrice =
        product.discount.percentage > 0
          ? product.price * (1 - product.discount.percentage / 100)
          : product.price;

      // Price filter
      const [minPrice, maxPrice] = filters.priceRange;
      if (finalPrice < minPrice || finalPrice > maxPrice) {
        return false;
      }

      // Category filter
      if (
        filters.selectedCategories.length > 0 &&
        product.category &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Color filter
      if (filters.selectedColors.length > 0) {
        if (!product.colors || product.colors.length === 0) {
          return false;
        }
        const hasMatchingColor = product.colors.some((color) =>
          filters.selectedColors.includes(color)
        );
        if (!hasMatchingColor) {
          return false;
        }
      }

      // Size filter
      if (filters.selectedSizes.length > 0) {
        if (!product.sizes || product.sizes.length === 0) {
          return false;
        }
        const hasMatchingSize = product.sizes.some((size) =>
          filters.selectedSizes.includes(size)
        );
        if (!hasMatchingSize) {
          return false;
        }
      }

      // Dress style filter
      if (
        filters.selectedDressStyles.length > 0 &&
        product.dressStyle &&
        !filters.selectedDressStyles.includes(product.dressStyle)
      ) {
        return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-black/60">
            Showing 1-{Math.min(filteredProducts.length, 10)} of{" "}
            {filteredProducts.length} Products
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {filteredProducts.slice(0, 10).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default ShopGrid;
