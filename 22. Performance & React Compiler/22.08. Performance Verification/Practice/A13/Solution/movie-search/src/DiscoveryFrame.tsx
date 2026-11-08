import { useState } from "react";
import type { ReactNode } from "react";
import { measureInteraction } from "./measurements";
export function DiscoveryFrame({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(false);
  return (
    <div className={compact ? "discovery-frame compact" : "discovery-frame"}>
      <div className="view-controls">
        <button
          type="button"
          className="quiet"
          aria-pressed={compact}
          onClick={() => {
            measureInteraction("Toggle compact spacing");
            setCompact((value) => !value);
          }}
        >
          Compact card spacing
        </button>
      </div>
      {children}
    </div>
  );
}
