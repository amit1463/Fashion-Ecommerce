"use client";

import { Button } from "@/components/ui/button";
import React from "react";

// TODO: out of scope - implement business logic (filter state, query
// param sync, server-side filtering). For now this is a UI-only stub.
function handleApplyFilter() {
  /* TODO: out of scope */
}

const ApplyFilterButton = () => {
  return (
    <Button
      type="button"
      className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
      onClick={handleApplyFilter}
    >
      Apply Filter
    </Button>
  );
};

export default ApplyFilterButton;
