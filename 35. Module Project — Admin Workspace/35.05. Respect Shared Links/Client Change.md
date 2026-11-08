# CR-35-01 — respect shared links (v2)

A saved view should become the initial default only when the incoming URL has none of q, sort, dir, page or size. A colleague's explicit view always wins, including ?q= and invalid managed values that parse to defaults. Unrelated parameters, such as campaign, do not block restoration and must be retained.

Check once per mounted workspace, setting the guard before the update. Eligible automatic application replaces history and starts on page1. Explicit Apply still pushes history. Later Clear and Back actions must not retrigger initial restoration. Never save the active view automatically.

Examples: savedstudio + /?q=travel → travel; savedstudio + /?q= → allproducts; savedstudio + /?page=bad → parsed defaults; savedstudio + /?campaign=mail → studio with campaign retained; clear search after eligible restoration → remains clear until a new mount. The independent saved-density assignment extends the snapshot with density while preserving this precedence.
