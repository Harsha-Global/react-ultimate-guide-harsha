import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type DialogProps = { title: string; onClose: () => void; children: ReactNode };
export function Dialog({ title, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);
  const target = document.getElementById("overlays");
  if (!target) throw new Error("The overlay container is missing.");
  return createPortal(
    <dialog className="dialog" ref={dialogRef} aria-labelledby={titleId} onCancel={(event) => {
      event.preventDefault();
      onClose();
    }}>
      <h2 id={titleId}>{title}</h2>
      {children}
      <button type="button" autoFocus onClick={onClose}>
        Close details
      </button>
    </dialog>,
    target,
  );
}
