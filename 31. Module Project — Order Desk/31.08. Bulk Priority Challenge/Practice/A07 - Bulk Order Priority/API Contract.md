# A07 — Bulk Order Priority: supplied API contract

Use only the local practice API. The starter and solution include the same prepared service; students implement the React/Redux behavior, not the server.

- `POST /api/orders/selected` with `{ "ids": ["OD-1041", "OD-1042"] }` returns the current records in that order, including `priority` and `version`. This read uses all selected IDs across pages. One to twenty unique IDs are allowed. A missing record returns404; malformed IDs return422.
- `POST /api/order-priorities` with `{ "priority": "high", "items": [{"id":"OD-1041","version":1},{"id":"OD-1042","version":1}] }` evaluates each item. Use actual reviewed versions; the example numbers assume a freshly started API.
- A ready order with a matching version receives `{ "id":"OD-1041", "ok":true, "order":{...} }`. The returned order has the accepted priority and an incremented version. An event also refreshes ordinary subscribed views.
- An item failure has `{ "id":"OD-1042", "ok":false, "code":422, "message":"Only ready orders may change priority." }`. A missing order uses404; a version conflict uses409. The HTTP200 body is `{ "results":[...] }` and contains one result per requested item. This is partial success, not a transaction.
- The entire request fails with401 after session expiry,403 for a viewer, or422 for a malformed batch, unsupported priority or duplicate IDs. A network/service failure also has no valid item-result report. Keep selection intact in these cases.
- `normal` and `high` are the supported priorities. The exercise UI requests high priority. Priority never confirms payment or fulfills an order.

The prepared response parser checks runtime result shape and complete, unique ID coverage. The existing session boundary resets private caches and unmounts the panel. Capture the current session epoch before an asynchronous operation and compare it with the store's current epoch before applying its result.
