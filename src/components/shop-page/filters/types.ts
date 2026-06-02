import type {
  DressStyle,
  ProductCategory,
  ProductSize,
} from "@/types/product.types";

export type FiltersState = {
  category: ProductCategory | null;
  priceRange: [number, number];
  colors: string[];
  sizes: ProductSize[];
  style: DressStyle | null;
};

export const PRICE_MIN = 0;
export const PRICE_MAX = 300;

export const DEFAULT_FILTERS: FiltersState = {
  category: null,
  priceRange: [50, 200],
  colors: [],
  sizes: [],
  style: null,
};

export const CATEGORY_OPTIONS: ProductCategory[] = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

export const COLOR_OPTIONS: { name: string; hex: string }[] = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Light Blue", hex: "#06CAF5" },
  { name: "Blue", hex: "#0606F5" },
  { name: "Purple", hex: "#7D26CD" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
];

export const SIZE_OPTIONS: ProductSize[] = [
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

export const DRESS_STYLE_OPTIONS: DressStyle[] = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];
