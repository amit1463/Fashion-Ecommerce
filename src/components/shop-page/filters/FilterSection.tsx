"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import CategoryFilter from "./CategoryFilter";
import DressStyleFilter from "./DressStyleFilter";
import { useAppDispatch } from "@/lib/hooks/redux";
import { resetFilters } from "@/lib/features/products/productsSlice";

type FilterSectionProps = {
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
};

const FilterSection = ({
  className = "",
  onClose,
  showCloseButton = false,
}: FilterSectionProps) => {
  const dispatch = useAppDispatch();

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border border-black/10 rounded-[20px] p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <Separator className="mb-6" />

        <Accordion
          type="multiple"
          defaultValue={["categories", "price", "colors", "size", "dress-style"]}
          className="space-y-5"
        >
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline py-3">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <CategoryFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="price" className="border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline py-3">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <PriceFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="colors" className="border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline py-3">
              Colors
            </AccordionTrigger>
            <AccordionContent>
              <ColorFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="size" className="border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline py-3">
              Size
            </AccordionTrigger>
            <AccordionContent>
              <SizeFilter />
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="dress-style" className="border-none">
            <AccordionTrigger className="text-base font-bold hover:no-underline py-3">
              Dress Style
            </AccordionTrigger>
            <AccordionContent>
              <DressStyleFilter />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          onClick={handleResetFilters}
          className="w-full mt-6 bg-white text-black border border-black/10 hover:bg-black hover:text-white transition-colors"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
