import type { RankedMovie } from "./movies";
type Props = {
  eager: boolean;
  entry: RankedMovie;
  showYear: boolean;
  saved: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
};
export function MovieCard({
  eager,
  entry,
  showYear,
  saved,
  onToggle,
  onSelect,
}: Props) {
  const { movie, score } = entry;
  return (
    <article className="movie-card">
      <button
        type="button"
        className="poster-button"
        aria-label={`View ${movie.title}`}
        onClick={() => onSelect(movie.id)}
      >
        <img
          src={movie.poster}
          alt=""
          width={300}
          height={400}
          loading={eager ? "eager" : "lazy"}
        />
        <span className="poster-title">{movie.title}</span>
        <span className="match-score">{score}% match</span>
      </button>
      <div className="movie-meta">
        <div>
          <h3>{movie.title}</h3>
          <p>
            {movie.genre}
            {showYear && ` · ${movie.year}`}
          </p>
        </div>
        <button
          type="button"
          className="save-button"
          aria-label={`${saved ? "Remove" : "Save"} ${movie.title}`}
          aria-pressed={saved}
          onClick={() => onToggle(movie.id)}
        >
          {saved ? "✓" : "+"}
        </button>
      </div>
    </article>
  );
}
