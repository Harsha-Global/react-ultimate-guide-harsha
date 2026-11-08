import styles from './MovieCard.module.css';

type MovieCardProps = {
  readonly title: string;
  readonly durationMinutes: number;
  readonly rating?: string;
  readonly isAvailable: boolean;
  readonly poster: string;
  readonly synopsis: string;
};

export default function MovieCard({
  title,
  durationMinutes,
  rating = 'Not rated',
  isAvailable,
  poster,
  synopsis,
}: MovieCardProps) {
  return (
    <article className={`${styles.card} ${isAvailable ? styles.available : styles.upcoming}`}>
      <img className={styles.poster} src={poster} alt="" width="180" height="240" />
      <h3>{title}</h3>
      <p>{durationMinutes} minutes</p>
      <p>Rating: {rating}</p>
      <p className={styles.status}>{isAvailable ? 'Available' : 'Coming soon'}</p>
      <AvailabilityNote isAvailable={isAvailable} />
      <details>
        <summary>About {title}</summary>
        <p>{synopsis}</p>
      </details>
    </article>
  );
}

function AvailabilityNote({ isAvailable }: { isAvailable: boolean }) {
  if (!isAvailable) {
    return null;
  }

  return <p>Tickets are available at the cinema.</p>;
}
