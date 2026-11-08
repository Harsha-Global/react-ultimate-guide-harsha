import { describe, expect, it } from "vitest";
import { addToCart, changeCartQuantity, removeFromCart } from "../src/cart";
import type { Product } from "../src/types";
const product: Product = { id: "p1", name: "Everyday mug", category: "Home", price: 18, description: "A useful mug", inStock: true, maxQuantity: 3, image: "/assets/mug.jpg", features: [] };
describe("cart quantity rules", () => {
  it("adds one item below the limit without changing the previous line", () => {
    const previous = Object.freeze([Object.freeze({ productId: "p1", quantity: 2 })]);
    expect(addToCart(previous, product)).toEqual([{ productId: "p1", quantity: 3 }]);
    expect(previous[0].quantity).toBe(2);
  });
  it("refuses another item at the exact limit", () => {
    expect(addToCart([{ productId: "p1", quantity: 3 }], product)).toEqual([{ productId: "p1", quantity: 3 }]);
  });
  it.each([0, -1, 1.5, 4, NaN])("refuses invalid quantity %s", quantity => {
    const previous = [{ productId: "p1", quantity: 2 }];
    expect(changeCartQuantity(previous, product, quantity)).toEqual(previous);
  });
  it("does not add an unavailable product", () => {
    expect(addToCart([], { ...product, inStock: false })).toEqual([]);
  });
  it("removes only the requested product", () => {
    const previous = [{ productId: "p1", quantity: 2 }, { productId: "p2", quantity: 1 }];
    expect(removeFromCart(previous, "p1")).toEqual([{ productId: "p2", quantity: 1 }]);
    expect(previous).toHaveLength(2);
  });
});
