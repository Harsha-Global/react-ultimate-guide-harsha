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
