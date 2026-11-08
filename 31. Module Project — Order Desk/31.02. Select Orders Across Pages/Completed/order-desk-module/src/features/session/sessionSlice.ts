import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Workspace = "north" | "south";
type SessionState = { workspace: Workspace | null; epoch: number };
const sessionSlice = createSlice({
  name: "session",
  initialState: { workspace: null, epoch: 0 } as SessionState,
  reducers: {
    sessionBoundary(state) {
      state.workspace = null;
      state.epoch++;
    },
    workspaceEntered(state, action: PayloadAction<Workspace>) {
      state.workspace = action.payload;
    },
  },
});
export const { sessionBoundary, workspaceEntered } = sessionSlice.actions;
export default sessionSlice.reducer;
