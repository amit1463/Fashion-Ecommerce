"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * FilterChip - shared circular/pill button primitive used by the filter
 * sidebar (color swatches, size pills, mobile-filters trigger).
 *
 * Centralises the common ``rounded-full + flex items-center justify-center``
 * shape so callers only specify their variant (size, color, selected state)
 * via ``className``. Extracted to avoid duplicating the same <button>
 * primitive across ColorsSection / SizeSection / MobileFilters.
 */
export type FilterChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
};

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, pressed, type = "button", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={pressed}
        className={cn(
          "flex items-center justify-center rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilterChip.displayName = "FilterChip";

export default FilterChip;
