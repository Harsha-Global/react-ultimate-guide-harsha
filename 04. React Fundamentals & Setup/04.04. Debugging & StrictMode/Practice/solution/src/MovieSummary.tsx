export function MovieSummary() {
  const title = 'Skyward';
  const durationMinutes: number = 125;

  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
    </article>
  );
}
