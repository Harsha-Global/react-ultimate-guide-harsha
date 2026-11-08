import { startTransition, useOptimistic, useRef, useState } from "react";
import { postReview, ReviewRequestError } from "./reviewApi";
import type { Review, ReviewDraft } from "./reviewApi";
import { ReviewFields } from "./ReviewFields";
export function addReviewPreview(
  current: Review[],
  draft: ReviewDraft,
): Review[] {
  if (current.some((review) => review.clientId === draft.clientId))
    return current;
  return [...current, { ...draft, id: draft.clientId, pending: true }];
}
export function ReviewBoard({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const attemptRef = useRef<ReviewDraft | null>(null);
  const [optimisticReviews, addOptimisticReview] = useOptimistic(
    reviews,
    addReviewPreview,
  );
  const hasPreview = optimisticReviews.some((review) => review.pending);
  async function submitReview(formData: FormData) {
    const submittedName = String(formData.get("reviewName") ?? "").trim();
    const submittedText = String(formData.get("reviewText") ?? "").trim();
    const previous = attemptRef.current;
    const draft: ReviewDraft =
      previous &&
      previous.name === submittedName &&
      previous.text === submittedText
        ? previous
        : {
            clientId: crypto.randomUUID(),
            name: submittedName,
            text: submittedText,
          };
    attemptRef.current = draft;
    setError("");
    setMessage("");
    addOptimisticReview(draft);
    try {
      const saved = await postReview(draft);
      startTransition(() =>
        setReviews((current) =>
          current.some((review) => review.clientId === saved.clientId)
            ? current.map((review) =>
                review.clientId === saved.clientId ? saved : review,
              )
            : [...current, saved],
        ),
      );
      // Clearing a controlled draft is an urgent UI update, not a transition for typing.
      setText("");
      setMessage("Your review has been added. Thank you.");
      attemptRef.current = null;
    } catch (caught) {
      if (caught instanceof ReviewRequestError) setError(caught.message);
      else throw caught;
    }
  }
  return (
    <>
      <ul className="review-list">
        {optimisticReviews.map((review) => (
          <li key={review.clientId} className={"review" + (review.pending ? " pending" : "")}>
            <strong>{review.name}</strong>
            <p>{review.text}</p>
            {review.pending && (
              <span className="badge" role="status">
                Sending…
              </span>
            )}
          </li>
        ))}
      </ul>
      <form action={submitReview}>
        <ReviewFields name={name} text={text} onNameChange={setName} onTextChange={setText} />
        {!hasPreview && error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        {!hasPreview && message && (
          <p role="status" className="notice">
            {message}
          </p>
        )}
      </form>
    </>
  );
}
