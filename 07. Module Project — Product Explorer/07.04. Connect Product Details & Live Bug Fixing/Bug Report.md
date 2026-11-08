# BUG-01 - Selected details disappear after filtering

Reported during QA of the prepared work-in-progress build. This is a deliberate teaching defect, not a claim that the correct checkpoint unexpectedly failed.

## Reproduce

Use `Demonstrations/selection-bug/product-explorer`.

1. Begin with blank search, All categories, and In stock only unchecked.
2. Select Travel Mug with its View details button.
3. Confirm the mug details are displayed.
4. Check In stock only.

Observed: Travel Mug correctly disappears from the card grid, but the details panel also incorrectly returns to its selection prompt.

Expected: the mug details remain, with the outside-filters notice. This follows R4, which the client clarified before implementation. Filtering does not mean the customer changed their selection.

## Investigation prompts

Before opening the solution, inspect the selected identifier, the identifiers in the matching collection, and the product object sent to the details component. Explain which value changed and which remained stable. Use a temporary console statement after those values are declared; remove it after diagnosis.

## Regression checks after the repair

- Repeat the original mug/stock steps; details remain with the notice.
- Turn the checkbox off; the mug card returns selected and the notice disappears.
- Select Backpack, then choose Audio; Backpack details remain with the notice.
- Clear filters; selection remains and its card returns selected.
- Select another visible product; the details correctly switch to that product.
- A fresh page still shows the initial selection prompt.

The separate `Demonstrations/selection-bug/Fix.diff` records the repair. The main `product-explorer` project is the correct continuation baseline. Do not copy the deliberate defect into the main checkpoint or the optional assignment starter.
