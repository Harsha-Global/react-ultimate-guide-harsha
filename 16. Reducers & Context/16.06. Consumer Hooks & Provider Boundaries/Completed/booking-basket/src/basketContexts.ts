import { createContext } from "react";
import type { Dispatch } from "react";
import type { BasketAction, BasketState } from "./models.ts";

export const BasketStateContext = createContext<BasketState | null>(null);

export const BasketDispatchContext =
  createContext<Dispatch<BasketAction> | null>(null);
