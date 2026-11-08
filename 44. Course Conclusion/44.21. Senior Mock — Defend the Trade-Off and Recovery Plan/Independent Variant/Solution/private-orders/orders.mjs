import { rows, requireMembership } from './fixture.mjs';
export function getOrders(session, workspace) {
  const userId = requireMembership(session, workspace);
  return rows.filter(row => row.owner === userId && row.workspace === workspace);
}
