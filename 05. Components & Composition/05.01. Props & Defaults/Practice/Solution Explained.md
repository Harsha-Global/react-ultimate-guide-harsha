# Solution explanation

Add a third MovieCard for Quiet Harbor, durationMinutes 110, and omit its rating. Preserve the existing cards.

## src/App.tsx

```tsx
import PageHeader from './PageHeader.tsx';
import MovieCard from './MovieCard.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieCard title="Skyward" durationMinutes={125} rating="PG" />
      <MovieCard title="Night Signals" durationMinutes={98} />
      <MovieCard title="Quiet Harbor" durationMinutes={110} />
    </main>
  );
}
```

## Why this works

The new call supplies required props and omits rating, so the existing undefined default is used.
