type OrderRecord = {id: string; status: "ready" | "payment-pending" | "shipped"};
type WorkflowState = {selectedIds: readonly string[]; orders: readonly OrderRecord[]};
type SelectionSummary = {selectedCount: number; readyCount: number; canPrioritize: boolean};
function selectSelectionSummary(state: WorkflowState): SelectionSummary {
  // TODO: derive the known selected count, ready count and eligibility without changing state.
  return {selectedCount: 0, readyCount: 0, canPrioritize: false};
}
