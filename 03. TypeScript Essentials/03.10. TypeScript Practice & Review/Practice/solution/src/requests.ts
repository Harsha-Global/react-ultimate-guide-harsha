import type { TicketRequest } from "./types.js";

export function parseTicketRequest(text: string): TicketRequest {
  const value: unknown = JSON.parse(text);
  if (typeof value !== "object" || value === null) {
    throw new Error("Booking data must be an object");
  }
  if (
    !("ticketCount" in value) ||
    typeof value.ticketCount !== "number" ||
    !Number.isInteger(value.ticketCount) ||
    value.ticketCount < 1 ||
    value.ticketCount > 6
  ) {
    throw new Error("Ticket count must be a whole number from 1 to 6");
  }
  if (
    !("category" in value) ||
    (value.category !== "standard" &&
      value.category !== "student" &&
      value.category !== "child")
  ) {
    throw new Error("Choose a supported ticket category");
  }
  return { ticketCount: value.ticketCount, category: value.category };
}
