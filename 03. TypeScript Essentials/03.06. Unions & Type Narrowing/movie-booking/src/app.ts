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

const booking: Booking = {
  id: "b1",
  movie: { title: "Skyward", ticketPrice: 12 },
  ticketCount: 2,
};

printTotal(booking, "standard");
printTotal(booking, "student");
printTotal(booking, null);
