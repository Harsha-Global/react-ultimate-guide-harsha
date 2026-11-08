const items = [
  { unitPrice: 18, count: 4 },
  { unitPrice: 12, count: 3 }
];
const total = items.reduce((runningTotal, item, index) => {
  const lineTotal = item.unitPrice * item.count;
  const nextTotal = runningTotal + lineTotal;
  console.log(`Index ${index}: ${runningTotal} + ${lineTotal} = ${nextTotal}`);
  return nextTotal;
}, 0);
console.log(`Returned total: ${total}`);
