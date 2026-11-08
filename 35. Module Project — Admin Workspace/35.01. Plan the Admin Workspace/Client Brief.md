# Admin Workspace — client brief v1

ShopFront staff need a readable catalog workspace for desktop and mobile. Continue the guided main project from the Zustand section; keep its public local teaching API and four sample products. Do not add authentication to this project. Edits reset when the API restarts.

Acceptance:
1. Responsive shell with Manrope headings and DM Sans body text, supplied product images, accessible themes, visible focus and a skip link. On narrow screens the page fits; the wide table scrolls inside a labelled, focusable region.
2. Keep global counts distinct from matching-result counts. Search, sorting and pagination remain URL state; fetched catalog results remain in TanStack Query; shared live display preferences remain in Zustand.
3. Save one browser-local snapshot of q/sort/dir/size. The saved summary stays unchanged while the operator explores. Save replaces it; Apply updates all URL view fields together and starts on page1; Forget removes it. No automatic application in v1.
4. Present existing product editing in an accessible dialog. Retain invalid/rejected drafts, protect a pending save from dismissal, and restore focus to the current action button or Search products if its row is unavailable.
5. Preserve cross-page selection by product ID; clear selection when the search changes or a save succeeds. Keep API errors visible and provide recovery.

Deliver the guided feature separately from the independent saved-density assignment.
