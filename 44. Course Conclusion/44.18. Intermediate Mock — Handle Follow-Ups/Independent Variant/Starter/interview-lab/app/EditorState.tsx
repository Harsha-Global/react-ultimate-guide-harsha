"use client";
import { useState, type ReactNode } from 'react';
import { readRecord, updateRecord, type RecordValue } from './service';
export function EditorProvider({ children }: { children: ReactNode }) { return children; }
export function useEditor() {
  const [record, setRecord] = useState<RecordValue>({id:'event-1',date:'2026-11-02',revision:1});
  const [draft, setDraft] = useState('2026-11-02');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  async function refresh(slow = false, fail = false) {
    const latest = await readRecord(slow, fail);
    setRecord(latest); setDraft(latest.date); setMessage('Read complete.');
  }
  async function save(fail: boolean) {
    setSaving(true);
    try {
      await updateRecord(draft.trim(), record.revision);
      await refresh(false, fail);
      setMessage('Saved.');
    } catch { setMessage('Save failed. Try saving again.'); }
    finally { setSaving(false); }
  }
  return {record,draft,message,saving,change:setDraft,save,refresh};
}
