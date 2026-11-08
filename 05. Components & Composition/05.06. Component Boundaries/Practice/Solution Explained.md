# Solution explanation

Extend MovieCatalog’s footer to show “Available movies: 1 of 2” for the current data. Derive both values from its movies prop, and test an empty input.

## src/MovieCatalog.tsx

```tsx
import type { Movie } from './types.ts';
import MovieList from './MovieList.tsx';
import Panel from './Panel.tsx';

type MovieCatalogProps = {
  movies: readonly Movie[];
};

export default function MovieCatalog({ movies }: MovieCatalogProps) {
  const availableCount = movies.filter((movie) => movie.isAvailable).length;

  return (
    <Panel title="Explore movies" footer={<p>Available movies: {availableCount} of {movies.length}</p>}>
      <MovieList movies={movies} />
    </Panel>
  );
}
```

## Why this works

Both numbers come from the same input array, so the empty case naturally gives zero of zero.
