import { Booking, Movie, TicketCategory } from "./types.js";
import { printTotal } from "./pricing.js";
import { parseTicketRequest } from "./requests.js";
import { firstOrUndefined } from "./collections.js";

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
