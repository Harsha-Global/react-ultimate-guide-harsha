import test from "node:test";
import assert from "node:assert/strict";
import { readSavedView, viewUpdate, shouldRestoreSavedView } from "../src/savedView.ts";
import { createSavedViewStore } from "../src/savedViewStore.ts";
const view = { density: "comfortable", q: "travel", sort: "priceMinor", dir: "desc", size: 4 };
const storage = () => { const map = new Map(); return { getItem: k => map.get(k) ?? null, setItem: (k,v) => map.set(k,v), removeItem: k => map.delete(k) }; };
test("accept a valid snapshot and strip unrelated persisted fields", () => assert.deepEqual(readSavedView({...view,page:9,rows:["private"]}),view));
test("reject invalid persisted values", () => { for (const bad of [null, [], {}, {...view,size:500}, {...view,q:"x".repeat(61)}, {...view,sort:"secret"}]) assert.equal(readSavedView(bad),null); });
test("applying starts at page one", () => assert.deepEqual(viewUpdate(view),{q:view.q,sort:view.sort,dir:view.dir,size:view.size,page:1}));
test("saving copies data and independently created stores remain isolated", () => { const a=createSavedViewStore(storage()), b=createSavedViewStore(storage()); a.getState().save(view); view.q="edited later"; assert.equal(a.getState().saved.q,"travel"); assert.equal(b.getState().saved,null); view.q="travel"; });
test("rehydrate a saved view without restoring an action", () => { const disk=storage(); const a=createSavedViewStore(disk); a.getState().save(view); const b=createSavedViewStore(disk); assert.deepEqual(b.getState().saved,view); assert.equal(typeof b.getState().save,"function"); b.getState().clear(); assert.equal(b.getState().saved,null); });

test("any explicit managed parameter wins, even empty or invalid", () => { for (const search of ["?q=", "?q=studio", "?page=banana", "?sort=", "?dir=asc", "?size=2"]) assert.equal(shouldRestoreSavedView(search),false); });
test("no managed parameters permits restoration", () => { for (const search of ["", "?campaign=demo"]) assert.equal(shouldRestoreSavedView(search),true); });
