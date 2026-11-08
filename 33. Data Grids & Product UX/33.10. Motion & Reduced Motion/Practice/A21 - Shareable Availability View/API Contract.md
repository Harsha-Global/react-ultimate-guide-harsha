# A21 — Contract to implement

GET /api/products accepts availability=all|available|low|unavailable, default all. Reject an unknown explicit value with the existing 400 error path. available is stock > 0 (including low stock); low is 0 < stock < 5; unavailable is stock === 0. Combine with name search, then sort, then paginate. total counts matches before slicing; summary still covers the entire catalog. Existing PATCH behavior stays unchanged.

URL uses the same availability values/default. Invalid URL values read as all through the parser; that is distinct from a direct invalid API request, which must be rejected. Availability changes push one history entry and reset page 1 in the same update. Search remains replace; page/sort retain push. Preserve unrelated params/hash.

Selection survives page/sort but clears whenever search OR availability changes, including Back/Forward. Accepted saves also clear it and reset page. Clear search removes only text. Show all products clears both filters and page. Display locale/zone stay local. No extra API/resource/service/account is needed.
