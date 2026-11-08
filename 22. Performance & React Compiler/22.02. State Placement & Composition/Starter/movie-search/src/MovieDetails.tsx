import { movies } from "./movies";
export function MovieDetails({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) return null;
  return (
    <section className="film-details" aria-labelledby="details-heading">
      <div>
        <p className="eyebrow">YOUR SELECTED FILM</p>
        <h2 id="details-heading">{movie.title}</h2>
        <p>
          {movie.genre} · {movie.year} · {movie.minutes} minutes
        </p>
        <p>
          A fictional film from the Framehouse teaching collection. Explore the
          results and save a title for later.
        </p>
      </div>
      <button type="button" className="quiet" onClick={onClose}>
        Close film details
      </button>
    </section>
  );
}
