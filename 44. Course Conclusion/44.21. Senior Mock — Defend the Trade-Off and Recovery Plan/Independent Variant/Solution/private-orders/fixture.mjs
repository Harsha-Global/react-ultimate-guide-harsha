export const rows = [
  {id:'O-A1',owner:'alex',workspace:'studio',title:'Alex lamp order'},
  {id:'O-B1',owner:'bob',workspace:'studio',title:'Bob chair order'},
  {id:'O-A2',owner:'alex',workspace:'travel',title:'Alex bag order'}
];
export const memberships = new Set(['alex:studio','bob:studio','alex:travel']);
// Trusted in-process session fixtures stand in for the already-taught session reader.
// Never accept these identities from an untrusted public header in a real application.
export function requireMembership(session,workspace) {
  if (!session?.userId || !memberships.has(`${session.userId}:${workspace}`)) throw new Error('Forbidden');
  return session.userId;
}
