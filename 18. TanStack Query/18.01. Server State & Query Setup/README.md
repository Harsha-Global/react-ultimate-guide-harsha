# Server State & Query Setup

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the supplied starter. The catalog loads its first page of workshops with an Effect and local state.
- Completed/event-catalog: main.tsx creates one QueryClient and provides it with QueryClientProvider. The Catalog and its CatalogTotal both call useQuery with the key ["events", "list"] and the getEvents query function, so they share one cached result. The catalog renders its loading message, an error with a Try again button (refetch), or the cards; EventCard holds the card markup.
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Reload the page: the loading message appears first, then the first three workshops and a total of six. In the browser's Network tab (Fetch/XHR), the event-list response contains three items and a total of 6. During development, strict mode may start and cancel one request before the one that finishes; both views still use one cached result.
