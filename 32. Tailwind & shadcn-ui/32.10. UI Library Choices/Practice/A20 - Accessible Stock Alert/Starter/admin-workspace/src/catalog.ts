export type Product = {
  id: string;
  name: string;
  category: string;
  priceMinor: number;
  stock: number;
  reorderLevel: number;
  image: string;
};

export const products: Product[] = [
  { id: "P-101", name: "Studio Desk Lamp", category: "Workspace", priceMinor: 8900, stock: 12, reorderLevel: 5, image: "/assets/products/lamp.jpg" },
  { id: "P-102", name: "Everyday Backpack", category: "Travel", priceMinor: 7900, stock: 0, reorderLevel: 5, image: "/assets/products/backpack.jpg" },
  { id: "P-103", name: "Terracotta Travel Mug", category: "Everyday", priceMinor: 2800, stock: 3, reorderLevel: 5, image: "/assets/products/mug.jpg" },
  { id: "P-104", name: "Studio Headphones", category: "Audio", priceMinor: 12900, stock: 18, reorderLevel: 5, image: "/assets/products/headphones.jpg" },
];

// This sample catalog is priced in USD cents. Currency-aware units follow later.
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const formatPrice = (priceMinor: number) => usd.format(priceMinor / 100);
