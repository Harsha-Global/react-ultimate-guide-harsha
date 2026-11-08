import assert from "node:assert/strict";
import { isLowStock } from "../src/stockStatus.ts";
const cases = [["zero remains unavailable",0,5,false],["ordinary low stock",3,5,true],["equal threshold is low",5,5,true],["larger custom threshold",8,10,true],["lower threshold removes warning",3,2,false],["zero threshold accepts positive stock",1,0,false]];
let failed=0;
for (const [name,stock,level,expected] of cases) { try { assert.equal(isLowStock(stock,level),expected); console.log(`PASS ${name}`); } catch { failed++;console.error(`FAIL ${name}: stock=${stock}, level=${level}, expected=${expected}`); } }
console.log(`${cases.length-failed} passed; ${failed} failed.`);if(failed)process.exitCode=1;
