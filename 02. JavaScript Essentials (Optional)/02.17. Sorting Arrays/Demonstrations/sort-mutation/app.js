const prices = [30, 18, 12];
const sorted = prices.sort((left, right) => left - right);
console.log(`Original first: ${prices[0]}`);
console.log(`Same array: ${sorted === prices}`);
