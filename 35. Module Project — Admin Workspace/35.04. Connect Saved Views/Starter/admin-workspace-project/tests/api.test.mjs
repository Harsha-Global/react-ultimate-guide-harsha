import assert from "node:assert/strict";
import { createCatalogServer } from "../server/catalog-api.mjs";
const server = createCatalogServer({ delayMs: 0, listDelayMs: 0 });
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const base = `http://127.0.0.1:${server.address().port}`;
let count = 0;
async function check(name, run) { await run(); count++; console.log(`PASS ${name}`); }
async function patch(id, values) { return fetch(`${base}/api/products/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) }); }
try {
  await check("Health and initial four products", async () => { assert.equal((await (await fetch(`${base}/api/health`)).json()).status,"ok"); assert.equal((await (await fetch(`${base}/api/products`)).json()).items.length,4); });
  await check("Server numeric price order and stable unsorted inventory", async () => {
    const read = async (q) => (await (await fetch(`${base}/api/products?${q}`)).json());
    assert.deepEqual((await read("sort=priceMinor&dir=asc")).items.map(p=>p.priceMinor),[2800,7900,8900,12900]);
    assert.deepEqual((await read("sort=priceMinor&dir=desc")).items.map(p=>p.priceMinor),[12900,8900,7900,2800]);
    assert.deepEqual((await read("")).items.map(p=>p.id),["P-101","P-102","P-103","P-104"]);
  });
  await check("Combined server filter/order keeps whole-catalog summary", async () => {
    const result=await (await fetch(`${base}/api/products?q=%20STUDIO%20&sort=stock&dir=desc`)).json();
    assert.deepEqual(result.items.map(p=>p.id),["P-104","P-101"]);assert.equal(result.total,2);assert.deepEqual(result.summary,{all:4,low:1,unavailable:1});
  });
  await check("Empty result and query validation", async () => {
    const result=await (await fetch(`${base}/api/products?q=notfound`)).json();assert.equal(result.total,0);assert.equal(result.summary.all,4);
    for(const query of ["sort=image","dir=sideways",`q=${"x".repeat(61)}`])assert.equal((await fetch(`${base}/api/products?${query}`)).status,400);
  });
  await check("Filter and order precede server slicing; total and summary retain their scope", async () => {
    const result=await (await fetch(`${base}/api/products?sort=priceMinor&dir=asc&page=2&pageSize=2`)).json();
    assert.deepEqual(result.items.map(p=>p.id),["P-101","P-104"]);assert.equal(result.total,4);assert.equal(result.summary.all,4);
    const filtered=await (await fetch(`${base}/api/products?q=studio&sort=priceMinor&dir=desc&page=1&pageSize=2`)).json();assert.deepEqual(filtered.items.map(p=>p.id),["P-104","P-101"]);assert.equal(filtered.total,2);
  });
  await check("Invalid page contracts and out-of-range empty page", async () => {
    for(const query of ["page=0","page=-1","page=1.5","page=wat","pageSize=3","pageSize=2.0","page=100001"])assert.equal((await fetch(`${base}/api/products?${query}`)).status,400);
    const result=await (await fetch(`${base}/api/products?page=3&pageSize=2`)).json();assert.equal(result.items.length,0);assert.equal(result.total,4);
  });
  await check("Negative, fractional, blank and excessive stock rejected", async () => { for (const stock of [-1, 1.5, "", 10000]) {const r=await patch("P-101",{name:"Studio Desk Lamp",stock});assert.equal(r.status,422);assert.ok((await r.json()).fieldErrors.stock);} });
  await check("Duplicate name rejected without changing product", async () => {const r=await patch("P-101",{name:"  everyday backpack  ",stock:0});assert.equal(r.status,422);assert.ok((await r.json()).fieldErrors.name);const {items}=await (await fetch(`${base}/api/products`)).json();assert.equal(items[0].stock,12);});
  await check("Accepted response trims name and persists zero stock", async () => {const r=await patch("P-101",{name:"  Updated Studio Lamp  ",stock:0});assert.equal(r.status,200);const {product}=await r.json();assert.equal(product.name,"Updated Studio Lamp");assert.equal(product.stock,0);assert.equal(product.priceMinor,8900);assert.equal((await (await fetch(`${base}/api/products`)).json()).items[0].name,product.name);});
  await check("Missing product returns 404", async () => assert.equal((await patch("missing",{name:"Valid",stock:1})).status,404));
  await check("Malformed JSON returns 400", async () => assert.equal((await fetch(`${base}/api/products/P-101`,{method:"PATCH",body:"{"})).status,400));
  await check("New server has isolated fresh inventory", async () => {const second=createCatalogServer({delayMs:0,listDelayMs:0});await new Promise(done=>second.listen(0,"127.0.0.1",done));try{const {items}=await (await fetch(`http://127.0.0.1:${second.address().port}/api/products`)).json();assert.equal(items[0].name,"Studio Desk Lamp");}finally{await new Promise(done=>second.close(done));}});
  console.log(`${count} API contract checks passed.`);
} finally { await new Promise((done) => server.close(done)); }
