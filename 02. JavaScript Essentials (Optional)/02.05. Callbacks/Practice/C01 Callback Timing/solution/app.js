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

const getSaleSummary = (price, count = 1, calculatePrice = getDiscountedTotal) =>
  getLineSummary(price, count, calculatePrice);

const saleSummary = getSaleSummary(30, 2);
console.log(`Sale summary: ${saleSummary.count} items, total ${saleSummary.total}`);
