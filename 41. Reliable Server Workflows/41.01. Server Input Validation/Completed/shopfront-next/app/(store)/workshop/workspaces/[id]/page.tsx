import { Suspense } from 'react';
import { AccessError } from '@/lib/orderAccess';
import { getMyWorkspace } from '@/lib/workspaceAccess';
async function WorkspaceDetails({ params }: { params: Promise<{ id: string }> }) {
  try {
    const workspace = await getMyWorkspace((await params).id);
    return (
      <article className="fs-card">
        <h2>{workspace.name}</h2>
        <ul>
          {workspace.notes.map(note => <li key={note.id}>{note.body}</li>)}
        </ul>
      </article>
    );
  } catch (error) { if (!(error instanceof AccessError)) throw error; return <p role="alert">{error.message}</p>; }
}
export default function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <section className="fs-shell">
      <h1>Merchant workspace</h1>
      <Suspense fallback={<p>Checking workspace access…</p>}>
        <WorkspaceDetails params={params}/>
      </Suspense>
    </section>
  );
}
