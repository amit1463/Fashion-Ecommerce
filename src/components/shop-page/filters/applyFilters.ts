import type { Product } from "@/types/product.types";
import { effectivePrice } from "@/utils/product";
import type { FiltersState } from "./types";

/**
 * Filter a list of products against the current `FiltersState`. Each section
 * of the filter sidebar is treated as an AND constraint; a product is kept
 * only when it satisfies every active filter (category, price range, colors,
 * sizes, dress style). Empty arrays / null values are treated as "no filter
 * for this section".
 */
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
