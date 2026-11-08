import { useSearchParams } from "react-router";
import { events } from "../events.ts";
import { EventCatalog } from "./EventCatalog.tsx";

export function CatalogView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("category");
  const category =
    raw === "Creative" || raw === "Food" || raw === "Outdoor" ? raw : "All";

  const visibleEvents =
    category === "All"
      ? events
      : events.filter((event) => event.category === category);

  function changeCategory(nextCategory: string) {
    const next = new URLSearchParams(searchParams);
    if (nextCategory === "All") next.delete("category");
    else next.set("category", nextCategory);
    setSearchParams(next);
  }

  return (
    <>
      <div className="filters">
        <label htmlFor="category">Browse category</label>
        <select id="category" value={category}
          onChange={(e) => changeCategory(e.currentTarget.value)}>
          <option>All</option>
          <option>Creative</option>
          <option>Food</option>
          <option>Outdoor</option>
        </select>
      </div>

      <EventCatalog visibleEvents={visibleEvents} />
    </>
  );
}
