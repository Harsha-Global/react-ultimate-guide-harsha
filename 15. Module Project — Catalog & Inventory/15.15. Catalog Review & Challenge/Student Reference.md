# Catalog Review & Challenge

Completed/product-explorer is the exact guided application reviewed in the video. The independent Availability Filter practice contains Starter, Hints, Review and a separate complete Solution. Try the starter before opening the solution.

## Run a copy

Use Node.js 22.22 or later. In the chosen product-explorer folder, run npm ci. Run npm run api in one terminal and npm run dev in another. Open http://127.0.0.1:5185. Stop the previous copy first; the API and app use ports 4185 and 5185.

npm run api:reset restores the six seed products and normal timing. Generated runtime data is excluded from the source copies. Browser bag and delivery preferences are separate from the API seed.

## Review

Use Client Acceptance.md. Compare desktop and narrow layouts, visible keyboard focus, quantity limits, saved delivery choices, direct links, shared filters, reload and Back, inventory saving, canceled deletion, recovery and unsaved draft choices.

## Practice

Open Practice/Availability Filter/Assignment.md. The existing API accepts availability=in-stock and availability=out-of-stock. The selector filters the shared view; it does not change inventory stock. Preserve search, category, sort, pagination, detail return links, reset and responsive layout.

Checks: npm run check, npm run lint, npm run build.

Use the How to Download Source Code article in the course to reach the course source repository.
