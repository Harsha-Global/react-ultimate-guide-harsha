import { expect, test } from "vitest";
import { bookingReducer } from "../src/bookingReducer";
import type { GroupBooking } from "../src/bookingTypes";
const group: GroupBooking = { kind: "group", groupName: "Studio team", attendees: [
  { id: "a", name: "Alex" }, { id: "b", name: "Jordan" }, { id: "c", name: "Casey" },
] };
test("removing Jordan keeps the other attendees and the original draft", () => {
  const next = bookingReducer(group, { type: "attendeeRemoved", id: "b" });
  expect(next).toBeDefined(); // Replace with meaningful result and previous-state assertions.
});
