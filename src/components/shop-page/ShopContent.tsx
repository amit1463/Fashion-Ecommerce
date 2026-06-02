"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilteredProductGrid from "@/components/shop-page/FilteredProductGrid";
import { Filters, MobileFilters } from "@/components/shop-page/filters";
import { filterProducts } from "@/lib/features/products/filterProducts";
import { useAppSelector } from "@/lib/hooks/redux";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Product } from "@/types/product.types";

type SortKey = "most-popular" | "low-price" | "high-price";

const effectivePrice = (product: Product): number => {
  if (product.discount.percentage > 0) {
    return Math.round(
      product.price - (product.price * product.discount.percentage) / 100
    );
  }
  if (product.discount.amount > 0) {
    return product.price - product.discount.amount;
  }
  return product.price;
};

const sortProducts = (products: Product[], sortBy: SortKey): Product[] => {
  if (sortBy === "low-price") {
    return [...products].sort(
      (a, b) => effectivePrice(a) - effectivePrice(b)
    );
  }
  if (sortBy === "high-price") {
    return [...products].sort(
      (a, b) => effectivePrice(b) - effectivePrice(a)
    );
  }
  // most-popular: highest rating first
  return [...products].sort((a, b) => b.rating - a.rating);
};

type ShopContentProps = {
  products: Product[];
};

const ShopContent = ({ products }: ShopContentProps) => {
  const [sortBy, setSortBy] = React.useState<SortKey>("most-popular");
  const applied = useAppSelector((state) => state.filters.applied);

  const filtered = React.useMemo(
    () => filterProducts(products, applied),
    [products, applied]
  );

  const sorted = React.useMemo(
    () => sortProducts(filtered, sortBy),
    [filtered, sortBy]
  );

  return (
    <div className="flex md:space-x-5 items-start">
      <aside className="hidden md:block md:min-w-[295px] md:max-w-[295px]">
        <Filters />
      </aside>
      <div className="flex flex-col w-full space-y-5">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
            <MobileFilters />
          </div>
          <div className="flex flex-col sm:items-center sm:flex-row">
            <span className="text-sm md:text-base text-black/60 mr-3">
              Showing {sorted.length} of {products.length} Products
            </span>
            <div className="flex items-center">
              Sort by:{" "}
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortKey)}
              >
                <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="most-popular">Most Popular</SelectItem>
                  <SelectItem value="low-price">Low Price</SelectItem>
                  <SelectItem value="high-price">High Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <FilteredProductGrid products={sorted} />
        <hr className="border-t-black/10" />
        <Pagination className="justify-between">
          <PaginationPrevious href="#" className="border border-black/10" />
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
                isActive
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden lg:block">
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="text-black/50 font-medium text-sm" />
            </PaginationItem>
            <PaginationItem className="hidden lg:block">
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
              >
                8
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:block">
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
              >
                9
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="text-black/50 font-medium text-sm"
              >
                10
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>

          <PaginationNext href="#" className="border border-black/10" />
        </Pagination>
      </div>
    </div>
  );
};

export default ShopContent;

// Exported for unit-testing - keeps the sort logic decoupled from the
// component so it can be exercised without rendering React.
export { sortProducts, effectivePrice };
export type { SortKey };
