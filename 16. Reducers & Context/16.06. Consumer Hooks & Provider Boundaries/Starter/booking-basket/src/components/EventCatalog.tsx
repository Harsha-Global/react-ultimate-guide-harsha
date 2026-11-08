import { useContext } from "react";
import { BasketContext } from "../basketContexts.ts";

import { events } from "../events.ts";
import { money } from "../totals.ts";
import type { EventOption } from "../models.ts";
type Props = {
  visibleEvents?: readonly EventOption[];
};
export function EventCatalog({ visibleEvents = events }: Props) {
  const value = useContext(BasketContext);
  if (value === null)
    throw new Error("Basket components must be inside BasketProvider.");

  const dispatch = value.dispatch;

  function onAdd(eventId: string) {
    dispatch({ type: "ticketAdded", eventId });
    }

  return (
    <section aria-labelledby="events-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CURATED WEEKEND EXPERIENCES</p>
          <h2 id="events-heading">Choose your next story.</h2>
        </div>
        <span>
          {visibleEvents.length}{" "}
          {visibleEvents.length === 1 ? "experience" : "experiences"}
        </span>
      </div>
      <div className="event-grid">
        {visibleEvents.map((event) => (
          <article className="event-card" key={event.id}>
            <img src={event.artwork} alt="" className="event-art" />
            <div className="event-body">
              <span className="category">
                {event.category} · {event.city}
              </span>
              <h3>{event.title}</h3>
              <p>{event.dateLabel}</p>
              <div className="event-price">
                <strong>{money(event.priceCents)}</strong>
                <span>per ticket</span>
              </div>
              <p className="limit">
                Up to {event.maxTickets} tickets per basket
              </p>
              <button type="button" onClick={() => onAdd(event.id)}>
                Add {event.title}
              </button>
              <details>
                <summary>Experience details</summary>
                <p>
                  A small-group experience with a local host. Bring your
                  curiosity; materials are included.
                </p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
