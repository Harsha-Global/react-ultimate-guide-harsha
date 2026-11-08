export default function App() {
  const featuredCount = 4;
  const pageTitle = 'Movie Discovery';
  const tagline = 'Find a movie for your next evening.';

  return (
    <main className="page">
      <h1>{pageTitle}</h1>
      <p>{tagline}</p>
      <p>{featuredCount} movies to explore</p>
    </main>
  );
}
