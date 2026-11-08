import test from "node:test";
import assert from "node:assert/strict";
import { products } from "../src/catalog.ts";
import { queryInventory } from "../server/query-inventory.mjs";
test("server paging bounds the result of a ten-thousand-row fixture", () => {
  const many=Array.from({length:10000},(_,i)=>({...products[i%products.length],id:`X-${i}`,name:`Fixture ${String(i).padStart(5,"0")}`}));
  const result=queryInventory(many,new URLSearchParams("q=Fixture&sort=name&dir=asc&page=1250&pageSize=4"));
  assert.equal(result.total,10000); assert.equal(result.items.length,4); assert.equal(result.items[0].name,"Fixture 04996");
  const empty=queryInventory(many,new URLSearchParams("q=missing&page=1&pageSize=4")); assert.equal(empty.total,0); assert.deepEqual(empty.items,[]);
});
