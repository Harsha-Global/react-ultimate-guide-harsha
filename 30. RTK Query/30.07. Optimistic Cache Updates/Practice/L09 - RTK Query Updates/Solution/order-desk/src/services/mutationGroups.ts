// Isolated by dispatch function, so independently configured stores do not share pending groups.
type Group = { pending: number; overlapped: boolean };
const stores = new WeakMap<object, Map<string, Group>>();
export function beginMutation(dispatch: object, id: string) {
  let entries = stores.get(dispatch);
  if (!entries) {
    entries = new Map();
    stores.set(dispatch, entries);
  }
  let group = entries.get(id);
  if (!group) {
    group = { pending: 0, overlapped: false };
    entries.set(id, group);
  }
  group.pending++;
  if (group.pending > 1) group.overlapped = true;
  return {
    group,
    finish: () => {
      group.pending--;
      if (group.pending === 0) entries.delete(id);
    },
  };
}
