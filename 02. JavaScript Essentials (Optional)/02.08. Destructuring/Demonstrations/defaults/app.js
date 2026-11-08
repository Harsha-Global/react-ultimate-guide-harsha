const productDetails = { name: "Desk Lamp", unitPrice: 0, category: null };
const { name: displayName, unitPrice: price = 15, category = "General", shippingNote = "Collection available" } = productDetails;
console.log(displayName);
console.log(price);
console.log(category);
console.log(shippingNote);
console.log(productDetails.shippingNote);

const [firstLabel, secondLabel = "No second label"] = ["Travel Backpack"];
console.log(firstLabel);
console.log(secondLabel);
