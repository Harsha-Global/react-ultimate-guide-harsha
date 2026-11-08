import { configureStore } from "@reduxjs/toolkit";
import selectionReducer from "../features/selection/selectionSlice";
export const makeStore = () => configureStore({ reducer: { selection: selectionReducer }, devTools: import.meta.env.DEV });
export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
