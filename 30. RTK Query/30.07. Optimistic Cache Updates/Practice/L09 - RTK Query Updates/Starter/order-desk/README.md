# L09 — Starter

Independent L09 - RTK Query Updates project. Read ../../Instructions.md before starting. Keep this project separate from the guided main. The starter intentionally fails the new task acceptance checks; compare the solution after attempting the task.


Use the supplied .nvmrc (Node24.21.0) and locked dependencies. Place an active copy at C:\react\order-desk. Stop earlier owned processes on5188/5189 before starting this copy.

```sh
npm ci
npm run api   # terminal 1
npm run dev   # terminal 2
```

Visit http://127.0.0.1:5188. The API health route is http://127.0.0.1:5189/api/health. Open North or Open South to load that demo workspace. These local cookie sessions demonstrate cache boundaries; they are not a production authentication service. API restarts reset seeded records and sessions; reopen a workspace afterwards.

The application uses sample data only. Browser layout preferences are saved locally; private order results, selected orders and packing tasks are not restored from storage. Keep the numeric127.0.0.1 host consistent so browser-storage behavior is reproducible. Reset preferences from the interface for a clean preference demonstration.

```sh
npm run build
npm run check:tests
npm run lint
npm run test:run
```

The integration checks use controlled network responses and do not need the API process. Stop owned processes with Ctrl+C. Bundled local application fonts and their licenses remain under public/assets/fonts. Narrow screens keep the order table in its own labelled horizontal scroll region.
