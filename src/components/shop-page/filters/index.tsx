"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type {
  DressStyle,
  ProductCategory,
  ProductSize,
} from "@/types/product.types";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import DressStyleSection from "./DressStyleSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";
import { DEFAULT_FILTERS, type FiltersState } from "./types";

type FiltersProps = {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
  onApply: () => void;
  className?: string;
};

const Filters = ({ filters, onChange, onApply, className }: FiltersProps) => {
  const setCategory = (category: ProductCategory | null) =>
    onChange({ ...filters, category });
  const setPriceRange = (priceRange: [number, number]) =>
    onChange({ ...filters, priceRange });
  const setStyle = (style: DressStyle | null) =>
    onChange({ ...filters, style });

  const toggleColor = (hex: string) =>
    onChange({
      ...filters,
      colors: filters.colors.includes(hex)
        ? filters.colors.filter((c) => c !== hex)
        : [...filters.colors, hex],
    });

  const toggleSize = (size: ProductSize) =>
    onChange({
      ...filters,
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size],
    });

  const handleClear = () => onChange(DEFAULT_FILTERS);

  return (
    <div
      className={cn(
        "flex flex-col w-full rounded-2xl border border-black/10 px-5 py-5 md:px-6 md:py-6 space-y-5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl">Filters</h2>
        <button
          type="button"
          onClick={handleClear}
          className="text-black/40 hover:text-black"
          aria-label="Clear all filters"
        >
          <X width={20} height={20} aria-hidden="true" />
          <span className="sr-only">Clear all filters</span>
        </button>
      </div>
      <hr className="border-t-black/10" />

      <CategoriesSection
        selected={filters.category}
        onSelect={setCategory}
      />
      <hr className="border-t-black/10" />

      <Accordion
        type="multiple"
        defaultValue={["price", "colors", "size", "style"]}
        className="w-full"
      >
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="font-bold text-xl py-0 hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent className="pt-7 pb-0 overflow-visible">
            <PriceSection
              value={filters.priceRange}
              onChange={setPriceRange}
            />
          </AccordionContent>
        </AccordionItem>
        <hr className="border-t-black/10 my-5" />

        <AccordionItem value="colors" className="border-none">
          <AccordionTrigger className="font-bold text-xl py-0 hover:no-underline">
            Colors
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0">
            <ColorsSection
              selected={filters.colors}
              onToggle={toggleColor}
            />
          </AccordionContent>
        </AccordionItem>
        <hr className="border-t-black/10 my-5" />

        <AccordionItem value="size" className="border-none">
          <AccordionTrigger className="font-bold text-xl py-0 hover:no-underline">
            Size
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0">
            <SizeSection selected={filters.sizes} onToggle={toggleSize} />
          </AccordionContent>
        </AccordionItem>
        <hr className="border-t-black/10 my-5" />

        <AccordionItem value="style" className="border-none">
          <AccordionTrigger className="font-bold text-xl py-0 hover:no-underline">
            Dress Style
          </AccordionTrigger>
          <AccordionContent className="pt-3 pb-0">
            <DressStyleSection
              selected={filters.style}
              onSelect={setStyle}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        type="button"
        onClick={onApply}
        className="rounded-full bg-black text-white hover:bg-black/85 h-12 text-sm font-medium"
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default Filters;
