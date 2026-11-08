import assert from "node:assert/strict";
import { createCatalogServer } from "../server/catalog-api.mjs";
const server = createCatalogServer({ delayMs: 0 });
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const base = `http://127.0.0.1:${server.address().port}`;
let count = 0;
async function check(name, run) { await run(); count++; console.log(`PASS ${name}`); }
async function patch(id, values) { return fetch(`${base}/api/products/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({reorderLevel:5,...values}) }); }
try {
  await check("Health and initial four products", async () => { assert.equal((await (await fetch(`${base}/api/health`)).json()).status,"ok"); assert.equal((await (await fetch(`${base}/api/products`)).json()).items.length,4); });
  await check("Negative, fractional, blank and excessive stock rejected", async () => { for (const stock of [-1, 1.5, "", 10000]) {const r=await patch("P-101",{name:"Studio Desk Lamp",stock});assert.equal(r.status,422);assert.ok((await r.json()).fieldErrors.stock);} });
  await check("Duplicate name rejected without changing product", async () => {const r=await patch("P-101",{name:"  everyday backpack  ",stock:0});assert.equal(r.status,422);assert.ok((await r.json()).fieldErrors.name);const {items}=await (await fetch(`${base}/api/products`)).json();assert.equal(items[0].stock,12);});
  await check("Accepted response trims name and persists zero stock", async () => {const r=await patch("P-101",{name:"  Updated Studio Lamp  ",stock:0});assert.equal(r.status,200);const {product}=await r.json();assert.equal(product.name,"Updated Studio Lamp");assert.equal(product.stock,0);assert.equal(product.priceMinor,8900);assert.equal((await (await fetch(`${base}/api/products`)).json()).items[0].name,product.name);});
  await check("Reorder boundaries enforced and accepted zero persists", async () => {
    for (const reorderLevel of [-1, 1.5, 1000, ""]) assert.equal((await patch("P-103", {name:"Terracotta Travel Mug",stock:3,reorderLevel})).status,422);
    const r=await patch("P-103", {name:"Terracotta Travel Mug",stock:3,reorderLevel:0});assert.equal(r.status,200);assert.equal((await r.json()).product.reorderLevel,0);
  });
  await check("Missing product returns 404", async () => assert.equal((await patch("missing",{name:"Valid",stock:1})).status,404));
  await check("Malformed JSON returns 400", async () => assert.equal((await fetch(`${base}/api/products/P-101`,{method:"PATCH",body:"{"})).status,400));
  await check("New server has isolated fresh inventory", async () => {const second=createCatalogServer({delayMs:0});await new Promise(done=>second.listen(0,"127.0.0.1",done));try{const {items}=await (await fetch(`http://127.0.0.1:${second.address().port}/api/products`)).json();assert.equal(items[0].name,"Studio Desk Lamp");}finally{await new Promise(done=>second.close(done));}});
  console.log(`${count} API contract checks passed.`);
} finally { await new Promise((done) => server.close(done)); }
