# Thought checks and explained answers

Try the question before opening the answer. These are discussion checks, not additional assigned coding exercises.

## Is copying only the outer guest enough for a changed city?

No. The contact object also changes, so both outer guest and nested contact need new objects. Preserve the old snapshot.

## Must every unchanged object be deeply cloned?

No. Copy the changed path. Unchanged items can retain their references.

## Why copy before sort?

`sort()` mutates its receiver. Sorting a new array changes its order without reordering the state array. Unchanged item objects can still be shared.

## Why does selection survive sorting?

Selection uses a stable showtime id, not an array index. The cart locates the matching current item.

## Does readonly freeze runtime objects?

No. These annotations restrict assignments through their TypeScript types. Runtime immutability still depends on the actual update logic.
