# Query & Router Integration

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (optimistic publication with a guarded editor).
- Completed/event-catalog: the routed catalog. main.tsx renders <RouterProvider router={router} /> inside the existing QueryClientProvider, so every routed screen shares one query client. routes.tsx (from Helpers) defines /events (the catalog), /events/:eventId (EventRoute with Back to results, eventLoader and the RouteError boundary with Try opening again), /about, a not-found page and the Opening fallback; eventLoader checks the id and awaits queryClient.query(eventOptions(id)) before the destination renders, so a fresh cached record is reused and a missing or stale one is requested. App.tsx (from Helpers) uses NavLink, useNavigation and Outlet. Catalog.tsx reads the applied filters from the address with useSearchParams and readFilters, writes them with setParams(writeFilters(next)), keeps the typed search in an uncontrolled input (name="q", key and defaultValue from the applied search) read with FormData on submit, and links each card to /events/<id>?<the current filters>. filters.ts (from Helpers) validates the address values. The existing mutations still handle the saves. src/index.css is the supplied stylesheet with the navigation and return-link styles.
- Helpers: the prepared routing shell (App.tsx, routes.tsx, filters.ts) to copy into src.
- Practice/Q06: a short forms-and-caching self-check (Questions.md, AnswerKey.md with an explanation for every choice).
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking and publishes nothing.

## Try it

Open the browser's Network tab (Fetch/XHR). Choose Food and then Price: the address holds the applied filters. Open Supper club: its address carries the event id and those filters. Use the browser's Back button to return to the same filtered results, then Forward within thirty seconds: the cached record is reused without a second detail request. Reload the detail address to load it with a new browser cache. Save a new title and use Back to results: the list shows the accepted title. Open /events/e99 for the error page and its Browse workshops link. To see a temporary failure, stop the API, open a workshop, start the API again and click Try opening again.
