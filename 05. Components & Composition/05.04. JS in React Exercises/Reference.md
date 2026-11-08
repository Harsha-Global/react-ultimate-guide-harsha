# JS in React Exercises — quick reference

| Course project | Native React exercise |
|---|---|
| TypeScript + JSX in `.tsx` | JavaScript + JSX in supplied `App.js` |
| Prop type and parameter annotation | Same props/destructuring, without the TypeScript syntax |
| Local Vite commands and TypeScript checks | Supplied editor and Run tests behavior checks |
| Continue the typed movie-discovery project | Keep the provided starter names/imports/exports |

```tsx
// Familiar typed pattern
type MovieCardProps = { title: string; rating?: string };
function MovieCard({ title, rating = 'Not rated' }: MovieCardProps) {
  return <article><h2>{title}</h2><p>Rating: {rating}</p></article>;
}
```

```jsx
// Same behavior without TypeScript syntax
function MovieCard({ title, rating = 'Not rated' }) {
  return <article><h2>{title}</h2><p>Rating: {rating}</p></article>;
}
```

The complete MovieCard comparison is in `Comparison/MovieCard.tsx` and `Comparison/MovieCard.jsx`. Changing a filename alone does not remove types. The native JSX task has no TypeScript static prop checking; runtime requirements still apply.

**Cycle:** read the brief → edit the supplied starter → Run tests → read the named failure → make a focused fix → run again. Use hints before the separate solution. The editor demonstration only fixes a rating default; it does not solve the Props and Lists exercise.

**Next:** the Props and Lists coding exercise. Render props, map products with stable IDs, and handle the empty list. Matching typed projects are in `Practice/starter` and `Practice/solution`; these are reference companions, not a second required attempt. No hooks, events or new setup are needed. Keep the course movie-discovery project typed and unchanged.
