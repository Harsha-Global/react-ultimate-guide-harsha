import type { AppDispatch, RootState } from "../../app/store";
import type { Order } from "../../orders";
import { orderToggled } from "./selectionSlice";
export const selectReady = (rows: readonly Order[]) => (dispatch: AppDispatch, getState: () => RootState) => {
  const selected = new Set(getState().selection.selectedIds);
  for (const order of rows) {
    if (order.status === "ready" && !selected.has(order.id)) {
      dispatch(orderToggled(order.id));
      selected.add(order.id);
    }
  }
};
