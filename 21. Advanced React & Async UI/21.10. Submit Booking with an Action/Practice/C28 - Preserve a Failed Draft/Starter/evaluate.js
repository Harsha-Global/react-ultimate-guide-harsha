describe("Preserve a Failed Draft", function () {
it("keeps both values and the service message after failure", async function () {
  const draft = { name: "Maya", email: "maya@example.com" };
  const result = await saveDraft(draft, async function () { throw new Error("Session full."); });
  expect(result).toEqual({ draft: draft, reference: null, message: "Session full." });
});
it("clears only the returned draft after success", async function () {
  const draft = Object.freeze({ name: "Sam", email: "sam@example.com" });
  const result = await saveDraft(draft, async function (received) { expect(received).toEqual(draft); return { reference: "saved-42" }; });
  expect(result).toEqual({ draft: { name: "", email: "" }, reference: "saved-42", message: "Saved." });
  expect(draft.name).toBe("Sam");
});
it("waits for the request instead of returning a premature result", async function () {
  let finish; const sent = new Promise(function (resolve) { finish = resolve; });
  let returned = false;
  const result = saveDraft({ name: "Maya", email: "m@example.com" }, function () { return sent; }).then(function (value) { returned = true; return value; });
  await Promise.resolve(); expect(returned).toBe(false);
  finish({ reference: "later" }); expect((await result).reference).toBe("later");
});
it("gives a useful fallback for a non-Error failure", async function () {
  const result = await saveDraft({ name: "Maya", email: "m@example.com" }, async function () { throw "offline"; });
  expect(result.message).toBe("Could not save. Try again."); expect(result.draft.name).toBe("Maya");
});
it("allows the same failed draft to be retried successfully", async function () {
  let attempt = 0;
  const send = async function () { attempt++; if (attempt === 1) throw new Error("Try again."); return { reference: "retry-ok" }; };
  const failed = await saveDraft({ name: "Maya", email: "m@example.com" }, send);
  const saved = await saveDraft(failed.draft, send);
  expect(saved.reference).toBe("retry-ok"); expect(attempt).toBe(2);
});
});
