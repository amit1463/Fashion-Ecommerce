import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import { newArrivalsData, relatedProductData, topSellingData } from "../page";
import ShopContent from "@/components/shop-page/ShopContent";

export default function ShopPage() {
  const products = [
    ...relatedProductData.slice(1, 4),
    ...newArrivalsData.slice(1, 4),
    ...topSellingData.slice(1, 4),
  ];

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <ShopContent products={products} />
      </div>
    </main>
  );
}
