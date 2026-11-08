type OrderRecord = {id: string; status: "ready" | "payment-pending" | "shipped"};
type WorkflowState = {selectedIds: readonly string[]; orders: readonly OrderRecord[]};
type SelectionSummary = {selectedCount: number; readyCount: number; canPrioritize: boolean};
function selectSelectionSummary(state: WorkflowState): SelectionSummary {
  const selected = state.orders.filter(order => state.selectedIds.includes(order.id));
  const requestedCount = new Set(state.selectedIds).size;
  const readyCount = selected.filter(order => order.status === "ready").length;
  return {
    selectedCount: selected.length,
    readyCount,
    canPrioritize: selected.length > 0 && selected.length === requestedCount && readyCount === selected.length,
  };
}
