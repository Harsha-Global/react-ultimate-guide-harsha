import { http, HttpResponse } from "msw";
import { expect, test } from "vitest";
import { submitTypedBooking } from "../src/typedBookingApi";
import { confirmation, individual } from "./fixtures";
import { server } from "./server";

test("the request sends normalized booking data and returns a confirmation", async () => {
  let received: unknown;
  server.use(http.post("/api/typed-bookings", async ({ request }) => {
    received = await request.json();
    return HttpResponse.json(confirmation, { status: 201 });
  }));
  const result = await submitTypedBooking({ ...individual, email: " ALEX@EXAMPLE.COM " });
  expect(received).toEqual(individual);
  expect(result).toEqual(confirmation);
});

test("an unsuccessful response rejects with the server message", async () => {
  server.use(http.post("/api/typed-bookings", () => HttpResponse.json({ message: "The studio is unavailable." }, { status: 503 })));
  await expect(submitTypedBooking(individual)).rejects.toThrow("The studio is unavailable.");
});