# Deferred results with isolated slow rows

Independent copy. Run npm ci, then npm run dev. Type in Search workshops. The input uses the current query; the memoized results receive the deferred query. Deliberate per-row work belongs only in this demonstration. React can interrupt between units of rendering work, not in the middle of one synchronous JavaScript loop. This example does not send requests or debounce them.
