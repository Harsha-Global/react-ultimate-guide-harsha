import { useState } from "react";
import type { FormEvent } from "react";

export default function EventLab() {
  const [message, setMessage] = useState("Try a button or submit the form.");
  const [stopBubbling, setStopBubbling] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Preview submitted without leaving the page.");
  }

  return (
    <section aria-label="Event behavior lab">
      <h2>Event behavior lab</h2>
      <label><input type="checkbox" checked={stopBubbling}
        onChange={event => setStopBubbling(event.currentTarget.checked)} /> Stop bubbling</label>
      <div className="event-boundary" onClick={() => setMessage(current => `${current} Parent handler.`)}>
        <p>Parent event boundary</p>
        <button type="button" onClick={event => {
          if (stopBubbling) event.stopPropagation();
          setMessage("Button handler.");
        }}>Try bubbling</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="preview-note">Preview note</label>
        <input id="preview-note" name="note" />
        <button type="submit">Submit preview</button>
      </form>
      <p role="status">{message}</p>
    </section>
  );
}
