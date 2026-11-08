import test from 'node:test';
import assert from 'node:assert/strict';
import { formatMoney, formatInstant } from '../src/displayFormats.ts';
test('USD and INR use hundredths, JPY uses whole units', () => {
  for (const [minor,currency,amount] of [[12345,'USD',123.45],[12345,'INR',123.45],[12345,'JPY',12345],[0,'USD',0]])
    assert.equal(formatMoney(minor,currency,'en-US'),new Intl.NumberFormat('en-US',{style:'currency',currency}).format(amount));
});
test('locale changes presentation, not currency or amount', () => {
  assert.equal(formatMoney(8900,'USD','de-DE'),new Intl.NumberFormat('de-DE',{style:'currency',currency:'USD'}).format(89));
  assert.notEqual(formatMoney(8900,'USD','de-DE'),formatMoney(8900,'USD','en-US'));
});
test('invalid monetary values never become misleading prices', () => {
  for (const value of [-1,1.5,NaN,Infinity,Number.MAX_SAFE_INTEGER+1]) assert.equal(formatMoney(value,'USD','en-US'),'—');
});
test('one UTC instant crosses the local date boundary without changing the source', () => {
  const instant = new Date('2027-01-15T00:30:00Z');
  const parts = (zone) => Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,day:'numeric',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(instant).map(p=>[p.type,p.value]));
  assert.equal(parts('UTC').day,'15');assert.equal(parts('Asia/Kolkata').hour,'06');
  assert.equal(parts('America/New_York').day,'14');assert.equal(parts('America/New_York').hour,'19');
  assert.notEqual(formatInstant(instant,'en-US','UTC'),formatInstant(instant,'en-US','America/New_York'));
  assert.equal(instant.toISOString(),'2027-01-15T00:30:00.000Z');
  assert.equal(formatInstant(new Date(NaN),'en-US','UTC'),'—');
});
test('named zone applies seasonal offset; fixed subtraction would not', () => {
  const winter=formatInstant(new Date('2027-01-15T00:30:00Z'),'en-US','America/New_York');
  const summer=formatInstant(new Date('2027-07-15T00:30:00Z'),'en-US','America/New_York');
  assert.match(winter,/19:30/);assert.match(summer,/20:30/);
});
