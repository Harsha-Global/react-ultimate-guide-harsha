import PageHeader from './PageHeader.tsx';
import MovieCatalog from './MovieCatalog.tsx';
import Panel from './Panel.tsx';
import { movies } from './movies.ts';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieCatalog movies={movies} />
      <Panel title="Booking information">
        <p>Choose your tickets at the cinema.</p>
      </Panel>
    </main>
  );
}
