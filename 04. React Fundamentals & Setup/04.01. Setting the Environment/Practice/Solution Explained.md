# Solution explanation

Change only the invitation paragraph to “Find your next movie.” Keep the heading and semantic structure.

## src/App.tsx

```tsx
export default function App() {
  return (
    <main>
      <h1>Movie Discovery</h1>
      <p>Find your next movie.</p>
    </main>
  );
}
```

## Why this works

The component still returns the same elements; only the paragraph’s text changes.
