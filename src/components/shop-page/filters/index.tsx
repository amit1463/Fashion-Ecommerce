import React from "react";
import { FiSliders } from "react-icons/fi";
import ApplyFilterButton from "./ApplyFilterButton";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import DressStyleSection from "./DressStyleSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";

const Filters = () => {
  return (
    <>
      <div className="flex items-center justify-between py-5 border-b border-black/10">
        <span className="font-bold text-black text-xl">Filters</span>
        <FiSliders className="text-2xl text-black/40" />
      </div>
      <div className="py-5">
        <CategoriesSection />
      </div>
      <hr className="border-t-black/10" />
      <div className="py-5">
        <PriceSection />
      </div>
      <hr className="border-t-black/10" />
      <div className="py-5">
        <ColorsSection />
      </div>
      <hr className="border-t-black/10" />
      <div className="py-5">
        <SizeSection />
      </div>
      <hr className="border-t-black/10" />
      <div className="py-5">
        <DressStyleSection />
      </div>
      <ApplyFilterButton />
    </>
  );
};

export default Filters;
