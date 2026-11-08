type MovieCardProps = {
  readonly title: string;
  readonly durationMinutes: number;
  readonly rating?: string;
};

export default function MovieCard({
  title,
  durationMinutes,
  rating = 'Not rated',
}: MovieCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{durationMinutes} minutes</p>
      <p>Rating: {rating}</p>
    </article>
  );
}
