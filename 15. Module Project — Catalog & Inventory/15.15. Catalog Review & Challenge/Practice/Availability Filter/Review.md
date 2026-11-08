# review rubric and solution

Complete solution: `Solution/product-explorer`. Main course continuation remains the sibling lecture `product-explorer`; this assignment is isolated.

| Responsibility | Files | Evidence |
|---|---|---|
| Parse and normalize availability | `src/catalogView.ts` | Invalid/missing choice becomes all |
| Serialize the applied view | `src/catalogView.ts` | Query survives paging, detail return and reload |
| Submit the choice | `src/Catalog.tsx` | Named select participates in GET submission |
| Explain results | `src/Catalog.tsx` | Summary names the applied availability |
| Fit the extra control | `src/index.css` | Desktop grid wraps at intermediate/mobile widths |

Four points: URL contract and normalization. Three points: reload/direct link/Back and paging. Two points: combined filters/empty/reset. One point: accessible labeled control and responsive presentation. A local-only checkbox does not meet the shareable requirement even if its immediate filtering looks correct.

No new backend route, duplicate products state, Effect request, or array filtering after pagination is needed. Filtering after pagination would give incomplete counts and could hide matching items on other pages.
