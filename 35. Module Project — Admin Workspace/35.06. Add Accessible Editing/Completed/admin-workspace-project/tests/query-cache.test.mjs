import test from "node:test";
import assert from "node:assert/strict";
import { QueryClient } from "@tanstack/react-query";
import { createWorkspaceStore } from "../src/workspaceStore.ts";
import { memoryStorage } from "./memory-storage.mjs";

test("each query has its own cache entry and a fresh same-query result is reused", async () => {
  const client = new QueryClient(); let calls = 0;
  const get = (query) => client.fetchQuery({ queryKey: ["catalog", query], staleTime: 30_000, queryFn: async () => { calls++; return { query }; } });
  const first = await get("q=studio");
  assert.strictEqual(await get("q=studio"), first); assert.equal(calls, 1);
  assert.deepEqual(await get("q=travel"), { query: "q=travel" }); assert.equal(calls, 2);
  client.clear();
});
test("an accepted save invalidates every catalog view without invalidating unrelated keys", async () => {
  const client = new QueryClient();
  client.setQueryData(["catalog", "q=studio"], { total: 2 });
  client.setQueryData(["catalog", "q=travel"], { total: 2 });
  client.setQueryData(["help"], { title: "Help" });
  await client.invalidateQueries({ queryKey: ["catalog"] });
  assert.equal(client.getQueryState(["catalog", "q=studio"]).isInvalidated, true);
  assert.equal(client.getQueryState(["catalog", "q=travel"]).isInvalidated, true);
  assert.equal(client.getQueryState(["help"]).isInvalidated, false);
  client.clear();
});
test("display actions do not copy or replace cached product data", () => {
  const client = new QueryClient(); const rows = { items: [{ id: "P-101", name: "Studio Desk Lamp" }] };
  client.setQueryData(["catalog", ""], rows); const cached = client.getQueryData(["catalog", ""]);
  const store = createWorkspaceStore(memoryStorage()); store.getState().setDensity("compact");
  assert.strictEqual(client.getQueryData(["catalog", ""]), cached);
  assert.equal(Object.hasOwn(store.getState(), "products"), false);
  client.clear();
});
