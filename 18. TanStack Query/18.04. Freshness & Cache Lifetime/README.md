# Freshness & Cache Lifetime

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (loading and error states with a bounded retry policy).
- Completed/event-catalog: queryClient.ts creates and exports the one shared QueryClient (moved out of main.tsx, which now imports it), with staleTime: 30_000 (a successful result stays fresh for 30 seconds) and gcTime: 120_000 (an unused query stays cached for two minutes after its last observer leaves) beside the retry callback and delay. App.tsx adds a view state with Workshops and About the series buttons; the catalog (its list and its total) is rendered only for the catalog view, so leaving it leaves the cached query with no observers.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR) and reload once. Click About the series, then Workshops within 30 seconds: the cards come from the fresh cache and no new events request is sent. Leave again for more than 30 seconds and return: the cached cards appear at once while the stale query refreshes in the background. Refresh events always asks the server, even while the data is fresh. Leave the catalog unused for more than two minutes: when you return, the initial loading message appears because the inactive entry was removed.

In development, React's StrictMode mounts the components twice, so the first request of a fresh page can appear once as (canceled) and once as 200.
