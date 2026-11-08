import type { AppDispatch, RootState } from "../../app/store";
import { orders } from "../../orders";
import { orderToggled } from "./selectionSlice";
export const selectReady = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const selected = new Set(getState().selection.selectedIds);
  for (const order of orders) {
    if (order.status === "ready" && !selected.has(order.id)) {
      dispatch(orderToggled(order.id));
    }
  }
};
