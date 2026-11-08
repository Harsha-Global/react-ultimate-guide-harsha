import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { preparePacking } from "./features/preview/previewSlice";
export function PackingPreview() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector(state => state.selection.selectedIds);
  const preview = useAppSelector(state => state.preview);
  const [notice, setNotice] = useState("");
  const active = useRef<ReturnType<ReturnType<typeof preparePacking>> | null>(null);
  useEffect(() => () => { active.current?.abort(); }, []);
  async function prepare() {
    active.current?.abort();
    setNotice("");
    const request = dispatch(preparePacking([...ids]));
    active.current = request;
    try {
      const result = await request.unwrap();
      if (active.current !== request) return;
      setNotice(`Review ${result.count} order${result.count === 1 ? "" : "s"} before packing.`);
    } catch { /* The slice supplies the visible error. */ }
  }
  return <section className="checklist" aria-labelledby="preview-title">
    <h2 id="preview-title">Packing preview</h2>
    <p>Check the selected orders without changing their fulfillment status.</p>
    <button className="primary" disabled={ids.length === 0} onClick={() => void prepare()}>Prepare preview</button>
    {preview.status === "pending" && <><p>Preparing the preview…</p><button className="secondary" onClick={() => active.current?.abort()}>Cancel preview</button></>}
    {preview.error && <p role="alert" className="error">{preview.error}</p>}
    {preview.result && <p>{preview.result.message}</p>}
    {notice && <p>{notice}</p>}
  </section>;
}
