type OrderRow = { id: string; status: "ready" | "payment-pending" | "shipped" };
function selectEligibleOrders(selectedIds: readonly string[], rows: readonly OrderRow[]): string[] {
  const selected = new Set(selectedIds);
  for (const order of rows) {
    if (order.status === "ready") selected.add(order.id);
  }
  return [...selected];
}
