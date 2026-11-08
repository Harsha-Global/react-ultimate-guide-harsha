# Hints

1. Apply the simple input checks before constructing a URL. The control-character pattern from the lecture is /[\\\x00-\x1f]/.
2. Parsing gives you origin, pathname, search and hash separately. Check the parsed origin and exact pathname.
3. Rebuild only the accepted path, search and hash. Keep the fallback in every rejection path, including catch.
