import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { uploadAttachment } from "./attachmentApi";
import type { AttachmentReceipt } from "./attachmentApi";
export default function EmployeeAttachment({
  employeeId,
}: {
  employeeId: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState<AttachmentReceipt | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(
    () => () => {
      const controller = controllerRef.current;
      controllerRef.current = null;
      controller?.abort();
    },
    [],
  );
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!file || file.type !== "text/plain" || file.size > 1024 * 1024) {
      setMessage("Choose a plain-text file up to 1 MiB.");
      return;
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setBusy(true);
    setProgress(null);
    setMessage("");
    setReceipt(null);
    try {
      const saved = await uploadAttachment(
        employeeId,
        file,
        controller.signal,
        (event) => {
          if (controllerRef.current !== controller) return;
          setProgress(
            event.progress === undefined
              ? null
              : Math.round(event.progress * 100),
          );
        },
      );
      if (controllerRef.current === controller) setReceipt(saved);
    } catch (error: unknown) {
      if (controllerRef.current !== controller) return;
      setMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "Upload cancelled. The server may already have received the file."
          : error instanceof Error
            ? error.message
            : "Upload failed. Try again.",
      );
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setBusy(false);
      }
    }
  }
  return (
    <section className="attachment" aria-labelledby="attachment-heading">
      <h3 id="attachment-heading">Employee attachment</h3>
      <p>
        Upload a sample plain-text note. The local API keeps only the latest
        file until reset or restart.
      </p>
      <form onSubmit={submit}>
        <label htmlFor="attachment-file">Plain-text file (up to 1 MiB)</label>
        <input
          id="attachment-file"
          type="file"
          accept="text/plain,.txt"
          disabled={busy}
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            setMessage("");
            setReceipt(null);
          }}
        />
        <div className="upload-actions">
          <button type="submit" disabled={busy}>
            {busy ? "Uploading…" : "Upload attachment"}
          </button>
          {busy && (
            <button
              type="button"
              onClick={() => controllerRef.current?.abort()}
            >
              Cancel upload
            </button>
          )}
        </div>
      </form>
      {busy && (
        <div role="status">
          <progress
            max={100}
            value={progress ?? undefined}
            aria-label="Upload progress"
          />
          <p>
            {progress === null
              ? "Sending file…"
              : progress === 100
                ? "File sent. Waiting for server confirmation…"
                : `Sending file: ${progress}%`}
          </p>
        </div>
      )}
      {message && <p role="alert">{message}</p>}
      {receipt && (
        <p role="status">
          Saved {receipt.fileName} ({receipt.bytes} bytes).
        </p>
      )}
    </section>
  );
}
