"use client";
import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { readRecord, updateRecord, type RecordValue } from './service';
function useController() {
  const [record, setRecord] = useState<RecordValue>({id:'event-1',date:'2026-11-02',revision:1});
  const [draft, setDraft] = useState('2026-11-02');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const generation = useRef(0);
  const savingRef = useRef(false);
  const draftVersion = useRef(0);
  function change(value: string) { draftVersion.current++; setDraft(value); }
  async function refresh(slow = false, fail = false) {
    const request = ++generation.current;
    try {
      const latest = await readRecord(slow, fail);
      if (request !== generation.current) return;
      setRecord(current => latest.revision >= current.revision ? latest : current);
      setMessage('Read complete. Your draft is unchanged.');
    } catch {
      if (request === generation.current) setMessage('The read failed. Keep the confirmed value and retry the read.');
    }
  }
  async function save(fail: boolean) {
    if (savingRef.current) return;
    savingRef.current = true; setSaving(true);
    ++generation.current; // Invalidate reads that began before this save.
    const submittedVersion = draftVersion.current;
    let accepted: RecordValue;
    try { accepted = await updateRecord(draft.trim(), record.revision); }
    catch (error) {
      setMessage(error instanceof Error ? error.message : 'The save could not be confirmed.');
      savingRef.current = false; setSaving(false); return;
    }
    ++generation.current; // Also invalidate reads begun while the write was pending.
    setRecord(accepted);
    if (draftVersion.current === submittedVersion) setDraft(accepted.date);
    setMessage('Saved. Refreshing the confirmed view…');
    const request = ++generation.current;
    try {
      const latest = await readRecord(false, fail);
      if (request === generation.current) {
        setRecord(current => latest.revision >= current.revision ? latest : current);
        setMessage('Saved and refreshed.');
      }
    } catch {
      if (request === generation.current) setMessage('Saved. The refresh failed. Retry the read; do not repeat this write.');
    } finally { savingRef.current = false; setSaving(false); }
  }
  return {record,draft,message,saving,change,save,refresh};
}
type Editor = ReturnType<typeof useController>;
const EditorContext = createContext<Editor | null>(null);
export function EditorProvider({ children }: { children: ReactNode }) {
  const value = useController();
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}
export function useEditor() {
  const value = useContext(EditorContext);
  if (!value) throw new Error('The editor needs its provider.');
  return value;
}
