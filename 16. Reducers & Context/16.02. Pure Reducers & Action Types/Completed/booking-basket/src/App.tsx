import { useState } from "react";
import { findEvent } from "./events.ts";
import type { BasketState } from "./models.ts";

import { Header } from "./components/Header.tsx";
import { EventCatalog } from "./components/EventCatalog.tsx";
import { BasketPanel } from "./components/BasketPanel.tsx";
import { OrderSummary } from "./components/OrderSummary.tsx";

export default function App() {
  const [basket, setBasket] = useState<BasketState>({ lines: [] });
  function addTicket(eventId: string) {
    setBasket((current) => {
      const event = findEvent(eventId);
      if (!event) return current;
      const line = current.lines.find((item) => item.eventId === eventId);
      if (line && line.quantity >= event.maxTickets) return current;
      const lines = line
        ? current.lines.map((item) =>
            item.eventId === eventId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current.lines, { eventId, quantity: 1 }];
      return { ...current, lines };
    });
  }
  function changeQuantity(eventId: string, quantity: number) {
    setBasket((current) => {
      const event = findEvent(eventId);
      const line = current.lines.find((item) => item.eventId === eventId);
      if (
        !event ||
        !line ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > event.maxTickets ||
        quantity === line.quantity
      )
        return current;
      return {
        ...current,
        lines: current.lines.map((item) =>
          item.eventId === eventId ? { ...item, quantity } : item,
        ),
      };
    });
  }
  function removeTicket(eventId: string) {
    setBasket((current) => {
      const lines = current.lines.filter((item) => item.eventId !== eventId);
      return lines.length === current.lines.length
        ? current
        : { ...current, lines };
    });
  }
  function clearBasket() {
    setBasket((current) =>
      current.lines.length ? { ...current, lines: [] } : current,
    );
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
