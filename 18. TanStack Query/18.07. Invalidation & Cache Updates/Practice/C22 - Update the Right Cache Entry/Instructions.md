# Update the Right Cache Entry

Complete applySavedEvent in exercise.ts. Allow about 10–15 minutes.

The server has accepted an event rename and returned the complete saved record. Follow the sequence from the Invalidation & Cache Updates lecture:
1. Await cancellation of the exact detail query ["events", "detail", saved.id].
2. Put the complete saved record into that detail entry with setQueryData.
3. Await invalidateQueries for the list-family prefix ["events", "list"].

Do not invalidate every event detail, change an unrelated entry, or rewrite a filtered list by hand. A rename can change list membership, ordering and totals, so the server must rebuild those lists. Do not mutate the saved record. Return a promise that finishes after the invalidation promise finishes. If cancellation rejects, allow that rejection to propagate and do not continue to the writes.

The supplied CacheClient interface describes only the three methods used here. Tests provide a small recording client; they do not run TanStack Query, fetch data or model its whole cache. The same method sequence is used with the real query client in the lecture.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 18. TanStack Query/Invalidation & Cache Updates/Practice/C22 - Update the Right Cache Entry. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
