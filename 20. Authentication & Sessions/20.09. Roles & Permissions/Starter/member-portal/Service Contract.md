# Cedar Club — supplied local service

Start with `npm ci`, then `npm run api`. Open http://localhost:4200/api/health. In another terminal run `npm run dev`; the app uses http://localhost:5200. Use localhost consistently. An explicit 127.0.0.1 pair is also allowed; do not mix hostnames. Stop older copies first. No database account, API key or paid service is needed. The service stores practice users and sessions in memory: stop and restart it to restore the two demo users and end every local session. Never use a real password here.

The frontend integration is the lesson. The supplied server validates fields, hashes passwords, creates opaque sessions, checks request origins and CSRF tokens, and enforces roles. Its implementation is deferred to the full-stack block. This loopback-only educational service is not a production authentication platform: deployment requires HTTPS/Secure cookies, durable session/account storage, suitable operational controls and a reviewed authentication solution.

## Accounts and response shapes

Member: Jordan Parker, jordan@example.com. Staff: Rebecca Stone, rebecca@example.com. Both use the synthetic practice password `PracticeOnly42!`. Newly registered accounts always receive the member role; submitted role/id properties cannot grant access. Public user responses contain id, name, email and role, never password hashes or the session identifier.

GET /api/health →200{ok:true,service}. GET /api/session →200{user:null|User,csrfToken}; an absent/expired session starts a new anonymous session. POST /api/register accepts{name,email,password} and returns 201 Session; POST /api/login accepts{email,password} and returns 200 Session. POST /api/logout accepts{} and returns 200 anonymous Session, invalidating the old authenticated session. Login/registration rotate the session identifier. Sessions have a 15-minute absolute lifetime.

GET /api/account requires a current authenticated session, and returns only the requesting user's saved events. GET /api/admin/summary independently requires the admin role. A missing/expired authenticated session returns 401 SESSION_EXPIRED; an authenticated member requesting staff information receives 403 FORBIDDEN. A bad login returns 401 CREDENTIALS, not an expired-session notification. Validation is 422, duplicate email 409 and the local attempt limit 429. Errors are{message,code,fields}. POST /api/demo/expire is an explicit local teaching fixture: it invalidates the current session so the next private read can demonstrate expiry. It is not a production endpoint.

## Cookie, CORS and CSRF contract

Every fetch that needs the session uses credentials:'include'. App and API use different ports, so these fetches are cross-origin even though both are same-site on localhost. The API allows only http://localhost:5200 and http://127.0.0.1:5200, returns that exact origin with Access-Control-Allow-Credentials:true, and varies by Origin. A wildcard is not used. The actual request is checked as well as OPTIONS.

The server sets an opaque cedar_session cookie with HttpOnly, SameSite=Lax, Path=/ and Max-Age. JavaScript does not read this identifier or store it in localStorage. Secure is omitted only for this HTTP loopback demonstration; a deployed HTTPS service must use Secure and an appropriate host-bound cookie policy. HttpOnly does not stop authenticated requests from being sent, and SameSite alone is not the CSRF mechanism.

GET /api/session supplies a separate CSRF token in JSON, including before login. Every POST requires the allowed Origin, application/json and the matching X-CSRF-Token header from that session. Credentials and CORS permission do not replace that check. Fetch a current session/token before each authentication action. Request/response payloads and private results use Cache-Control:no-store. Browser CORS rules govern script access to responses; API authentication and authorization still apply independently.

All values must still pass the shared schemas on the server. This is cookie-based integration; a bearer-token API would have a different agreed request contract. Do not combine the two approaches by copying the session cookie into an Authorization header.

## Primary references

- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

The course code and manual scenarios are original worked examples. These links explain the integration boundaries; they do not certify this small local service for deployment.
