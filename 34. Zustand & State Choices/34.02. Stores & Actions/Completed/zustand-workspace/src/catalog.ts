import { formatMoney } from "./displayFormats.ts";
import type { DisplayLocale } from "./displayFormats.ts";

export type Product = {
  id: string;
  name: string;
  category: string;
  priceMinor: number;
  stock: number;
  image: string;
};

export const products: Product[] = [
  { id: "P-101", name: "Studio Desk Lamp", category: "Workspace", priceMinor: 8900, stock: 12, image: "/assets/products/lamp.jpg" },
  { id: "P-102", name: "Everyday Backpack", category: "Travel", priceMinor: 7900, stock: 0, image: "/assets/products/backpack.jpg" },
  { id: "P-103", name: "Terracotta Travel Mug", category: "Everyday", priceMinor: 2800, stock: 3, image: "/assets/products/mug.jpg" },
  { id: "P-104", name: "Studio Headphones", category: "Audio", priceMinor: 12900, stock: 18, image: "/assets/products/headphones.jpg" },
];

// This catalog stores USD cents; changing locale does not convert its currency.
export const formatPrice = (priceMinor: number, locale: DisplayLocale = "en-US") => formatMoney(priceMinor, "USD", locale);
