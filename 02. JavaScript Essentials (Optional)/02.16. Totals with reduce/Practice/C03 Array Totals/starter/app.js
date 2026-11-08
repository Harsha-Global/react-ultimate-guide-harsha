const calculateBasketTotal = items => {
  // Build the total calculation here.
  return 0;
};

const items = [
  { id: "p2", unitPrice: 18, count: 4 },
  { id: "p3", unitPrice: 12, count: 3 }
];
console.log(`Basket total: ${calculateBasketTotal(items)}`);
console.log(`Empty total: ${calculateBasketTotal([])}`);
console.log(`Original counts: ${items[0].count}, ${items[1].count}`);
