import { useMemo, useState } from "react";
import { rankMovies } from "./movies";
import type { SortOrder } from "./movies";
import { MovieCard } from "./MovieCard";
import { measureInteraction } from "./measurements";
const PAGE_SIZE = 24;
type Props = {
  page: number;
  onPageChange: (page: number) => void;
  query: string;
  sort: SortOrder;
  showYear: boolean;
  onSelect: (id: string) => void;
};
export function MovieResults({
  page,
  onPageChange,
  query,
  sort,
  showYear,
  onSelect,
}: Props) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const ranked = useMemo(() => rankMovies(query, sort), [query, sort]);
  const pageCount = Math.max(1, Math.ceil(ranked.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visibleMovies = ranked.slice(start, start + PAGE_SIZE);
  const toggleSaved = (id: string) => {
    measureInteraction("Toggle saved film");
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((saved) => saved !== id) : [...ids, id],
    );
  };
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
      {ranked.length > 0 && (
        <nav className="pagination" aria-label="Film result pages">
          <p role="status">
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, ranked.length)} of{" "}
            {ranked.length}
          </p>
          <div>
            <button type="button" className="quiet" disabled={page === 1} onClick={() => {
              measureInteraction("Previous result page");
              onPageChange(page - 1);
            }}>
              Previous page
            </button>
            <span>
              Page {page} of {pageCount}
            </span>
            <button type="button" className="quiet" disabled={page === pageCount} onClick={() => {
              measureInteraction("Next result page");
              onPageChange(page + 1);
            }}>
              Next page
            </button>
          </div>
        </nav>
      )}
      {ranked.length ? (
        <div className="movie-grid">
          {visibleMovies.map((entry) => (
            <MovieCard key={entry.movie.id} entry={entry} showYear={showYear} saved={savedIds.includes(entry.movie.id)} onToggle={toggleSaved} onSelect={onSelect} />
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
