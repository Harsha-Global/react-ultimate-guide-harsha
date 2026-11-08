import assert from "node:assert/strict";
const base = "http://127.0.0.1:4185/api";
function client() {
  let cookie = "", token = "";
  async function request(path, method = "GET", body) {
    const response = await fetch(base + path, {method, headers: {
      Origin: "http://127.0.0.1:5185", Cookie: cookie,
      ...(body === undefined ? {} : {"Content-Type": "application/json"}),
      ...(method === "GET" ? {} : {"X-CSRF-Token": token})
    }, body: body === undefined ? undefined : JSON.stringify(body)});
    const fresh = response.headers.getSetCookie();
    if (fresh.length) cookie = fresh.map(value => value.split(";")[0]).join("; ");
    const value = await response.json();
    if (value.csrfToken) token = value.csrfToken;
    return {status: response.status, value};
  }
  async function login(email) {
    assert.equal((await request("/session")).status, 200);
    assert.equal((await request("/login", "POST", {email, password: "PracticeOnly42!"})).status, 200);
  }
  return {request, login};
}
const mode = process.argv[2];
if (mode === "permissions") {
  const anonymous = client(), member = client(), staff = client();
  await member.login("jordan@example.com");
  await staff.login("rebecca@example.com");
  const product = (await staff.request("/products/p1")).value;
  assert.equal((await anonymous.request("/products/p1", "PATCH", product)).status, 401);
  assert.equal((await member.request("/products/p1", "PATCH", product)).status, 403);
  assert.equal((await staff.request("/products/p1", "PATCH", product)).status, 200);
  console.log("PASS: anonymous 401, customer 403, staff 200. Original product values retained.");
} else if (mode === "unavailable" || mode === "available") {
  const staff = client(); await staff.login("rebecca@example.com");
  const product = (await staff.request("/products/p1")).value;
  const changed = await staff.request("/products/p1", "PATCH", {...product, inStock: mode === "available", maxQuantity: mode === "available" ? 2 : 0});
  assert.equal(changed.status, 200);
  console.log("p1 availability:", changed.value.inStock, "— return to the browser without reloading checkout.");
} else if (mode === "repeat-order") {
  const member = client(); await member.login("jordan@example.com");
  const body = {requestId: crypto.randomUUID(), cart: [{productId: "p1", quantity: 1}], details: {
    contact: {name: "Jordan Parker", email: "jordan@example.com", phone: ""},
    address: {street: "", city: "", postal: ""}, method: "pickup", note: ""
  }};
  const first = await member.request("/orders", "POST", body);
  const repeated = await member.request("/orders", "POST", body);
  assert.equal(first.status, 201); assert.equal(repeated.status, 200);
  assert.equal(repeated.value.id, first.value.id);
  console.log("PASS: repeated request returns the same saved order:", first.value.id);
} else {
  console.error("Usage: node check.mjs permissions | unavailable | available | repeat-order");
  process.exitCode = 1;
}
