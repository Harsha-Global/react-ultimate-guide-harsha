const getLineTotal = (price, count = 1) => price * count;

const getDiscountedTotal = (price, count = 1) => getLineTotal(price, count) * 0.9;

const getLineSummary = (price, count = 1, calculatePrice = getLineTotal) => ({
    count,
    total: calculatePrice(price, count)
});

const name = "Travel Backpack";
const unitPrice = 25;
const stockKey = "inStock";

const product = {
    id: "p1",
    name,
    unitPrice,
    [stockKey]: true
};

let quantity = 2;

console.log(
    `${product.name} x ${quantity}: ${getLineTotal(product.unitPrice, quantity)}`
);

quantity = 3;
console.log(
    `${product.name} x ${quantity}: ${getLineTotal(product.unitPrice, quantity)}`
);

console.log(`Single item: ${getLineTotal(product.unitPrice)}`);
const summary = getLineSummary(product.unitPrice, quantity, getLineTotal);
console.log(`Summary: ${summary.count} items, total ${summary.total}`);

const discountedSummary = getLineSummary(product.unitPrice, quantity, getDiscountedTotal);
console.log(`Discounted summary: ${discountedSummary.count} items, total ${discountedSummary.total}`);

console.log(`Available: ${product[stockKey]}`);

product.unitPrice = 30;
product[stockKey] = false;
console.log(`Updated: ${product.name} x ${quantity}: ${getLineTotal(product.unitPrice, quantity)}`);
console.log(`Available now: ${product[stockKey]}`);

const products = [
    product,
    { id: "p2", name: "Desk Lamp", unitPrice: 15, inStock: true },
    { id: "p3", name: "Water Bottle", unitPrice: 12, inStock: false }
];

console.log(`Product count: ${products.length}`);
console.log(`First product: ${products[0].name}`);
console.log(`Last product: ${products[products.length - 1].name}`);

const [featuredProduct, selectedProduct, lastProduct] = products;
const { name: selectedName, unitPrice: selectedPrice, category = "General" } = selectedProduct;
const selectedSummary = getLineSummary(selectedPrice, 2);
console.log(`Selected: ${selectedName} x 2: ${selectedSummary.total}`);
console.log(`Category: ${category}`);
console.log(`Featured: ${featuredProduct.name}; last: ${lastProduct.name}`);

const getSelectionSummary = (label, ...items) => ({
    label,
    items,
    count: items.length
});

const selection = getSelectionSummary("Featured picks", featuredProduct, selectedProduct);
console.log(`${selection.label}: ${selection.count} products`);

const emptySelection = getSelectionSummary("No selection");
console.log(`${emptySelection.label}: ${emptySelection.count} products`);