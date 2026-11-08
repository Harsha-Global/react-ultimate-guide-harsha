# Cache Catalog Results

The completed application is the exact source demonstrated in the video.

- Starter/product-explorer: the ShopFront project as it was before this lecture (the inventory editor uploads and attaches product images; the catalog loader requests its products directly).
- Completed/product-explorer: src/queryClient.ts creates one shared TanStack Query client outside the component tree: results stay fresh for 30 seconds, unused entries are kept for two minutes, and a query is retried once, after half a second, only for a network TypeError or an ApiError with a status of 500 or higher. src/main.tsx wraps the existing cart and router providers in QueryClientProvider with that client. src/productQueries.ts defines productKeys (lists() and list(view), where the view holds the normalized search, category, sort and page) and catalogOptions(view), whose query function passes the query's signal to the existing getProducts request. src/loaders.ts: catalogLoader awaits queryClient.query(catalogOptions(view)), redirects when the returned page differs from the requested one, and returns the view; the other two loaders are unchanged. src/QueryFeedback.tsx shows an alert with Try again (disabled while fetching) when the query has an error, choosing "The latest refresh failed. Earlier details are still shown." when data exists, or a status message while fetching, and nothing otherwise. src/Catalog.tsx reads the view from the loader, subscribes with useQuery(catalogOptions(view)), returns only the feedback while there is no data, and shows the feedback above the filters. After an accepted product save (src/ProductEditor.tsx) or delete (src/actions.ts), the product-list queries are invalidated.
- Styles: the prepared stylesheet (with small spacing and disabled-state corrections).

## Run

Copy the application folder into your React workspace and open it in VS Code. In its terminal run `npm ci`, then `npm run api`, and check http://localhost:4185/api/health. In a second terminal run `npm run dev` and open http://localhost:5185. Validate with `npm run lint` and `npm run build`.

To restore the sample products, run `npm run api:reset` in another terminal for the project; it doesn't clear the browser's saved bag or delivery preferences.

## Try it

Choose Home and Apply filters, open a product, then use the browser's back button: the filter and the cards still match the address. Edit a product's name in Inventory and save: the catalog shows the new name. Stop the API (Ctrl+C in its terminal) and open a catalog view you haven't opened yet, such as Audio: the route error screen appears. Restart it with `npm run api` and choose Try again: the products load. Run `npm run api:reset` afterwards to restore the sample catalog.
