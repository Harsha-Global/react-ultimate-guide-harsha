import PageFooter from './PageFooter.tsx';
import PageHeader from './PageHeader.tsx';
import { MovieSummary } from './MovieSummary.tsx';

export default function App() {
  return (
    <main>
      <PageHeader />
      <MovieSummary />
      <PageFooter />
    </main>
  );
}
