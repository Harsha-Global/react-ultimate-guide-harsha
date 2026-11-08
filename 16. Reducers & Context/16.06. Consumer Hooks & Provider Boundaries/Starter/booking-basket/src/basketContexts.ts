import { createContext } from "react";
import type { Dispatch } from "react";
import type { BasketAction, BasketState } from "./models.ts";

export type BasketContextValue = {
  state: BasketState;
  dispatch: Dispatch<BasketAction>;
};

export const BasketContext = createContext<BasketContextValue | null>(null);
