import { useEffect, useState } from "react";
import { getReviews, ReviewRequestError } from "./reviewApi";
import type { Review } from "./reviewApi";
type LoadState =
  | { status: "loading" }
  | { status: "ready"; reviews: Review[] }
  | { status: "error"; message: string };
export default function ReviewList() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoad({ status: "loading" });
    getReviews(controller.signal)
      .then((reviews) => {
        if (!controller.signal.aborted) setLoad({ status: "ready", reviews });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setLoad({
            status: "error",
            message:
              error instanceof ReviewRequestError
                ? error.message
                : "We could not load the reviews. Try again.",
          });
      });
    return () => controller.abort();
  }, [attempt]);
  if (load.status === "loading")
    return <p role="status">Loading saved reviews…</p>;
  if (load.status === "error")
    return (
      <div role="alert">
        <p>{load.message}</p>
        <button type="button" onClick={() => setAttempt((value) => value + 1)}>
          Try loading reviews again
        </button>
      </div>
    );
  return (
    <ul className="review-list">
      {load.reviews.map((review) => (
        <li key={review.clientId} className="review">
          <strong>{review.name}</strong>
          <p>{review.text}</p>
        </li>
      ))}
    </ul>
  );
}
