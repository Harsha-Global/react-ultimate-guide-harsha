# Complete Query Keys

Fix eventKeys.list in exercise.ts. Allow about 5–10 minutes.

The workshop list request depends on q, category, sort and page. The starter leaves category out of the key, so two different category requests can be treated as the same cached list.

Keep the key family as ["events", "list", filters], with all four filter properties represented in the third item. Keep lists() returning ["events", "list"], and detail(id) returning ["events", "detail", id]. Do not mix detail keys with list keys or change any input values.

Two requests with the same filter values should produce equivalent keys. Changing any request-defining filter must change the key's contents. This task checks the key factory itself; it does not install TanStack Query or send requests. Keep the supplied types and factory names.

Run the tests and read the named feedback. Attempt the task before opening the solution. The local Starter and Solution copies are in 18. TanStack Query/Query Keys/Practice/C21 - Complete Query Keys. Use the course source-code route explained in the How to Download Source Code lecture. The local companion also runs strict TypeScript checks; the hosted result does not establish strict null safety.
