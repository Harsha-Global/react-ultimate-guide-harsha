# ShopFront — original full-stack client brief (v1)

Continue the recognizable ShopFront storefront. Customers need a private account destination, recent order history and a useful order detail page. Merchants need an authorized workspace with inventory editing and only their own portion of a customer's order. Preserve the public product identities, images and prices while moving the catalog to PostgreSQL.

## Acceptance criteria

- The public catalog reads only public product fields. Shared caching must never contain session-dependent customer or membership data.
- A signed-in customer can read only their own twenty most recent orders and directly open only an owned order. Totals use saved item prices. Empty, signed-out and unavailable states have clear next actions.
- Workspace membership and product scope are server predicates. An owner/editor may change stock; a viewer may only read. A stale stock comparison cannot overwrite a different saved value. Merchant order projections include only that workspace's items and subtotal, with no customer account details.
- A browser retry preserves its order request identity when the response is uncertain. Verified sandbox payment creates one fulfillment per order/workspace and one durable outbox event per order. A repeated dispatch updates the same local workflow record.
- The customer sees payment and receipt readiness separately. A private image requires ticket creation, byte upload, stored-file verification and ownership-checked reading. Interrupted services report failure and recover from durable state.
- Desktop and mobile screens retain Manrope/DM Sans, warm surfaces, deep-blue controls, clear labels, visible focus and readable recovery states. Use the supplied v1 frames as the target, with the behavior here as the acceptance contract.

The initial merchant queue is unfiltered. A later client request adds status filtering; keep that revision separate. Merchant order notes are an independent final challenge, not part of this guided brief.

## Clarifications used by this course project

One order can contain multiple merchant portions. O-1001 totals$145: Studio's lamp$89 and Travel's two mugs$56. Merchant ownership is assigned deliberately and remains fixed for existing ordered products; this project has no product-transfer workflow. A future transfer feature must preserve historical merchant ownership explicitly before changing that model.

Fulfillment records describe the course's ready/dispatched workflow; they do not book a courier. Stock reservation expiry/cancellation and real shipment operations require their own business design. Public stock is a snapshot; ordering checks stock atomically again. Payment provider, storage, job and hosted-origin checks are separate from controlled local fixtures.
