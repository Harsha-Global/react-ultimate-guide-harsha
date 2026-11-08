# Run the completed checkpoint

Use Node.js >=22.22.0. In `routed-directory`, run `npm ci`. Keep `npm run api` running in one terminal and `npm run dev` in another. Open the local address printed by Vite (normally http://127.0.0.1:5183).

Open Employees, choose Avery Stone and then Edit employee. An empty name produces inline validation. Restore the name, edit the role and save; the controls show Saving while the update is pending. The confirmation includes the employee name. Reload the edit page to see the stored role.

`npm run check`, `npm run lint` and `npm run build` verify the source. Restart only the API when you want its original sample data again. This checkpoint uses a local sample API and does not supply a production permissions system.
