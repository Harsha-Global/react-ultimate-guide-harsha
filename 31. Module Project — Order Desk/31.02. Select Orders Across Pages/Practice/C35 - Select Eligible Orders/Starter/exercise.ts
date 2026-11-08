type OrderRow = { id: string; status: "ready" | "payment-pending" | "shipped" };
function selectEligibleOrders(selectedIds: readonly string[], rows: readonly OrderRow[]): string[] {
  // BUG: earlier selections are lost, and repeated ready rows produce duplicates.
  return rows.filter(order => order.status === "ready").map(order => order.id);
}
