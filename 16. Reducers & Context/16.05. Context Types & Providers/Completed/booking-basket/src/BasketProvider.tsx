import { useReducer } from "react";
import type { ReactNode } from "react";
import { BasketContext } from "./basketContexts.ts";
import { basketReducer, initialBasket } from "./basketReducer.ts";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(basketReducer, initialBasket);

  return (
    <BasketContext value={{ state, dispatch }}>
      {children}
    </BasketContext>
  );
}
