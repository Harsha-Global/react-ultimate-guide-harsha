describe('Check Workspace Permission', function () {
  const owner = { userId: 'alex', workspaceId: 'W-1', role: 'owner' };
  it('allows the matching owner', function () { expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', [owner])).toBe(true); });
  it('allows the matching editor', function () { expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', [{...owner, role: 'editor'}])).toBe(true); });
  it('rejects a viewer', function () { expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', [{...owner, role: 'viewer'}])).toBe(false); });
  it('rejects no authenticated user', function () { expect(canEditWorkspaceNote(null, 'W-1', 'W-1', [owner])).toBe(false); });
  it('rejects an empty identity', function () { expect(canEditWorkspaceNote('', 'W-1', 'W-1', [owner])).toBe(false); });
  it('rejects another user membership', function () { expect(canEditWorkspaceNote('bob', 'W-1', 'W-1', [owner])).toBe(false); });
  it('rejects an unrelated membership', function () { expect(canEditWorkspaceNote('alex', 'W-2', 'W-2', [owner])).toBe(false); });
  it('rejects a note from another workspace', function () { expect(canEditWorkspaceNote('alex', 'W-1', 'W-2', [owner])).toBe(false); });
  it('rejects an empty membership list', function () { expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', [])).toBe(false); });
  it('does not combine separate users or workspaces into one permission', function () {
    const list = [{...owner, role:'viewer'}, {userId:'bob',workspaceId:'W-1',role:'owner'}, {userId:'alex',workspaceId:'W-2',role:'editor'}];
    expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', list)).toBe(false);
  });
  it('finds a qualifying membership after unrelated records', function () {
    expect(canEditWorkspaceNote('alex', 'W-1', 'W-1', [{...owner,userId:'bob'}, owner])).toBe(true);
  });
  it('preserves frozen input records and order', function () {
    const list=Object.freeze([Object.freeze(owner), Object.freeze({...owner,userId:'bob'})]);
    expect(canEditWorkspaceNote('alex','W-1','W-1',list)).toBe(true);
    expect(list.map(item=>item.userId)).toEqual(['alex','bob']);
  });
});

