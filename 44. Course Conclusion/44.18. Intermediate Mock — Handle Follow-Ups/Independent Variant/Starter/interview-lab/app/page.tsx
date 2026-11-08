"use client";
import Link from 'next/link';
import { useState } from 'react';
import { externalEdit, inspectService } from './service';
import { useEditor } from './EditorState';
export default function Page() {
  const editor = useEditor();
  const [failRefresh, setFailRefresh] = useState(true);
  const [evidence, setEvidence] = useState('');
  const [filter, setFilter] = useState('');
  const visible = editor.record.date.toLowerCase().includes(filter.toLowerCase());
  return <><h1>Editable event date</h1><nav><Link href="/away">Leave editor</Link></nav><label>List date filter<input value={filter} onChange={e => setFilter(e.target.value)}/></label>{visible ? <article><h2>{editor.record.date}</h2><p>Confirmed revision: {editor.record.revision}</p></article> : <p>No matching list row. The selected editor remains open.</p>}
    <label>Date draft<input value={editor.draft} onChange={e => editor.change(e.target.value)} disabled={editor.saving}/></label>
    <label><input type="checkbox" checked={failRefresh} onChange={e => setFailRefresh(e.target.checked)}/> Fail the refresh after saving</label>
    <button onClick={() => void editor.save(failRefresh)} disabled={editor.saving || !editor.draft.trim()}>Save date</button>
    <button onClick={() => void editor.refresh(true, false)}>Start slow read</button>
    <button onClick={() => void editor.refresh(false, false)}>Retry read</button><p role="status">{editor.message}</p>
    <fieldset><legend>Controlled interview evidence</legend><button onClick={() => setEvidence(JSON.stringify(inspectService(), null, 2))}>Inspect service state</button><button onClick={() => { externalEdit(); setEvidence(JSON.stringify(inspectService(), null, 2)); }}>Simulate another editor</button><pre>{evidence}</pre></fieldset>
  </>;
}
