export default function App() {
  const pageTitle = 'Movie Discovery';
  const tagline = 'Find a movie for your next evening.';

  return (
    <main className="page">
      <h1>{pageTitle}</h1>
      <p>{tagline}
      <p>{2 + 1} movies to explore</p>
    </main>
  );
}
