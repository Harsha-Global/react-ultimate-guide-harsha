import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type SelectionState = { selectedIds: string[]; readyOnly: boolean };
const initialState: SelectionState = { selectedIds: [], readyOnly: false };
const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    orderToggled(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(
          (selectedId) => selectedId !== id,
        );
      } else {
        state.selectedIds.push(id);
      }
    },
    acceptedOrdersRemoved(state, action: PayloadAction<string[]>) {
      const accepted = new Set(action.payload);
      state.selectedIds = state.selectedIds.filter(
        (id) => !accepted.has(id),
      );
    },
    selectionCleared(state) {
      state.selectedIds = [];
    },
    readyFilterChanged(state, action: PayloadAction<boolean>) {
      state.readyOnly = action.payload;
    },
  },
});
export const {
  acceptedOrdersRemoved,
  orderToggled,
  selectionCleared,
  readyFilterChanged,
} = selectionSlice.actions;
export default selectionSlice.reducer;
