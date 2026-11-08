# Dependent Queries & Pagination

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (one shared client with explicit staleTime and gcTime, and two simple views).
- Completed/event-catalog: queries.ts adds venueOptions(id), whose key is ["venues", "detail", id ?? null], with enabled: !!id and an id check inside its query function before getVenue(id, signal); the list options use placeholderData: keepPreviousData. EventDetail calls useQuery(venueOptions(query.data?.venueId)) right after the event query, on every render, and shows a venue area with its name and address, Retry venue when the request fails without data, Loading venue… otherwise, and a warning when a cached venue fails to refresh. The Catalog shows "Showing previous results while the new selection loads." while placeholder data is displayed and disables both page buttons meanwhile; prefetchNextPage prepares the next page through the shared client (useQueryClient and its query method, with a catch for a failed attempt) when the Next page button is hovered or focused. Every request helper in api.ts passes the query's signal to fetch.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR) and reload. Choose Food and click View Supper club: the e3 event request finishes before the v1 venue request begins, and the details show River House Studio with its address. Choose All workshops and move the keyboard focus (or the pointer) onto Next page: page two is requested before you click. Click it: page two appears from the cache without a new request. Choose Price: until the new list arrives, the earlier cards stay with the previous-results message. Search for a title and, before that request finishes, submit an empty search: the first request is canceled and its result does not replace the list.
