"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleSizeFilter } from "@/lib/features/products/productsSlice";

const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

const SizeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedSizes = useAppSelector(
    (state) => state.products.filters.selectedSizes
  );

  const handleSizeToggle = (size: string) => {
    dispatch(toggleSizeFilter(size));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SIZES.map((size) => {
        const isSelected = selectedSizes.includes(size);
        return (
          <button
            key={size}
            onClick={() => handleSizeToggle(size)}
            className={`px-5 py-2.5 rounded-full text-sm transition-all ${
              isSelected
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
            }`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
};

export default SizeFilter;
