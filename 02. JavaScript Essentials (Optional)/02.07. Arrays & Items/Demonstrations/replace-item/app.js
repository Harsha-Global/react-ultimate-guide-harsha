const name = "Travel Backpack";
const unitPrice = 25;
const stockKey = "inStock";

const product = {
  id: "p1",
  name,
  unitPrice,
  [stockKey]: true
};

const products = [
  product,
  { id: "p2", name: "Desk Lamp", unitPrice: 15, inStock: true },
  { id: "p3", name: "Water Bottle", unitPrice: 12, inStock: false }
];

products[1] = { id: "p2", name: "Reading Lamp", unitPrice: 18, inStock: true };
console.log(products[1].name);
console.log(products.length);
