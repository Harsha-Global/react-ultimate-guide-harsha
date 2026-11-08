type PricingRule = (subtotal: number) => number;

const studentRule: PricingRule = (subtotal) => subtotal * 0.8;

function priceTickets(price: number, count: number, rule: PricingRule): number {
  const subtotal = price * count;
  return rule(subtotal);
}

console.log(priceTickets(12, 2, studentRule));
console.log(priceTickets(12, 2, (subtotal) => subtotal));
