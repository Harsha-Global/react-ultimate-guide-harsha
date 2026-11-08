# Solution explanation

Add Quiet Harbor to the movies array: id m3, durationMinutes 110, no rating. Do not add a hard-coded card in App.

## src/movies.ts

```ts
import type { Movie } from './types.ts';

export const movies: Movie[] = [
  { id: 'm1', title: 'Skyward', durationMinutes: 125, rating: 'PG' },
  { id: 'm2', title: 'Night Signals', durationMinutes: 98 },
  { id: 'm3', title: 'Quiet Harbor', durationMinutes: 110 },
];
```

## Why this works

One new data entry produces one new mapped list item. Its stable ID is independent of its array position.
