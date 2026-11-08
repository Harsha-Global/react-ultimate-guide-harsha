import { useCallback } from "react";
import { useBlocker, useBeforeUnload } from "react-router";
export function UnsavedChanges({
  dirty,
  busy = false,
}: {
  dirty: boolean;
  busy?: boolean;
}) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      (dirty || busy) && currentLocation.pathname !== nextLocation.pathname,
  );
  useBeforeUnload(
    useCallback(
      (event: BeforeUnloadEvent) => {
        if (dirty || busy) {
          event.preventDefault();
          event.returnValue = "";
        }
      },
      [dirty, busy],
    ),
  );
  if (blocker.state !== "blocked") return null;
  return (
    <section className="notice leave-warning" role="alert">
      <h2>{busy ? "Please wait for the save." : "Leave without saving?"}</h2>
      <p>
        {busy
          ? "Your request is still being processed."
          : "Your changes have not been saved."}
      </p>
      <div className="actions">
        <button type="button" onClick={() => blocker.reset()}>
          Keep editing
        </button>
        {!busy && (
          <button type="button" className="secondary" onClick={() => blocker.proceed()}>
            Discard changes and leave
          </button>
        )}
      </div>
    </section>
  );
}
