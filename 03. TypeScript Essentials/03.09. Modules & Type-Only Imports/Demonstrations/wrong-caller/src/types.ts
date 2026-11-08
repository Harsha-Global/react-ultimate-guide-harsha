export type Movie = {
  title: string;
  ticketPrice: number;
};

export interface Booking {
  readonly id: string;
  movie: Movie;
  ticketCount: number;
  note?: string;
}

export type Discount = (subtotal: number) => number;

export type TicketCategory = "standard" | "student";

export interface TicketRequest {
  ticketCount: number;
  category: TicketCategory;
}
