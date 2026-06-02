"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FILTER_SIZES,
  toggleSize,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { cn } from "@/lib/utils";

const SizeSection = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.sizes);

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {FILTER_SIZES.map((size) => {
              const isActive = selected.includes(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => dispatch(toggleSize(size))}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
