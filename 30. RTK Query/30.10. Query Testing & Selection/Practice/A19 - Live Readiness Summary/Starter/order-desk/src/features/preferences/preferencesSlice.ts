import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export type Density = "comfortable" | "compact";
export type PreferencesState = { density: Density; saveStatus: string };
export const initialPreferences: PreferencesState = { density: "comfortable", saveStatus: "Not saved yet" };
const preferencesSlice = createSlice({
  name: "preferences",
  initialState: initialPreferences,
  reducers: {
    densityChanged(state, action: PayloadAction<Density>) {
      state.density = action.payload;
      state.saveStatus = "Unsaved changes";
    },
    preferencesReset: () => initialPreferences,
    saveStatusChanged(state, action: PayloadAction<string>) {
      state.saveStatus = action.payload;
    },
  },
});
export const { densityChanged, preferencesReset, saveStatusChanged } = preferencesSlice.actions;
export default preferencesSlice.reducer;
