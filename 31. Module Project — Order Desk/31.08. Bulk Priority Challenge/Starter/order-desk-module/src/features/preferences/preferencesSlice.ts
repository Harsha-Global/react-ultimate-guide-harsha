import type { StatusFilter } from "../../services/contracts";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Density = "comfortable" | "compact";
export type PreferencesState = { density: Density; defaultStatus: StatusFilter; saveStatus: string };
export const initialPreferences: PreferencesState = { density: "comfortable", defaultStatus: "all", saveStatus: "Not saved yet" };
const preferencesSlice = createSlice({
  name: "preferences",
  initialState: initialPreferences,
  reducers: {
    densityChanged(state, action: PayloadAction<Density>) {
      state.density = action.payload;
      state.saveStatus = "Unsaved changes";
    },
    defaultStatusChanged(state, action: PayloadAction<StatusFilter>) {
      state.defaultStatus = action.payload;
      state.saveStatus = "Unsaved changes";
    },
    preferencesReset: () => initialPreferences,
    saveStatusChanged(state, action: PayloadAction<string>) {
      state.saveStatus = action.payload;
    },
  },
});
export const { densityChanged, defaultStatusChanged, preferencesReset, saveStatusChanged } = preferencesSlice.actions;
export default preferencesSlice.reducer;
