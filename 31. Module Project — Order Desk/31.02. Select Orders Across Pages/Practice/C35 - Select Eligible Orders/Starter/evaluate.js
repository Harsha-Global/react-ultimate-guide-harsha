describe("Select Eligible Orders", function () {
  it("selects a ready row", function () { expect(selectEligibleOrders([], [{id:"a",status:"ready"}])).toEqual(["a"]); });
  it("excludes payment-pending and shipped rows", function () { expect(selectEligibleOrders([], [{id:"p",status:"payment-pending"},{id:"s",status:"shipped"}])).toEqual([]); });
  it("preserves selected IDs outside the visible response", function () { expect(selectEligibleOrders(["earlier"], [{id:"a",status:"ready"}])).toEqual(["earlier","a"]); });
  it("does not toggle or duplicate a previously selected ID", function () { expect(selectEligibleOrders(["a"], [{id:"a",status:"ready"}])).toEqual(["a"]); });
  it("adds a repeated ready row only once", function () { expect(selectEligibleOrders([], [{id:"a",status:"ready"},{id:"a",status:"ready"}])).toEqual(["a"]); });
  it("keeps prior order, then appends new eligible IDs in response order", function () { expect(selectEligibleOrders(["z","a"], [{id:"b",status:"ready"},{id:"a",status:"ready"},{id:"c",status:"ready"}])).toEqual(["z","a","b","c"]); });
  it("uses the supplied readiness instead of an old fixture assumption", function () { expect(selectEligibleOrders([], [{id:"OD-1041",status:"shipped"}])).toEqual([]); });
  it("returns a fresh array for an empty response without discarding selection", function () {const ids=["a"];const result=selectEligibleOrders(ids,[]);expect(result).toEqual(["a"]);expect(result).not.toBe(ids);});
  it("does not mutate frozen inputs", function () {const ids=Object.freeze(["earlier"]);const rows=Object.freeze([Object.freeze({id:"new",status:"ready"})]);expect(selectEligibleOrders(ids,rows)).toEqual(["earlier","new"]);expect(ids).toEqual(["earlier"]);expect(rows[0].status).toBe("ready");});
});
