import type { Product } from "@/types/product.types";
import type { FiltersState } from "./types";

const effectivePrice = (product: Product) => {
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

export const applyFilters = (
  products: Product[],
  filters: FiltersState
): Product[] => {
  const [minPrice, maxPrice] = filters.priceRange;

  return products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    const price = effectivePrice(product);
    if (price < minPrice || price > maxPrice) {
      return false;
    }

    if (filters.colors.length > 0) {
      const productColors = (product.colors ?? []).map((c) => c.toUpperCase());
      const wanted = filters.colors.map((c) => c.toUpperCase());
      if (!wanted.some((c) => productColors.includes(c))) {
        return false;
      }
    }

    if (filters.sizes.length > 0) {
      const productSizes = product.sizes ?? [];
      if (!filters.sizes.some((s) => productSizes.includes(s))) {
        return false;
      }
    }

    if (filters.style && product.style !== filters.style) {
      return false;
    }

    return true;
  });
};
