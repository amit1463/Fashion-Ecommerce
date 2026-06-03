"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";

const DRESS_STYLES = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];

const DressStyleFilter = () => {
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);

  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  return (
    <div className="space-y-5">
      {DRESS_STYLES.map((style) => {
        const isSelected = selectedStyles.includes(style);
        return (
          <div key={style} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                id={`style-${style}`}
                checked={isSelected}
                onCheckedChange={() => handleStyleToggle(style)}
              />
              <label
                htmlFor={`style-${style}`}
                className="text-sm md:text-base cursor-pointer text-black/60"
              >
                {style}
              </label>
            </div>
            <ChevronRight className="w-4 h-4 text-black/60" />
          </div>
        );
      })}
    </div>
  );
};

export default DressStyleFilter;
