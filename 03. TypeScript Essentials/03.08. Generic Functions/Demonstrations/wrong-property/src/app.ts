type Movie = {
  title: string;
  ticketPrice: number;
};

interface Booking {
  readonly id: string;
  movie: Movie;
  ticketCount: number;
  note?: string;
}

type Discount = (subtotal: number) => number;

type TicketCategory = "standard" | "student";

interface TicketRequest {
  ticketCount: number;
  category: TicketCategory;
}

function getSubtotal(price: number, count: number): number {
  return price * count;
}

function getCategoryPrice(price: number, category: TicketCategory): number {
  if (category === "student") {
    return price * 0.8;
  }
  return price;
}

function getBookingTotal(
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

function printTotal(booking: Booking, category: TicketCategory | null): void {
  const total = getBookingTotal(booking, category);
  if (total === undefined) {
    console.log("Choose a ticket category");
    return;
  }
  console.log(`Total: ${total.toFixed(2)}`);
}

function formatNote(note?: string): string {
  return note ?? "No note";
}

function parseTicketRequest(text: string): TicketRequest {
  const value: unknown = JSON.parse(text);
  if (typeof value !== "object" || value === null) {
    throw new Error("Booking data must be an object");
  }
  if (
    !("ticketCount" in value) ||
    typeof value.ticketCount !== "number" ||
    !Number.isInteger(value.ticketCount) ||
    value.ticketCount < 1
  ) {
    throw new Error("Ticket count must be a positive whole number");
  }
  if (
    !("category" in value) ||
    (value.category !== "standard" && value.category !== "student")
  ) {
    throw new Error("Choose a supported ticket category");
  }
  return { ticketCount: value.ticketCount, category: value.category };
}

const booking: Booking = {
  id: "b1",
  movie: { title: "Skyward", ticketPrice: 12 },
  ticketCount: 2,
};

function showSavedBooking(text: string): void {
  try {
    const request = parseTicketRequest(text);
    const restoredBooking = { ...booking, ticketCount: request.ticketCount };
    printTotal(restoredBooking, request.category);
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Unable to read booking");
  }
}

showSavedBooking('{"ticketCount":3,"category":"student"}');
showSavedBooking('{"ticketCount":"3","category":"student"}');

function firstOrUndefined<T>(items: T[]): T | undefined {
  return items[0];
}

const movies: Movie[] = [
  booking.movie,
  { title: "Night Signals", ticketPrice: 15 },
];
const firstMovie = firstOrUndefined(movies);
console.log(`First movie: ${firstMovie?.title ?? "No movie"}`);

const categories: TicketCategory[] = ["standard", "student"];
const firstCategory = firstOrUndefined(categories);
console.log(`First category: ${firstCategory ?? "No category"}`);

const emptyMovies: Movie[] = [];
console.log(`Empty selection: ${firstOrUndefined(emptyMovies)?.title ?? "No movie"}`);

console.log(firstMovie?.category);
