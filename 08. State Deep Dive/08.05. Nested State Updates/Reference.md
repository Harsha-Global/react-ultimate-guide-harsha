# Nested State Updates

**Is copying only the outer guest enough for a changed city?**

No. The contact object also changes, so both outer guest and nested contact need new objects. Preserve the old snapshot.

**Must every unchanged object be deeply cloned?**

No. Copy the changed path. Unchanged items can retain their references.

**Why copy before sort?**

`sort()` mutates its receiver. Sorting a new array changes its order without reordering the state array. Unchanged item objects can still be shared.

**Why does selection survive sorting?**

Selection uses a stable showtime id, not an array index. The cart locates the matching current item.

**Does readonly freeze runtime objects?**

No. These annotations restrict assignments through their TypeScript types. Runtime immutability still depends on the actual update logic.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Explained answers: `Thought Checks.md`.

## Further reading

- [Updating Objects In State](https://react.dev/learn/updating-objects-in-state)
- [Updating Arrays In State](https://react.dev/learn/updating-arrays-in-state)
