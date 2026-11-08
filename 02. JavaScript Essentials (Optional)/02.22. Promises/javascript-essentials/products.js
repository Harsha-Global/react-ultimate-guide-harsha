export const products = [
  { id: "p1", name: "Travel Backpack", unitPrice: 30, inStock: false },
  { id: "p2", name: "Desk Lamp", unitPrice: 18, inStock: true },
  { id: "p3", name: "Water Bottle", unitPrice: 12, inStock: false }
];

const removedBasket = [
    { ...products[1], count: 4 },
    { ...products[2], count: 3 }
];

export { removedBasket as basket };