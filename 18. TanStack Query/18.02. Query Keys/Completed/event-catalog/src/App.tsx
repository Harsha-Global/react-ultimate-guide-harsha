import { Catalog } from "./Catalog.tsx";
export default function App() {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          Event<em>Desk.</em>
        </div>
        <span className="muted">Experiences worth making time for</span>
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
          <img
            className="hero-art"
            src="/assets/painting.svg"
            alt="Art materials for a creative workshop"
          />
        </div>
        <Catalog />
        <p className="footer">
          Course practice catalog · No real booking or public event is changed.
        </p>
      </main>
    </>
  );
}
