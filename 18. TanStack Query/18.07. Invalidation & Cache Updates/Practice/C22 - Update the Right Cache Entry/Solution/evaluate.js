describe("Update the Right Cache Entry", function () {
function record(){return {id:"e3",title:"Evening at River House",category:"food",price:45};}
function clientFor(log){return {
  cancelQueries:function(options){log.push(["cancel",options]);return Promise.resolve();},
  setQueryData:function(key,saved){log.push(["set",key,saved]);},
  invalidateQueries:function(options){log.push(["invalidate",options]);return Promise.resolve();}
};}
it("cancels the exact detail query, replaces it with the saved record, then invalidates lists",async function(){
  var log=[],saved=record();await applySavedEvent(clientFor(log),saved);
  expect(log).toEqual([
    ["cancel",{queryKey:["events","detail","e3"],exact:true}],
    ["set",["events","detail","e3"],saved],
    ["invalidate",{queryKey:["events","list"]}]
  ]);
});
it("uses the returned id and the complete returned values",async function(){
  var log=[],saved={id:"e8",title:"Studio evening",category:"art",price:0};await applySavedEvent(clientFor(log),saved);
  expect(log[1]).toEqual(["set",["events","detail","e8"],saved]);
});
it("waits for cancellation before writing or invalidating",async function(){
  var log=[],release;var client=clientFor(log);
  client.cancelQueries=function(options){log.push(["cancel",options]);return new Promise(function(resolve){release=resolve;});};
  var done=applySavedEvent(client,record());await Promise.resolve();
  expect(log.length).toBe(1);release();await done;expect(log.length).toBe(3);
});
it("does not finish before the list invalidation finishes",async function(){
  var log=[],release,finished=false;var client=clientFor(log);
  client.invalidateQueries=function(options){log.push(["invalidate",options]);return new Promise(function(resolve){release=resolve;});};
  var done=applySavedEvent(client,record()).then(function(){finished=true;});
  await Promise.resolve();await Promise.resolve();expect(finished).toBe(false);
  expect(typeof release).toBe("function");release();await done;expect(finished).toBe(true);
});
it("preserves unrelated detail entries and leaves list reconstruction to invalidation",async function(){
  var other={id:"e2",title:"Other workshop",category:"art",price:20};var list={items:[other],total:1};
  var cache={e2:other,list:list};var log=[],client=clientFor(log);
  client.setQueryData=function(key,saved){cache[key[2]]=saved;};
  await applySavedEvent(client,record());expect(cache.e2).toBe(other);expect(cache.list).toBe(list);expect(cache.e3).toEqual(record());
  expect(log[1]).toEqual(["invalidate",{queryKey:["events","list"]}]);
});
it("does not change the returned server record",async function(){
  var saved=Object.freeze(record()),log=[];await applySavedEvent(clientFor(log),saved);expect(saved).toEqual(record());
});
it("does not write after failed cancellation",async function(){
  var log=[],failure=new Error("Cancellation failed"),client=clientFor(log),caught;
  client.cancelQueries=function(){var rejected=Promise.reject(failure);rejected.catch(function(){});return rejected;};
  try{await applySavedEvent(client,record());}catch(error){caught=error;}
  expect(caught).toBe(failure);expect(log).toEqual([]);
});
});
