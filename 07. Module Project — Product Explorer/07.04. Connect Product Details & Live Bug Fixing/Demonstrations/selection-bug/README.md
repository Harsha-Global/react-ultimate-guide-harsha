# Prepared work-in-progress defect — BUG-01

This project deliberately reproduces the selection problem from the supplied QA report. It is an isolated teaching copy, not the correct lecture checkpoint.

1. Start with all categories, blank search, and In stock only off.
2. Select Travel Mug.
3. Turn In stock only on.
4. Observe that the details panel wrongly returns to the selection prompt.

Expected: retain Travel Mug's details with the outside-filters notice. Diagnose the issue before opening Fix.diff. The correct main product-explorer project is the continuation baseline. No test library or additional dependency is required.
