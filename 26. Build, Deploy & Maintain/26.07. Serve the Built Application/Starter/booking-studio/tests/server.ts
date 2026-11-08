import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { confirmation, reference } from "./fixtures";

export const server = setupServer(
  http.post("/api/typed-bookings", () => HttpResponse.json(confirmation, { status: 201 })),
  http.get(`/api/typed-bookings/${reference}`, () => HttpResponse.json(confirmation)),
);