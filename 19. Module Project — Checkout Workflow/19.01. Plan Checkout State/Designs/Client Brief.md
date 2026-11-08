# ShopFront checkout — original client brief

Build a local checkout-draft workflow for the existing ShopFront catalog. Preserve the existing URL filters, pagination, bag and saved preferences. This milestone prepares a draft; it does not create an order or process payment.

The original checkout summary shows the selected products, quantities, current prices and available-item subtotal. Quantities are initially edited on the bag page. Contact fields include a name, email and optional phone. A supplied phone must contain ten digits. Standard delivery costs $5 and express delivery costs $12; both require a street, city and five-digit ZIP. Studio pickup costs $0 and does not require an address. Keep entered details after validation or service rejection. Disable conflicting actions while a request is pending. Explain empty bags and changed availability.

The inventory editor needs editable product details, up to five short feature rows and a product-image upload. Uploading returns a path; saving the product attaches it. A failed save keeps the draft, and Reset returns to the latest accepted details. Desktop and mobile frames show the arrangement, while the state frame shows validation, pending and recovery behavior.

Acceptance: current product records supply display prices; the service independently validates the submitted cart and calculates the accepted subtotal. Preserve shared quantities after navigation and reload. Keep the form, cart and cached product data under their appropriate owners. The later adjustable-summary request belongs to v2. The optional express-delivery service-area assignment is not part of this main brief.
