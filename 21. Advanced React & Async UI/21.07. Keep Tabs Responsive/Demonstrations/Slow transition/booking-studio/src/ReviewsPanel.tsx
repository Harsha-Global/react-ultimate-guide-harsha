import { lazy, Suspense, useId, useState, useTransition } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ViewTabs } from "./ViewTabs";
import type { View } from "./ViewTabs";
const ReviewList = lazy(() =>
  new Promise<void>((resolve) => setTimeout(resolve, 1800)).then(
    () => import("./ReviewList"),
  ),
);
export function ReviewsPanel() {
  const id = useId();
  const [view, setView] = useState<View>("overview");
  const [isPending, startTransition] = useTransition();
  function selectView(nextView: View) {
    startTransition(() => setView(nextView));
  }
  return (
    <section className="panel wide">
      <p className="eyebrow">FROM THE WORKSHOP</p>
      <h2>A good way to spend the day.</h2>
      <ViewTabs id={id} selected={view} onSelect={selectView} />
      <p role="status" className="loading-line">
        {isPending ? "Opening the selected view…" : ""}
      </p>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${view}`} aria-busy={isPending} tabIndex={0}>
        <ErrorBoundary fallback={
          <div role="alert">
            <p>
              We couldn't load this view. Reloading clears unsaved entries.
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        }>
          <Suspense fallback={<p role="status">Loading workshop information…</p>}>
            {view === "overview" ? (
              <p>
                Shape a bowl, choose your colours, and let us take care of the
                glazing. Your finished piece will be ready for collection after
                firing.
              </p>
            ) : (
              <ReviewList />
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
