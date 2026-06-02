import { describe, it, expect } from "vitest";
import { effectivePrice } from "./product";
import type { Product } from "@/types/product.types";

const baseProduct = (overrides: Partial<Product>): Product => ({
  id: 1,
  title: "Test Product",
  srcUrl: "/images/pic1.png",
  price: 100,
  discount: { amount: 0, percentage: 0 },
  rating: 4,
  ...overrides,
});

describe("effectivePrice", () => {
  it("returns the list price when there is no discount", () => {
    expect(effectivePrice(baseProduct({ price: 200 }))).toBe(200);
  });

  it("applies a percentage discount and rounds the result", () => {
    expect(
      effectivePrice(
        baseProduct({ price: 250, discount: { amount: 0, percentage: 20 } })
      )
    ).toBe(200);
  });

  it("rounds half-units when applying a percentage discount", () => {
    // 145 - 33% = 145 - 47.85 = 97.15 -> 97
    expect(
      effectivePrice(
        baseProduct({ price: 145, discount: { amount: 0, percentage: 33 } })
      )
    ).toBe(97);
  });

  it("subtracts a fixed-amount discount when the percentage is zero", () => {
    expect(
      effectivePrice(
        baseProduct({ price: 100, discount: { amount: 25, percentage: 0 } })
      )
    ).toBe(75);
  });

  it("prefers the percentage discount when both are non-zero", () => {
    // 200 with 50% off = 100, vs 200 - $10 = 190 -> percentage wins
    expect(
      effectivePrice(
        baseProduct({ price: 200, discount: { amount: 10, percentage: 50 } })
      )
    ).toBe(100);
  });
});
