# State Preservation & Reset

**Why does a className change preserve the note?**

The same element/component type and keyed identity remain at the tree position. The parent can render again without replacing the note instance.

**Why does changing showtime reset only the note?**

The child key changes. The BookingPanel owner remains, so parent quantity/cart survive while the child starts again.

**Are keys a global cache?**

No. Keys identify siblings within a parent. Once an instance is removed, its old state is discarded.

**Why do two conditional JSX branches sometimes preserve state?**

Their returned trees can contain the same component type at the same position. Source-code line position does not define identity.

**Practice location**

Attempt Practice/C15/Local/Starter/movie-discovery. Preserve quantity on a layout toggle; reset it on another show. Removing the key entirely is not sufficient.

## Resources

Use the lecture-wise source code in the course GitHub repository. Its link is provided through the “How to Download Source Code” article lecture in the Course Introduction section. Download the repository ZIP or clone it, then find the matching section and lecture folder.

Main source: `movie-discovery`. Prepared styles: `Styles/booking.css`. Setup: `Setup.md`. Demonstration: `Demonstrations/identity-lab/movie-discovery`. Practice: `Practice/C15` (`Task.md`, the `Local/Starter` and `Local/Solution` projects, and the explanation in `Solution.md`). Explained answers: `Thought Checks.md`.

## Further reading

- [Preserving And Resetting State](https://react.dev/learn/preserving-and-resetting-state)
