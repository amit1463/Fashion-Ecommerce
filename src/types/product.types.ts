export type Discount = {
  amount: number;
  percentage: number;
};

export type ProductCategory =
  | "T-shirts"
  | "Shorts"
  | "Shirts"
  | "Hoodie"
  | "Jeans";

export type ProductSize =
  | "XX-Small"
  | "X-Small"
  | "Small"
  | "Medium"
  | "Large"
  | "X-Large"
  | "XX-Large"
  | "3X-Large"
  | "4X-Large";

export type DressStyle = "Casual" | "Formal" | "Party" | "Gym";

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  category?: ProductCategory;
  colors?: string[];
  sizes?: ProductSize[];
  style?: DressStyle;
};
