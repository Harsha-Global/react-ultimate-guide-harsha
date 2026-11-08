import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Order } from "../../orders";
export const selectSelectedIds = (state: RootState) => state.selection.selectedIds;
export const selectSelectedCount = (state: RootState) => selectSelectedIds(state).length;
export const selectVisibleSelectedOrders = createSelector(
  [selectSelectedIds, (_state: RootState, rows: readonly Order[]) => rows],
  (selectedIds, rows) =>
    rows.filter((order) => selectedIds.includes(order.id)),
);
