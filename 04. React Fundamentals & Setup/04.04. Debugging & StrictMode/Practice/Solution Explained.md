# Solution explanation

Fix the duration type error using the diagnostic. Keep durationMinutes as a number; do not remove its annotation or disable strict checking.

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

Removing quotes supplies the number required by the annotation; this fixes the cause instead of weakening the check.
