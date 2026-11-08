import { actionTrace } from "./actionTrace";
import { configureStore } from "@reduxjs/toolkit";
import previewReducer from "../features/preview/previewSlice";
import selectionReducer from "../features/selection/selectionSlice";
import checklistReducer from "../features/checklist/checklistSlice";
import preferencesReducer, { initialPreferences } from "../features/preferences/preferencesSlice";
import { createPreferencesListener } from "../features/preferences/preferencesListener";
import { browserStorage, loadDensity, loadShowTotals } from "../features/preferences/storage";
export const makeStore = (storage: Storage | null = browserStorage()) =>
  configureStore({
    reducer: { selection: selectionReducer,
      preview: previewReducer,
      preferences: preferencesReducer, checklist: checklistReducer },
    preloadedState: { preferences: { ...initialPreferences, density: loadDensity(storage), showTotals: loadShowTotals(storage), saveStatus: "Preferences loaded" } },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(createPreferencesListener(storage).middleware).concat(actionTrace),
    devTools: import.meta.env.DEV,
  });
export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
