# Build Immutable State

Implement changeCartQuantity in cart.ts. Update only the matching item, return a new array and a new changed object, preserve the earlier array and objects, keep unrelated items, and retain the inclusive 1–6 bounds. The starter leaves quantities unchanged. The underscore prefixes mark the currently unused id and change parameters; use these parameters when you implement the function.

Attempt the Starter before opening Solution. Both are complete TSX projects. From the copied project folder run `npm ci`, then `npm run dev`.

## Check your result

- Matching row quantity changes.
- Other rows retain their values and references.
- Original input and matching object are unchanged.
- Result array and changed object are new.
- 1–6 bounds are retained.
- Missing id preserves all values.

## TypeScript and platform format

The local project uses TSX. The native exercise files contain the same React behavior in JSX, omitting TypeScript-only syntax. No second attempt is required. Native files are an authoring bundle; platform draft creation and actual platform runtime checks are pending. No hosted exercise is claimed.

New syntax comparison: The TSX useState<CartItem[]>(...) annotation specifies the array item type. JSX omits the type argument and the CartItem type declaration; the data and update behavior remain the same.
