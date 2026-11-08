import { useState } from "react";
export function Example({ interactive = true }: { interactive?: boolean }) {
  const [ideas, setIdeas] = useState(0);
  return (
    <article className="workshop">
      <div className="pottery" aria-hidden="true">
        <span className="vase" />
        <span className="bowl" />
      </div>
      <div className="details">
        <p className="eyebrow">WILLOW HOUSE / WEEKEND STUDIO</p>
        <h2>Clay & Colour</h2>
        <p>Shape a small bowl. Make a little space for yourself.</p>
        <dl>
          <div>
            <dt>Session</dt>
            <dd>Morning · 10:00–12:00</dd>
          </div>
          <div>
            <dt>Workshop price</dt>
            <dd>£64 per person</dd>
          </div>
        </dl>
        <div className="ideas">
          <p aria-live="polite">
            Saved ideas: <strong>{ideas}</strong>
          </p>
          <button type="button" disabled={!interactive} onClick={() => setIdeas((count) => count + 1)}>
            Add one idea
          </button>
        </div>
        {!interactive && (
          <p className="static-note">
            This static comparison intentionally ships no JavaScript. The button
            is disabled.
          </p>
        )}
      </div>
    </article>
  );
}
