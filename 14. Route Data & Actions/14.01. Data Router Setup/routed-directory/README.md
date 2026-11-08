# Routed directory — Data Router Setup

Use Node.js 22.22.0 or newer. In the routed-directory folder, run `npm ci`.

Run `npm run api` in one terminal and `npm run dev` in another. Open http://127.0.0.1:5183. The API runs on port 4183; restarting it restores the sample employees.

This completed checkpoint defines the route tree with createBrowserRouter and renders RouterProvider inside StrictMode. Existing page request Effects remain in use. Check Home, filtered employees, a detail page, return navigation, direct detail addresses and the fallback route.

Run `npm run check`, `npm run lint` and `npm run build` to verify the source.
