# HTTP & API Setup

1. Open `Starter/employee-directory` in VS Code on Windows. The lecture's main `employee-directory` folder is the completed checkpoint.
2. Open a PowerShell terminal in that project folder and run `npm ci`. Let installation finish.
3. Run `npm run api` in that terminal. Keep it running. The default printed health address is `http://localhost:4173/api/health`.
4. Open a second terminal in the same folder and run `npm run dev`. Keep it running too, then open its printed browser address.
5. Visit the API health address, open the browser Network panel and reload. Expect `GET /api/health`, status 200 and `{"status":"ok"}`.
6. Inspect the supplied `vite.config.ts` proxy, then request `/api/health` through the React development address. It should reach the same API.

The API base is `http://localhost:4173`; the app uses the separately printed Vite address. If a port is occupied, stop the other local process using it before following the default course setup. The supplied proxy expects the API's default port.

The Node.js server is prepared. Use its endpoints as each feature needs them; no server-implementation explanation is required. The API keeps sample changes in memory, and restarting it restores the three original employees. Keep both processes running throughout normal practice. Later lectures demonstrate the separate reset request when it becomes useful.

The [API Contract](API%20Contract.md) is an optional lookup reference; the opening lesson does not walk through its full table. Prepared styling is supplied in `Styles/employee-directory.css` and the starter's `src/index.css`.
