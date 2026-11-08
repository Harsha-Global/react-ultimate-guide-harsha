describe("Validate a Saved View", function () {
it("valid studio view", function () { expect(readSavedView({q:"studio",sort:"name",dir:"asc",size:2})).toEqual({q:"studio",sort:"name",dir:"asc",size:2}); });
it("empty search and original ordering", function () { expect(readSavedView({q:"",sort:"",dir:"asc",size:4})).toEqual({q:"",sort:"",dir:"asc",size:4}); });
it("sixty characters accepted", function () { expect(readSavedView({q:"x".repeat(60),sort:"stock",dir:"desc",size:2})).toEqual({q:"x".repeat(60),sort:"stock",dir:"desc",size:2}); });
it("extra fields stripped", function () { expect(readSavedView({q:"travel",sort:"priceMinor",dir:"desc",size:4,page:9,token:"ignore"})).toEqual({q:"travel",sort:"priceMinor",dir:"desc",size:4}); });
it("category sort accepted", function () { expect(readSavedView({q:"work",sort:"category",dir:"asc",size:2})).toEqual({q:"work",sort:"category",dir:"asc",size:2}); });
it("null rejected", function () { expect(readSavedView(null)).toEqual(null); });
it("array rejected", function () { expect(readSavedView([])).toEqual(null); });
it("missing field rejected", function () { expect(readSavedView({q:"",sort:"name",size:2})).toEqual(null); });
it("long search rejected", function () { expect(readSavedView({q:"x".repeat(61),sort:"name",dir:"asc",size:2})).toEqual(null); });
it("unknown sorting rejected", function () { expect(readSavedView({q:"",sort:"rating",dir:"asc",size:2})).toEqual(null); });
it("direction is exact", function () { expect(readSavedView({q:"",sort:"name",dir:"DESC",size:2})).toEqual(null); });
it("page size is numeric", function () { expect(readSavedView({q:"",sort:"name",dir:"asc",size:"2"})).toEqual(null); });
it("copy without mutating a frozen snapshot", function () { const value=Object.freeze({q:"studio",sort:"name",dir:"asc",size:2}); const result=readSavedView(value); expect(result).toEqual(value); expect(result).not.toBe(value); });
});
