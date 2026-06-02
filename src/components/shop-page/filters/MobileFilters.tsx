"use client";

import React from "react";
import { FaSliders } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filters from "./Filters";

const MobileFilters = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Open filters"
          className="rounded-full bg-[#F0F0F0] border-none md:hidden"
        >
          <FaSliders aria-hidden className="text-base text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto p-4">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left font-bold text-xl">
            Filters
          </SheetTitle>
        </SheetHeader>
        <Filters
          className="border-none p-0"
          onApplied={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
