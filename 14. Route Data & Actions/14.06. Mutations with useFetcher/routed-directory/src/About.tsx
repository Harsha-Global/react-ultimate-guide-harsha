export default function About() {
  return (
    <section className="panel">
      <title>About | Team Directory</title>
      <meta name="description" content="About this sample directory." />
      <h1 tabIndex={-1}>About this directory</h1>
      <p>Browse teammates and keep their sample details current.</p>
      <p>
        This local training app uses sample data. Restarting its API restores
        the original employees.
      </p>
    </section>
  );
}
