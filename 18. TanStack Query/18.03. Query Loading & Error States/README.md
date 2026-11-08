# Query Loading & Error States

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (query keys, filters, paging and one event's details).
- Completed/event-catalog: main.tsx gives the QueryClient a retry policy: one extra attempt, 750 ms later, for a network failure (TypeError) or a server error (ApiError with status 500 or above); a 404 or a response with an unexpected shape is not retried. The Catalog adds a Refresh events button (disabled while a request runs) and separates the no-data case (the loading message, or the initial error with Try again) from the data case, where a Refreshing events message and a refresh-error panel with Retry refresh appear above the kept cards and paging. CatalogTotal keeps the total whenever data exists and shows Total unavailable only when it has no data after a failure. EventDetail follows the same rule for one event.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR). Stop the API in its terminal with Ctrl+C, then click Refresh events: the refresh message appears while the cards stay, and after the one retry the error panel explains that the last available results are shown; the total stays too. Reload the page while the API is still stopped: there is no cached page, so the initial failure appears with Try again. Restart the API with `npm run api` and click Try again: the cards and the total return.

When a browser tab that was completely hidden becomes visible again, TanStack Query also refreshes stale queries by itself. Keep the browser partly visible while you use the terminal (for example, side by side), so that the requests you see are the ones your clicks start.
