# L15 — Solution

Read `../../Instructions.md` from this project folder. This is a separate solution for independent practice; keep the guided main unchanged.

## Start this checkpoint

Use the supplied Node version and lockfile. Stop the earlier checkpoint's servers. Open a terminal in this `product-explorer` folder:

```sh
npm ci
npm run api
```

Open a second terminal in this same folder:

```sh
npm run dev
```

Visit http://127.0.0.1:5185. The development API health endpoint is http://127.0.0.1:4185/api/health. Use the same hostname throughout a session.

Practice accounts: `jordan@example.com` (member) and `rebecca@example.com` (staff), password `PracticeOnly42!`. Use sample contact details. These are no-payment practice orders. Sessions and orders are held in memory and disappear after a server restart. A pickup window does not reserve a real appointment.

```sh
npm run lint
npm run build
```

## Focused checks

```sh
npm run check:tests
npm run test:run
```


An unchanged retry uses the mounted form's existing request ID. Do not reload an uncertain submission to invent a new request ID. Check order history before treating a retry as a new order. The assignment solution is not part of the deployed guided main.
