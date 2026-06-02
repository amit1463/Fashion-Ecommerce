"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { ProductSize } from "@/types/product.types";
import { SIZE_OPTIONS } from "./types";

type SizeSectionProps = {
  selected: ProductSize[];
  onToggle: (size: ProductSize) => void;
};

const SizeSection = ({ selected, onToggle }: SizeSectionProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZE_OPTIONS.map((size) => {
        const isActive = selected.includes(size);
        return (
          <button
            key={size}
            type="button"
            onClick={() => onToggle(size)}
            aria-pressed={isActive}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm transition-colors",
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
  );
};

export default SizeSection;
