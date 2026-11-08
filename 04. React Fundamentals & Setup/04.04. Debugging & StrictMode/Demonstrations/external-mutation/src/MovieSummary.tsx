let renderCount = 0;

export function MovieSummary() {
  renderCount += 1;
  const title = 'Skyward';
  const durationMinutes = 125;

  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
      <p>Render counter: {renderCount}</p>
    </article>
  );
}
