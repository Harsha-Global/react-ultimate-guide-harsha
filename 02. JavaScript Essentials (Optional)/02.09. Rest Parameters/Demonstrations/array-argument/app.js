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

const getSelectionSummary = (label, ...items) => ({
  label,
  items,
  count: items.length
});

const grouped = getSelectionSummary("One argument", products);
console.log(grouped.count);
console.log(grouped.items.length);
console.log(grouped.items[0].length);
