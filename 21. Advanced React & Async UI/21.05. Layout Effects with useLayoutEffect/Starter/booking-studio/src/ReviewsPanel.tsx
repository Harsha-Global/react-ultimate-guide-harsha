import { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import ReviewList from "./ReviewList";
export function ReviewsPanel() {
  const [attempt, setAttempt] = useState(0);
  return (
    <section className="panel wide">
      <p className="eyebrow">FROM THE WORKSHOP</p>
      <h2>A good way to spend the day.</h2>
      <ErrorBoundary key={attempt} fallback={
        <div role="alert">
          <p>We couldn't show the reviews.</p>
          <button type="button" onClick={() => setAttempt((value) => value + 1)}>
            Try reviews again
          </button>
        </div>
      }>
        <ReviewList />
      </ErrorBoundary>
    </section>
  );
}
