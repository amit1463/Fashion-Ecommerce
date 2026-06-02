"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { PRICE_MAX, PRICE_MIN } from "./types";

type PriceSectionProps = {
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const PriceSection = ({ value, onChange }: PriceSectionProps) => {
  return (
    <div className="pb-2">
      <Slider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={1}
        value={value}
        onValueChange={onChange}
        label="$"
        aria-label="Price range"
      />
    </div>
  );
};

export default PriceSection;
