import type { Movie } from './types.ts';
import MovieCard from './MovieCard.tsx';

type MovieListProps = {
  movies: readonly Movie[];
  showCount?: boolean;
};

export default function MovieList({ movies, showCount = true }: MovieListProps) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      {showCount && <p>{movies.length} movies to explore</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard
              title={movie.title}
              durationMinutes={movie.durationMinutes}
              rating={movie.rating}
              isAvailable={movie.isAvailable}
              poster={movie.poster}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
