// A20: Zero stock stays Unavailable. Low stock applies only to positive stock.
export function isLowStock(stock: number, reorderLevel: number): boolean {
  return stock > 0 && stock <= reorderLevel;
}
