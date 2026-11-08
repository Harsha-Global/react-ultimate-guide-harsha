type Membership = Readonly<{ userId: string; workspaceId: string; role: 'owner' | 'editor' | 'viewer' }>;
function canEditWorkspaceNote(userId: string | null, workspaceId: string, noteWorkspaceId: string, memberships: readonly Membership[]): boolean {
  // TODO: require an authenticated identity, matching workspace, and a writing role.
  return memberships.some(membership => membership.workspaceId === workspaceId);
}

