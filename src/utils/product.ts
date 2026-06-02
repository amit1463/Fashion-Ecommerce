import type { Product } from "@/types/product.types";

/**
 * Calculate the actual price a customer pays for a product after applying any
 * active discount. Percentage discounts take precedence over fixed-amount
 * discounts when both are non-zero (matching the existing pricing UI).
 *
 * Returns an integer when a percentage discount is applied (rounded), and the
 * raw computed value otherwise.
 */
export const effectivePrice = (product: Product): number => {
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
