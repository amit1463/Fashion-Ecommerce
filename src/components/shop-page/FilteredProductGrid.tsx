"use client";

import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { filterProducts } from "@/lib/features/products/filterProducts";
import { useAppSelector } from "@/lib/hooks/redux";
import type { Product } from "@/types/product.types";

type FilteredProductGridProps = {
  products: Product[];
};

const FilteredProductGrid = ({ products }: FilteredProductGridProps) => {
  const applied = useAppSelector((state) => state.filters.applied);

  const filtered = React.useMemo(
    () => filterProducts(products, applied),
    [products, applied]
  );

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-black/10 px-6 py-10 text-center text-base text-black/60">
        No products match the selected filters. Try adjusting or clearing them.
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-black/60">
        Showing {filtered.length} of {products.length} Products
      </div>
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
};

export default FilteredProductGrid;
