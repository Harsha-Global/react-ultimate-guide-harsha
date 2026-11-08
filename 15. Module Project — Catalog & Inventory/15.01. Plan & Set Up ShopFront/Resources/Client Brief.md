# ShopFront — client brief v1

Prepared course scenario. Emily is the fictional client for this project; this is not a message from a real customer.

## Goal

Turn the existing Product Explorer and Cart & Preferences app into an attractive catalog and local inventory workspace. Retain product identities, cart limits, saved bag choices and delivery preferences. Give the growing ShopFront course project a coherent showcase identity.

## User journeys

1. Browse the six familiar products with search and category controls.
2. Open a product address directly; understand its image, description, price and availability.
3. Add available products within quantity limits; inspect the bag and save delivery preferences.
4. Browse inventory; edit existing product information and see a confirmed result.
5. Remove a product only after a named confirmation; cancel and failed deletion retain the row.
6. Recover from unavailable API responses and understand missing products and empty results.
7. Receive a clear choice before leaving an unsaved draft.

## Presentation

Manrope headings/wordmark, DM Sans reading/controls, warm neutral canvas, deep blue actions and restrained magenta focus. Original coordinated product imagery; readable price and availability labels; visible keyboard focus; responsive catalog, inventory and editor. Prepared styles save routine CSS typing; the React interactions remain part of the guided implementation.

`Client Designs/v1` contains the original target frames, PNG/PDF exports and editable SVG sources. These targets show the milestone's eventual editor and deletion controls; the page migration first reaches read-only inventory; saving and deletion follow in later project steps.

## Starting point and scope

`Starter/product-explorer` is the exact incoming main cart-and-preferences source, excluding installed/generated build files. It includes the earlier local stock checkbox. The refreshed guided catalog starts with search/category and later gains shareable query state; the full three-choice availability control is explicitly reserved for A03. Existing cart and preference behavior remains required throughout.

The starter's React form/cart lessons are prerequisites. The module uses already-taught Router Data mode, native Fetch and TypeScript. Supply the local API; explain each method/path at first use. No create-product workflow, image upload, accounts, authorization implementation, checkout or payment behavior is introduced here. Later milestones add their planned capabilities.

## Completion criteria

Keep the existing cart limits and saved delivery choices working while completing the new page structure.
