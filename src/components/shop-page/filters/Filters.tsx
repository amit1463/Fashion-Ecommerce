"use client";

import React from "react";
import { FaSliders } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  applyFilters,
  resetFilters,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch } from "@/lib/hooks/redux";
import { cn } from "@/lib/utils";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import DressStyleSection from "./DressStyleSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";

type FiltersProps = {
  className?: string;
  onApplied?: () => void;
};

const Filters = ({ className, onApplied }: FiltersProps) => {
  const dispatch = useAppDispatch();

  const handleApply = () => {
    dispatch(applyFilters());
    onApplied?.();
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div
      className={cn(
        "space-y-5 rounded-2xl border border-black/10 px-5 py-5 md:px-6 md:py-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-black text-xl">Filters</span>
        <FaSliders aria-hidden className="text-2xl text-black/40" />
      </div>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <hr className="border-t-black/10" />
      <DressStyleSection />
      <div className="flex flex-col gap-2 pt-1">
        <Button
          type="button"
          onClick={handleApply}
          className="rounded-full bg-black py-4 text-sm font-medium text-white hover:bg-black/90"
        >
          Apply Filter
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handleReset}
          className="rounded-full text-sm text-black/60 hover:text-black"
        >
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default Filters;
