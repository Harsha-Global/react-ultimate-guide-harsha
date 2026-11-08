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

const booking: Booking = {
  id: "b1",
  movie: { title: "Skyward", ticketPrice: 12 },
  ticketCount: 3,
  note: "Near the aisle",
};

const bookingFee = 3;
const total = booking.movie.ticketPrice * booking.ticketCount + bookingFee;
console.log(`${booking.movie.title}: ${booking.ticketCount} tickets, total ${total}`);
console.log(booking.note ?? "No note");
