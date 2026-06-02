"use client";

import React from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import Filters from "@/components/shop-page/filters";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import { applyFilters } from "@/components/shop-page/filters/applyFilters";
import {
  DEFAULT_FILTERS,
  type FiltersState,
} from "@/components/shop-page/filters/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/data/products";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { effectivePrice } from "@/utils/product";

type SortOption = "most-popular" | "low-price" | "high-price";

// Module-scope so the array isn't rebuilt on every render.
const ALL_PRODUCTS = [
  ...relatedProductData,
  ...newArrivalsData,
  ...topSellingData,
];

export default function ShopPage() {
  const [draftFilters, setDraftFilters] =
    React.useState<FiltersState>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    React.useState<FiltersState>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortOption>("most-popular");

  const filteredProducts = React.useMemo(() => {
    const filtered = applyFilters(ALL_PRODUCTS, appliedFilters);
    const sorted = [...filtered];
    if (sort === "low-price") {
      sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    } else if (sort === "high-price") {
      sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    }
    return sorted;
  }, [appliedFilters, sort]);

  const totalProducts = filteredProducts.length;
  const showingTo = Math.min(10, totalProducts);
  const showingFrom = totalProducts === 0 ? 0 : 1;

  const heading = appliedFilters.category ?? "All Products";

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <aside className="hidden md:block min-w-[295px] max-w-[295px] sticky top-5">
            <Filters
              filters={draftFilters}
              onChange={setDraftFilters}
              onApply={() => setAppliedFilters(draftFilters)}
            />
          </aside>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
              <div className="flex items-center justify-between gap-3">
                <h1 className="font-bold text-2xl md:text-[32px]">{heading}</h1>
                <MobileFilters
                  filters={draftFilters}
                  onChange={(next) => {
                    setDraftFilters(next);
                    setAppliedFilters(next);
                  }}
                />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {showingFrom}-{showingTo} of {totalProducts} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select
                    value={sort}
                    onValueChange={(value) => setSort(value as SortOption)}
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
            {filteredProducts.length === 0 ? (
              <div className="border border-dashed border-black/10 rounded-2xl py-16 text-center text-black/60">
                No products match the selected filters.
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {filteredProducts.slice(0, 10).map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
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
      </div>
    </main>
  );
}
