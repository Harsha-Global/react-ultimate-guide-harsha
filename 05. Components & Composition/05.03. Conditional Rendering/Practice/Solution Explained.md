# Solution explanation

Set Night Signals available and pass showCount={false} to MovieList. Preserve both movies.

## src/App.tsx

```tsx
import PageHeader from './PageHeader.tsx';
import MovieList from './MovieList.tsx';
import { movies } from './movies.ts';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieList movies={movies} showCount={false} />
    </main>
  );
}
```

## src/movies.ts

```ts
import type { Movie } from './types.ts';

export const movies: Movie[] = [
  { id: 'm1', title: 'Skyward', durationMinutes: 125, rating: 'PG', isAvailable: true },
  { id: 'm2', title: 'Night Signals', durationMinutes: 98, isAvailable: true },
];
```

## Why this works

The card’s condition uses the new availability input; showCount=false omits only the count.
