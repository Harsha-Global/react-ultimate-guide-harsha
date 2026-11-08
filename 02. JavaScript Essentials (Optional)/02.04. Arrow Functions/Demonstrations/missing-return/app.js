const getLineTotal = (price, count = 1) => {
  price * count;
};

const productName = "Travel Backpack";
const unitPrice = 25;
let quantity = 2;

console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

quantity = 3;
console.log(`${productName} x ${quantity}: ${getLineTotal(unitPrice, quantity)}`);

console.log(`Single item: ${getLineTotal(unitPrice)}`);
