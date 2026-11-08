import PageHeader from './PageHeader.tsx';
import MovieCard from './MovieCard.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieCard title="Skyward" durationMinutes="125" rating="PG" />
      <MovieCard title="Night Signals" durationMinutes={98} />
    </main>
  );
}
