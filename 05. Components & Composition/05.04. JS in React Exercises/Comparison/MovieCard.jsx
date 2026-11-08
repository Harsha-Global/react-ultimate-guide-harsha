export default function MovieCard({
  title,
  durationMinutes,
  rating = 'Not rated',
  isAvailable,
}) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
      <p>Rating: {rating}</p>
      <p>{isAvailable ? 'Available' : 'Coming soon'}</p>
      <AvailabilityNote isAvailable={isAvailable} />
    </article>
  );
}

function AvailabilityNote({ isAvailable }) {
  if (!isAvailable) {
    return null;
  }

  return <p>Tickets are available at the cinema.</p>;
}
