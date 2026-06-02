import type { Product } from "@/types/product.types";
import type { FiltersState } from "./filtersSlice";

const effectivePrice = (product: Product): number => {
  if (product.discount.percentage > 0) {
    return Math.round(
      product.price - (product.price * product.discount.percentage) / 100
    );
  }
  if (product.discount.amount > 0) {
    return product.price - product.discount.amount;
  }
  return product.price;
};

export const filterProducts = (
  products: Product[],
  applied: FiltersState["applied"]
): Product[] => {
  const [minPrice, maxPrice] = applied.priceRange;

  return products.filter((product) => {
    const price = effectivePrice(product);
    if (price < minPrice || price > maxPrice) return false;
    return true;
  });
};
