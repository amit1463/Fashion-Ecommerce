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

/**
 * Filter products against the currently *applied* filter snapshot.
 *
 * Each non-empty dimension acts as an AND condition; an empty array
 * means "no constraint on this dimension". Price always applies (it
 * has explicit min/max bounds, never an empty selection).
 *
 * Products missing a filter-facing field (e.g. legacy data without a
 * `category`) are excluded as soon as that dimension has any active
 * value - they cannot satisfy a constraint they don't carry data for.
 */
export const filterProducts = (
  products: Product[],
  applied: FiltersState["applied"]
): Product[] => {
  const [minPrice, maxPrice] = applied.priceRange;

  return products.filter((product) => {
    const price = effectivePrice(product);
    if (price < minPrice || price > maxPrice) return false;

    if (applied.categories.length > 0) {
      if (!product.category || !applied.categories.includes(product.category)) {
        return false;
      }
    }

    if (applied.colors.length > 0) {
      if (!product.color || !applied.colors.includes(product.color)) {
        return false;
      }
    }

    if (applied.sizes.length > 0) {
      const productSizes = product.sizes ?? [];
      const hasOverlap = productSizes.some((s) => applied.sizes.includes(s));
      if (!hasOverlap) return false;
    }

    if (applied.dressStyles.length > 0) {
      if (
        !product.dressStyle ||
        !applied.dressStyles.includes(product.dressStyle)
      ) {
        return false;
      }
    }

    return true;
  });
};
