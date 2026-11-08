type MovieCardProps = {
  readonly title: string;
  readonly durationMinutes: number;
  readonly rating?: string;
  readonly isAvailable: boolean;
};

export default function MovieCard({
  title,
  durationMinutes,
  rating = 'Not rated',
  isAvailable,
}: MovieCardProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>{durationMinutes} minutes</p>
      <p>Rating: {rating}</p>
      <p>{isAvailable ? 'Available' : 'Coming soon'}</p>
      <AvailabilityNote isAvailable={isAvailable} />
    </article>
  );
}

function AvailabilityNote({ isAvailable }: { isAvailable: boolean }) {
  if (!isAvailable) {
    return null;
  }

  return <p>Tickets are available at the cinema.</p>;
}
