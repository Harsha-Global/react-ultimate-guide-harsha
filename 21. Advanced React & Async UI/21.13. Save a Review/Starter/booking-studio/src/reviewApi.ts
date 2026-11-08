export type Review = {
  id: string;
  clientId: string;
  name: string;
  text: string;
  pending?: boolean;
};
export type ReviewDraft = Pick<Review, "clientId" | "name" | "text">;
export class ReviewRequestError extends Error {}
function isReview(value: unknown): value is Review {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.clientId === "string" &&
    typeof row.name === "string" &&
    typeof row.text === "string"
  );
}
async function read(response: Response): Promise<unknown> {
  let value: unknown;
  try {
    value = await response.json();
  } catch {
    throw new ReviewRequestError(
      "The review service returned an unreadable response. Reload to check before trying again.",
    );
  }
  if (!response.ok) {
    if (
      (response.status === 422 || response.status === 409) &&
      value &&
      typeof value === "object" &&
      "message" in value &&
      typeof value.message === "string"
    )
      throw new ReviewRequestError(value.message);
    throw new ReviewRequestError(
      "The review service is unavailable. Reload to check before trying again.",
    );
  }
  return value;
}
export async function getReviews(signal: AbortSignal): Promise<Review[]> {
  const value = await read(await fetch("/api/reviews", { signal }));
  if (!Array.isArray(value) || !value.every(isReview))
    throw new ReviewRequestError("The review list could not be read.");
  return value.map(({ id, clientId, name, text }) => ({
    id,
    clientId,
    name,
    text,
  }));
}
export async function postReview(draft: ReviewDraft): Promise<Review> {
  let response: Response;
  try {
    response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
  } catch {
    throw new ReviewRequestError(
      "We could not confirm your review. Retry the same text, or reload to check it first.",
    );
  }
  const value = await read(response);
  if (!isReview(value))
    throw new ReviewRequestError(
      "The saved review could not be read. Reload to check before trying again.",
    );
  return {
    id: value.id,
    clientId: value.clientId,
    name: value.name,
    text: value.text,
  };
}
