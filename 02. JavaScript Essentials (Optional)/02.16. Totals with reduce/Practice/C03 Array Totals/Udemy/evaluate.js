describe('Array Totals', function () {
  it('adds every line total using both price and count', function () {
    expect(calculateBasketTotal([{ unitPrice: 18, count: 4 }, { unitPrice: 12, count: 3 }])).toBe(108);
  });
  it('returns zero for an empty basket', function () {
    expect(calculateBasketTotal([])).toBe(0);
  });
  it('handles one entry and a different basket', function () {
    expect(calculateBasketTotal([{ unitPrice: 7, count: 5 }])).toBe(35);
    expect(calculateBasketTotal([{ unitPrice: 3, count: 2 }, { unitPrice: 11, count: 1 }, { unitPrice: 4, count: 3 }])).toBe(29);
  });
  it('preserves zero counts and zero prices', function () {
    expect(calculateBasketTotal([{ unitPrice: 20, count: 0 }, { unitPrice: 0, count: 5 }, { unitPrice: 4, count: 2 }])).toBe(8);
  });
  it('returns a number for fractional prices', function () {
    expect(calculateBasketTotal([{ unitPrice: 19.5, count: 2 }, { unitPrice: 8.25, count: 3 }])).toBe(63.75);
  });
  it('preserves input entries and keeps repeated calls independent', function () {
    var items = [{ id: 'a', unitPrice: 5, count: 2 }, { id: 'b', unitPrice: 3, count: 4 }];
    var before = JSON.stringify(items);
    expect(calculateBasketTotal(items)).toBe(22);
    expect(calculateBasketTotal([{ unitPrice: 2, count: 1 }])).toBe(2);
    expect(calculateBasketTotal(items)).toBe(22);
    expect(JSON.stringify(items)).toBe(before);
  });
});
