describe("Build the Checkout Request", function () {
function details(){return {contact:{name:"Alex Morgan",email:"alex@example.com",phone:""},address:{street:"14 Pine Street",city:"Denver",postal:"80202"},method:"standard",note:"Ring once."};}
it("builds a POST request with a JSON content type and text body",function(){
  var value=details(),cart=[{productId:"p1",quantity:1}],result=buildCheckoutRequest(value,cart);
  expect(result).toEqual({method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({details:value,cart:cart})});
});
it("keeps form details and cart as separate top-level properties",function(){
  var value=details(),cart=[{productId:"p1",quantity:2},{productId:"p6",quantity:3}];
  expect(JSON.parse(buildCheckoutRequest(value,cart).body)).toEqual({details:value,cart:cart});
});
it("uses the current cart on every call rather than a sample or a previous cart",function(){
  var value=details();buildCheckoutRequest(value,[{productId:"p1",quantity:1}]);
  expect(JSON.parse(buildCheckoutRequest(value,[{productId:"p8",quantity:4}]).body).cart).toEqual([{productId:"p8",quantity:4}]);
});
it("preserves pickup values and an empty optional note or phone",function(){
  var value=details();value.method="pickup";value.address={street:"",city:"",postal:""};value.note="";
  expect(JSON.parse(buildCheckoutRequest(value,[{productId:"p2",quantity:1}]).body).details).toEqual(value);
});
it("preserves special characters as JSON data",function(){
  var value=details();value.contact.name="Jordan Lee";value.note='Use the "side" door.\nThank you!';
  expect(JSON.parse(buildCheckoutRequest(value,[{productId:"p3",quantity:1}]).body).details).toEqual(value);
});
it("does not mutate validated details or empty the shared cart",function(){
  var value=details();Object.freeze(value.contact);Object.freeze(value.address);Object.freeze(value);
  var cart=Object.freeze([Object.freeze({productId:"p1",quantity:2})]);
  var before=JSON.stringify({details:value,cart:cart});buildCheckoutRequest(value,cart);
  expect(JSON.stringify({details:value,cart:cart})).toBe(before);
});
});
