import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
const service = "http://127.0.0.1:4318";
const originalFetch = globalThis.fetch;
let sent = 0;
globalThis.fetch = (url, options) => {
  sent++;
  return originalFetch(new URL(url, service), options);
};
// The supplied runner resolves the browser helper's imports and relative URLs in Node.
const source = (await readFile(new URL("../src/typedBookingApi.ts", import.meta.url), "utf8"))
  .replaceAll('"../shared/bookingSchema"', JSON.stringify(new URL("../shared/bookingSchema.ts", import.meta.url).href));
const output = ts.transpileModule(source, {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022}}).outputText;
const { submitTypedBooking } = await import("data:text/javascript;base64," + Buffer.from(output).toString("base64"));
const reset = await originalFetch(service + "/api/reset", {method: "POST"});
assert.equal(reset.status, 200);
const request = {kind: "group", groupName: "Saturday Friends", name: "Maya", email: "maya@example.com", slot: "morning", requestId: crypto.randomUUID(), attendees: [
  {id: crypto.randomUUID(), name: "Maya"}, {id: crypto.randomUUID(), name: "Sam"}
]};
try {
  const confirmation = await submitTypedBooking(request);
  assert.equal(confirmation.places, 2); assert.equal(confirmation.slot, "morning");
  assert.match(confirmation.reference, /^[a-f0-9-]{36}$/);
  console.log("PASS: group booking saved — 2 morning places, reference", confirmation.reference);
  const before = sent;
  await assert.rejects(() => submitTypedBooking({...request, requestId: crypto.randomUUID(), attendees: [{...request.attendees[0], name: " "}, request.attendees[1]]}));
  assert.equal(sent, before);
  console.log("PASS: blank attendee rejected before sending a request.");
  await assert.rejects(() => submitTypedBooking({...request, slot: "evening", requestId: crypto.randomUUID()}), /full|available|place/i);
  assert.equal(sent, before + 1);
  console.log("PASS: valid evening request reaches the service and is rejected because the session is full.");
} finally { globalThis.fetch = originalFetch; }
