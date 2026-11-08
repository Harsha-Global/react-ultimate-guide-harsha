import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { preparePacking } from "./features/preview/previewSlice";
export function PackingPreview() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(state => state.selection.selectedIds);
  const preview = useAppSelector(state => state.preview);
  const [notice, setNotice] = useState("");
  async function prepare() {
    setNotice("");
    try {
      const result = await dispatch(preparePacking([...ids])).unwrap();
      setNotice(`Review ${result.count} order${result.count === 1 ? "" : "s"} before packing.`);
    } catch { /* The slice supplies the visible error. */ }
  }
  return <section className="checklist" aria-labelledby="preview-title">
    <h2 id="preview-title">Packing preview</h2>
    <p>Check the selected orders without changing their fulfillment status.</p>
    <button className="primary" disabled={ids.length === 0 || preview.status === "pending"} onClick={() => void prepare()}>Prepare preview</button>
    {preview.status === "pending" && <p>Preparing the preview…</p>}
    {preview.error && <p role="alert" className="error">{preview.error}</p>}
    {preview.result && <p>{preview.result.message}</p>}
    {notice && <p>{notice}</p>}
  </section>;
}
