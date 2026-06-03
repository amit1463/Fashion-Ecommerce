"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleColorFilter } from "@/lib/features/products/productsSlice";

const COLORS = [
  { name: "Green", code: "bg-[#00C12B]" },
  { name: "Red", code: "bg-[#F50606]" },
  { name: "Yellow", code: "bg-[#F5DD06]" },
  { name: "Orange", code: "bg-[#F57906]" },
  { name: "Blue", code: "bg-[#06CAF5]" },
  { name: "Purple", code: "bg-[#7D06F5]" },
  { name: "Pink", code: "bg-[#F506A4]" },
  { name: "White", code: "bg-white border border-black/10" },
  { name: "Black", code: "bg-black" },
];

const ColorFilter = () => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector(
    (state) => state.products.filters.selectedColors
  );

  const handleColorToggle = (colorName: string) => {
    dispatch(toggleColorFilter(colorName));
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {COLORS.map((color) => {
        const isSelected = selectedColors.includes(color.name);
        return (
          <button
            key={color.name}
            onClick={() => handleColorToggle(color.name)}
            className={`relative w-9 h-9 rounded-full ${color.code} flex items-center justify-center transition-all ${
              isSelected ? "ring-2 ring-black ring-offset-2" : ""
            }`}
            aria-label={`Filter by ${color.name}`}
          >
            {isSelected && (
              <svg
                className={`w-4 h-4 ${
                  color.name === "White" ? "text-black" : "text-white"
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;
