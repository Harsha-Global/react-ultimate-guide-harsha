# Framehouse movie search

A self-contained fictional480-film catalogue for the performance section. Copy to `C:\react\movie-search` on Windows, run `npm ci`, then `npm run dev`. The local address is http://localhost:5250. No API, account or paid service is required. Styles, original SVG poster art and licensed local Manrope/DM Sans fonts are supplied. The initial example deliberately repeats a deterministic scoring workload; it is not a real recommendation engine. Keep the workload and catalogue fixed during comparisons.

For matched profiling runs: stop the development server, run `npm run build:profile`, then `npm run preview`. The profiling mode resolves react-dom/client to the official react-dom/profiling entry. Use that same build mode and device for every React timing comparison. `npm run build` creates the normal production build, whose React Profiler callbacks are disabled. Use normal production for final behavior/loading checks; don't compare its missing profiler rows as an optimization result. `npm run lint` and both build modes are author checks.

Open the measurement panel near the bottom. Its isolated external store is prepared instrumentation, not the application's state-ownership example. It keeps the last20 observations, outside the profiled result tree. The React value is actualDuration for MovieResults, not total event latency or paint time. Event to frame is measured from our handler start to the next requestAnimationFrame callback and exposes a User Timing measure; it is not INP. The Long Tasks observer is optional and browser-dependent. Clear the rows before each interaction; repeated runs vary.

Baseline protocol: empty query/Best match/show years; warm up once. Clear measurements; enter “Tea” into Note for tonight, using one edit per run. Clear; toggle Collection guide. Repeat each three times with the same input/state and build. Search Paper and inspect results; search an unmatched title and restore empty query. Save/remove a title, open/close its details, and check the release-year checkbox and Title A–Z ordering. Notes have maxLength120. State lasts until reload. Profile the rendering subtree and inspect browser CPU/rendering/loading separately; fast React output alone does not establish fast loading or paint.

Optional recording tools: React Developer Tools Profiler and the browser Performance/Network panels. The saved measurement panel makes the essential observations reproducible without an extension. Browser extension installation is not part of source setup. https://react.dev/reference/react/Profiler ; https://react.dev/learn/react-developer-tools .



## List and loading checkpoint

The component renders at most24 result cards. All480 catalogue records remain in memory and rankMovies still processes all matching data when query/sort changes. Page state belongs to App because the search/sort handlers reset it to1 in the same event. MovieResults owns savedIds independently; use stable movie IDs as keys. Filtering/sorting/pages must not lose saved selections. Pagination reduces mounted DOM, not this in-memory calculation or downloaded catalogue. Virtualization is compared conceptually; no virtualizer is installed or claimed.

Poster images declare300×400 dimensions; the existing aspect-ratio also reserves the slot. The first five cards load eagerly; remaining cards use native lazy loading. Exact browser loading thresholds vary, and the same12 small SVGs are reused, so do not claim a large byte saving or24 unique downloads. For real large photographs choose appropriate formats/dimensions and responsive sources from actual assets; invented srcset URLs are not included.

MovieDetails is a module-level lazy import with a matching default export and local Suspense fallback. A production build emits a separate details chunk. This tiny example demonstrates a loading boundary; request overhead may outweigh savings, so don't call it an automatic speedup. The catalogue is already used by the main list and remains shared. Verify production behavior, not only development modules.

The waterfall diagram compares illustrative independent requests starting sequentially versus together. It is not a network measurement from this local-data application. Start independent requests together when appropriate; preserve real dependencies and error handling. This is distinct from rendering fewer cards or marking images lazy.

Checks:480total/24mounted, Next/Previous and last-page bounds; Paper40 gives24 then16; no matches gives0 and no pagination; search/sort resetpage1; saved IDs persist across pages/filters; detail chunk opens/closes correctfilm; release-year control and keyboard navigation. References: https://web.dev/learn/design/responsive-images ; https://react.dev/reference/react/lazy ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises .


## Final verification checkpoint

Source behavior is unchanged from the pagination version. Run matched profiling builds of the original example and this version on the same device: emptyquery/Bestmatch/years,480cataloguerecords, fixedscoringloop. Final uses24mountedcards; this intended difference is part of the optimization, not a smaller dataset. Warm up each action, clear rows and repeat3times. Note values: Tea; Tea and a film; Tea and a quiet film; Tea and a short film. Guide: open/close/open/close. SavedfilmAmberStory: save/remove/save/remove. Close the panel for each action and reopen to read. Missing MovieResults rows for note edits means the isolated note did not commit that profiled subtree, not zero total work.

Use the normal production build separately for behavior/loading checks; it does not emit ReactProfiler rows. Verify page boundaries, query/sort resets, no matches, saved-film persistence, years, details and keyboard controls. Check narrow layout. Loading chunk sizes and repeated-image policy are separate from React durations. The measured results in Author Checks are local observations, not universal thresholds or CoreWebVitals claims.

After this lecture, take the native Async UI Check quiz in Udemy, then proceed to the next section. Its local reference is ../Practice/Q07. Source publication and held notes/cheat sheets/interview questions remain separate from this native quiz.
