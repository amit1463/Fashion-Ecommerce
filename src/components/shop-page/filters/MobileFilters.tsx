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

const MobileFilters = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open filters"
            className="h-8 w-8 rounded-full bg-[#F0F0F0] flex items-center justify-center"
          >
            <FiSliders className="text-base text-black" />
          </button>
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
