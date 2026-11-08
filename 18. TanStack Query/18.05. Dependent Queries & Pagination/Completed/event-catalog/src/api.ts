import { z } from "zod";
import { eventSchema, eventPageSchema, venueSchema } from "./events.ts";
import type { EventFilters } from "./events.ts";
export class ApiError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
async function readResponse(response: Response): Promise<unknown> {
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const parsed = z.object({ message: z.string() }).safeParse(body);
    throw new ApiError(
      parsed.success ? parsed.data.message : "The request failed.",
      response.status,
    );
  }
  return body;
}
function checked<T>(schema: z.ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success)
    throw new Error(
      "The server returned data in an unexpected format. Please try again later.",
    );
  return result.data;
}
export async function getEvents(filters: EventFilters, signal?: AbortSignal) {
  const params = new URLSearchParams({
    q: filters.q,
    category: filters.category,
    sort: filters.sort,
    page: String(filters.page),
  });
  const response = await fetch("/api/events?" + params, { signal });
  return checked(eventPageSchema, await readResponse(response));
}
export async function getEvent(id: string, signal?: AbortSignal) {
  const response = await fetch("/api/events/" + encodeURIComponent(id), {
    signal,
  });
  return checked(eventSchema, await readResponse(response));
}
export async function getVenue(id: string, signal?: AbortSignal) {
  const response = await fetch("/api/venues/" + encodeURIComponent(id), {
    signal,
  });
  return checked(venueSchema, await readResponse(response));
}
export async function renameEvent(id: string, title: string) {
  const response = await fetch("/api/events/" + encodeURIComponent(id), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return checked(eventSchema, await readResponse(response));
}
export async function setPublished(id: string, published: boolean) {
  const response = await fetch(
    "/api/events/" + encodeURIComponent(id) + "/publication",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    },
  );
  return checked(eventSchema, await readResponse(response));
}
