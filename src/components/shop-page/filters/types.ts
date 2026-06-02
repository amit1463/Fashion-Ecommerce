import type {
  DressStyle,
  ProductCategory,
  ProductSize,
} from "@/types/product.types";

/**
 * Snapshot of every selectable filter on the shop page sidebar.
 * `null`/empty values mean "no constraint for this section".
 */
export type FiltersState = {
  /** Currently selected category, or null when "all categories". */
  category: ProductCategory | null;
  /** Inclusive [min, max] range used to filter `effectivePrice`. */
  priceRange: [number, number];
  /** Hex color codes (uppercase or lowercase, normalised at compare time). */
  colors: string[];
  /** Selected product sizes - matches if any of these is offered. */
  sizes: ProductSize[];
  /** Currently selected dress style, or null when "all styles". */
  style: DressStyle | null;
};

/** Inclusive lower bound shown on the price slider. */
export const PRICE_MIN = 0;
/** Inclusive upper bound shown on the price slider. */
export const PRICE_MAX = 300;

/**
 * Initial state for the filter sidebar - also used by the "Clear filters"
 * button to reset the panel.
 */
export const DEFAULT_FILTERS: FiltersState = {
  category: null,
  priceRange: [50, 200],
  colors: [],
  sizes: [],
  style: null,
};

/** Categories rendered in the sidebar, in display order. */
export const CATEGORY_OPTIONS: ProductCategory[] = [
  "T-shirts",
  "Shorts",
  "Shirts",
  "Hoodie",
  "Jeans",
];

/** Color swatches rendered in the Colors section, in display order. */
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

/** Sizes rendered as chips in the Size section, in display order. */
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

/** Dress styles rendered in the Dress Style section, in display order. */
export const DRESS_STYLE_OPTIONS: DressStyle[] = [
  "Casual",
  "Formal",
  "Party",
  "Gym",
];
