import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { eventListOptions } from "./queries.ts";
import { defaultFilters } from "./events.ts";
import type { EventItem, EventFilters } from "./events.ts";
import { EventDetail } from "./EventDetail.tsx";
export function EventCard({
  event,
  onSelect,
}: {
  event: EventItem;
  onSelect: (id: string) => void;
}) {
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
        <button className="secondary" onClick={() => onSelect(event.id)}>
          View {event.title}
        </button>
      </div>
    </article>
  );
}
function CatalogTotal({ filters }: { filters: EventFilters }) {
  const query = useQuery(eventListOptions(filters));
  return (
    <div className="summary">
      <span>Find your next small adventure</span>
      <strong>
        {query.data
          ? `${query.data.total} workshop${query.data.total === 1 ? "" : "s"}`
          : query.isError
            ? "Total unavailable"
            : "Exploring…"}
      </strong>
    </div>
  );
}
export function Catalog() {
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const query = useQuery(eventListOptions(filters));
  const queryClient = useQueryClient();
  function prefetchNextPage() {
    if (
      query.data &&
      !query.isPlaceholderData &&
      query.data.page * query.data.pageSize < query.data.total
    ) {
      const { queryKey, queryFn } = eventListOptions({
        ...filters,
        page: filters.page + 1,
      });
      void queryClient.query({ queryKey, queryFn }).catch(() => {});
    }
  }
  return (
    <section aria-label="Event catalog">
      <form
        className="toolbar"
        onSubmit={(event) => {
          event.preventDefault();
          setFilters({ ...filters, q: search.trim().toLowerCase(), page: 1 });
        }}
      >
        <div className="field">
          <label htmlFor="search">Search workshops</label>
          <input
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(event) => {
              const category = event.target.value;
              if (
                category === "all" ||
                category === "art" ||
                category === "food" ||
                category === "outdoors"
              )
                setFilters({ ...filters, category, page: 1 });
            }}
          >
            <option value="all">All workshops</option>
            <option value="art">Art</option>
            <option value="food">Food</option>
            <option value="outdoors">Outdoors</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(event) => {
              const sort = event.target.value;
              if (sort === "title" || sort === "price")
                setFilters({ ...filters, sort, page: 1 });
            }}
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
        <button className="primary" type="submit">
          Search
        </button>
      </form>
      <CatalogTotal filters={filters} />
      <div className="actions">
        <button
          className="secondary"
          disabled={query.isFetching}
          onClick={() => void query.refetch()}
        >
          Refresh events
        </button>
      </div>
      {!query.data ? (
        query.isPending ? (
          <p className="status" role="status">
            Loading events…
          </p>
        ) : (
          <div className="error" role="alert">
            <p>{query.error?.message ?? "Could not load events."}</p>
            <button className="secondary" onClick={() => void query.refetch()}>
              Try again
            </button>
          </div>
        )
      ) : (
        <>
          {query.isPlaceholderData ? (
            <p className="status" role="status">
              Showing previous results while the new selection loads.
            </p>
          ) : (
            query.isFetching && (
              <p className="status" role="status">
                Refreshing events…
              </p>
            )
          )}
          {query.isError && (
            <div className="error" role="alert">
              <p>Could not refresh. Showing the last available results.</p>
              <p>{query.error.message}</p>
              <button
                className="secondary"
                onClick={() => void query.refetch()}
              >
                Retry refresh
              </button>
            </div>
          )}
          {query.data.items.length === 0 ? (
            <p className="empty">No workshops match these choices.</p>
          ) : (
            <div className="cards">
              {query.data.items.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={setSelectedId}
                />
              ))}
            </div>
          )}
          <div className="pagination">
            <button
              className="secondary"
              disabled={query.isPlaceholderData || filters.page === 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            >
              Previous page
            </button>
            <span>
              Page {query.data.page} of{" "}
              {Math.max(1, Math.ceil(query.data.total / query.data.pageSize))}
            </span>
            <button
              className="secondary"
              onMouseEnter={prefetchNextPage}
              onFocus={prefetchNextPage}
              disabled={
                query.isPlaceholderData ||
                query.data.page * query.data.pageSize >= query.data.total
              }
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              Next page
            </button>
          </div>
        </>
      )}
      {selectedId && <EventDetail key={selectedId} id={selectedId} />}
    </section>
  );
}
