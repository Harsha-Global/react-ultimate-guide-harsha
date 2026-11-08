describe("Safe Return Destinations", function () {
it("preserves the account path, search and hash",function(){
  ["/account","/account?tab=plans","/account#saved","/account?tab=plans#saved"].forEach(function(value){expect(safeReturnTo(value)).toBe(value);});
});
it("rejects absent, absolute and network-path destinations",function(){
  [null,"","account","https://other.example/account","https://cedar.example/account","//other.example/account","///other.example/account","javascript:alert(1)"].forEach(function(value){expect(safeReturnTo(value)).toBe("/account");});
});
it("requires the exact allowed pathname",function(){
  ["/login?returnTo=/account","/account/settings","/account-evil","/Account","/account/","/staff"].forEach(function(value){expect(safeReturnTo(value)).toBe("/account");});
});
it("rejects backslashes and raw controls even when parsing would hide them",function(){
  ["/account?x=\\value","/account?x="+String.fromCharCode(0),"/account?x="+String.fromCharCode(9),"/account?x="+String.fromCharCode(10),"/account?x="+String.fromCharCode(31)].forEach(function(value){expect(safeReturnTo(value)).toBe("/account");});
});
it("enforces the inclusive length boundary",function(){
  var prefix="/account?q=",allowed=prefix+"a".repeat(2048-prefix.length);
  expect(safeReturnTo(allowed)).toBe(allowed);expect(safeReturnTo(allowed+"a")).toBe("/account");
});
it("treats search values as data instead of external destinations",function(){
  var value="/account?note=https%3A%2F%2Fother.example#saved";expect(safeReturnTo(value)).toBe(value);
});
it("checks the parsed pathname and normalizes allowed relative segments",function(){
  expect(safeReturnTo("/account/../login?x=1")).toBe("/account");
  expect(safeReturnTo("/member/../account?tab=plans#saved")).toBe("/account?tab=plans#saved");
  expect(safeReturnTo("/%61ccount?x=1")).toBe("/account");
});
it("rejects malformed network addresses without throwing",function(){
  ["//[broken","//%","/\\other.example/account"].forEach(function(value){expect(safeReturnTo(value)).toBe("/account");});
});
});
