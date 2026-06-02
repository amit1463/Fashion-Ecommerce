"use client";

import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FILTER_DRESS_STYLES,
  toggleDressStyle,
} from "@/lib/features/products/filtersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { cn } from "@/lib/utils";

const DressStyleSection = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.dressStyles);

  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Dress Style
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-hidden">
          <div className="flex flex-col space-y-0.5 text-black/60">
            {FILTER_DRESS_STYLES.map((style) => {
              const isActive = selected.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => dispatch(toggleDressStyle(style))}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center justify-between py-2 text-left text-base transition-colors hover:text-black",
                    isActive && "font-medium text-black"
                  )}
                >
                  <span>{style}</span>
                  <MdKeyboardArrowRight aria-hidden className="text-2xl" />
                </button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
