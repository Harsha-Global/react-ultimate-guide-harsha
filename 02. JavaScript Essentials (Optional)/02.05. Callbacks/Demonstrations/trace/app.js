const getLineTotal = (price, count = 1) => price * count;

const getDiscountedTotal = (price, count = 1) => {
  console.log("Discount calculated");
  return getLineTotal(price, count) * 0.9;
};

const getLineSummary = (price, count = 1, calculatePrice = getLineTotal) => {
  console.log("Summary started");
  const total = calculatePrice(price, count);
  console.log("Summary completed");
  return { count: count, total: total };
};

console.log("Before summary");
const summary = getLineSummary(25, 3, getDiscountedTotal);
console.log(`After summary: ${summary.total}`);
