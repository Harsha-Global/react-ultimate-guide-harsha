const getLineTotal = (price, count = 1) => price * count;

const getLineSummary = (price, count = 1) => ({
  count: count,
  total: getLineTotal(price, count)
});

const productName = "Travel Backpack";
const unitPrice = 25;
let quantity = 2;

console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

quantity = 3;
console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

console.log(`Single item: ${getLineTotal(unitPrice)}`);

const summary = getLineSummary(unitPrice, quantity);
console.log(`Summary: ${summary.count} items, total ${summary.total}`);
