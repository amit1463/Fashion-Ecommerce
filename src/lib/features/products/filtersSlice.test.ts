import { describe, expect, it } from "vitest";
import filtersReducer, {
  applyFilters,
  PRICE_MAX,
  PRICE_MIN,
  resetFilters,
  setPriceRange,
  toggleCategory,
  toggleColor,
  toggleDressStyle,
  toggleSize,
} from "./filtersSlice";
import type { FiltersState } from "./filtersSlice";

const initialState = (): FiltersState =>
  filtersReducer(undefined, { type: "@@INIT" });

describe("filtersSlice", () => {
  it("starts with empty selections and full price range", () => {
    const state = initialState();
    expect(state.categories).toEqual([]);
    expect(state.priceRange).toEqual([PRICE_MIN, PRICE_MAX]);
    expect(state.colors).toEqual([]);
    expect(state.sizes).toEqual([]);
    expect(state.dressStyles).toEqual([]);
    expect(state.applied).toEqual({
      categories: [],
      priceRange: [PRICE_MIN, PRICE_MAX],
      colors: [],
      sizes: [],
      dressStyles: [],
    });
  });

  it("toggleCategory adds and removes (idempotent toggle)", () => {
    const s1 = filtersReducer(initialState(), toggleCategory("T-shirts"));
    expect(s1.categories).toEqual(["T-shirts"]);
    const s2 = filtersReducer(s1, toggleCategory("Jeans"));
    expect([...s2.categories].sort()).toEqual(["Jeans", "T-shirts"]);
    const s3 = filtersReducer(s2, toggleCategory("T-shirts"));
    expect(s3.categories).toEqual(["Jeans"]);
  });

  it("toggleColor / toggleSize / toggleDressStyle behave the same way", () => {
    const s1 = filtersReducer(initialState(), toggleColor("Red"));
    expect(s1.colors).toEqual(["Red"]);
    const s2 = filtersReducer(s1, toggleSize("Large"));
    expect(s2.sizes).toEqual(["Large"]);
    const s3 = filtersReducer(s2, toggleDressStyle("Casual"));
    expect(s3.dressStyles).toEqual(["Casual"]);
    // toggle off
    const s4 = filtersReducer(s3, toggleColor("Red"));
    expect(s4.colors).toEqual([]);
  });

  it("setPriceRange updates only the staged range, not applied", () => {
    const s = filtersReducer(initialState(), setPriceRange([50, 200]));
    expect(s.priceRange).toEqual([50, 200]);
    expect(s.applied.priceRange).toEqual([PRICE_MIN, PRICE_MAX]);
  });

  it("staging changes do NOT affect `applied` until applyFilters is dispatched", () => {
    let state = initialState();
    state = filtersReducer(state, toggleCategory("T-shirts"));
    state = filtersReducer(state, toggleColor("Blue"));
    state = filtersReducer(state, setPriceRange([10, 100]));
    expect(state.applied.categories).toEqual([]);
    expect(state.applied.colors).toEqual([]);
    expect(state.applied.priceRange).toEqual([PRICE_MIN, PRICE_MAX]);

    state = filtersReducer(state, applyFilters());
    expect(state.applied.categories).toEqual(["T-shirts"]);
    expect(state.applied.colors).toEqual(["Blue"]);
    expect(state.applied.priceRange).toEqual([10, 100]);
  });

  it("applyFilters copies arrays so further staging does not mutate `applied`", () => {
    let state = initialState();
    state = filtersReducer(state, toggleCategory("T-shirts"));
    state = filtersReducer(state, applyFilters());
    const appliedSnapshot = state.applied.categories;
    state = filtersReducer(state, toggleCategory("Shirts"));
    // The applied snapshot should still be the value at apply-time.
    expect(appliedSnapshot).toEqual(["T-shirts"]);
    expect(state.applied.categories).toEqual(["T-shirts"]);
    expect([...state.categories].sort()).toEqual(["Shirts", "T-shirts"]);
  });

  it("resetFilters clears both staged and applied state", () => {
    let state = initialState();
    state = filtersReducer(state, toggleCategory("T-shirts"));
    state = filtersReducer(state, setPriceRange([10, 100]));
    state = filtersReducer(state, applyFilters());
    state = filtersReducer(state, toggleColor("Red"));

    state = filtersReducer(state, resetFilters());
    expect(state).toEqual(initialState());
  });
});
