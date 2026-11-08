import { actionTrace } from "./actionTrace";
import { configureStore } from "@reduxjs/toolkit";
import previewReducer from "../features/preview/previewSlice";
import selectionReducer from "../features/selection/selectionSlice";
import checklistReducer from "../features/checklist/checklistSlice";
import preferencesReducer from "../features/preferences/preferencesSlice";
import { createPreferencesListener } from "../features/preferences/preferencesListener";
import { browserStorage } from "../features/preferences/storage";
export const makeStore = (storage: Storage | null = browserStorage()) => configureStore({ reducer: { selection: selectionReducer, preview: previewReducer, preferences: preferencesReducer, checklist: checklistReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(createPreferencesListener(storage).middleware).concat(actionTrace),
  devTools: import.meta.env.DEV });
export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
