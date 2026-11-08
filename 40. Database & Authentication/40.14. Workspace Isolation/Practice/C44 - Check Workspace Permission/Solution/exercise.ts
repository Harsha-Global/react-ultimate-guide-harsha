type Membership = Readonly<{ userId: string; workspaceId: string; role: 'owner' | 'editor' | 'viewer' }>;
function canEditWorkspaceNote(userId: string | null, workspaceId: string, noteWorkspaceId: string, memberships: readonly Membership[]): boolean {
  if (!userId || workspaceId !== noteWorkspaceId) return false;
  return memberships.some(membership =>
    membership.userId === userId && membership.workspaceId === workspaceId &&
    (membership.role === 'owner' || membership.role === 'editor')
  );
}

