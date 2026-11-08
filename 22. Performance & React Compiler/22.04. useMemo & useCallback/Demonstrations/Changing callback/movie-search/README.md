# Framehouse movie search

A self-contained fictional480-film catalogue for the performance section. Copy to `C:\react\movie-search` on Windows, run `npm ci`, then `npm run dev`. The local address is http://localhost:5250. No API, account or paid service is required. Styles, original SVG poster art and licensed local Manrope/DM Sans fonts are supplied. The initial example deliberately repeats a deterministic scoring workload; it is not a real recommendation engine. Keep the workload and catalogue fixed during comparisons.

For matched profiling runs: stop the development server, run `npm run build:profile`, then `npm run preview`. The profiling mode resolves react-dom/client to the official react-dom/profiling entry. Use that same build mode and device for every React timing comparison. `npm run build` creates the normal production build, whose React Profiler callbacks are disabled. Use normal production for final behavior/loading checks; don't compare its missing profiler rows as an optimization result. `npm run lint` and both build modes are author checks.

Open the measurement panel near the bottom. Its isolated external store is prepared instrumentation, not the application's state-ownership example. It keeps the last20 observations, outside the profiled result tree. The React value is actualDuration for MovieResults, not total event latency or paint time. Event to frame is measured from our handler start to the next requestAnimationFrame callback and exposes a User Timing measure; it is not INP. The Long Tasks observer is optional and browser-dependent. Clear the rows before each interaction; repeated runs vary.

Baseline protocol: empty query/Best match/show years; warm up once. Clear measurements; enter “Tea” into Note for tonight, using one edit per run. Clear; toggle Collection guide. Repeat each three times with the same input/state and build. Search Paper and inspect results; search an unmatched title and restore empty query. Save/remove a title, open/close its details, and check the release-year checkbox and Title A–Z ordering. Notes have maxLength120. State lasts until reload. Profile the rendering subtree and inspect browser CPU/rendering/loading separately; fast React output alone does not establish fast loading or paint.

Optional recording tools: React Developer Tools Profiler and the browser Performance/Network panels. The saved measurement panel makes the essential observations reproducible without an extension. Browser extension installation is not part of source setup. https://react.dev/reference/react/Profiler ; https://react.dev/learn/react-developer-tools .

## Ownership and composition

NoteEditor owns only the transient note; App no longer receives a note update. Its120-character limit and text remain unchanged while query/sort/guide settings change. DiscoveryFrame owns its compact-spacing state and accepts the existing profiled results through children. Its local toggle reuses that children value while changing container CSS; browser layout work can still happen even when the result component does not render again. Neither change adds memo or a calculation cache. The Collection guide still belongs to App and can repeat result rendering; that is the next measured case.

Repeat the earlier note protocol in the same profiling build. Clear the panel, then edit the note: no new MovieResults render row should appear for that local edit. A browser Event to frame row can still appear; it is not a complete paint measure. Toggle Compact card spacing twice; compare card spacing and retained note text. Changing a real result input, such as the search, must still update the films. Do not move state down when other components need that shared value; choose the actual owner for the requirement.

Close the floating measurement panel when it covers a control, then reopen it after the interaction. Logging continues while it is closed. The spacing button supports mouse, Enter and Space through native button semantics.

## memo and prop identity

MovieResults is now wrapped in memo and receives showYear directly as a boolean. Other props are query/sort strings and the stable setSelectedId setter, passed as onSelect. The main no longer creates an unnecessary displayOptions object for this one boolean. The separate demonstration deliberately keeps that changing object to show why adding memo alone does not help.

In the same profiling mode: warm up, clear measurements, toggle Collection guide with empty query/Best match/show years. Compare the MovieResults actualDuration against the previous version and the separate changing-object demonstration. A parent commit may still produce a tiny profiler row even when the memoized result child bails out; do not call the profiler row count the component's render count. Change the release-year checkbox/search/sort to verify real prop changes still work. Saving a film changes MovieResults' own state and still runs its ranking calculation; memo does not block that local update. The next lesson addresses that measured calculation and row callback identity. No deep comparator or missing function comparison is introduced.

## Intentionally changing callback

Independent comparison: the ranking array is cached with useMemo and MovieCard is memoized, but toggleSaved is still a new function on each MovieResults render. Compare repeated save/remove actions with the final main project, whose useCallback keeps that function reference stable. The card's actual saved boolean still changes when it must. Keep the same480 results, build mode, device and workload. Do not infer a large benefit from one noisy row timing; the calculation cache is the dominant optimization in this example.
