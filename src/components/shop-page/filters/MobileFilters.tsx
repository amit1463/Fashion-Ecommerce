"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filters from "./index";
import type { FiltersState } from "./types";

type MobileFiltersProps = {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
};

const MobileFilters = ({ filters, onChange }: MobileFiltersProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open filters"
          className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#F0F0F0] hover:bg-black/10"
        >
          <Image
            src="/icons/filter.svg"
            alt=""
            width={16}
            height={14}
            aria-hidden
          />
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[90vh] overflow-y-auto rounded-t-3xl p-0"
      >
        <SheetTitle className="sr-only">Filters</SheetTitle>
        <Filters
          filters={filters}
          onChange={onChange}
          onApply={() => setOpen(false)}
          className="border-none"
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
