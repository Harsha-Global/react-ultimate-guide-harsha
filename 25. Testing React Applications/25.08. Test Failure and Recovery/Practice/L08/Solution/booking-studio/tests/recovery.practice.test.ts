import { expect, test } from "vitest";
import { recoveryMessage } from "../src/recoveryMessage";
test("recovery reports a successful booking", async () => {
  const message = await recoveryMessage();
  expect(message).toBe("Your booking is confirmed.");
});
