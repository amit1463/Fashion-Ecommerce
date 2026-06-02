import { describe, it, expect } from "vitest";
import { applyFilters } from "./applyFilters";
import { DEFAULT_FILTERS, type FiltersState } from "./types";
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

const noopFilters: FiltersState = {
  category: null,
  priceRange: [0, 1000],
  colors: [],
  sizes: [],
  style: null,
};

describe("applyFilters", () => {
  it("returns every product when filters are open", () => {
    const products = [
      baseProduct({ id: 1 }),
      baseProduct({ id: 2, price: 50 }),
      baseProduct({ id: 3, price: 999 }),
    ];

    expect(applyFilters(products, noopFilters)).toHaveLength(3);
  });

  it("filters by category", () => {
    const products = [
      baseProduct({ id: 1, category: "T-shirts" }),
      baseProduct({ id: 2, category: "Jeans" }),
      baseProduct({ id: 3, category: "Shirts" }),
    ];

    const result = applyFilters(products, {
      ...noopFilters,
      category: "Jeans",
    });

    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("filters by raw price when there is no discount", () => {
    const products = [
      baseProduct({ id: 1, price: 30 }),
      baseProduct({ id: 2, price: 100 }),
      baseProduct({ id: 3, price: 250 }),
    ];

    const result = applyFilters(products, {
      ...noopFilters,
      priceRange: [50, 200],
    });

    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("uses the discounted (effective) price for the price range check", () => {
    // 200 list price with 50% off -> 100 effective; should land in [50, 150]
    const discounted = baseProduct({
      id: 10,
      price: 200,
      discount: { amount: 0, percentage: 50 },
    });
    const tooExpensive = baseProduct({
      id: 11,
      price: 200,
      discount: { amount: 0, percentage: 0 },
    });

    const result = applyFilters([discounted, tooExpensive], {
      ...noopFilters,
      priceRange: [50, 150],
    });

    expect(result.map((p) => p.id)).toEqual([10]);
  });

  it("uses fixed-amount discount when percentage is zero", () => {
    const product = baseProduct({
      id: 20,
      price: 100,
      discount: { amount: 30, percentage: 0 },
    });

    const result = applyFilters([product], {
      ...noopFilters,
      priceRange: [60, 80],
    });

    expect(result.map((p) => p.id)).toEqual([20]);
  });

  it("filters by colors using OR semantics across the selected swatches", () => {
    const products = [
      baseProduct({ id: 1, colors: ["#000000", "#FFFFFF"] }),
      baseProduct({ id: 2, colors: ["#0606F5"] }),
      baseProduct({ id: 3, colors: ["#F50606", "#0606F5"] }),
    ];

    const result = applyFilters(products, {
      ...noopFilters,
      colors: ["#0606F5"],
    });

    expect(result.map((p) => p.id).sort()).toEqual([2, 3]);
  });

  it("matches colors case-insensitively", () => {
    const product = baseProduct({ id: 1, colors: ["#abcdef"] });

    const result = applyFilters([product], {
      ...noopFilters,
      colors: ["#ABCDEF"],
    });

    expect(result).toHaveLength(1);
  });

  it("filters by sizes using OR semantics", () => {
    const products = [
      baseProduct({ id: 1, sizes: ["Small", "Medium"] }),
      baseProduct({ id: 2, sizes: ["X-Large"] }),
      baseProduct({ id: 3, sizes: ["Medium", "Large"] }),
    ];

    const result = applyFilters(products, {
      ...noopFilters,
      sizes: ["Medium"],
    });

    expect(result.map((p) => p.id).sort()).toEqual([1, 3]);
  });

  it("filters by dress style", () => {
    const products = [
      baseProduct({ id: 1, style: "Casual" }),
      baseProduct({ id: 2, style: "Formal" }),
      baseProduct({ id: 3, style: "Casual" }),
    ];

    const result = applyFilters(products, {
      ...noopFilters,
      style: "Casual",
    });

    expect(result.map((p) => p.id).sort()).toEqual([1, 3]);
  });

  it("combines multiple filters with AND semantics", () => {
    const products = [
      baseProduct({
        id: 1,
        category: "T-shirts",
        colors: ["#000000"],
        sizes: ["Small"],
        style: "Casual",
        price: 80,
      }),
      // Wrong category
      baseProduct({
        id: 2,
        category: "Jeans",
        colors: ["#000000"],
        sizes: ["Small"],
        style: "Casual",
        price: 80,
      }),
      // Wrong color
      baseProduct({
        id: 3,
        category: "T-shirts",
        colors: ["#FFFFFF"],
        sizes: ["Small"],
        style: "Casual",
        price: 80,
      }),
    ];

    const result = applyFilters(products, {
      category: "T-shirts",
      priceRange: [50, 100],
      colors: ["#000000"],
      sizes: ["Small"],
      style: "Casual",
    });

    expect(result.map((p) => p.id)).toEqual([1]);
  });

  it("treats products with missing optional fields as not matching color/size constraints", () => {
    const product = baseProduct({ id: 1 }); // no colors, no sizes

    expect(
      applyFilters([product], { ...noopFilters, colors: ["#000000"] })
    ).toHaveLength(0);
    expect(
      applyFilters([product], { ...noopFilters, sizes: ["Small"] })
    ).toHaveLength(0);
  });

  it("includes products with missing optional fields when those filters are inactive", () => {
    const product = baseProduct({ id: 1 });

    expect(applyFilters([product], DEFAULT_FILTERS)).toHaveLength(1);
  });

  it("returns an empty array when input is empty", () => {
    expect(applyFilters([], DEFAULT_FILTERS)).toEqual([]);
  });
});
