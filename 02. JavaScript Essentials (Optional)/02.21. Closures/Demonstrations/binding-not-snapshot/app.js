let rate = 0.1;
const applyDiscount = total => total * (1 - rate);
console.log(`Before change: ${applyDiscount(100)}`);
rate = 0.2;
console.log(`After change: ${applyDiscount(100)}`);
