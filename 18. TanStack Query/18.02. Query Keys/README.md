# Query Keys

The completed application is the exact source demonstrated in the video.

- Starter/event-catalog: the project as completed in the previous lecture (one shared query for the default list).
- Completed/event-catalog: queries.ts defines eventKeys (lists, list(filters) and detail(id)) and the eventListOptions and eventOptions query options. The Catalog keeps the applied filters and a search draft in state, adds the search form with category and sort controls, an empty-result message, and Previous/Next page buttons with a page label; CatalogTotal receives the same filters and uses the same options. EventDetail loads one event with eventOptions(id), opened from each card's View button.
- Practice/C21 - Complete Query Keys: the local companion to the coding exercise (Instructions, Hints, Explanation, Starter, Solution).
- Styles: the prepared stylesheet.

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api` to start the practice API on port 4088 and check http://localhost:4088/api/health. In a second terminal run `npm run dev` and open http://localhost:5188. Validate with `npm run lint` and `npm run build`.

To restore the supplied practice records, stop the API, run `npm run reset`, then start `npm run api` again. The API is a local course practice server; it makes no real booking.

## Try it

Open the browser's Network tab (Fetch/XHR). Choose Food: the total changes to two workshops. Click View Supper club: the detail request ends with e3. Choose Outdoors: a different list appears while the detail still shows Supper club. Choose All workshops, sort by Price and click Next page: the request includes sort=price and page=2. Search for a title that doesn't exist: the no-matches message appears.
