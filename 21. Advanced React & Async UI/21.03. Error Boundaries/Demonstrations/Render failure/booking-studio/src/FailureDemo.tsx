import { useState } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import ReviewList from "./ReviewList";
function ReviewAttempt({ broken }: { broken: boolean }) {
  if (broken) throw new Error("Intentional review rendering failure.");
  return <ReviewList />;
}
export default function FailureDemo() {
  const [broken, setBroken] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [count, setCount] = useState(0);
  return (
    <main>
      <p className="eyebrow">ISOLATED LESSON DEMONSTRATION</p>
      <h1>A failure inside one region.</h1>
      <section className="panel stack">
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          Outside the boundary: {count}
        </button>
        <button type="button" className="secondary" onClick={() => setBroken(true)}>
          Cause a review render failure
        </button>
        <ErrorBoundary key={attempt} fallback={
          <div role="alert">
            <p>We couldn't show the reviews.</p>
            <div className="row">
              <button type="button" onClick={() => setAttempt((value) => value + 1)}>
                Retry unchanged input
              </button>
              <button type="button" onClick={() => {
                setBroken(false);
                setAttempt((value) => value + 1);
              }}>
                Fix input and retry
              </button>
            </div>
          </div>
        }>
          <ReviewAttempt broken={broken} />
        </ErrorBoundary>
      </section>
    </main>
  );
}
