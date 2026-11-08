import { useState } from "react";
import { Catalog } from "./Catalog.tsx";
export default function App() {
  const [view, setView] = useState<"catalog" | "about">("catalog");
  return (
    <>
      <header className="topbar">
        <div className="brand">
          Event<em>Desk.</em>
        </div>
        <nav aria-label="Main navigation">
          <button onClick={() => setView("catalog")} aria-pressed={view === "catalog"}>Workshops</button>
          <button onClick={() => setView("about")} aria-pressed={view === "about"}>About the series</button>
        </nav>
      </header>
      <main className="page">
        <div className="hero">
          <div>
            <p className="eyebrow">The weekend series / Denver</p>
            <h1>A new perspective starts here.</h1>
            <p className="lead">
              A table to gather around. A city to see differently. A little
              space to make something of your own.
            </p>
          </div>
          <img className="hero-art" src="/assets/painting.svg" alt="Art materials for a creative workshop" />
        </div>
        {view === "catalog" ? (
          <Catalog />
        ) : (
          <section className="status">
            <h2>Make a little room.</h2>
            <p>Our weekend series brings creative people together in small groups across Denver.</p>
            <p>Choose a workshop, meet your neighbors, and try something new.</p>
          </section>
        )}
        <p className="footer">
          Course practice catalog · No real booking or public event is changed.
        </p>
      </main>
    </>
  );
}
