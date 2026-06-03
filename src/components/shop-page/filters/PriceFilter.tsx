"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setPriceRange } from "@/lib/features/products/productsSlice";

const PriceFilter = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.products.filters.priceRange);

  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceRange([value[0], value[1]]));
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">${priceRange[0]}</span>
        <span className="text-sm font-medium">${priceRange[1]}</span>
      </div>
      <Slider
        min={0}
        max={500}
        step={10}
        value={priceRange}
        onValueChange={handlePriceChange}
        className="w-full"
      />
    </div>
  );
};

export default PriceFilter;
