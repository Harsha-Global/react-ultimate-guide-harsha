import { createListenerMiddleware } from "@reduxjs/toolkit";
import { sessionBoundary } from "./sessionSlice";
import { ordersApi } from "../../services/ordersApi";
import { selectionCleared } from "../selection/selectionSlice";
import { checklistReset } from "../checklist/checklistSlice";
import { previewCleared } from "../preview/previewSlice";
export function createSessionListener() {
  const listener = createListenerMiddleware();
  listener.startListening({
    actionCreator: sessionBoundary,
    effect: (_, api) => {
      api.dispatch(ordersApi.util.resetApiState());
      api.dispatch(selectionCleared());
      api.dispatch(previewCleared());
      api.dispatch(checklistReset());
    },
  });
  return listener;
}
