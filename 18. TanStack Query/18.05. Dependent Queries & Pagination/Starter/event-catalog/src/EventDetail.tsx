import { useQuery } from "@tanstack/react-query";
import { eventOptions } from "./queries.ts";
export function EventDetail({ id }: { id: string }) {
  const query = useQuery(eventOptions(id));
  if (query.isPending)
    return (
      <p className="status" role="status">
        Loading event details…
      </p>
    );
  if (!query.data)
    return (
      <div className="error" role="alert">
        <p>{query.error?.message ?? "Could not load event."}</p>
        <button className="secondary" onClick={() => void query.refetch()}>
          Try details again
        </button>
      </div>
    );
  const event = query.data;
  return (
    <section className="detail" aria-label="Event details">
      <img src={event.image} alt="" />
      <div>
        {query.isFetching && <p role="status">Refreshing event details…</p>}
        {query.isError && (
          <div className="error" role="alert">
            <p>Could not refresh these details. The last available record is shown.</p>
            <button className="secondary" onClick={() => void query.refetch()}>Retry details</button>
          </div>
        )}
        <p className="category">
          {event.category} / {event.id}
        </p>
        <h2>{event.title}</h2>
        <span className={"pill" + (event.published ? "" : " draft")}>
          {event.published ? "Published" : "Draft"}
        </span>
        <div className="facts">
          <strong>${event.price}</strong>
          <span>{event.seats} places remaining</span>
        </div>
        <p className="muted">A small-group workshop with room to explore.</p>
      </div>
    </section>
  );
}