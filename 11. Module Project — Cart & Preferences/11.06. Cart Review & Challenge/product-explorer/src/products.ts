import type { Product } from "./types";
import backpack from "./assets/backpack.svg";
import lamp from "./assets/lamp.svg";
import mug from "./assets/mug.svg";
import headphones from "./assets/headphones.svg";
import cushion from "./assets/cushion.svg";
import speaker from "./assets/speaker.svg";

export const products: readonly Product[] = [
  { id: "p1", name: "Trail Backpack", category: "Travel", price: 79, inStock: true, maxQuantity: 2, image: backpack, description: "A light everyday backpack with a padded laptop sleeve." },
  { id: "p2", name: "Desk Lamp", category: "Home", price: 49, inStock: true, maxQuantity: 3, image: lamp, description: "An adjustable lamp for a focused reading space." },
  { id: "p3", name: "Travel Mug", category: "Travel", price: 19, inStock: false, maxQuantity: 0, image: mug, description: "A reusable insulated mug with a secure lid." },
  { id: "p4", name: "Wireless Headphones", category: "Audio", price: 129, inStock: true, maxQuantity: 1, image: headphones, description: "Comfortable headphones for music and everyday calls." },
  { id: "p5", name: "Reading Cushion", category: "Home", price: 39, inStock: false, maxQuantity: 0, image: cushion, description: "A soft support cushion for a quiet reading corner." },
  { id: "p6", name: "Pocket Speaker", category: "Audio", price: 59, inStock: true, maxQuantity: 4, image: speaker, description: "A small portable speaker for listening around the home." }
];
