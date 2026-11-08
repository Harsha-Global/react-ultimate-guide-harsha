type PricingRule = (subtotal: number) => number;

const studentRule: PricingRule = (subtotal) => {
  // Return eighty percent of the subtotal.
  return 0;
};

function priceTickets(price: number, count: number, rule: PricingRule): number {
  // Calculate the subtotal, call the rule once, and return its result.
  return 0;
}

console.log(priceTickets(12, 2, studentRule));
console.log(priceTickets(12, 2, (subtotal) => subtotal));
