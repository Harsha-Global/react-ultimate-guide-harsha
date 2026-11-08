const name = "Travel Backpack";
const unitPrice = 25;
const stockKey = "inStock";

const product = {
  id: "p1",
  name,
  unitPrice,
  [stockKey]: true
};

console.log(product.name);
console.log(product[stockKey]);
console.log(product.stockKey);
console.log(product.missingProperty);
