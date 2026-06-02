"use client";

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  FILTER_CATEGORIES,
  toggleCategory,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { cn } from "@/lib/utils";

const CategoriesSection = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.categories);

  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {FILTER_CATEGORIES.map((category) => {
        const isActive = selected.includes(category);
        return (
          <button
            key={category}
            type="button"
            onClick={() => dispatch(toggleCategory(category))}
            aria-pressed={isActive}
            className={cn(
              "flex items-center justify-between py-2 text-left text-base transition-colors hover:text-black",
              isActive && "font-medium text-black"
            )}
          >
            <span>{category}</span>
            <MdKeyboardArrowRight aria-hidden className="text-2xl" />
          </button>
        );
      })}
    </div>
  );
};

export default CategoriesSection;
