"use client";

import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import type { DressStyle } from "@/types/product.types";
import { DRESS_STYLE_OPTIONS } from "./types";

type DressStyleSectionProps = {
  selected: DressStyle | null;
  onSelect: (style: DressStyle | null) => void;
};

const DressStyleSection = ({ selected, onSelect }: DressStyleSectionProps) => {
  return (
    <div className="flex flex-col space-y-5">
      {DRESS_STYLE_OPTIONS.map((style) => {
        const isActive = selected === style;
        return (
          <Link
            key={style}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              onSelect(isActive ? null : style);
            }}
            aria-pressed={isActive}
            className={cn(
              "flex items-center justify-between text-black/60 text-base hover:text-black transition-colors",
              isActive && "text-black font-medium"
            )}
          >
            <span>{style}</span>
            <MdKeyboardArrowRight className="text-2xl" />
          </Link>
        );
      })}
    </div>
  );
};

export default DressStyleSection;
