import 'server-only';
import { db } from './db';
import { AccessError, requireCurrentUser } from './orderAccess';
export async function getMyWorkspace(id: string) {
  const user = await requireCurrentUser();
  const workspace = await db.workspace.findFirst({
    where: { id, members: { some: { userId: user.id } } },
    select: { id: true, name: true, notes: { select: { id: true, body: true }, orderBy: { id: 'asc' }, take: 20 } },
  });
  if (!workspace) throw new AccessError(404, 'Workspace not found.');
  return workspace;
}
export async function updateWorkspaceNote(workspaceId: string, noteId: string, body: string) {
  const user = await requireCurrentUser();
  const result = await db.workspaceNote.updateMany({
    where: { id: noteId, workspaceId, workspace: {
      members: { some: { userId: user.id, role: { in: ['owner', 'editor'] } } },
    } }, data: { body },
  });
  if (result.count !== 1) throw new AccessError(404, 'Editable note not found.');
}
