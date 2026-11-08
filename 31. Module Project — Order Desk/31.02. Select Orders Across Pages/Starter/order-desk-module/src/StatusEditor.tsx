import { useState } from "react";
import { useUpdateOrderMutation } from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
import type { ApiOrder } from "./services/contracts";
export function StatusEditor({ order }: { order: ApiOrder }) {
  const [status, setStatus] = useState<"ready" | "shipped">(order.status === "shipped" ? "shipped" : "ready");
  const [update, result] = useUpdateOrderMutation();
  const [notice, setNotice] = useState("");
  async function save() {
    setNotice("");
    try {
      await update({ id: order.id, status, version: order.version }).unwrap();
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
      <label>
        Fulfillment status
        <select value={status} disabled={result.isLoading} onChange={(e) => {
          setStatus(e.target.value as "ready" | "shipped");
          result.reset();
          setNotice("");
        }}>
          <option value="ready">Ready to pack</option>
          <option value="shipped">Shipped</option>
        </select>
      </label>
      <button disabled={result.isLoading}>
        {result.isLoading ? "Saving status…" : "Save status"}
      </button>
      {result.isError && (
        <p role="alert">
          {errorMessage(result.error)} {fieldMessage}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
    </form>
  );
}
