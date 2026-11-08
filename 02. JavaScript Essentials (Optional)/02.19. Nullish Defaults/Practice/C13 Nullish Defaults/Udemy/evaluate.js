describe('Nullish Defaults', function () {
  it('preserves a valid zero quantity', function () {
    expect(restoreSelection({ quantity: 0, label: 'Saved', showDetails: true }).quantity).toBe(0);
  });
  it('preserves an empty label and a false display choice', function () {
    expect(restoreSelection({ quantity: 2, label: '', showDetails: false })).toEqual({ quantity: 2, label: '', showDetails: false });
  });
  it('uses defaults for absent and undefined fields', function () {
    expect(restoreSelection({})).toEqual({ quantity: 1, label: 'Untitled', showDetails: true });
    expect(restoreSelection({ quantity: undefined, label: undefined, showDetails: undefined })).toEqual({ quantity: 1, label: 'Untitled', showDetails: true });
  });
  it('uses defaults for null fields', function () {
    expect(restoreSelection({ quantity: null, label: null, showDetails: null })).toEqual({ quantity: 1, label: 'Untitled', showDetails: true });
  });
  it('retains provided non-empty values and handles a mixed record', function () {
    expect(restoreSelection({ quantity: 7, label: 'Desk setup', showDetails: true })).toEqual({ quantity: 7, label: 'Desk setup', showDetails: true });
    expect(restoreSelection({ quantity: 0, label: null, showDetails: false })).toEqual({ quantity: 0, label: 'Untitled', showDetails: false });
  });
  it('leaves saved input unchanged and handles repeated calls independently', function () {
    var saved = { quantity: 0, label: '', showDetails: false };
    var before = JSON.stringify(saved);
    expect(restoreSelection(saved)).toEqual(saved);
    var missing = {};
    expect(restoreSelection(missing)).toEqual({ quantity: 1, label: 'Untitled', showDetails: true });
    expect(missing).toEqual({});
    var cleared = { quantity: null, label: null, showDetails: null };
    expect(restoreSelection(cleared)).toEqual({ quantity: 1, label: 'Untitled', showDetails: true });
    expect(cleared).toEqual({ quantity: null, label: null, showDetails: null });
    expect(restoreSelection(saved)).toEqual(saved);
    expect(JSON.stringify(saved)).toBe(before);
  });
});
