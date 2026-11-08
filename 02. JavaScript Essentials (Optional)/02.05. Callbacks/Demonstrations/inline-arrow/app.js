const getLineTotal = (price, count = 1) => price * count;

const getDiscountedTotal = (price, count = 1) => getLineTotal(price, count) * 0.9;

const getLineSummary = (price, count = 1, calculatePrice = getLineTotal) => ({
  count: count,
  total: calculatePrice(price, count)
});

const productName = "Travel Backpack";
const unitPrice = 25;
let quantity = 2;

console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

quantity = 3;
console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

console.log(`Single item: ${getLineTotal(unitPrice)}`);

const summary = getLineSummary(unitPrice, quantity, getLineTotal);
console.log(`Summary: ${summary.count} items, total ${summary.total}`);

const discountedSummary = getLineSummary(unitPrice, quantity, getDiscountedTotal);
console.log(`Discounted summary: ${discountedSummary.count} items, total ${discountedSummary.total}`);

const inlineSummary = getLineSummary(unitPrice, quantity, (price, count) => getLineTotal(price, count) * 0.9);
console.log(`Inline summary: ${inlineSummary.count} items, total ${inlineSummary.total}`);
