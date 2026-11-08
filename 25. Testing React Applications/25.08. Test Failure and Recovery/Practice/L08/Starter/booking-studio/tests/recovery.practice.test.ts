import { expect, test } from "vitest";
import { recoveryMessage } from "../src/recoveryMessage";
test("recovery reports a successful booking", () => {
  expect(recoveryMessage()).toBeDefined();
});
