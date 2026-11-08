import type { Slot } from "./slots";
export type BookingInput = {
  requestId: string;
  name: string;
  email: string;
  slot: Slot;
};
export type Confirmation = { reference: string; name: string; slot: Slot };
export class BookingRequestError extends Error {}
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}
export async function createBooking(
  input: BookingInput,
): Promise<Confirmation> {
  let response: Response;
  try {
    response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new BookingRequestError(
      "We could not confirm the result. Keep the same details when you retry.",
    );
  }
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new BookingRequestError(
      "The booking service returned an unreadable response. Keep the same details when you retry.",
    );
  }
  if (!response.ok) {
    if (
      (response.status === 409 || response.status === 422) &&
      isRecord(data) &&
      typeof data.message === "string"
    )
      throw new BookingRequestError(data.message);
    throw new BookingRequestError(
      "The booking service is unavailable. Keep the same details when you retry.",
    );
  }
  if (
    !isRecord(data) ||
    typeof data.reference !== "string" ||
    typeof data.name !== "string" ||
    (data.slot !== "morning" && data.slot !== "evening")
  )
    throw new BookingRequestError(
      "The confirmation could not be read. Keep the same details when you retry.",
    );
  return { reference: data.reference, name: data.name, slot: data.slot };
}
