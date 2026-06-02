import type {
  Category,
  DressStyle,
} from "@/lib/features/products/filtersSlice";

export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  // Filter-facing attributes. Optional so legacy callers and partial
  // fixtures keep compiling; an `undefined` field is treated as
  // "not in any of the active filter values" by filterProducts.
  category?: Category;
  color?: string;
  sizes?: string[];
  dressStyle?: DressStyle;
};
