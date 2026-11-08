import { useReducer } from "react";
import { basketReducer, initialBasket } from "./basketReducer.ts";

import { Header } from "./components/Header.tsx";
import { EventCatalog } from "./components/EventCatalog.tsx";
import { BasketPanel } from "./components/BasketPanel.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";

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
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header lines={basket.lines} />
      <main id="main" className="page">
        <div className="hero">
          <p className="eyebrow">A WEEKEND THAT FEELS LIKE YOU</p>
          <h1>
            Small plans.
            <br />
            Great memories.
          </h1>
          <p>
            Discover a new skill, share a meal, or see your city differently.
          </p>
        </div>
        <div className="booking-layout">
          <div className="content-column">
            <EventCatalog onAdd={addTicket} />
            <BasketPanel
              lines={basket.lines}
              onQuantity={changeQuantity}
              onRemove={removeTicket}
              onClear={clearBasket}
            />
          </div>
          <OrderSummary lines={basket.lines} />
        </div>
      </main>
      <footer>Booking Desk · Explore together, book thoughtfully.</footer>
    </>
  );
}
