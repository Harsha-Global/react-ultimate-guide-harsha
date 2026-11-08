import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Density = "comfortable" | "compact";
export type PreferencesState = { showTotals: boolean; density: Density; saveStatus: string };
export const initialPreferences: PreferencesState = { showTotals: true, density: "comfortable", saveStatus: "Not saved yet" };
const preferencesSlice = createSlice({
  name: "preferences", initialState: initialPreferences,
  reducers: {
    densityChanged(state, action: PayloadAction<Density>) { state.density = action.payload; state.saveStatus = "Unsaved changes"; },
    showTotalsChanged(state, action: PayloadAction<boolean>) { state.showTotals = action.payload; state.saveStatus = "Unsaved changes"; },
    preferencesReset: () => initialPreferences,
    saveStatusChanged(state, action: PayloadAction<string>) { state.saveStatus = action.payload; },
  },
});
export const { showTotalsChanged, densityChanged, preferencesReset, saveStatusChanged } = preferencesSlice.actions;
export default preferencesSlice.reducer;
