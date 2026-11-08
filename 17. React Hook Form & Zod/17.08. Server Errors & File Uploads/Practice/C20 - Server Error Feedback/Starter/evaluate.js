describe("Server Error Feedback", function () {
function callsFor(error) {
  var calls=[];
  reportSaveError(error,function(name,detail,options){calls.push({name:name,detail:detail,options:options});});
  return calls;
}
it("puts the field message beside email and focuses that field before showing the general error",function(){
  expect(callsFor(new ApiError("Save rejected.",{email:"That email is reserved."}))).toEqual([
    {name:"email",detail:{type:"server",message:"That email is reserved."},options:{shouldFocus:true}},
    {name:"root.server",detail:{type:"server",message:"Save rejected."},options:undefined}
  ]);
});
it("uses the actual field and general messages rather than a fixed example",function(){
  var c=callsFor(new ApiError("Please correct this registration.",{email:"Use another email."}));
  expect(c.length).toBe(2);expect(c[0].detail.message).toBe("Use another email.");expect(c[1].detail.message).toBe("Please correct this registration.");
});
it("does not invent an email issue when the API has no field message",function(){
  expect(callsFor(new ApiError("Service busy."))).toEqual([{name:"root.server",detail:{type:"server",message:"Service busy."},options:undefined}]);
  expect(callsFor(new ApiError("Service busy.",{email:""})).length).toBe(1);
});
it("keeps an ordinary Error as a form-level problem",function(){
  expect(callsFor(new Error("Connection lost."))).toEqual([{name:"root.server",detail:{type:"server",message:"Connection lost."},options:undefined}]);
});
it("uses the recovery message for unknown failure values",function(){
  [null,undefined,"offline",{message:"untrusted shape"}].forEach(function(error){
    expect(callsFor(error)).toEqual([{name:"root.server",detail:{type:"server",message:"Could not save. Your draft is still here."},options:undefined}]);
  });
});
it("preserves the supplied error and its field details",function(){
  var fields=Object.freeze({email:"Try another email."});var error=Object.freeze(new ApiError("Rejected.",fields));
  expect(callsFor(error).length).toBe(2);expect(error.fieldErrors).toBe(fields);expect(error.message).toBe("Rejected.");
});
});
