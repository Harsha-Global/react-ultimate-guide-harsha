import { bookingConfirmationSchema, bookingRequestSchema, bookingReferenceSchema } from "../shared/bookingSchema";
import type { BookingRequest } from "../shared/bookingSchema";

export async function submitTypedBooking(input: BookingRequest) {
  const response = await fetch("/api/typed-bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingRequestSchema.parse(input)),
  });
  const value: unknown = await response.json();
  if (!response.ok)
    throw new Error(
      typeof value === "object" && value !== null && "message" in value && typeof value.message === "string"
        ? value.message
        : "The booking could not be saved.",
    );
  return bookingConfirmationSchema.parse(value);
}

export async function loadBooking(reference: string, signal?: AbortSignal) {
  if (!bookingReferenceSchema.safeParse(reference).success)
    throw new Error("This booking link is not valid.");
  const response = await fetch(`/api/typed-bookings/${encodeURIComponent(reference)}`, { signal });
  if (!response.ok)
    throw new Error(response.status === 404 ? "Booking not found." : "We could not load this booking.");
  return bookingConfirmationSchema.parse(await response.json());
}