describe('Async Error Handling', function () {
  it('awaits a successful save and returns its total', async function () {
    expect(await getSaveOutcome(() => simulateSave(108))).toEqual({ ok: true, total: 108 });
    expect(await getSaveOutcome(() => simulateSave(57))).toEqual({ ok: true, total: 57 });
  });
  it('preserves a valid zero total', async function () {
    expect(await getSaveOutcome(() => simulateSave(0))).toEqual({ ok: true, total: 0 });
  });
  it('handles rejection with the actual error message', async function () {
    expect(await getSaveOutcome(() => simulateSave(108, true))).toEqual({ ok: false, message: 'Basket save failed' });
    expect(await getSaveOutcome(() => simulateSave(12, true, 'Connection unavailable'))).toEqual({ ok: false, message: 'Connection unavailable' });
  });
  it('invokes the supplied operation exactly once', async function () {
    let calls = 0;
    const result = await getSaveOutcome(() => {
      calls += 1;
      return simulateSave(29);
    });
    expect(result).toEqual({ ok: true, total: 29 });
    expect(calls).toBe(1);
  });
  it('waits for settlement instead of returning an early success', async function () {
    let finish;
    const pending = new Promise(resolve => { finish = resolve; });
    let completed = false;
    const request = getSaveOutcome(() => pending);
    const observed = request.then(value => { completed = true; return value; });
    await Promise.resolve();
    expect(completed).toBe(false);
    finish({ total: 63.75, status: 'saved' });
    expect(await observed).toEqual({ ok: true, total: 63.75 });
  });
  it('keeps repeated outcomes independent and preserves the saved object', async function () {
    const saved = { total: 22, status: 'saved' };
    expect(await getSaveOutcome(() => Promise.resolve(saved))).toEqual({ ok: true, total: 22 });
    expect(saved).toEqual({ total: 22, status: 'saved' });
    expect(await getSaveOutcome(() => simulateSave(2, true, 'Try again'))).toEqual({ ok: false, message: 'Try again' });
    expect(await getSaveOutcome(() => simulateSave(2))).toEqual({ ok: true, total: 2 });
  });
});
