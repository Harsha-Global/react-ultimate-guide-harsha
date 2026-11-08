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
const first = products.find(item => {
  console.log(`Inspect ${item.id}`);
  return item.unitPrice < 20;
});
console.log(first.name);
const all = products.filter(item => {
  console.log(`Inspect ${item.id}`);
  return item.unitPrice < 20;
});
console.log(all.length);
