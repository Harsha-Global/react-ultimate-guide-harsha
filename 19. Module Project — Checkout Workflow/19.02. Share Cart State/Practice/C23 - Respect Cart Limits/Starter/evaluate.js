describe("Respect Cart Limits", function () {
function product(id,max,inStock){return {id:id,maxQuantity:max,inStock:inStock===undefined?true:inStock};}
it("adds a missing available product with one item",function(){
  var lines=[{productId:"p2",quantity:1}],result=addToCart(lines,product("p1",2));
  expect(result).toEqual([{productId:"p2",quantity:1},{productId:"p1",quantity:1}]);expect(result[0]).toBe(lines[0]);
  expect(addToCart([],product("p4",1))).toEqual([{productId:"p4",quantity:1}]);
});
it("stops exactly at the target product's limit",function(){
  var lines=[{productId:"p1",quantity:2}];expect(addToCart(lines,product("p1",2))).toEqual(lines);
});
it("does not worsen an already over-limit line",function(){
  var lines=[{productId:"p1",quantity:3}];expect(addToCart(lines,product("p1",2))).toEqual(lines);
});
it("uses different product limits instead of a fixed number",function(){
  expect(addToCart([{productId:"p7",quantity:4}],product("p7",5))).toEqual([{productId:"p7",quantity:5}]);
  expect(addToCart([{productId:"p7",quantity:5}],product("p7",5))).toEqual([{productId:"p7",quantity:5}]);
  expect(addToCart([{productId:"p8",quantity:1}],product("p8",1))).toEqual([{productId:"p8",quantity:1}]);
});
it("does not add or increase unavailable products",function(){
  var lines=[{productId:"p1",quantity:1}];
  [product("p1",4,false),product("p3",4,false),product("p1",0),product("p3",0)].forEach(function(p){expect(addToCart(lines,p)).toEqual(lines);});
});
it("changes only the selected row immutably and preserves order",function(){
  var lines=[Object.freeze({productId:"p2",quantity:1}),Object.freeze({productId:"p1",quantity:1})];Object.freeze(lines);
  var p=Object.freeze(product("p1",2)),result=addToCart(lines,p);
  expect(result).not.toBe(lines);expect(result[0]).toBe(lines[0]);expect(result[1]).not.toBe(lines[1]);
  expect(result).toEqual([{productId:"p2",quantity:1},{productId:"p1",quantity:2}]);expect(lines[1].quantity).toBe(1);
});
});
