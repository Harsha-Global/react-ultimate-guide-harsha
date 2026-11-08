describe("Wait for the Session", function () {
it("shows the startup check instead of the login or account screen",function(){
  expect(selectSessionScreen({status:"checking"})).toBe("checking");
});
it("offers recovery for a failed session check rather than treating it as sign-out",function(){
  expect(selectSessionScreen({status:"error",message:"Connection lost."})).toBe("retry");
});
it("shows the account only after an authenticated result",function(){
  expect(selectSessionScreen({status:"authenticated",user:{id:"u1",name:"Jordan Lee"}})).toBe("account");
});
it("shows login for a confirmed anonymous result, with or without a message",function(){
  expect(selectSessionScreen({status:"anonymous"})).toBe("login");
  expect(selectSessionScreen({status:"anonymous",message:"Signed out."})).toBe("login");
});
it("follows changing results across failure, retry, success and logout",function(){
  var states=[{status:"error",message:"Offline"},{status:"checking"},{status:"authenticated",user:{id:"u2",name:"Alex Morgan"}},{status:"anonymous"}];
  expect(states.map(selectSessionScreen)).toEqual(["retry","checking","account","login"]);
});
it("does not change the session state or user",function(){
  var user=Object.freeze({id:"u3",name:"Casey Reed"}),state=Object.freeze({status:"authenticated",user:user});
  expect(selectSessionScreen(state)).toBe("account");expect(state.user).toBe(user);expect(state.status).toBe("authenticated");
});
});
