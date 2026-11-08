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
