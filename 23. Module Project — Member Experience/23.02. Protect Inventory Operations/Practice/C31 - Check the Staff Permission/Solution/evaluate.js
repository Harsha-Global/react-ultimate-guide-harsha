describe("Check the Staff Permission", function () {
it("rejects a missing session", function () { expect(inventoryStatus(null,{})).toBe(401); });
it("rejects a signed-in member", function () { expect(inventoryStatus({id:"jordan",role:"member"},{})).toBe(403); });
it("accepts the verified staff role", function () { expect(inventoryStatus({id:"rebecca",role:"admin"},{})).toBe(200); });
it("does not trust a role injected into the body", function () { expect(inventoryStatus(null,{role:"admin"})).toBe(401); expect(inventoryStatus({id:"jordan",role:"member"},{role:"admin"})).toBe(403); });
it("does not replace the verified role with other body content", function () { [null,"admin",{role:"member"},{user:{role:"admin"}}].forEach(function(body){ expect(inventoryStatus({id:"rebecca",role:"admin"},body)).toBe(200); }); });
});
