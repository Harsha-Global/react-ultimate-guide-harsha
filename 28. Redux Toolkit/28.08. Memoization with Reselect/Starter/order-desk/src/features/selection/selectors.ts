import type { RootState } from "../../app/store";
import { orders } from "../../orders";
export const selectSelectedIds = (state: RootState) => state.selection.selectedIds;
export const selectSelectedOrders = (state: RootState) =>
  orders.filter((order) => selectSelectedIds(state).includes(order.id));
export const selectSelectedCount = (state: RootState) => selectSelectedOrders(state).length;
export const selectReadyCount = (state: RootState) =>
  selectSelectedOrders(state).filter((order) => order.status === "ready").length;
export const selectCanPrioritize = (state: RootState) => {
  const selected = selectSelectedOrders(state);
  const requestedCount = new Set(selectSelectedIds(state)).size;
  return (
    selected.length > 0 &&
    selected.length === requestedCount &&
    selected.every((order) => order.status === "ready")
  );
};
