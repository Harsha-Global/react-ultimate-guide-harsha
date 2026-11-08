# Hints

1. Add a literal parser defaulting to all. Group availability and page 1 in one setter call.
2. Filtering only the currently returned page gives wrong totals and misses products. Filter the inventory before sorting and slicing.
3. Define selection scope from BOTH query text and availability; browser history can change either without running your selector handler.
4. Clear search and Show all products have different scopes. Preserve campaign/hash by updating only owned keys.
5. Attempt first; the independent Solution/admin-workspace includes the complete implementation and the same checks.
