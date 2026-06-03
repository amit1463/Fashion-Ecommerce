"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleCategoryFilter } from "@/lib/features/products/productsSlice";
import { ChevronRight } from "lucide-react";

const CATEGORIES = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.products.filters.selectedCategories
  );

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategoryFilter(category));
  };

  return (
    <div className="space-y-5">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={isSelected}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm md:text-base cursor-pointer text-black/60"
              >
                {category}
              </label>
            </div>
            <ChevronRight className="w-4 h-4 text-black/60" />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
