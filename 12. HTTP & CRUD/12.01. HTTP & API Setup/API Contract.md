# Local employee API — optional reference

Use this reference when a lecture reaches an operation. The setup lesson demonstrates only the health check; the full table is reviewed after the section's practical work. No endpoint memorization or Node.js implementation study is required.

The supplied server is `api/server.mjs`. From the project folder, run `npm run api`. Its default base address is `http://localhost:4173`; the terminal prints the health address. Keep the API running beside the separate `npm run dev` terminal. Vite forwards relative `/api` requests to `http://127.0.0.1:4173`.

| Feature | Method and path | Request body | Successful response | First explanation |
| --- | --- | --- | --- | --- |
| Check the server | `GET /api/health` | None | 200, `{"status":"ok"}` | HTTP & API Setup |
| Load the list | `GET /api/employees` | None | 200, employee array | Data Fetching with Fetch |
| Load one employee | `GET /api/employees/:id` | None | 200, employee object | Cancellation & Request Races |
| Create an employee | `POST /api/employees` | All five editable fields, no id | 201, created employee with server id | POST Requests |
| Save all editable fields | `PUT /api/employees/:id` | All five editable fields, no id | 200, complete updated employee | PUT, PATCH & DELETE — edit form |
| Change selected fields | `PATCH /api/employees/:id` | Changed fields; our toggle sends `{"active":false}` or `{"active":true}` | 200, complete updated employee | PUT, PATCH & DELETE — status toggle |
| Remove an employee | `DELETE /api/employees/:id` | None | 204, no body | PUT, PATCH & DELETE — confirmation |
| Restore practice data | `POST /api/employees/reset` | None | 200, original employee array | POST Requests — repeat the practice |

`:id` is a placeholder: Avery's concrete detail path is `/api/employees/e1`. It is not the literal word `id`. POST and GET share the collection path but perform different operations. Detail, PUT, PATCH and DELETE share an employee-specific path; the method selects the operation.

The five editable fields are `name`, `role`, `team`, `email` (strings), and `active` (boolean). Send JSON bodies with `Content-Type: application/json`. The server requires all five for POST/PUT and accepts supported partial fields for PATCH. The API functions validate returned records before React uses them. A missing employee gives 404; invalid write input gives 400. DELETE succeeds without a JSON body, so do not call `response.json()` after its 204 response.

## Restoring the practice data

Use this only when ready to discard practice changes. In the browser Console on the running React app's origin, send:

```js
const resetResponse = await fetch("/api/employees/reset", { method: "POST" });
await resetResponse.json();
```

The reset response contains the original Avery Stone, Maya Patel and Jordan Lee records. Reload the app afterward to fetch that restored list; an external reset does not automatically refresh React state. Restarting the API also restores the seed and resets the id counter. Records live in server memory, with no production database or employee accounts.

The optional `delay` query on a detail GET is supplied for deterministic request-race checks. Use sample records only; no hosted service is required.
