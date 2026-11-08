import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { expect, test, vi } from "vitest";
import { TypedBookingForm } from "../src/TypedBookingForm";
import { server } from "./server";

test("a failed submission keeps the details and allows a successful retry", async () => {
  const user = userEvent.setup();
  server.use(http.post("/api/typed-bookings", () => HttpResponse.json({ message: "The studio is unavailable." }, { status: 503 }), { once: true }));
  render(<TypedBookingForm draft={{ kind: "individual" }} slot="morning" onLockedChange={vi.fn()} />);
  await user.type(screen.getByRole("textbox", { name: "Contact name" }), "Alex Morgan");
  await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
  await user.click(screen.getByRole("button", { name: "Book this visit" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("The studio is unavailable.");
  expect(screen.getByRole("textbox", { name: "Contact name" })).toHaveValue("Alex Morgan");
  expect(screen.getByRole("textbox", { name: "Email address" })).toHaveValue("alex@example.com");
  await user.click(screen.getByRole("button", { name: "Book this visit" }));
  expect(await screen.findByRole("heading", { name: "Your booking is confirmed." })).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});