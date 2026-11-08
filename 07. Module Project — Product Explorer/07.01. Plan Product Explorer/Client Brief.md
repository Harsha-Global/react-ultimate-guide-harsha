# Product Explorer - original client brief

Client: Emily, owner of a small shop in Seattle. This is a fictional training engagement. You are the developer receiving the brief, the six-product catalog, and the ready-made design.

## The request

Help customers browse the catalog, narrow the products, and inspect a product before making a decision. Build one responsive page using the React foundations covered so far. Use the supplied local product images and data. Prices are in US dollars.

| ID | Agreed requirement |
| --- | --- |
| R1 | Show each product's image, name, category, price, and availability. Preserve the supplied product values. |
| R2 | Search by product name, ignoring capitalization and leading/trailing spaces. Combine search and category with AND. All categories removes only the category restriction. Show the matching count and an explicit empty-result message. |
| R3 | Selecting a card's View details button displays that product in the details area and highlights its visible card. Initially show the selection prompt. |
| R4 | Keep the selection when filters hide its card. Retain its details with an outside-filters notice. Returning to matching filters restores the card's selected appearance. |
| R5 | Use visible labels, keyboard-operable controls, visible focus, meaningful images, and readable result feedback. |
| R6 | Match the supplied desktop/mobile arrangement. The desktop details area sits beside the catalog; at narrow widths it stacks below. Cards and controls wrap without horizontal scrolling. |

## Clarification agreed before implementation

Developer: If a customer selects Trail Backpack and then chooses Audio, should the selection clear?

Emily: Keep the details visible. Explain that the selected product is outside the current filters, so the customer understands why its card is no longer visible.

This answer belongs to the original agreement. It later provides a concrete acceptance criterion for the selection investigation.

## Scope and sequence

The original design has name search and category only. Availability is displayed as product information. Build the card grid first, then those two controls, then connect selection. Read the acceptance checklist alongside the wireframes; a static picture does not define every interaction.

No checkout, authentication, backend, network API, persistence, or external state library is needed. Favorites are a separate optional learning exercise after the client delivery. Later requests will arrive separately; do not implement them from this brief.
