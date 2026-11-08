// A20: Zero stock stays Unavailable. Low stock applies only to positive stock.
export function isLowStock(stock: number, reorderLevel: number): boolean {
  // TODO: Replace the old fixed threshold with the accepted per-product level.
  void reorderLevel;
  return stock > 0 && stock < 5;
}
