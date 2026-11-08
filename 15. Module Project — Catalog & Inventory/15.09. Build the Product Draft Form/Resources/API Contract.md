# ShopFront — supplied API contract

Local base http://127.0.0.1:4185. Vite app http://127.0.0.1:5185 proxies `/api` to it. The app uses native Fetch. This is an optional lookup; narration introduces each operation only when the feature needs it.

| Operation | Method/path | Input | Success |
|---|---|---|---|
| Readiness | GET /api/health | None | `{ok:true, service:"shopfront-catalog"}` |
| Catalog | GET /api/products | q, category, sort, page, limit, availability query | `{items,total,page,pages}` |
| Product | GET /api/products/:id | p1–p6 seed id | Product object |
| Edit | PATCH /api/products/:id | name, category, price, description, inStock, maxQuantity | Updated Product |
| Remove | DELETE /api/products/:id | No body | 204, empty body |

Search matches product names case-insensitively. Categories: Home, Travel, Audio. Sort: featured, name, price-asc, price-desc; ties use id for explicit name/price orders. The frontend normalizes unsupported values. Without limit the six-record teaching catalog returns up to 100 items. The catalog view fixes limit at 3. The API filters and sorts before paging and clamps an out-of-range page. Empty results use page=1/pages=1/total=0.

A03 availability: omit for all, `in-stock`, `out-of-stock`. No extra endpoint is needed.

Write validation: name 2–80 trimmed characters; supported category; price 0.01–10000 with <=2 decimals; description 10–240 trimmed characters; boolean inStock; integer maxQuantity 1–99 when available or exactly 0 when unavailable. Only those six fields are accepted into the saved record; id and image remain unchanged. 400 malformed JSON; 422 invalid fields; 404 unknown id; 405 unsupported method; 413 oversized request; controlled 503 unavailable mode.

Frontend `Form method="post"` submits to `/inventory/:productId/edit`; its browser action performs the API PATCH. A fetcher DELETE submission to `/inventory/:productId/delete` invokes its browser action, which performs the API DELETE. These frontend action addresses are not new backend endpoints.

Data initializes from seed.json and persists in data.json. `npm run api:reset` restores only API sample data and normal timing. `node server/control.mjs slow|fail|race|normal` selects a demonstration mode. Normal delay=180ms; slow=1600ms; race query l=1400ms, lamp=150ms. Stop previous course processes before changing copies; do not stop unrelated services.
