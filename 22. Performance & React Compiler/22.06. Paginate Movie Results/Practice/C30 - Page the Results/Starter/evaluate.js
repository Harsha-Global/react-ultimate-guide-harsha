describe("Page the Results", function () {
it("returns the middle page with the correct count", function () { expect(pageResults([1,2,3,4,5,6,7],2,3)).toEqual({items:[4,5,6],page:2,totalPages:3}); });
it("keeps the partial final page", function () { expect(pageResults([1,2,3,4,5,6,7],3,3).items).toEqual([7]); });
it("clamps too-small and too-large pages", function () { expect(pageResults([1,2,3,4],0,2).items).toEqual([1,2]); expect(pageResults([1,2,3,4],99,2)).toEqual({items:[3,4],page:2,totalPages:2}); });
it("uses one empty page for an empty collection", function () { expect(pageResults([],4,3)).toEqual({items:[],page:1,totalPages:1}); });
it("does not add a spare page for an exact multiple", function () { expect(pageResults([1,2,3,4,5,6],2,3).totalPages).toBe(2); });
it("preserves input and item identity", function () { const first={id:"a"}, second={id:"b"}; const before=Object.freeze([first,second]); const result=pageResults(before,2,1); expect(result.items[0]).toBe(second); expect(before.length).toBe(2); expect(before[0]).toBe(first); });
});
