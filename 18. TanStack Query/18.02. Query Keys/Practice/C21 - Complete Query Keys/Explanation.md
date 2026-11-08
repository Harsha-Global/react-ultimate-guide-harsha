# Solution explanation

The complete filters object becomes the third item in the list key. Category, search, sorting and page now participate in the cache identity. The lists() prefix can still target the list family, and detail(id) identifies a separate record entry. Equivalent filter values describe the same request even when the objects were created separately. This exercise verifies the factory output, not the query library's hashing or lifecycle.
