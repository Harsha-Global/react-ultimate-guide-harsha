import type { ReactNode } from "react";
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Willow House home">
          <span className="brand-mark" aria-hidden="true">
            W
          </span>
          <span>
            WILLOW HOUSE<small>MAKE ROOM FOR SOMETHING GOOD</small>
          </span>
        </a>
        <span className="location">Bristol · Independent workshops</span>
      </header>
      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">THE WEEKEND STUDIO</p>
            <h1>
              A little clay.
              <br />A fresh perspective.
            </h1>
            <p className="intro">
              Settle in, make something with your hands, and take a small piece
              of the weekend home.
            </p>
            <div className="hero-meta">
              <span>Small groups</span>
              <span>All materials included</span>
              <span>Beginners welcome</span>
            </div>
          </div>
          <div
            className="art"
            role="img"
            aria-label="Two handmade ceramic bowls, a clay vase, and a leafy stem"
          >
            <div className="sun-disc" />
            <div className="stem" />
            <div className="vase" />
            <div className="bowl bowl-back" />
            <div className="bowl bowl-front" />
            <span className="art-note">
              Made slowly.
              <br />
              Kept for years.
            </span>
          </div>
        </section>
        <div className="content-grid">{children}</div>
      </main>
      <footer>Willow House · A fictional studio for this course</footer>
    </>
  );
}
