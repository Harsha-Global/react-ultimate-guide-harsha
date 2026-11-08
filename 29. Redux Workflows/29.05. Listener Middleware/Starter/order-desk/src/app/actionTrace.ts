import type { Middleware } from "@reduxjs/toolkit";
import { orderToggled } from "../features/selection/selectionSlice";
// This observer logs only the action type, never customer or session data.
export const actionTrace: Middleware = () => (next) => (action) => {
  const observed = orderToggled.match(action);
  if (observed) console.info("Before next:", action.type);
  const result = next(action);
  if (observed) console.info("After next:", action.type);
  return result;
};
