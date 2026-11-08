import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Workspace = "north" | "south";
export type DemoRole = "operator" | "viewer";
type SessionState = { workspace: Workspace | null; role: DemoRole | null; epoch: number };
const sessionSlice = createSlice({
  name: "session",
  initialState: { workspace: null, role: null, epoch: 0 } as SessionState,
  reducers: {
    sessionBoundary(state) {
      state.workspace = null;
      state.role = null;
      state.epoch++;
    },
    workspaceEntered(state, action: PayloadAction<{ workspace: Workspace; role: DemoRole }>) {
      state.workspace = action.payload.workspace;
      state.role = action.payload.role;
    },
  },
});
export const { sessionBoundary, workspaceEntered } = sessionSlice.actions;
export default sessionSlice.reducer;
