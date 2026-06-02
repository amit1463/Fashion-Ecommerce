import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Color } from "./productsSlice";

export type DressStyle = "Casual" | "Formal" | "Party" | "Gym";

export type Category = "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";

export const FILTER_CATEGORIES: Category[] = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

export const FILTER_DRESS_STYLES: DressStyle[] = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];

export const FILTER_COLORS: Color[] = [
  { name: "Green", code: "bg-green-600" },
  { name: "Red", code: "bg-red-600" },
  { name: "Yellow", code: "bg-yellow-300" },
  { name: "Orange", code: "bg-orange-500" },
  { name: "Cyan", code: "bg-cyan-400" },
  { name: "Blue", code: "bg-blue-600" },
  { name: "Purple", code: "bg-purple-700" },
  { name: "Pink", code: "bg-pink-400" },
  { name: "White", code: "bg-white" },
  { name: "Black", code: "bg-black" },
];

export const FILTER_SIZES: string[] = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 500;

export interface FiltersState {
  categories: Category[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyles: DressStyle[];
  // Applied snapshots are what the product grid actually filters against,
  // so the user can stage changes and commit via "Apply Filter".
  applied: {
    categories: Category[];
    priceRange: [number, number];
    colors: string[];
    sizes: string[];
    dressStyles: DressStyle[];
  };
}

const emptyApplied: FiltersState["applied"] = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  colors: [],
  sizes: [],
  dressStyles: [],
};

const initialState: FiltersState = {
  categories: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  colors: [],
  sizes: [],
  dressStyles: [],
  applied: emptyApplied,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const idx = state.categories.indexOf(action.payload);
      if (idx === -1) state.categories.push(action.payload);
      else state.categories.splice(idx, 1);
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const idx = state.colors.indexOf(action.payload);
      if (idx === -1) state.colors.push(action.payload);
      else state.colors.splice(idx, 1);
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const idx = state.sizes.indexOf(action.payload);
      if (idx === -1) state.sizes.push(action.payload);
      else state.sizes.splice(idx, 1);
    },
    toggleDressStyle: (state, action: PayloadAction<DressStyle>) => {
      const idx = state.dressStyles.indexOf(action.payload);
      if (idx === -1) state.dressStyles.push(action.payload);
      else state.dressStyles.splice(idx, 1);
    },
    applyFilters: (state) => {
      state.applied = {
        categories: [...state.categories],
        priceRange: [state.priceRange[0], state.priceRange[1]],
        colors: [...state.colors],
        sizes: [...state.sizes],
        dressStyles: [...state.dressStyles],
      };
    },
    resetFilters: (state) => {
      state.categories = [];
      state.priceRange = [PRICE_MIN, PRICE_MAX];
      state.colors = [];
      state.sizes = [];
      state.dressStyles = [];
      state.applied = {
        categories: [],
        priceRange: [PRICE_MIN, PRICE_MAX],
        colors: [],
        sizes: [],
        dressStyles: [],
      };
    },
  },
});

export const {
  toggleCategory,
  setPriceRange,
  toggleColor,
  toggleSize,
  toggleDressStyle,
  applyFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
