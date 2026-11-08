function defaults() { return {density:"comfortable",summaryOpen:true}; }
describe("Migrate Workspace Preferences", function () {
  it("compact preference with hidden overview", function () { expect(migratePreferences({dense:true,summaryOpen:false},0)).toEqual({density:"compact",summaryOpen:false}); });
  it("compact preference with shown overview", function () { expect(migratePreferences({dense:true,summaryOpen:true},0)).toEqual({density:"compact",summaryOpen:true}); });
  it("comfortable preference preserves hidden overview", function () { expect(migratePreferences({dense:false,summaryOpen:false},0)).toEqual({density:"comfortable",summaryOpen:false}); });
  it("comfortable and shown overview remain valid", function () { expect(migratePreferences({dense:false,summaryOpen:true},0)).toEqual(defaults()); });
  it("null is rejected", function () { expect(migratePreferences(null,0)).toEqual(defaults()); });
  it("arrays are rejected", function () { expect(migratePreferences([],0)).toEqual(defaults()); });
  it("text is rejected", function () { expect(migratePreferences("compact",0)).toEqual(defaults()); });
  it("truthy text does not become a boolean", function () { expect(migratePreferences({dense:"false",summaryOpen:true},0)).toEqual(defaults()); });
  it("missing overview uses defaults", function () { expect(migratePreferences({dense:true},0)).toEqual(defaults()); });
  it("unsupported version uses defaults", function () { expect(migratePreferences({dense:true,summaryOpen:false},9)).toEqual(defaults()); });
  it("extra saved fields do not enter the output", function () { expect(migratePreferences({dense:true,summaryOpen:false,products:[1],setDensity:"bad"},0)).toEqual({density:"compact",summaryOpen:false}); });
  it("frozen old input can be migrated without mutation", function () { expect(migratePreferences(Object.freeze({dense:true,summaryOpen:false}),0)).toEqual({density:"compact",summaryOpen:false}); });
});
