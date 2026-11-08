# Admin Workspace

Use the course Node24.21.0 environment, then `npm ci`. Run `npm run api` in one terminal and check http://127.0.0.1:5191/api/health. Run `npm run dev` in another and open http://127.0.0.1:5190. Stop other copies using these ports first.

The local in-memory API resets product edits on restart. Persisted display preferences are separate from product records and URL view state.

Checks: `npm run build`, `npm run lint`, and the available `test:*` commands in package.json. Tests use isolated API servers/storage adapters.
