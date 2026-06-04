"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

type FilterColor = {
  name: string;
  code: string;
};

const colorsData: FilterColor[] = [
  { name: "Green", code: "bg-green-600" },
  { name: "Red", code: "bg-red-600" },
  { name: "Yellow", code: "bg-yellow-300" },
  { name: "Orange", code: "bg-orange-500" },
  { name: "Cyan", code: "bg-cyan-400" },
  { name: "Blue", code: "bg-blue-600" },
  { name: "Purple", code: "bg-purple-700" },
  { name: "Pink", code: "bg-pink-400" },
  { name: "White", code: "bg-white border border-black/20" },
  { name: "Black", code: "bg-black" },
];

const ColorsSection = () => {
  const [selected, setSelected] = useState<string>("Blue");

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 overflow-visible">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colorsData.map((color, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Filter by ${color.name}`}
                aria-pressed={selected === color.name}
                className={cn([
                  color.code,
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center",
                ])}
                onClick={() => setSelected(color.name)}
              >
                {selected === color.name && (
                  <IoMdCheckmark
                    className={cn(
                      "text-base",
                      color.name === "White" || color.name === "Yellow"
                        ? "text-black"
                        : "text-white"
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
