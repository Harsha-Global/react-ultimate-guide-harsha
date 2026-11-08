import { useContext } from "react";
import { BasketStateContext, BasketDispatchContext } from "./basketContexts.ts";

export function useBasketState() {
  const state = useContext(BasketStateContext);
  if (state === null)
    throw new Error("useBasketState must be used inside BasketProvider.");
  return state;
}

export function useBasketDispatch() {
  const dispatch = useContext(BasketDispatchContext);
  if (dispatch === null)
    throw new Error("useBasketDispatch must be used inside BasketProvider.");
  return dispatch;
}
