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

const productCopy = { ...selectedProduct, unitPrice: 20 };
console.log(`Original price: ${selectedProduct.unitPrice}`);
console.log(`Copy price: ${productCopy.unitPrice}`);
console.log(`Same object: ${productCopy === selectedProduct}`);