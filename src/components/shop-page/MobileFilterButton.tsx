"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import FilterSection from "./filters/FilterSection";

const MobileFilterButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="lg:hidden flex items-center gap-2 border-black/10"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[400px] overflow-y-auto p-0">
        <div className="p-4">
          <FilterSection showCloseButton onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterButton;
