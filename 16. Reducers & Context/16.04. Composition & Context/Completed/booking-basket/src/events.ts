import type { EventOption } from "./models.ts";
export const events: readonly EventOption[] = [
  {
    id: "e1",
    title: "Studio painting",
    city: "Denver",
    category: "Creative",
    dateLabel: "Saturday · 10:00 AM",
    priceCents: 3500,
    maxTickets: 4,
    artwork: "/assets/painting.svg",
  },
  {
    id: "e2",
    title: "Supper club",
    city: "Seattle",
    category: "Food",
    dateLabel: "Saturday · 6:30 PM",
    priceCents: 6000,
    maxTickets: 2,
    artwork: "/assets/supper.svg",
  },
  {
    id: "e3",
    title: "City photo walk",
    city: "Austin",
    category: "Outdoor",
    dateLabel: "Sunday · 9:00 AM",
    priceCents: 4500,
    maxTickets: 3,
    artwork: "/assets/photography.svg",
  },
];
export function findEvent(eventId: string): EventOption | undefined {
  return events.find((event) => event.id === eventId);
}
