import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { expect, test } from "vitest";
import { BookingResult } from "../src/BookingResult";
import { reference } from "./fixtures";
import { server } from "./server";

test("a saved confirmation can be retried after a server failure", async () => {
  const user = userEvent.setup();
  server.use(http.get(`/api/typed-bookings/${reference}`, () => new HttpResponse(null, { status: 503 }), { once: true }));
  render(<BookingResult reference={reference} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading booking…");
  expect(await screen.findByRole("alert")).toHaveTextContent("We could not load this booking.");
  await user.click(screen.getByRole("button", { name: "Try again" }));
  expect(await screen.findByText(`${reference} · 1 place · morning session`)).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});