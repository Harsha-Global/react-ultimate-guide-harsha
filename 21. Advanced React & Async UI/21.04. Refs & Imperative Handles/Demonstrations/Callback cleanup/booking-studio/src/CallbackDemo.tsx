import { useCallback, useState } from "react";
export default function CallbackDemo() {
  const [visible, setVisible] = useState(true);
  const [focusCount, setFocusCount] = useState(0);
  const attachInput = useCallback((node: HTMLInputElement) => {
    function onFocus() {
      setFocusCount((count) => count + 1);
    }
    node.addEventListener("focus", onFocus);
    console.info("Attached the native focus listener.");
    return () => {
      node.removeEventListener("focus", onFocus);
      console.info("Removed the native focus listener.");
    };
  }, []);
  return (
    <main>
      <p className="eyebrow">ISOLATED LESSON DEMONSTRATION</p>
      <h1>Attach once. Clean up the same listener.</h1>
      <p role="status">Focus events received: {focusCount}</p>
      <button type="button" onClick={() => setVisible((value) => !value)}>
        {visible ? "Remove input" : "Restore input"}
      </button>
      {visible && (
        <div className="field">
          <label htmlFor="tracked-name">Tracked name</label>
          <input id="tracked-name" ref={attachInput} />
        </div>
      )}
    </main>
  );
}
