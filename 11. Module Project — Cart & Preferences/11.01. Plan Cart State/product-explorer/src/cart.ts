export type CartLine = Readonly<{
  productId: string;
  quantity: number;
}>;

export function cartItemCount(lines: readonly CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}
