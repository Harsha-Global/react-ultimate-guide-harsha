import PageHeader from './PageHeader.tsx';
import MovieList from './MovieList.tsx';
import Panel from './Panel.tsx';
import { movies } from './movies.ts';

export default function App() {
  return (
    <main>
      <PageHeader />
      <Panel title="Explore movies" footer={<p>Check local showtimes before you travel.</p>}>
        <MovieList movies={movies} />
      </Panel>
      <Panel title="Booking information">
        Choose your tickets at the cinema.
      </Panel>
    </main>
  );
}
