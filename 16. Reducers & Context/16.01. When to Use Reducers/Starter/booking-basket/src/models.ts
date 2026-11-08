export type EventCategory = "Creative" | "Food" | "Outdoor";
export type EventOption = {
  id: string;
  title: string;
  city: string;
  category: EventCategory;
  dateLabel: string;
  priceCents: number;
  maxTickets: number;
  artwork: string;
};
export type BasketLine = { eventId: string; quantity: number };
export type BasketState = { lines: BasketLine[] };
