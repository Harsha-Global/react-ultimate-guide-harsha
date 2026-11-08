# Progressive hints

1. Start with `CatalogView`, `readCatalogView`, and `catalogParams`; every path through the app already uses this normalized view.
2. The API already accepts `availability=in-stock` or `out-of-stock`. Pass the normalized choice through the existing query helper.
3. Give the new GET form control a name and use the loader view for defaultValue. Do not add a separate applied useState value.
4. Keep the form free of a hidden page field. Its next submission should start at page one.
5. Existing page and product links inherit the new property when the query helper includes it. Check the result summary and responsive filter layout too.
