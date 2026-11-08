# Form Component Integration

The completed application is the exact source demonstrated in the video.

- Starter/admin-workspace: the Admin Workspace project as completed in the previous lecture.
- Support Files: the local catalog service server/catalog-api.mjs, its check tests/api.test.mjs and src/catalogApi.ts, src/productSchema.ts and src/useProducts.ts, copied into the project in the lecture. Copy the contents of Support Files into your project folder (where package.json is), keeping the folder structure.
- Completed/admin-workspace: the project at the end of this lecture. Keep it for the next lecture.

## Run

Copy the project into your React workspace (for example C:\react\admin-workspace) and open it in VS Code. In one terminal run `npm ci`, then `npm run api` (the local catalog service on http://127.0.0.1:5191, in memory: a restart restores the four sample products). In a second terminal run `npm run dev` and open http://127.0.0.1:5190 (stop any other app using ports 5190 or 5191 first). Validate with `npm run lint` and `npm run build`; `npm run test:api` checks the service while it runs.

## Try it

Open a product's Actions menu and choose Edit product. Clear the name and enter -1 as the stock, then Save product: both fields show their messages. Enter another product's name: the service rejects it under the name field. Correct it and save: the editor closes, the card updates and a Saved notice appears. Stop the API and save again: the form keeps your entries and shows a service message; restart it and save. Reload with the API stopped to see the load error and Retry catalog.
