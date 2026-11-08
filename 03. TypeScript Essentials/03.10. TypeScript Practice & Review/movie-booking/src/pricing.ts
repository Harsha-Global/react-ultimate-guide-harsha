import type { Booking, Discount, TicketCategory } from "./types.js";

export function getSubtotal(price: number, count: number): number {
  return price * count;
}

export function getCategoryPrice(price: number, category: TicketCategory): number {
  if (category === "student") {
    return price * 0.8;
  }
  if (category === "child") {
    return price * 0.5;
  }
  return price;
}

export function getBookingTotal(
  booking: Booking,
  category: TicketCategory | null,
  discount: Discount = (subtotal) => subtotal,
): number | undefined {
  if (category === null) {
    return undefined;
  }
  const price = getCategoryPrice(booking.movie.ticketPrice, category);
  const subtotal = getSubtotal(price, booking.ticketCount);
  return discount(subtotal) + 3;
}

export function printTotal(booking: Booking, category: TicketCategory | null): void {
  const total = getBookingTotal(booking, category);
  if (total === undefined) {
    console.log("Choose a ticket category");
    return;
  }
  console.log(`Total: ${total.toFixed(2)}`);
}

export function formatNote(note?: string): string {
  return note ?? "No note";
}
