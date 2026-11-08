# CR-01 - In stock only

Client: Emily. Received after the original name search and category filters work.

> Customers would like to hide unavailable products without losing the search and category they have already chosen. Please add an In stock only checkbox.

## Agreed behavior

- Start unchecked, preserving the original catalog behavior.
- When checked, add availability to the existing search/category conditions with AND.
- Keep the search text and category unchanged when the checkbox changes.
- Derive the count and empty message from the same matching collection.
- Keep the checkbox and label together on mobile; allow the control row to wrap.
- The original selection-retention agreement R4 still applies when selection is connected.

## Impact discussion before coding

The availability flag already exists. Add one boolean choice in App, pass the value and callback to ProductFilters, add the controlled checkbox, extend the predicate, and style the label. No new product schema, server, dependency, or duplicate results state is needed.

## Change acceptance

1. Blank search, All categories, unchecked: six products.
2. Check In stock only: four products.
3. Choose Travel: Trail Backpack only.
4. Uncheck: Trail Backpack and Travel Mug. Category is still Travel.
5. Enter `mug`: Travel Mug. Check the box: zero results and the empty message. Search and category remain unchanged.
6. Uncheck, clear search, and return to All categories: six products again.
7. At 390px, labels and controls fit without horizontal scrolling.

The later selection lecture investigates R4 against this change. Do not quietly change the agreed selection behavior to make a defect disappear.
