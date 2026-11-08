# Define Shareable Catalog Views

`Starter/product-explorer` is the starting app. `product-explorer` is the completed checkpoint. Continue one working app and use the completed copy for comparison or recovery.

The URL query is checked and converted to one catalog view. The collection loader requests that view with three products per page, corrects an out-of-range page through a redirect, and returns the applied view alongside the response. Bag and inventory routes continue to load the complete catalog.

Search and category controls still use local component state at this checkpoint. To inspect the applied loader, enter `/?category=Home&sort=price-asc` directly, then reload. The response remains filtered while the existing controls are still local. Connecting the form to the address comes next. The product page retains its existing search-aware Back link and title.

Install with `npm ci`. Start `npm run api`, then run `npm run dev` in another terminal. See Setup.md and Reference.md for local ports, checks and the supplied practice API. Resources contains the client change and design shown in the lesson.

Run `npm run check`, `npm run lint` and `npm run build`. Generated API state is omitted; the service creates its data from the supplied seed. Recordings, narration, production files, dependencies and generated builds are excluded.
