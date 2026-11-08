import { useEffect, useState } from "react";
import { getEvents } from "./api.ts";
import { defaultFilters } from "./events.ts";
import type { EventPage } from "./events.ts";
export function Catalog() {
  const [data, setData] = useState<EventPage | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    getEvents(defaultFilters, controller.signal)
      .then(setData)
      .catch((error: unknown) => {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error ? error.message : "Could not load events.",
          );
      });
    return () => controller.abort();
  }, []);
  if (error)
    return (
      <p className="error" role="alert">
        {error}
      </p>
    );
  if (!data)
    return (
      <p className="status" role="status">
        Loading events…
      </p>
    );
  return (
    <section aria-label="Event catalog">
      <div className="summary">
        <span>Find your next small adventure</span>
        <strong>{data.total} workshops</strong>
      </div>
      <div className="cards">
        {data.items.map((event) => (
          <article className="card" key={event.id}>
            <img src={event.image} alt="" />
            <div className="card-body">
              <span className="category">{event.category}</span>
              <h3>{event.title}</h3>
              <span className={"pill" + (event.published ? "" : " draft")}>
                {event.published ? "Published" : "Draft"}
              </span>
              <div className="facts">
                <strong>${event.price}</strong>
                <span>{event.seats} places</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
