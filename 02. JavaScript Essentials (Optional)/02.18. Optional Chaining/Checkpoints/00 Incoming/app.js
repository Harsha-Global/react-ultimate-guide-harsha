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

const extraProducts = [
    { id: "p4", name: "Packing Cube", unitPrice: 8, inStock: true }
];
const combinedProducts = [...products, ...extraProducts];
console.log(`Counts: ${products.length}, ${combinedProducts.length}`);
console.log(`Last combined item: ${combinedProducts[3].name}`);

const productListCopy = [...products];
console.log(`Same array: ${productListCopy === products}`);
console.log(`Same second object: ${productListCopy[1] === products[1]}`);

const allSelection = getSelectionSummary("All products", ...products);
console.log(`${allSelection.label}: ${allSelection.count} products`);

const deliveryProduct = {
    ...selectedProduct,
    delivery: { city: "Hyderabad", fee: 40 },
    tags: ["lighting", "desk"]
};

const updatedProduct = {
    ...deliveryProduct,
    delivery: {
        ...deliveryProduct.delivery,
        city: "Pune"
    }
};

console.log(`Original city: ${deliveryProduct.delivery.city}`);
console.log(`Updated city: ${updatedProduct.delivery.city}`);
console.log(`Delivery fee kept: ${updatedProduct.delivery.fee}`);
console.log(`Product name kept: ${updatedProduct.name}`);
console.log(`Same product object: ${updatedProduct === deliveryProduct}`);
console.log(`Same delivery object: ${updatedProduct.delivery === deliveryProduct.delivery}`);
console.log(`Same tags array: ${updatedProduct.tags === deliveryProduct.tags}`);

const displayProducts = products.map((item, index) => ({
    id: item.id,
    label: `${index + 1}. ${item.name}`,
    total: getLineTotal(item.unitPrice, 2)
}));

console.log(`Display count: ${displayProducts.length}`);
console.log(`First display: ${displayProducts[0].label}, total ${displayProducts[0].total}`);
console.log(`Second display: ${displayProducts[1].label}, total ${displayProducts[1].total}`);
console.log(`Third display: ${displayProducts[2].label}, total ${displayProducts[2].total}`);
console.log(`Same array: ${displayProducts === products}`);
console.log(`Same first object: ${displayProducts[0] === products[0]}`);
console.log(`Original display label: ${products[0].label}`);

const availableProducts = products.filter(item => item.inStock);
console.log(`Available count: ${availableProducts.length}`);
console.log(`Available product: ${availableProducts[0].name}`);
console.log(`Same available object: ${availableProducts[0] === products[1]}`);

const affordableProducts = products.filter(item => item.unitPrice < 20);
const firstAffordable = products.find(item => item.unitPrice < 20);
console.log(`Affordable count: ${affordableProducts.length}`);
console.log(`First affordable: ${firstAffordable.name}`);

const noAffordableProducts = products.filter(item => item.unitPrice < 5);
const missingProduct = products.find(item => item.id === "p9");
console.log(`No matches: ${noAffordableProducts.length}`);
console.log(missingProduct);

if (missingProduct === undefined) {
    console.log("No matching product");
} else {
    console.log(missingProduct.name);
}

const basket = [
    { ...products[0], count: 2 },
    { ...products[1], count: 1 }
];

const addedBasket = [...basket, { ...products[2], count: 3 }];

const changeCount = (items, id, count) => items.map(item => {
    if (item.id === id) {
        return { ...item, count };
    }
    return item;
});

const updatedBasket = changeCount(addedBasket, "p2", 4);
const removedBasket = updatedBasket.filter(item => item.id !== "p1");

console.log(`Basket counts: ${basket.length}, ${addedBasket.length}, ${updatedBasket.length}, ${removedBasket.length}`);
console.log(`Lamp quantities: ${addedBasket[1].count}, ${updatedBasket[1].count}`);
console.log(`New updated array: ${updatedBasket === addedBasket}`);
console.log(`Changed item shared: ${updatedBasket[1] === addedBasket[1]}`);
console.log(`Unchanged item shared: ${updatedBasket[0] === addedBasket[0]}`);
console.log(`Remaining IDs: ${removedBasket[0].id}, ${removedBasket[1].id}`);
console.log(`Remaining totals: ${getLineTotal(removedBasket[0].unitPrice, removedBasket[0].count)}, ${getLineTotal(removedBasket[1].unitPrice, removedBasket[1].count)}`);

const getBasketTotal = items => items.reduce(
    (total, item) => total + getLineTotal(item.unitPrice, item.count),
    0
);

console.log(`Original basket total: ${getBasketTotal(basket)}`);
console.log(`Added basket total: ${getBasketTotal(addedBasket)}`);
console.log(`Updated basket total: ${getBasketTotal(updatedBasket)}`);
console.log(`Remaining basket total: ${getBasketTotal(removedBasket)}`);
console.log(`Empty basket total: ${getBasketTotal([])}`);

const sortedProducts = [...products].sort(
    (left, right) => left.unitPrice - right.unitPrice
);

console.log(`Original first: ${products[0].name}`);
console.log(`Sorted first: ${sortedProducts[0].name}, ${sortedProducts[0].unitPrice}`);
console.log(`Sorted middle: ${sortedProducts[1].name}, ${sortedProducts[1].unitPrice}`);
console.log(`Sorted last: ${sortedProducts[2].name}, ${sortedProducts[2].unitPrice}`);
console.log(`Same sorted array: ${sortedProducts === products}`);
console.log(`Same bottle object: ${sortedProducts[0] === products[2]}`);