import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type SelectionState = { selectedIds: string[] };
const initialState: SelectionState = { selectedIds: [] };
const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectionReplaced(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },
  },
});
export const { selectionReplaced } = selectionSlice.actions;
export default selectionSlice.reducer;
