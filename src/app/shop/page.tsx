import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import FilterSection from "@/components/shop-page/filters/FilterSection";
import MobileFilterButton from "@/components/shop-page/filters/MobileFilterButton";
import ShopGrid from "@/components/shop-page/ShopGrid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { newArrivalsData, relatedProductData, topSellingData } from "../page";
import { Product } from "@/types/product.types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Enrich products with filtering metadata
const enrichProductWithMetadata = (product: Product): Product => {
  const title = product.title.toLowerCase();

  // Infer category from title
  let category = "T-shirts"; // default
  if (title.includes("jeans")) category = "Jeans";
  else if (title.includes("shirt") && !title.includes("t-shirt")) category = "Shirts";
  else if (title.includes("shorts")) category = "Shorts";
  else if (title.includes("hoodie")) category = "Hoodie";

  // Infer dress style from title and category
  let dressStyle = "Casual"; // default
  if (title.includes("formal") || title.includes("polo")) dressStyle = "Formal";
  else if (title.includes("party")) dressStyle = "Party";
  else if (title.includes("gym") || title.includes("fit")) dressStyle = "Gym";

  // Add available sizes (typical for e-commerce)
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  // Infer colors from title or add common colors
  const colors: string[] = [];
  if (title.includes("black")) colors.push("Black");
  if (title.includes("white")) colors.push("White");
  if (title.includes("blue")) colors.push("Blue");
  if (title.includes("green")) colors.push("Green");
  if (title.includes("red")) colors.push("Red");

  // If no colors detected, add some default colors
  if (colors.length === 0) {
    colors.push("Blue", "Black");
  }

  return {
    ...product,
    category,
    sizes,
    colors,
    dressStyle,
  };
};

export default function ShopPage() {
  // Merge all products and enrich with metadata
  const allProducts = [
    ...relatedProductData,
    ...newArrivalsData,
    ...topSellingData,
  ].map(enrichProductWithMetadata);

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex flex-col lg:flex-row lg:space-x-5 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[295px] flex-shrink-0">
            <FilterSection />
          </aside>

          <div className="flex flex-col w-full space-y-5">
            <div className="flex items-center justify-between lg:hidden">
              <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
              {/* Mobile Filter Button */}
              <MobileFilterButton />
            </div>
            <div className="hidden lg:block">
              <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
            </div>
            <div className="flex flex-col sm:items-center sm:flex-row sm:justify-end">
              <div className="flex items-center">
                Sort by:{" "}
                <Select defaultValue="most-popular">
                  <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="most-popular">Most Popular</SelectItem>
                    <SelectItem value="low-price">Low Price</SelectItem>
                    <SelectItem value="high-price">High Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ShopGrid allProducts={allProducts} />
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious href="#" className="border border-black/10" />
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="hidden lg:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                </PaginationItem>
                <PaginationItem className="hidden lg:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    8
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="hidden sm:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    9
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    10
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>

              <PaginationNext href="#" className="border border-black/10" />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
