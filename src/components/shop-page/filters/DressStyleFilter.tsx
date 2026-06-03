"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleDressStyleFilter } from "@/lib/features/products/productsSlice";

const DRESS_STYLES = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];

const DressStyleFilter = () => {
  const dispatch = useAppDispatch();
  const selectedStyles = useAppSelector(
    (state) => state.products.filters.selectedDressStyles
  );

  const handleStyleToggle = (style: string) => {
    dispatch(toggleDressStyleFilter(style));
  };

  return (
    <div className="space-y-5">
      {DRESS_STYLES.map((style) => {
        const isSelected = selectedStyles.includes(style);
        return (
          <div key={style} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`style-${style}`}
                checked={isSelected}
                onCheckedChange={() => handleStyleToggle(style)}
              />
              <label
                htmlFor={`style-${style}`}
                className="text-sm md:text-base cursor-pointer text-black/60"
              >
                {style}
              </label>
            </div>
            <ChevronRight className="w-4 h-4 text-black/60" />
          </div>
        );
      })}
    </div>
  );
};

export default DressStyleFilter;
