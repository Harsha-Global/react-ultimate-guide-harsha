import { useReducer } from "react";
import { basketReducer, initialBasket } from "./basketReducer.ts";

import { Header } from "./components/Header.tsx";
import { EventCatalog } from "./components/EventCatalog.tsx";
import { BasketPanel } from "./components/BasketPanel.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";
import { PageShell } from "./components/PageShell.tsx";

export default function App() {
  const [basket, dispatch] = useReducer(basketReducer, initialBasket);

  function addTicket(eventId: string) {
    dispatch({ type: "ticketAdded", eventId });
  }

  function changeQuantity(eventId: string, quantity: number) {
    dispatch({ type: "quantityChanged", eventId, quantity });
  }
  
  function removeTicket(eventId: string) {
    dispatch({ type: "ticketRemoved", eventId });
  }
  
  function clearBasket() {
    dispatch({ type: "basketCleared" });
  }

  return (
    <PageShell
      header={<Header lines={basket.lines} />}
      summary={<OrderSummary lines={basket.lines} />}>

      <EventCatalog onAdd={addTicket} />

      <BasketPanel lines={basket.lines} onQuantity={changeQuantity}
        onRemove={removeTicket} onClear={clearBasket} />

    </PageShell>
  );
}
