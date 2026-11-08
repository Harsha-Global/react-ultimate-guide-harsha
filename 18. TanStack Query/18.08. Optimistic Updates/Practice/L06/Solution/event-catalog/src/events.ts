import { z } from "zod";
export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  category: z.enum(["art", "food", "outdoors"]),
  price: z.number().nonnegative(),
  seats: z.number().int().min(0).max(30),
  venueId: z.string(),
  published: z.boolean(),
  image: z.string(),
});
export const eventPageSchema = z.object({
  items: z.array(eventSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});
export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});
export const eventEditSchema = z.object({
  title: z.string().trim().min(3, "Enter at least three characters."),
});
export type EventItem = z.infer<typeof eventSchema>;
export type EventPage = z.infer<typeof eventPageSchema>;
export type EventFilters = {
  q: string;
  category: "all" | EventItem["category"];
  sort: "title" | "price";
  page: number;
};
export const defaultFilters: EventFilters = {
  q: "",
  category: "all",
  sort: "title",
  page: 1,
};
