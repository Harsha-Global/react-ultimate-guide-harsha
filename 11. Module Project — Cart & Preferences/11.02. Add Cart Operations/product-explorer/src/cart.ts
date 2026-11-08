import type { Product } from "./types";

export type CartLine = Readonly<{
  productId: string;
  quantity: number;
}>;

export function cartItemCount(lines: readonly CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function addToCart(lines: readonly CartLine[], product: Product): CartLine[] {
  if (!product.inStock || product.maxQuantity < 1) return [...lines];
  const current = lines.find((line) => line.productId === product.id);
  if (current && current.quantity >= product.maxQuantity) return [...lines];
  if (!current) return [...lines, { productId: product.id, quantity: 1 }];
  return lines.map((line) => line.productId === product.id
    ? { ...line, quantity: line.quantity + 1 }
    : line);
}

export function changeCartQuantity(lines: readonly CartLine[], product: Product, nextQuantity: number): CartLine[] {
  if (!Number.isInteger(nextQuantity) || nextQuantity < 1 || nextQuantity > product.maxQuantity) {
    return [...lines];
  }
  return lines.map((line) => line.productId === product.id
    ? { ...line, quantity: nextQuantity }
    : line);
}

export function removeFromCart(lines: readonly CartLine[], productId: string): CartLine[] {
  return lines.filter((line) => line.productId !== productId);
}
