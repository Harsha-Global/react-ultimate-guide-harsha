import PageHeader from './PageHeader.tsx';
import MovieCard from './MovieCard.tsx';
import { movies } from './movies.ts';

export default function App() {
  return (
    <main>
      <PageHeader />
      <ul>
        {movies.map((movie) => (
          <li>
            <MovieCard
              title={movie.title}
              durationMinutes={movie.durationMinutes}
              rating={movie.rating}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
