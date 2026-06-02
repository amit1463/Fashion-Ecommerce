"use client";

import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FILTER_COLORS,
  toggleColor,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { cn } from "@/lib/utils";

const ColorsSection = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.colors);

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="grid grid-cols-5 gap-2.5">
            {FILTER_COLORS.map((color) => {
              const isActive = selected.includes(color.name);
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => dispatch(toggleColor(color.name))}
                  aria-label={color.name}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full border border-black/20 transition",
                    color.code,
                    isActive && "ring-2 ring-offset-2 ring-black"
                  )}
                >
                  {isActive && (
                    <IoMdCheckmark
                      aria-hidden
                      className={cn(
                        "text-base",
                        color.name === "White" || color.name === "Yellow"
                          ? "text-black"
                          : "text-white"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
