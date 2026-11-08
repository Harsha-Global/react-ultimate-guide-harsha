import type { CartLine } from "./cart";
import type { DeliveryValues } from "./DeliveryPreferences";
import { products } from "./products";

export const emptyDelivery: DeliveryValues = { name: "", email: "", note: "" };

export function isCart(value: unknown): value is CartLine[] {
  if (!Array.isArray(value)) return false;
  const seen = new Set<string>();
  return value.every(line => {
    if (typeof line !== "object" || line === null) return false;
    const candidate = line as Record<string, unknown>;
    const product = products.find(item => item.id === candidate.productId);
    if (!product || seen.has(product.id)) return false;
    seen.add(product.id);
    return Number.isInteger(candidate.quantity) &&
      typeof candidate.quantity === "number" &&
      candidate.quantity >= 1 && candidate.quantity <= product.maxQuantity;
  });
}

export function isDelivery(value: unknown): value is DeliveryValues {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.name === "string" && candidate.name.length <= 100 &&
    typeof candidate.email === "string" && candidate.email.length <= 160 &&
    typeof candidate.note === "string" && candidate.note.length <= 120;
}
