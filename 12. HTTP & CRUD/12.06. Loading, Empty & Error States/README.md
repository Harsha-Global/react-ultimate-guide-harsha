# Loading, Empty & Error States

`employee-directory` is the completed lecture source. `Starter/employee-directory` is the exact completed previous lesson. In either project run `npm ci`, then `npm run api` and `npm run dev` in separate terminals. The regular ports are4173 and5173. Start from Starter to perform the narrated App.tsx edits.

For the failure/recovery check stop only the API, reload the page, inspect the actual failure, restart the API, and click Try again. The proxy may return a status other than502; use its actual result. Restart resets in-memory records.

`Demonstrations/empty-result/employee-directory` is the isolated ready-empty example described in the lecture. It uses the same completed React source with an empty API seed, API port4176 and Vite port5176. Run its own npm ci/API/dev commands and visit http://localhost:5176. It returns a real successful empty employee array. Main data is unchanged. Stop both demo processes when finished.

No Node implementation edit is part of the lesson. The demo's two intentional support changes are documented here. Styles and the reference materials are supplied resources. Dependencies, build output, recordings and authoring media are excluded.
