import assert from "node:assert/strict";
const base="https://react-2027-shopfront.onrender.com";
  for (const path of ["/", "/products/p1", "/checkout", "/orders", "/inventory/p1/edit"]) {
    const r = await fetch(base + path, { headers: { Accept: "text/html" } }); assert.equal(r.status, 200, path); assert.match(r.headers.get("content-type"), /text\/html/);
  }
  for (const path of ["/assets/missing.js", "/src/App.tsx", "/.env.example", "/api/missing", "/api/demo/expire", "/session-check.html", "/not-a-page"]) {
    const r = await fetch(base + path, { headers: { Accept: "text/html" } }); assert.equal(r.status, 404, path);
  }
  assert.equal((await fetch(base + "/api/orders")).status, 401);
  const sessionResponse = await fetch(base + "/api/session");
  const session = await sessionResponse.json(); const setCookie = sessionResponse.headers.get("set-cookie");
  assert.match(setCookie, /Secure/); assert.match(setCookie, /HttpOnly/); assert.match(setCookie, /SameSite=Lax/); const cookie = setCookie.split(";")[0];
  const body = JSON.stringify({ email: "jordan@example.com", password: "PracticeOnly42!" });
  const headers = { "Content-Type": "application/json", Cookie: cookie, Origin: base, "X-CSRF-Token": session.csrfToken };
  assert.equal((await fetch(base + "/api/login", { method: "POST", headers: { ...headers, Origin: "https://untrusted.example.com" }, body })).status, 403);
  assert.equal((await fetch(base + "/api/login", { method: "POST", headers: { ...headers, "X-CSRF-Token": "wrong" }, body })).status, 403);
  const login = await fetch(base + "/api/login", { method: "POST", headers, body }); assert.equal(login.status, 200);
  const signedIn = login.headers.get("set-cookie").split(";")[0];
  const signedInSession = await login.json();
  assert.equal((await fetch(base + "/api/orders", { headers: { Cookie: signedIn } })).status, 200);
  const denied = await fetch(base + "/api/products/p1", { method: "DELETE", headers: { Cookie: signedIn, Origin: base, "X-CSRF-Token": signedInSession.csrfToken } });
  assert.equal(denied.status, 403);
  assert.equal((await denied.json()).code, "FORBIDDEN");
  console.log("Production page, asset, API, session, origin, CSRF and staff boundaries passed.");
console.log("HTTPS Secure cookie verified; no cookie/token values logged.");
