import { LiveQueue } from "./LiveQueue";
import { DemoControls } from "./DemoControls";
import { useState } from "react";
import { OrderQueue } from "./OrderQueue";
import { PagedQueue } from "./PagedQueue";
export function QueueWorkspace() {
  const [view, setView] = useState<"search" | "pages" | "feed" | "live">("search");
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
        </button>{" "}
        <button className="secondary" aria-pressed={view === "live"} onClick={() => setView("live")}>
          Live view
        </button>
      </nav>
      <DemoControls />
      {view === "live" ? <LiveQueue /> : view === "search" ? (
        <OrderQueue />
      ) : (
        <PagedQueue key={view} mode={view} />
      )}
    </>
  );
}
