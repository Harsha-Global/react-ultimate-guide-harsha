# Solution explanation

Correct the duration number and change the PageHeader invitation to “Browse movies with confidence.” Run check, lint, build and inspect preview.

## src/PageHeader.tsx

```tsx
export default function PageHeader() {
  const pageTitle = 'Movie Discovery';

  return (
    <header>
      <h1>{pageTitle}</h1>
      <p>Browse movies with confidence.</p>
    </header>
  );
}
```

## src/MovieSummary.tsx

```tsx
export function MovieSummary() {
  const title = 'Skyward';
  const durationMinutes: number = 125;

  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
    </article>
  );
}
```

## Why this works

The numeric assignment now matches its contract. PageHeader owns the invitation, so that text belongs there. Rebuild before inspecting the changed preview.
