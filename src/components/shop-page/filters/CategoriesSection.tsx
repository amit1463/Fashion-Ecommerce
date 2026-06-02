"use client";

import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/product.types";
import { CATEGORY_OPTIONS } from "./types";

type CategoriesSectionProps = {
  selected: ProductCategory | null;
  onSelect: (category: ProductCategory | null) => void;
};

const CategoriesSection = ({
  selected,
  onSelect,
}: CategoriesSectionProps) => {
  return (
    <div className="flex flex-col space-y-5">
      {CATEGORY_OPTIONS.map((category) => {
        const isActive = selected === category;
        return (
          <Link
            key={category}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onSelect(isActive ? null : category);
            }}
            aria-pressed={isActive}
            className={cn(
              "flex items-center justify-between text-black/60 text-base hover:text-black transition-colors",
              isActive && "text-black font-medium"
            )}
          >
            <span>{category}</span>
            <MdKeyboardArrowRight className="text-2xl" />
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesSection;
