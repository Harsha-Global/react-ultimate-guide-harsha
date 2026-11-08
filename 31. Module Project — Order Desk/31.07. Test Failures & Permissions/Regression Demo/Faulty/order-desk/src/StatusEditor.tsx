import { useState } from "react";
import { useUpdateOrderMutation } from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
import type { ApiOrder } from "./services/contracts";
export function StatusEditor({ order }: { order: ApiOrder }) {
  const canEdit = true; // Deliberate regression: ignores the current role.
  const [status, setStatus] = useState<"ready" | "shipped">(
    order.status === "shipped" ? "shipped" : "ready",
  );
  const [editVersion, setEditVersion] = useState(order.version);
  const stale = order.version > editVersion;
  const [update, result] = useUpdateOrderMutation();
  const [notice, setNotice] = useState("");
  async function save() {
    if (!canEdit || stale || result.isLoading) return;
    setNotice("");
    try {
      const accepted = await update({
        id: order.id,
        status,
        version: editVersion,
      }).unwrap();
      setStatus(accepted.status === "shipped" ? "shipped" : "ready");
      setEditVersion(accepted.version);
      setNotice("Server accepted the status.");
    } catch {
      /* The hook owns the displayed error. */
    }
  }
  const fields =
    result.error &&
    "data" in result.error &&
    result.error.data &&
    typeof result.error.data === "object" &&
    "fields" in result.error.data
      ? result.error.data.fields
      : null;
  const fieldMessage =
    fields &&
    typeof fields === "object" &&
    "status" in fields &&
    typeof fields.status === "string"
      ? fields.status
      : "";
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      void save();
    }}>
      {!canEdit && (
        <p>
          This viewer session can inspect orders, but cannot change
          fulfillment.
        </p>
      )}
      <label>
        Fulfillment status
        <select value={status} disabled={result.isLoading || !canEdit || stale} onChange={(e) => {
          setStatus(e.target.value as "ready" | "shipped");
          result.reset();
          setNotice("");
        }}>
          <option value="ready">Ready to pack</option>
          <option value="shipped">Shipped</option>
        </select>
      </label>
      <button disabled={result.isLoading || !canEdit || stale}>
        {result.isLoading ? "Saving status…" : "Save status"}
      </button>
      {stale && (
        <div>
          <p role="status">
            This order changed. Reload the editor before saving.
          </p>
          <button type="button" disabled={result.isLoading} onClick={() => {
            setStatus(order.status === "shipped" ? "shipped" : "ready");
            setEditVersion(order.version);
            result.reset();
            setNotice("");
          }}>
            Reload editor
          </button>
        </div>
      )}
      {result.isError && (
        <p role="alert">
          {errorMessage(result.error)} {fieldMessage}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
    </form>
  );
}
