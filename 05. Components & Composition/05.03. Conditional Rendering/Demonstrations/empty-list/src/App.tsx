import PageHeader from './PageHeader.tsx';
import MovieList from './MovieList.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieList movies={[]} />
    </main>
  );
}
