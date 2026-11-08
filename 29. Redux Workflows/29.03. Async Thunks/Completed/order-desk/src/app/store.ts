import { actionTrace } from "./actionTrace";
import { configureStore } from "@reduxjs/toolkit";
import previewReducer from "../features/preview/previewSlice";
import selectionReducer from "../features/selection/selectionSlice";
import checklistReducer from "../features/checklist/checklistSlice";
export const makeStore = () => configureStore({ reducer: { selection: selectionReducer, preview: previewReducer, checklist: checklistReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionTrace),
  devTools: import.meta.env.DEV });
export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
