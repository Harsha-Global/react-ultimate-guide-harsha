import { useState } from "react";
import { OrderQueue } from "./OrderQueue";
import { PagedQueue } from "./PagedQueue";
export function QueueWorkspace() {
  const [view, setView] = useState<"search" | "pages" | "feed">("search");
  return (
    <>
      <nav aria-label="Queue views">
        <button
          className="secondary"
          aria-pressed={view === "search"}
          onClick={() => setView("search")}
        >
          Search view
        </button>{" "}
        <button
          className="secondary"
          aria-pressed={view === "pages"}
          onClick={() => setView("pages")}
        >
          Page view
        </button>{" "}
        <button
          className="secondary"
          aria-pressed={view === "feed"}
          onClick={() => setView("feed")}
        >
          Load-more view
        </button>
      </nav>
      {view === "search" ? (
        <OrderQueue />
      ) : (
        <PagedQueue key={view} mode={view} />
      )}
    </>
  );
}
