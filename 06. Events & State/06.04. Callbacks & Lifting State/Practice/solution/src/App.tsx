import BookingPanel from "./BookingPanel";
import PageHeader from './PageHeader.tsx';
import MovieCatalog from './MovieCatalog.tsx';
import Panel from './Panel.tsx';
import { movies } from './movies.ts';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to movies</a>
      <main id="main-content" tabIndex={-1}>
      <PageHeader />
      <MovieCatalog movies={movies} />
      <Panel title="Book Skyward">
        <BookingPanel />
      </Panel>
      </main>
    </>
  );
}
