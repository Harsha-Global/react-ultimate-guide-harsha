# Favorites Filter

Allow about 20–30 minutes for this optional extension. Start after Connect Product Details and attempt it before the Product Explorer Challenge walkthrough.

## Task

Add a native favorite button to each product and a Favorites only checkbox. Use immutable state and typed callback props. Preserve the guided search, category, stock and selection behavior. Keep this extension in a copy; the main guided project is sufficient for later course work.

## Acceptance criteria

- Toggle favorites on/off without duplicates or mutating source products.
- Favorites only combines with every existing filter, using AND.
- With no matches, show the existing empty message and accurate count.
- Selected details remain when their card is filtered out, with the existing explanatory notice.
- Favorite controls work with keyboard activation and expose their state with aria-pressed.
- Reloading resets local state; persistence is not required.

## Submit or self-review

1. List the files and behavior you changed.
2. Show evidence for combined filters, removing the last favorite, retained details and keyboard activation.
3. Explain why the shared favorite state belongs in its owner and how your updates preserve earlier values.

A private source copy and short written response are sufficient; a public repository is not required. Try the starter first, then compare Solution and Review.md.
