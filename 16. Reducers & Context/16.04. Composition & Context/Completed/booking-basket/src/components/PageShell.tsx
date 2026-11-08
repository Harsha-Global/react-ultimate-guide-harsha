import type { ReactNode } from "react";

type Props = {
  header: ReactNode;
  summary: ReactNode;
  children: ReactNode;
};

export function PageShell({ header, summary, children }: Props) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {header}

      <main id="main" className="page">
        <div className="hero">
          <p className="eyebrow">A WEEKEND THAT FEELS LIKE YOU</p>
          <h1>
            Small plans.<br />Great memories.
          </h1>
          <p>
            Discover a new skill, share a meal, or see your city differently.
          </p>
        </div>

        <div className="booking-layout">
          <div className="content-column">{children}</div>
          {summary}
        </div>
      </main>

      <footer>Booking Desk · Explore together, book thoughtfully.</footer>
    </>
  );
}
