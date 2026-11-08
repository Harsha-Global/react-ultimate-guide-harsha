# A21 — Shareable Availability View

Estimated attempt: 45 minutes. Use independent Starter/admin-workspace from the course's How to Download Source Code workflow. Keep the guided project unchanged. The starter is runnable but has no availability filter yet. Attempt before opening Solution.

## Task

The inventory coordinator needs a shareable view of available, low-stock or unavailable products. Add a labelled Availability selector and implement the same contract in URL state, request construction and the local API. Read API Contract.md for exact boundaries and history behavior.

1. Stop other copies on 5190 / 5191. Run npm ci, npm run api; in a second terminal npm run dev. API restart resets all four products.
2. Extend viewParsers/useCatalogView with availability. Derive the selector from URL state; do not create a second editable owner. Changing it updates availability and page 1 together with push history.
3. Forward availability through buildCatalogQuery. Validate/filter on the server before sorting/slicing. Keep global summary separate from matching total.
4. Scope selection to both search and availability, including history navigation. Keep page/sort retention and accepted-save reset. Make Show all products clear both filters; Clear search clears only text.
5. Preserve keyboard focus, dialog/editor behavior, both themes and 390px layout. Keep the useful loading/empty/error/retry states.

## Acceptance evidence

- All: 4; Available: 3, including Mug; Low: only Mug; Unavailable: only Backpack. Whole-catalog summary stays 4 / 1 / 1.
- From page 2, choose Available: page 1, updated URL and rows, and cleared selection. Sort by price descending and open the next page: only Mug, matching total 3. Share/reload restores the view.
- Select a row, change availability, then Back/Forward: no stale selected IDs return. Page/sort alone retain selection.
- Combine a Lamp search with Unavailable: 0 matches; Show all products clears both filters and page, returning 4 matches. Preserve ?campaign=demo#catalog.
- Save Mug stock 0 under Low: it leaves that view; matching total 0 and global unavailable 2. No unaccepted edit changes the list. Retry after stopped API still works.
- Direct API availability=maybe rejects with 400; malformed URL availability=maybe safely reads all. Do not claim parser fallback rewrites the initial address.
- Run 7 availability checks (Starter: 1 pass / 6 expected failures; Solution: 7 pass), plus existing view (3), API (12), format (5), motion (3), theme (6), build and lint checks. Provide keyboard/mobile/history screenshots or a short walkthrough.

Submit answers and relevant code/evidence for the three questions.

## Manual rubric — 10 points

2: one typed URL owner, defaults and history; 2: server validation, filter/sort/page order, totals and global metrics; 2: selection, resets and Back/Forward; 2: labelled responsive controls, focus and empty recovery; 2: reproducible browser, test and source evidence. Equivalent implementations are welcome when the observable contract is met.
