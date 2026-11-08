const getLineTotal = (price, count = 1) => price * count;

const getSelectionSummary = (label, ...items) => ({
  label,
  items,
  count: items.length
});

const products = [
  { id: "p1", name: "Travel Backpack", unitPrice: 30, inStock: false },
  { id: "p2", name: "Desk Lamp", unitPrice: 18, inStock: true },
  { id: "p3", name: "Water Bottle", unitPrice: 12, inStock: false }
];

const [featuredProduct, selectedProduct, lastProduct] = products;
const labels = products.map(item => {
  item.name;
});
console.log(labels.length);
console.log(labels[0]);
const correctedLabels = products.map(item => {
  return item.name;
});
console.log(correctedLabels[0]);
