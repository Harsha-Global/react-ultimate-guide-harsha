# Routed directory — Loaders & Typed Route Data

Use Node.js 22.22.0 or newer. In the routed-directory folder, run `npm ci`.

Run `npm run api` in one terminal and `npm run dev` in another. Open http://127.0.0.1:5183. The separate API uses port 4183; restarting it restores sample employees.

This checkpoint moves list/detail requests into client-side route loaders, passes the router request signal, reads typed results with useLoaderData and retains runtime validation in the API helpers. Name/team filters reuse the already loaded list through the scoped shouldRevalidate guard. Existing URL queries, detail return links, metadata and focus remain usable. Loading/error UI is introduced in the next lecture.

Run `npm run check`, `npm run lint` and `npm run build` to verify the source.
