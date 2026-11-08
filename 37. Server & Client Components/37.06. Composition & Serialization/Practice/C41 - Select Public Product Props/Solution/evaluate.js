describe("Select Public Product Props", function () {
 const product = { id: 'P-101', name: 'Studio Desk Lamp', priceMinor: 8900, supplierCost: 3500, warehouseReference: 'INTERNAL-DEMO' };
 it("keeps the public id", function () { expect(toPublicProduct(product).id).toBe('P-101'); });
 it("keeps the public name", function () { expect(toPublicProduct(product).name).toBe('Studio Desk Lamp'); });
 it("keeps minor units without conversion", function () { expect(toPublicProduct(product).priceMinor).toBe(8900); });
 it("omits supplier cost", function () { expect(Object.prototype.hasOwnProperty.call(toPublicProduct(product),'supplierCost')).toBe(false); });
 it("omits warehouse reference", function () { expect(Object.prototype.hasOwnProperty.call(toPublicProduct(product),'warehouseReference')).toBe(false); });
 it("returns only the three named properties", function () { expect(Object.keys(toPublicProduct(product)).sort()).toEqual(['id','name','priceMinor']); });
 it("creates a fresh object", function () { expect(toPublicProduct(product)).not.toBe(product); });
 it("does not mutate the input", function () { const before = JSON.stringify(product); toPublicProduct(product); expect(JSON.stringify(product)).toBe(before); });
 it("accepts a frozen record", function () { const frozen = Object.freeze({ ...product }); expect(toPublicProduct(frozen).name).toBe('Studio Desk Lamp'); });
 it("preserves a zero price", function () { expect(toPublicProduct({id:'P-102',name:'Sample',priceMinor:0}).priceMinor).toBe(0); });
 it("does not coerce or trim public text", function () { expect(toPublicProduct({id:'P-103',name:' Mug ',priceMinor:2800}).name).toBe(' Mug '); });
 it("does not copy future internal fields", function () { const extended = { ...product, internalNotes: 'Do not send' }; expect(Object.keys(toPublicProduct(extended)).sort()).toEqual(['id','name','priceMinor']); });
});
