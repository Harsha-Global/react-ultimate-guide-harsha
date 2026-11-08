# ShopFront — verified release

The ShopFront project (folder name product-explorer) as released and verified on its hosted address: the browser journey and the supplied hosted request checks.

## Run the app

Use Node.js 24 LTS and the supplied lockfile. In the project terminal:

```sh
npm ci
npm run api
```

In a second terminal in that same project:

```sh
npm run dev
```

Open http://127.0.0.1:5185. The service health check is http://127.0.0.1:4185/api/health. Stop the previous lecture's servers before running this checkpoint. Use the same hostname throughout a session.

```sh
npm run build
npm run lint
```

Prepared presentation files are in `Styles`. Follow `Code.md` for the teaching sequence and exact files. The supplied service is for local practice only; it does not process real payments.

Practice accounts: `jordan@example.com` (customer) and `rebecca@example.com` (staff). Both use `PracticeOnly42!`. Sessions and orders are in memory; restarting the service clears them. The catalog has its existing reset behavior. An order request ID is retained within the mounted form; if the result is uncertain, keep the form open and retry the same details. Check order history before treating a retry as a new order; do not reload an uncertain attempt to obtain a new request ID.
