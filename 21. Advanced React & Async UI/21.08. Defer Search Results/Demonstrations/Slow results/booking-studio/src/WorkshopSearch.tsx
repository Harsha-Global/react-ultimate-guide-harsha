import { memo, useDeferredValue, useId, useState } from "react";
const workshops = [
  "Clay & Colour",
  "Sunday Wheel",
  "Glaze Lab",
  "Botanical Tiles",
  "Handmade Mugs",
  "Porcelain Stories",
  "Evening Sculptures",
  "Weekend Bowls",
];
const SearchResults = memo(function SearchResults({
  query,
}: {
  query: string;
}) {
  const matches = workshops.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return matches.length ? (
    <ul className="workshop-results">
      {matches.map((name) => (
        <SlowRow key={name} name={name} />
      ))}
    </ul>
  ) : (
    <p>No workshops match that search.</p>
  );
});
function SlowRow({ name }: { name: string }) {
  const end = performance.now() + 18;
  while (performance.now() < end) {}
  return <li>{name}</li>;
}
export function WorkshopSearch() {
  const id = useId();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <section className="panel wide">
      <p className="eyebrow">MORE TO EXPLORE</p>
      <h2>Find your next workshop.</h2>
      <label htmlFor={id}>Search workshops</label>
      <input id={id} type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
      <p role="status" className="loading-line">
        {isStale ? "Updating the results…" : ""}
      </p>
      <div className={isStale ? "reduced" : ""} aria-busy={isStale}>
        <SearchResults query={deferredQuery} />
      </div>
    </section>
  );
}
