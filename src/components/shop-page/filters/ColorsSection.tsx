"use client";

import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";
import { COLOR_OPTIONS } from "./types";

type ColorsSectionProps = {
  selected: string[];
  onToggle: (hex: string) => void;
};

const ColorsSection = ({ selected, onToggle }: ColorsSectionProps) => {
  return (
    <div className="grid grid-cols-5 gap-2.5">
      {COLOR_OPTIONS.map((color) => {
        const isActive = selected.includes(color.hex);
        const isLight =
          color.hex.toUpperCase() === "#FFFFFF" ||
          color.hex.toUpperCase() === "#F5DD06";
        return (
          <button
            key={color.hex}
            type="button"
            onClick={() => onToggle(color.hex)}
            aria-pressed={isActive}
            aria-label={color.name}
            className={cn(
              "aspect-square rounded-full flex items-center justify-center border border-black/20 transition-shadow",
              isActive && "ring-2 ring-offset-2 ring-black"
            )}
            style={{ backgroundColor: color.hex }}
          >
            {isActive && (
              <IoMdCheckmark
                className={cn(
                  "text-base",
                  isLight ? "text-black" : "text-white"
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorsSection;
