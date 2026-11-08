export default function App() {
  const pageTitle = 'Movie Discovery';
  const tagline = '<em>Find a movie</em>'; 

  return (
    <main className="page">
      <h1>{pageTitle}</h1>
      <p>{tagline}</p>
      <p>{2 + 1} movies to explore</p>
    </main>
  );
}
