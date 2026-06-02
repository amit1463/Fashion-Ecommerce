"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  PRICE_MAX,
  PRICE_MIN,
  setPriceRange,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";

const PriceSection = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.filters.priceRange);

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4 overflow-visible" contentClassName="!overflow-visible">
          <Slider
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={1}
            label="$"
            value={priceRange}
            onValueChange={(v) => dispatch(setPriceRange(v))}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
