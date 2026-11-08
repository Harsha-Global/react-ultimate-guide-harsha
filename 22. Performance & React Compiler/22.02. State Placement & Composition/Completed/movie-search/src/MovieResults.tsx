import { useState } from "react";
import { rankMovies } from "./movies";
import type { SortOrder } from "./movies";
import { MovieCard } from "./MovieCard";
import { measureInteraction } from "./measurements";
type Props = {
  query: string;
  sort: SortOrder;
  displayOptions: { showYear: boolean };
  onSelect: (id: string) => void;
};
export function MovieResults({ query, sort, displayOptions, onSelect }: Props) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const ranked = rankMovies(query, sort);
  function toggleSaved(id: string) {
    measureInteraction("Toggle saved film");
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((saved) => saved !== id) : [...ids, id],
    );
  }
  return (
    <section aria-labelledby="results-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2 id="results-heading">
            {query ? `Results for “${query}”` : "A story for every mood"}
          </h2>
        </div>
        <p className="result-count">
          {ranked.length} films · {savedIds.length} saved
        </p>
      </div>
      {ranked.length ? (
        <div className="movie-grid">
          {ranked.map((entry) => (
            <MovieCard key={entry.movie.id} entry={entry} showYear={displayOptions.showYear} saved={savedIds.includes(entry.movie.id)} onToggle={toggleSaved} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No films found</h3>
          <p>Try a shorter title, such as “Paper” or “Garden”.</p>
        </div>
      )}
    </section>
  );
}
