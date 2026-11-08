describe("Keep Reducer Actions Complete", function () {
it("renames a group and retains attendees",function(){const attendees=["Maya","Sam"];const before={kind:"group",groupName:"Old",attendees:attendees};const result=bookingReducer(before,{type:"groupRenamed",groupName:"Saturday Friends"});expect(result.groupName).toBe("Saturday Friends");expect(result.attendees).toBe(attendees);});
it("leaves an individual draft unchanged",function(){const before={kind:"individual"};expect(bookingReducer(before,{type:"groupRenamed",groupName:"Friends"})).toBe(before);});
it("creates a new group without mutating the previous draft",function(){const before=Object.freeze({kind:"group",groupName:"Old",attendees:Object.freeze(["Maya","Sam"])});const result=bookingReducer(before,{type:"groupRenamed",groupName:"New"});expect(result).not.toBe(before);expect(before.groupName).toBe("Old");expect(result.groupName).toBe("New");});
it("keeps the existing replaced behavior",function(){const replacement={kind:"individual"};expect(bookingReducer({kind:"group",groupName:"Friends",attendees:["Maya","Sam"]},{type:"replaced",draft:replacement})).toBe(replacement);});
});
