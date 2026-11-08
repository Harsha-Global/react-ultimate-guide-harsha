describe("Complete Query Keys", function () {
function filters(){return {q:"river",category:"food",sort:"title",page:1};}
it("includes every request-defining filter in the list key",function(){
  expect(eventKeys.list(filters())).toEqual(["events","list",filters()]);
});
it("distinguishes categories even when other values match",function(){
  var a=filters(),b=Object.assign({},a,{category:"outdoors"});expect(eventKeys.list(a)).not.toEqual(eventKeys.list(b));
});
it("distinguishes search terms, sorting and page values independently",function(){
  var a=filters();[{q:"studio"},{sort:"price"},{page:2}].forEach(function(change){
    expect(eventKeys.list(a)).not.toEqual(eventKeys.list(Object.assign({},a,change)));
  });
});
it("gives equal key contents to separate objects with the same values",function(){
  expect(eventKeys.list(filters())).toEqual(eventKeys.list(filters()));
});
it("keeps the list-family prefix and record-specific detail keys distinct",function(){
  expect(eventKeys.lists()).toEqual(["events","list"]);
  expect(eventKeys.detail("e3")).toEqual(["events","detail","e3"]);
  expect(eventKeys.detail("e6")).toEqual(["events","detail","e6"]);
});
it("preserves frozen filter values including an empty search and the all category",function(){
  var a=Object.freeze({q:"",category:"all",sort:"price",page:3});
  expect(eventKeys.list(a)).toEqual(["events","list",{q:"",category:"all",sort:"price",page:3}]);
  expect(a.page).toBe(3);
});
});
