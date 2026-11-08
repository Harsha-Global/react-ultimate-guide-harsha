# Refresh a Memoized Filter

The inputs update, but the memoized film list can stay stale. Fix the dependency list of the existing useMemo call. Keep the filter behavior: title matching ignores outer spaces and letter case, and the selected category combines with the title query.

The result must update when query, category or the movies prop changes. Retain the supplied useMemo call, controls and item keys. Do not hard-code example titles or store a second filtered list in state.

This small exercise makes a dependency defect easy to inspect. It does not prove that this tiny filter needs memoization in a real app. Measure the real calculation before choosing that optimization.

Attempt the task before opening the solution. The local Starter and Solution are inside 22. Performance & React Compiler/useMemo & useCallback/Practice/C29 - Refresh a Memoized Filter. Use the course source-code route described in How to Download Source Code. The local companion includes strict TypeScript checking. The hosted result does not establish strict null safety.
