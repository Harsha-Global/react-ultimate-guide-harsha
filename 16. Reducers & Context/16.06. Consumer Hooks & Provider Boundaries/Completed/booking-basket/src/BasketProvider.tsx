import { useReducer } from "react";
import type { ReactNode } from "react";
import { BasketStateContext, BasketDispatchContext } from "./basketContexts.ts";
import { basketReducer, initialBasket } from "./basketReducer.ts";

export function BasketProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(basketReducer, initialBasket);

  return (
    <BasketStateContext value={state}>
      <BasketDispatchContext value={dispatch}>
        {children}
      </BasketDispatchContext>
    </BasketStateContext>
  );
}
