describe("Narrow the Booking Kind", function () {
it("needs one place for an individual without group fields", function(){expect(requiredPlaces({kind:"individual"})).toBe(1);});
it("counts both people in a group",function(){expect(requiredPlaces({kind:"group",groupName:"Friends",attendees:[{id:"a",name:"Maya"},{id:"b",name:"Sam"}]})).toBe(2);});
it("follows the current attendee list instead of a fixed group size",function(){const attendees=[{id:"a",name:"Maya"},{id:"b",name:"Sam"},{id:"c",name:"Nora"}];expect(requiredPlaces({kind:"group",groupName:"Friends",attendees:attendees})).toBe(3);});
it("does not change a frozen draft",function(){const attendees=Object.freeze([{id:"a",name:"Maya"},{id:"b",name:"Sam"}]);const draft=Object.freeze({kind:"group",groupName:"Friends",attendees:attendees});expect(requiredPlaces(draft)).toBe(2);expect(attendees.length).toBe(2);});
});
