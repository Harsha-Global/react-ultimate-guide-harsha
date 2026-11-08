import { expect, test } from "vitest";
import { bookingReducer } from "../src/bookingReducer";
import type { GroupBooking } from "../src/bookingTypes";

const pair: GroupBooking = {
  kind: "group",
  groupName: "Studio team",
  attendees: [
    { id: "a", name: "Alex" },
    { id: "b", name: "Jordan" },
  ],
};

test("adding an attendee preserves the previous draft", () => {
  const next = bookingReducer(pair, { type: "attendeeAdded", attendee: { id: "c", name: "Casey" } });
  expect(next).toEqual({ ...pair, attendees: [...pair.attendees, { id: "c", name: "Casey" }] });
  expect(pair.attendees).toHaveLength(2);
});

test("a group keeps its minimum two attendees", () => {
  expect(bookingReducer(pair, { type: "attendeeRemoved", id: "a" })).toBe(pair);
});

test("an existing attendee is not added twice", () => {
  expect(bookingReducer(pair, { type: "attendeeAdded", attendee: pair.attendees[0] })).toBe(pair);
});

test("an individual booking cannot gain a group attendee", () => {
  const individual = { kind: "individual" } as const;
  expect(bookingReducer(individual, { type: "attendeeAdded", attendee: pair.attendees[0] })).toBe(individual);
});

// Regression: the maximum is eight attendees, including existing entries.
test("a full group rejects a ninth attendee", () => {
  const full: GroupBooking = { ...pair, attendees: Array.from({ length: 8 }, (_, index) => ({ id: String(index), name: `Guest ${index + 1}` })) };
  const next = bookingReducer(full, { type: "attendeeAdded", attendee: { id: "extra", name: "Casey" } });
  expect(next).toBe(full);
  expect(full.attendees).toHaveLength(8);
});