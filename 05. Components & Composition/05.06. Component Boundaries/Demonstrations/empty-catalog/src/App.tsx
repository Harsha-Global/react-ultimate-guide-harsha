import PageHeader from './PageHeader.tsx';
import MovieCatalog from './MovieCatalog.tsx';
import Panel from './Panel.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieCatalog movies={[]} />
      <Panel title="Booking information">
        <p>Choose your tickets at the cinema.</p>
      </Panel>
    </main>
  );
}
