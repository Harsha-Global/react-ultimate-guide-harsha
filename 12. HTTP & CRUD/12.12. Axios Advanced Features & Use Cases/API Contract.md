# Team Directory API contract — complete Section 12 reference

API origin: http://localhost:4173. Vite normally serves the browser app on http://localhost:5173 and proxies `/api`. Request paths below include `/api`; the Axios instance already supplies that baseURL, so client calls use `/employees`, for example. Node implementation is supplied, not explained in the videos. Introduce operations at first use; show this consolidated map in 12.13.

| Feature | Method and path | Request | Successful response | Introduced |
|---|---|---|---|---|
| Health | GET /api/health | No body | 200 `{ status: "ok" }` | 12.01 |
| List | GET /api/employees | No body | 200 Employee[] (possibly empty) | 12.04; React integration in 12.05 |
| Detail | GET /api/employees/:id | Encoded actual id; no body | 200 Employee | 12.07 |
| Create | POST /api/employees | JSON EmployeeInput; no id | 201 created Employee with id | 12.08 |
| Practice reset | POST /api/employees/reset | No employee body | 200 original three employees | 12.08 |
| Replace editable fields | PUT /api/employees/:id | JSON with all five editable fields | 200 updated Employee | 12.09 |
| Partial change | PATCH /api/employees/:id | JSON with supported fields; app sends `{active}` | 200 complete updated Employee | 12.09 |
| Delete | DELETE /api/employees/:id | No employee body | 204, no response body | 12.09 |
| Attachment | POST /api/employees/:id/attachment | Browser FormData, field `attachment`, one text/plain File up to 1 MiB | 201 `{employeeId,fileName,bytes}` | 12.12 |

EmployeeInput: name, role, team and email are nonempty strings (max 120 characters); active is boolean. Email must match the supplied server's basic format check. Employee adds a server-created string id. PUT supplies all editable fields; PATCH keeps other fields. 400 reports invalid input, 404 reports a missing endpoint/employee. An unsupported method on an existing employee resource returns 405. The attachment API rejects invalid form/file content with 400 and oversized request bodies with 413. These are this teaching API's contracts, not universal behavior of every API using the same method.

The detail endpoint supports `?delay=1200` (milliseconds, capped at 2000) for teaching race/timeout behavior. Axios params serializes that query option. The advanced API echoes a valid diagnostic X-Request-Id, but it is not authentication or an idempotency key.

The API keeps employee records and the latest uploaded attachment per employee in memory. Reset/restart restores three seeded employees and clears attachments; deleting an employee also removes its attachment. The upload confirmation has a short teaching delay. No download endpoint, permanent file storage, real authentication or public deployment is implemented. Cancellation/timeout does not guarantee rollback after a request reaches the server.

Fetch requires explicit response.ok checking and asynchronous response.json() parsing. Axios 1.20.0 rejects unsuccessful HTTP statuses by default and exposes decoded response.data. Both require runtime data validation in this project. DELETE 204 has no JSON body to parse. A 502 while the API is stopped can come from Vite's proxy; do not mislabel every such response as a connection failure without any HTTP response.
