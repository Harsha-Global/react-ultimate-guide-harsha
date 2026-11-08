import { expect, test } from "vitest";
import { placesFor } from "../src/bookingTypes";

test("an individual booking reserves one place", () => {
  const result = placesFor({ kind: "individual" });
  expect(result).toBe(1);
});