# Availability Filter

Emily wants shoppers to share either available products, unavailable products, or the full collection. Extend the completed ShopFront catalog using the routing and form techniques already taught. Suggested practice time: 30–45 minutes; this is a planning estimate.

## Begin

Work in `Starter/product-explorer`. Install with `npm ci`; start `npm run api` and `npm run dev` in separate terminals. API: 4185; app: 5185. Stop any previous copy on these ports first. `npm run api:reset` restores the six sample products and normal timing.

## Acceptance criteria

1. Add a labeled Availability select with All products, In stock, and Unavailable.
2. Use the `availability` search parameter. Omit it for All products; use `in-stock` and `out-of-stock` for the other choices. Unknown values fall back to All products.
3. Make the applied URL the source of truth. Typing or selecting alone must not change the current results; Apply filters commits the view.
4. Preserve search, category and sort. Applying any new filter starts on page one. Page links and product/back links preserve availability.
5. Reload, paste a direct link into another tab, and use Back: the applied control and results agree.
6. Keep loading, empty, error and reset states working. Reset clears availability too.
7. Keep the existing cart and delivery preferences working; no new state library or API endpoint is needed.
8. Use the existing design system; narrow layouts must remain usable with the extra control.

## Seed checks

- `/?availability=in-stock` shows 4 total: Backpack, Lamp, Headphones and Speaker; pagination shows 3 then 1.
- `/?availability=out-of-stock` shows 2: Travel Mug and Reading Cushion.
- Add category Home with unavailable: Reading Cushion only.
- Search lamp with unavailable: no results.
- `/?availability=unknown` uses All products.

Run `npm run check`, `npm run lint`, and `npm run build`. Check at 390px and a desktop width. Attempt this before opening `Solution/product-explorer`.

Use the “How to Download Source Code” article to reach the course source repository.
