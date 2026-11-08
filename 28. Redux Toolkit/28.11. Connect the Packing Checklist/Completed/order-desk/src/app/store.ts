import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "../features/selection/selectionSlice";
import checklistReducer from "../features/checklist/checklistSlice";
export const makeStore = () => configureStore({ reducer: { selection: selectionReducer, checklist: checklistReducer }, devTools: import.meta.env.DEV });
export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
