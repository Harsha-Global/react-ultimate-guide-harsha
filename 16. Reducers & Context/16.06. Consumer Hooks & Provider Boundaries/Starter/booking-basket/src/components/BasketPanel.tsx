import { useContext } from "react";
import { BasketContext } from "../basketContexts.ts";

import { findEvent } from "../events.ts";
import { money } from "../totals.ts";

export function BasketPanel() {
  const value = useContext(BasketContext);
  if (value === null)
    throw new Error("Basket components must be inside BasketProvider.");

  const { state, dispatch } = value;
  const lines = state.lines;

  function onQuantity(eventId: string, quantity: number) {
    dispatch({ type: "quantityChanged", eventId, quantity });
    }

  function onRemove(eventId: string) {
    dispatch({ type: "ticketRemoved", eventId });
    }

  function onClear() {
    dispatch({ type: "basketCleared" });
    }

  return (
    <section className="basket-panel" aria-labelledby="basket-heading">
      <div className="section-heading">
        <h2 id="basket-heading">Your weekend, planned.</h2>
        <button
          type="button"
          className="text-button"
          onClick={onClear}
          disabled={lines.length === 0}
        >
          Clear basket
        </button>
      </div>
      {lines.length === 0 ? (
        <div className="empty-state">
          <span aria-hidden="true">＋</span>
          <h3>Your basket is waiting.</h3>
          <p>Add an experience to plan your weekend.</p>
        </div>
      ) : (
        <ul className="basket-list">
          {lines.map((line) => {
            const event = findEvent(line.eventId);
            if (!event) return null;
            return (
              <li key={line.eventId}>
                <img src={event.artwork} alt="" />
                <div className="line-info">
                  <h3>{event.title}</h3>
                  <p>
                    {event.city} · {money(event.priceCents)} per ticket
                  </p>
                  <p className="limit">
                    {line.quantity === event.maxTickets
                      ? `Maximum of ${event.maxTickets} selected`
                      : `Choose 1 to ${event.maxTickets} tickets`}
                  </p>
                </div>
                <div className="line-controls">
                  <label htmlFor={`tickets-${line.eventId}`}>
                    Tickets for {event.title}
                  </label>
                  <select
                    id={`tickets-${line.eventId}`}
                    value={line.quantity}
                    onChange={(e) =>
                      onQuantity(line.eventId, Number(e.currentTarget.value))
                    }
                  >
                    {Array.from({ length: event.maxTickets }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-button danger"
                    onClick={() => onRemove(line.eventId)}
                  >
                    Remove {event.title}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
