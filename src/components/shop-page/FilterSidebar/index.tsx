"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const categories = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

const colors = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Light Blue", hex: "#06CAF5" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
];

const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

const dressStyles = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];

export default function FilterSidebar({ onClose, isMobile = false }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    // TODO: out of scope - implement business logic
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleColorToggle = (colorName: string) => {
    // TODO: out of scope - implement business logic
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleSizeToggle = (size: string) => {
    // TODO: out of scope - implement business logic
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleStyleToggle = (style: string) => {
    // TODO: out of scope - implement business logic
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleApplyFilters = () => {
    // TODO: out of scope - implement business logic
    if (onClose) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    // TODO: out of scope - implement business logic
    setSelectedCategories([]);
    setPriceRange([50, 200]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      {isMobile && (
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-black/40 hover:text-black h-auto w-auto p-0"
            aria-label="Close filters"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Filters Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? "px-6" : "px-0"}`}>
        <Accordion type="multiple" defaultValue={["categories", "price", "colors", "size", "style"]} className="w-full">
          {/* Categories */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-base font-bold py-5 hover:no-underline">
              Categories
            </AccordionTrigger>
            <AccordionContent contentClassName="space-y-5 pb-6">
              <div className="space-y-5">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 rounded border-black/10 text-black focus:ring-black"
                    />
                    <span className="text-black/60 group-hover:text-black text-sm">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="bg-black/10" />

          {/* Price */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-bold py-5 hover:no-underline">
              Price
            </AccordionTrigger>
            <AccordionContent contentClassName="pb-6">
              <div className="space-y-4 pt-2">
                <Slider
                  min={50}
                  max={200}
                  step={10}
                  defaultValue={priceRange}
                  label="$"
                  onValueChange={(values) => setPriceRange([values[0], values[1]])}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="bg-black/10" />

          {/* Colors */}
          <AccordionItem value="colors">
            <AccordionTrigger className="text-base font-bold py-5 hover:no-underline">
              Colors
            </AccordionTrigger>
            <AccordionContent contentClassName="pb-6">
              <div className="grid grid-cols-5 gap-4">
                {colors.map((color) => (
                  <Button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    variant="ghost"
                    size="icon"
                    className={`w-9 h-9 rounded-full border-2 transition-all p-0 hover:bg-transparent ${
                      selectedColors.includes(color.name)
                        ? "border-black scale-110"
                        : "border-black/20 hover:border-black/40"
                    } ${color.hex === "#FFFFFF" ? "shadow-sm" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Filter by ${color.name}`}
                    title={color.name}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="bg-black/10" />

          {/* Size */}
          <AccordionItem value="size">
            <AccordionTrigger className="text-base font-bold py-5 hover:no-underline">
              Size
            </AccordionTrigger>
            <AccordionContent contentClassName="pb-6">
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    variant="ghost"
                    className={`px-5 py-2.5 rounded-full text-sm transition-all h-auto ${
                      selectedSizes.includes(size)
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-black/5"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator className="bg-black/10" />

          {/* Dress Style */}
          <AccordionItem value="style">
            <AccordionTrigger className="text-base font-bold py-5 hover:no-underline">
              Dress Style
            </AccordionTrigger>
            <AccordionContent contentClassName="space-y-5 pb-6">
              <div className="space-y-5">
                {dressStyles.map((style) => (
                  <label
                    key={style}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStyles.includes(style)}
                      onChange={() => handleStyleToggle(style)}
                      className="w-4 h-4 rounded border-black/10 text-black focus:ring-black"
                    />
                    <span className="text-black/60 group-hover:text-black text-sm">
                      {style}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer Buttons (Mobile) */}
      {isMobile && (
        <div className="px-6 py-5 border-t border-black/10 space-y-3">
          <Button onClick={handleApplyFilters} className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12">
            Apply Filter
          </Button>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="w-full rounded-full h-12 border-black/10"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
