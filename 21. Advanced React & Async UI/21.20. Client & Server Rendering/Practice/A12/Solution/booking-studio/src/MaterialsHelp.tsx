import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
type HelpPanelProps = {
  id: string;
  anchorRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};
function HelpPanel({ id, anchorRef, onClose }: HelpPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const panel = panelRef.current;
    if (!anchor || !panel) return;
    function measure() {
      if (!anchor || !panel) return;
      const anchorBox = anchor.getBoundingClientRect();
      const panelBox = panel.getBoundingClientRect();
      const margin = 12;
      const above = anchorBox.top - panelBox.height - 8;
      const preferredTop = above >= margin ? above : anchorBox.bottom + 8;
      const top = Math.max(
        margin,
        Math.min(preferredTop, window.innerHeight - panelBox.height - margin),
      );
      const left = Math.max(
        margin,
        Math.min(
          anchorBox.left,
          document.documentElement.clientWidth - panelBox.width - margin,
        ),
      );
      setPosition((previous) =>
        previous.top === top && previous.left === left
          ? previous
          : { top, left },
      );
    }
    measure();
    closeRef.current?.focus({ preventScroll: true });
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    observer.observe(anchor);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      if (anchor.isConnected) anchor.focus();
    };
  }, [anchorRef]);
  return createPortal(
    <div
      id={id}
      role="dialog"
      aria-labelledby={`${id}-title`}
      ref={panelRef}
      className="materials-help"
      style={position}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      <h3 id={`${id}-title`}>Your materials are included.</h3>
      <p>
        We provide clay, tools and glazing. Wear something you don't mind
        getting a little dusty.
      </p>
      <button ref={closeRef} type="button" onClick={onClose}>
        Close materials help
      </button>
    </div>,
    document.getElementById("overlays")!,
  );
}
export function MaterialsHelp() {
  const id = useId();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        className="secondary"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        What should I bring?
      </button>
      {open && <HelpPanel id={id} anchorRef={anchorRef} onClose={close} />}
    </>
  );
}
