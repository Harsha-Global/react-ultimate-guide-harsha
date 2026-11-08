import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { expect, test, vi } from "vitest";
import { TypedBookingForm } from "../src/TypedBookingForm";
import { confirmation } from "./fixtures";
import { server } from "./server";

test("the form stays disabled until the pending request finishes", async () => {
  const user = userEvent.setup();
  const gate = Promise.withResolvers<void>();
  server.use(http.post("/api/typed-bookings", async () => {
    await gate.promise;
    return HttpResponse.json(confirmation, { status: 201 });
  }));
  render(<TypedBookingForm draft={{ kind: "individual" }} slot="morning" onLockedChange={vi.fn()} />);
  await user.type(screen.getByRole("textbox", { name: "Contact name" }), "Alex Morgan");
  await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
  await user.click(screen.getByRole("button", { name: "Book this visit" }));
  try {
    expect(await screen.findByRole("button", { name: "Saving booking…" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Contact name" })).toBeDisabled();
  } finally {
    gate.resolve();
  }
  expect(await screen.findByRole("heading", { name: "Your booking is confirmed." })).toBeInTheDocument();
});