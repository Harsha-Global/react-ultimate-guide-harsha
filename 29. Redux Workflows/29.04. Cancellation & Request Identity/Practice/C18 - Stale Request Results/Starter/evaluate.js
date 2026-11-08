describe("Stale Request Results", function () {
  it("accepts the current pending completion", function () {expect(completePreview({requestId:"b",status:"pending",message:""},{requestId:"b",message:"Two orders"})).toEqual({requestId:null,status:"ready",message:"Two orders"});});
  it("ignores an older completion", function () {const state={requestId:"b",status:"pending",message:""};expect(completePreview(state,{requestId:"a",message:"Old"})).toBe(state);});
  it("does not accept a result while idle", function () {const state={requestId:null,status:"idle",message:""};expect(completePreview(state,{requestId:"a",message:"Old"})).toBe(state);});
  it("does not replace an already completed result", function () {const state={requestId:null,status:"ready",message:"Latest"};expect(completePreview(state,{requestId:"old",message:"Old"})).toBe(state);});
  it("requires pending even if a malformed ready state retains the same ID", function () {const state={requestId:"b",status:"ready",message:"Kept"};expect(completePreview(state,{requestId:"b",message:"Wrong"})).toBe(state);});
  it("preserves an empty successful message", function () {expect(completePreview({requestId:"b",status:"pending",message:"Old"},{requestId:"b",message:""})).toEqual({requestId:null,status:"ready",message:""});});
  it("compares the complete ID rather than a substring", function () {const state={requestId:"request-12",status:"pending",message:""};expect(completePreview(state,{requestId:"request-1",message:"Wrong"})).toBe(state);});
  it("does not mutate frozen input objects", function () {const state=Object.freeze({requestId:"b",status:"pending",message:""});const completion=Object.freeze({requestId:"b",message:"Done"});const result=completePreview(state,completion);expect(result).not.toBe(state);expect(result.message).toBe("Done");expect(state.requestId).toBe("b");expect(state.status).toBe("pending");});
});
