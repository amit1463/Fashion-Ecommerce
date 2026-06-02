import { describe, expect, it } from "vitest";
import { filterProducts } from "./filterProducts";
import type { FiltersState } from "./filtersSlice";
import type { Product } from "@/types/product.types";

const noDiscount = { amount: 0, percentage: 0 };

const sample: Product[] = [
  {
    id: 1,
    title: "Tee",
    srcUrl: "/x.png",
    price: 100,
    discount: noDiscount,
    rating: 5,
    category: "T-shirts",
    color: "Red",
    sizes: ["Small", "Medium"],
    dressStyle: "Casual",
  },
  {
    id: 2,
    title: "Shirt",
    srcUrl: "/x.png",
    price: 200,
    discount: noDiscount,
    rating: 4,
    category: "Shirts",
    color: "Blue",
    sizes: ["Large", "X-Large"],
    dressStyle: "Formal",
  },
  {
    id: 3,
    title: "Jeans",
    srcUrl: "/x.png",
    price: 300,
    discount: { amount: 0, percentage: 50 }, // effective 150
    rating: 3,
    category: "Jeans",
    color: "Blue",
    sizes: ["Medium", "Large"],
    dressStyle: "Casual",
  },
];

const buildApplied = (
  overrides: Partial<FiltersState["applied"]> = {}
): FiltersState["applied"] => ({
  categories: [],
  priceRange: [0, 500],
  colors: [],
  sizes: [],
  dressStyles: [],
  ...overrides,
});

describe("filterProducts", () => {
  it("returns all products when no filters are applied", () => {
    const result = filterProducts(sample, buildApplied());
    expect(result).toHaveLength(3);
  });

  it("filters by price range using effective price (after discount)", () => {
    // Jeans (id=3) has effective price 150 after 50% discount, so a
    // 0-180 range should keep id=1 (100) and id=3 (150) but drop id=2 (200).
    const result = filterProducts(sample, buildApplied({ priceRange: [0, 180] }));
    expect(result.map((p) => p.id).sort()).toEqual([1, 3]);
  });

  it("filters by category (single)", () => {
    const result = filterProducts(
      sample,
      buildApplied({ categories: ["T-shirts"] })
    );
    expect(result.map((p) => p.id)).toEqual([1]);
  });

  it("filters by category (multiple = OR within dimension)", () => {
    const result = filterProducts(
      sample,
      buildApplied({ categories: ["T-shirts", "Jeans"] })
    );
    expect(result.map((p) => p.id).sort()).toEqual([1, 3]);
  });

  it("filters by color", () => {
    const result = filterProducts(sample, buildApplied({ colors: ["Blue"] }));
    expect(result.map((p) => p.id).sort()).toEqual([2, 3]);
  });

  it("filters by size (array intersection)", () => {
    const result = filterProducts(sample, buildApplied({ sizes: ["Medium"] }));
    expect(result.map((p) => p.id).sort()).toEqual([1, 3]);
  });

  it("filters by dressStyle", () => {
    const result = filterProducts(
      sample,
      buildApplied({ dressStyles: ["Formal"] })
    );
    expect(result.map((p) => p.id)).toEqual([2]);
  });

  it("combines multiple dimensions with AND", () => {
    // Casual AND Blue -> only Jeans (id=3)
    const result = filterProducts(
      sample,
      buildApplied({ dressStyles: ["Casual"], colors: ["Blue"] })
    );
    expect(result.map((p) => p.id)).toEqual([3]);
  });

  it("returns empty when no product matches all dimensions", () => {
    const result = filterProducts(
      sample,
      buildApplied({ categories: ["Shorts"] })
    );
    expect(result).toEqual([]);
  });

  it("excludes products missing a filter-relevant field once that dimension is active", () => {
    const partial: Product[] = [
      ...sample,
      {
        id: 99,
        title: "Legacy",
        srcUrl: "/x.png",
        price: 50,
        discount: noDiscount,
        rating: 3,
        // no category/color/sizes/dressStyle
      },
    ];
    // No filters: legacy product is included
    expect(filterProducts(partial, buildApplied()).map((p) => p.id)).toContain(
      99
    );
    // Active category filter excludes the legacy product
    expect(
      filterProducts(partial, buildApplied({ categories: ["T-shirts"] })).map(
        (p) => p.id
      )
    ).not.toContain(99);
  });

  it("price range applies even when other filters are empty", () => {
    // effective prices: id=1->100, id=2->200, id=3->150 (after 50% off).
    // range [160, 250] should keep only id=2.
    const result = filterProducts(
      sample,
      buildApplied({ priceRange: [160, 250] })
    );
    expect(result.map((p) => p.id)).toEqual([2]);
  });
});
