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

function getSubtotal(price: number, count: number): number {
  return price * count;
}

function getBookingTotal(
  booking: Booking,
  discount: Discount = (subtotal) => subtotal,
): number {
  const subtotal = getSubtotal(booking.movie.ticketPrice, booking.ticketCount);
  return discount(subtotal) + 3;
}

function formatNote(note?: string): string {
  return note ?? "No note";
}

const booking: Booking = {
  id: "b1",
  movie: { title: "Skyward", ticketPrice: 12 },
  ticketCount: 2,
};

const tenPercentOff: Discount = (subtotal) => "discounted";
console.log(`Regular: ${getBookingTotal(booking).toFixed(2)}`);
console.log(`Discounted: ${getBookingTotal(booking, tenPercentOff).toFixed(2)}`);
console.log(formatNote(booking.note));
