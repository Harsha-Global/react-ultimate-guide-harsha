# Client acceptance walkthrough and handoff

This is a simulated client review for the training project. The checklist records what to demonstrate; it is not a claim of real client approval.

Start with 07.04's correct main checkpoint, which is also this lecture's unchanged main baseline. Keep the optional favorites solution separate.

| Agreement | Demonstration |
| --- | --- |
| R1 - Catalog | Show all six supplied products with their correct fields. |
| R2 - Combined filtering | Normalize `  LaMp  `; combine with Travel for an empty result; clear search while retaining Travel. |
| R3 - Selection | Start with the prompt, then select a product and verify its details and card highlight. |
| R4 / BUG-01 - Selection retention | Select Travel Mug and check In stock only. Retain details with the notice. Uncheck and verify the selected card returns. |
| CR-01 - Availability restriction | Blank search/all categories: six with checkbox off, four with it on. Keep other choices while toggling it. |
| R5 - Usability | Demonstrate visible labels, keyboard focus and buttons, the skip link, and result feedback. |
| R6 - Responsive layout | Compare the desktop and mobile design; verify stacking, wrapping, and no page overflow. |

## Handoff summary

Delivered behavior covers the original brief and the accepted stock-filter change. The selection defect is reproduced in its own teaching copy and repaired in the main checkpoint. The catalog is local demonstration data; the original exclusions still apply. A refresh returns to the initial choices because persistence was not requested.

After this walkthrough, review A01 favorites as a separate optional exercise. The client delivery does not depend on completing it. Use the existing starter, task, acceptance criteria, hints, and complete solution. Favorites must continue to use stable product identifiers and immutable state updates.

For a realistic closing handoff, briefly point to the brief, both design revisions, CR-01, BUG-01, and the correct source checkpoint. Explain how each requirement now has an observable check.
