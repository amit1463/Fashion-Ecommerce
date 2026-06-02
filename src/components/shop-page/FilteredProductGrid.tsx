"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import type { Product } from "@/types/product.types";

type FilteredProductGridProps = {
  products: Product[];
};

/**
 * Renders the product grid. Filtering and sorting happen upstream in
 * `ShopContent`; this component is purely presentational so the same
 * grid can be reused with any pre-computed product list.
 */
const FilteredProductGrid = ({ products }: FilteredProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 px-6 py-10 text-center text-base text-black/60">
        No products match the selected filters. Try adjusting or clearing them.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default FilteredProductGrid;
