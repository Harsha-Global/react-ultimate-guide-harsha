# Run the practice app

Use Node.js 22.22.0 or newer. Choose the Starter project to follow along, or the main project to inspect the result. Keep the supplied dependency lockfile.

In the selected project folder:

```sh
npm ci
npm run api
```

Leave that terminal running. In a second terminal in the same folder:

```sh
npm run dev
```

Open http://127.0.0.1:5185. The API uses port 4185. Stop another copy using those ports before starting this one.

```sh
npm run check
npm run lint
npm run build
```

Practice changes survive an API restart. `npm run api:reset` restores the six seed products and normal timing. It does not clear the browser's bag or saved delivery preferences. Use sample contact details in this local demonstration.

For a clearly visible pending state, `node server/control.mjs slow` enables the supplied delay. Use `node server/control.mjs normal` or reset the API when finished.
