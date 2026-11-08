import { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
const ReviewList = lazy(() =>
  new Promise<void>((resolve) => setTimeout(resolve, 1800)).then(
    () => import("./ReviewList"),
  ),
);
export function ReviewsPanel() {
  const [showReviews, setShowReviews] = useState(false);
  return (
    <section className="panel wide">
      <p className="eyebrow">FROM THE WORKSHOP</p>
      <h2>A good way to spend the day.</h2>
      {!showReviews ? (
        <button type="button" onClick={() => setShowReviews(true)}>
          Read workshop reviews
        </button>
      ) : (
        <ErrorBoundary fallback={
          <div role="alert">
            <p>
              We couldn't load the reviews. Reloading the page will clear
              unsaved entries.
            </p>
            <button type="button" onClick={() => window.location.reload()}>
              Reload page
            </button>
          </div>
        }>
          <Suspense fallback={<p role="status" className="skeleton">Loading workshop reviews…</p>}>
            <ReviewList />
          </Suspense>
        </ErrorBoundary>
      )}
    </section>
  );
}
