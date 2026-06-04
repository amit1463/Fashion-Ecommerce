"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { FiSliders } from "react-icons/fi";
import Filters from ".";
import FilterChip from "./FilterChip";

const MobileFilters = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <FilterChip
            aria-label="Open filters"
            className="h-8 w-8 bg-[#F0F0F0]"
          >
            <FiSliders className="text-base text-black" />
          </FilterChip>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90%] overflow-y-auto rounded-t-[20px]">
          <SheetTitle className="sr-only">Filters</SheetTitle>
          <Filters />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
