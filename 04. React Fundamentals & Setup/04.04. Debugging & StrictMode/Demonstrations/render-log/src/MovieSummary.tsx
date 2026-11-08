export function MovieSummary() {
  console.log('MovieSummary render');
  const title = 'Skyward';
  const durationMinutes = 125;

  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
    </article>
  );
}
