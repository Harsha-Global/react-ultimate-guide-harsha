import { Profiler, useState } from "react";
import { MovieResults } from "./MovieResults";
import { MovieDetails } from "./MovieDetails";
import { NoteEditor } from "./NoteEditor";
import { DiscoveryFrame } from "./DiscoveryFrame";
import type { SortOrder } from "./movies";
import { measureInteraction, recordRender } from "./measurements";
export default function App() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("match");
  const [showYear, setShowYear] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Framehouse home">
          <span className="brand-symbol" aria-hidden="true">
            F
          </span>
          FRAMEHOUSE
        </a>
        <span className="brand-caption">LESS SCROLLING. MORE CINEMA.</span>
        <button type="button" className="quiet" aria-expanded={showGuide} aria-controls="collection-guide" onClick={() => {
          measureInteraction("Toggle collection guide");
          setShowGuide((value) => !value);
        }}>
          Collection guide
        </button>
      </header>
      <main>
        {showGuide && (
          <aside id="collection-guide" className="guide">
            <strong>A collection made for discovery.</strong>
            <p>
              Search a title, open a film, or use the plus button to save it.
              All films are fictional examples.
            </p>
          </aside>
        )}
        <section className="hero">
          <div>
            <p className="eyebrow">THE EVENING IS YOURS</p>
            <h1>
              Find a film.
              <br />
              <em>Stay for the story.</em>
            </h1>
            <p className="intro">
              Quiet discoveries. Big adventures. Something you didn't know you
              were looking for.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit" />
            <div className="hero-frame">
              <span>THE FRAMEHOUSE EDIT</span>
              <strong>
                MAKE
                <br />
                TONIGHT
                <br />A STORY.
              </strong>
              <small>CURATED WITH CURIOSITY</small>
            </div>
            <span className="hero-ticket">
              480 FILMS
              <br />
              ONE GOOD EVENING
            </span>
          </div>
        </section>
        <section className="discovery-controls" aria-label="Film search">
          <div className="search-field">
            <label htmlFor="search">Search the collection</label>
            <input id="search" type="search" value={query} placeholder="Try Paper, Garden, or Midnight" onChange={(event) => {
              measureInteraction("Search title");
              setQuery(event.target.value);
            }} />
          </div>
          <div>
            <label htmlFor="sort">Sort films</label>
            <select id="sort" value={sort} onChange={(event) => {
              measureInteraction("Change sort");
              setSort(event.target.value as SortOrder);
            }}>
              <option value="match">Best match</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
          <label className="checkbox">
            <input type="checkbox" checked={showYear} onChange={(event) => setShowYear(event.target.checked)} />
            Show release year
          </label>
        </section>
        <NoteEditor />
        {selectedId && (
          <MovieDetails id={selectedId} onClose={() => setSelectedId(null)} />
        )}
        <DiscoveryFrame>
          <Profiler id="MovieResults" onRender={recordRender}>
            <MovieResults query={query} sort={sort} showYear={showYear} onSelect={setSelectedId} />
          </Profiler>
        </DiscoveryFrame>
      </main>
      <footer>
        Framehouse · Fictional films for the React course. Saved choices and
        notes last until you reload.
      </footer>
    </>
  );
}
