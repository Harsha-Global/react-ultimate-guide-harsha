describe("Derived Selectors", function () {
  const orders = [{id: "OD-1041", status: "ready"}, {id: "OD-1042", status: "payment-pending"}, {id: "OD-1043", status: "ready"}, {id: "OD-1044", status: "shipped"}];
  it("rejects an empty selection", function () {expect(selectSelectionSummary({orders, selectedIds: []})).toEqual({selectedCount: 0, readyCount: 0, canPrioritize: false});});
  it("accepts two known ready orders", function () {expect(selectSelectionSummary({orders, selectedIds: ["OD-1041", "OD-1043"]})).toEqual({selectedCount: 2, readyCount: 2, canPrioritize: true});});
  it("keeps a pending order in the selected count", function () {expect(selectSelectionSummary({orders, selectedIds: ["OD-1041", "OD-1042"]})).toEqual({selectedCount: 2, readyCount: 1, canPrioritize: false});});
  it("does not treat shipped as ready", function () {expect(selectSelectionSummary({orders, selectedIds: ["OD-1044"]})).toEqual({selectedCount: 1, readyCount: 0, canPrioritize: false});});
  it("rejects a partially missing selection", function () {expect(selectSelectionSummary({orders, selectedIds: ["OD-1041", "missing"]})).toEqual({selectedCount: 1, readyCount: 1, canPrioritize: false});});
  it("rejects an entirely missing selection", function () {expect(selectSelectionSummary({orders: [], selectedIds: ["missing"]})).toEqual({selectedCount: 0, readyCount: 0, canPrioritize: false});});
  it("counts a repeated requested ID once", function () {expect(selectSelectionSummary({orders, selectedIds: ["OD-1041", "OD-1041"]})).toEqual({selectedCount: 1, readyCount: 1, canPrioritize: true});});
  it("does not change frozen inputs or their order", function () {
    const records = Object.freeze(orders.map(order => Object.freeze({...order})));
    const ids = Object.freeze(["OD-1043", "OD-1041"]);
    const state = Object.freeze({orders: records, selectedIds: ids});
    expect(selectSelectionSummary(state)).toEqual({selectedCount: 2, readyCount: 2, canPrioritize: true});
    expect(state.orders).toBe(records);expect(state.selectedIds).toBe(ids);
    expect(ids).toEqual(["OD-1043", "OD-1041"]);
    expect(records.map(order => order.id)).toEqual(["OD-1041", "OD-1042", "OD-1043", "OD-1044"]);
  });
});
