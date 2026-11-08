import { useQuery } from "@tanstack/react-query";
import { getEvents } from "./api.ts";
import { defaultFilters } from "./events.ts";
import type { EventItem } from "./events.ts";
export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card">
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
  );
}
function CatalogTotal() {
  const query = useQuery({
    queryKey: ["events", "list"],
    queryFn: ({ signal }) => getEvents(defaultFilters, signal),
  });
  return (
    <div className="summary">
      <span>Find your next small adventure</span>
      <strong>
        {query.data
          ? `${query.data.total} workshop${query.data.total === 1 ? "" : "s"}`
          : "Exploring…"}
      </strong>
    </div>
  );
}
export function Catalog() {
  const query = useQuery({
    queryKey: ["events", "list"],
    queryFn: ({ signal }) => getEvents(defaultFilters, signal),
  });
  return (
    <section aria-label="Event catalog">
      <CatalogTotal />
      {query.isPending ? (
        <p className="status" role="status">
          Loading events…
        </p>
      ) : query.isError ? (
        <div className="error" role="alert">
          <p>{query.error.message}</p>
          <button className="secondary" onClick={() => void query.refetch()}>
            Try again
          </button>
        </div>
      ) : (
        <div className="cards">
          {query.data.items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
