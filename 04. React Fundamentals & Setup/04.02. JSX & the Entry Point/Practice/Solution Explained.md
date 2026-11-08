# Solution explanation

Declare featuredCount = 4 inside App and replace the inline addition with this variable. Preserve title/tagline.

## src/App.tsx

```tsx
export default function App() {
  const featuredCount = 4;
  const pageTitle = 'Movie Discovery';
  const tagline = 'Find a movie for your next evening.';

  return (
    <main className="page">
      <h1>{pageTitle}</h1>
      <p>{tagline}</p>
      <p>{featuredCount} movies to explore</p>
    </main>
  );
}
```

## Why this works

The JSX expression reads featuredCount when App renders. The number is rendered as text.
