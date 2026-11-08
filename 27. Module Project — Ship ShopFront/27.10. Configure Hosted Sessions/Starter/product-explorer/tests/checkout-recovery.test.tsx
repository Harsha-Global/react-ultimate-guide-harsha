import { beforeEach, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import App from "../src/App";
import CheckoutPage from "../src/CheckoutPage";
import { CartProvider } from "../src/CartProvider";
import { queryClient } from "../src/queryClient";
import { productKeys } from "../src/productQueries";
import { placeOrder } from "../src/orderApi";
import type { Order } from "../shared/orderSchema";
vi.mock("../src/orderApi", () => ({ placeOrder: vi.fn() }));
vi.mock("../src/Auth", () => ({
  useAuth: () => ({ state: { status: "authenticated", user: { id: "member-1", name: "Alex Morgan", email: "alex@example.com", role: "member" } }, getVersion: () => 1, expireIfCurrent: vi.fn() }),
}));
const product = { id: "p1", name: "Everyday mug", category: "Home", price: 18, description: "A useful mug", inStock: true, maxQuantity: 3, image: "/assets/mug.jpg", features: [] };
const order: Order = { id: "saved-order", userId: "member-1", createdAt: "2026-10-01T10:00:00Z", subtotal: 36, deliveryFee: 0, items: 2, currency: "USD", lines: [{ name: product.name, quantity: 2, unitPrice: 18 }], note: "", fulfillment: { kind: "pickup", window: "morning" } };
beforeEach(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  queryClient.clear();
  vi.mocked(placeOrder).mockReset();
  localStorage.setItem("shopfront-cart-v1", JSON.stringify([{ productId: "p1", quantity: 2 }]));
  queryClient.setQueryData(productKeys.all(), { items: [product], total: 1, page: 1, pages: 1 });
});
it("keeps the bag and details after failure, then clears the bag only after a confirmed retry", async () => {
  vi.mocked(placeOrder).mockRejectedValueOnce(new Error("The order was not confirmed. Try again.")).mockResolvedValueOnce(order);
  const user = userEvent.setup();
  const router = createMemoryRouter([{ path: "/", Component: App, children: [{ path: "checkout", Component: CheckoutPage }] }], { initialEntries: ["/checkout"] });
  render(<QueryClientProvider client={queryClient}><CartProvider><RouterProvider router={router}/></CartProvider></QueryClientProvider>);
  await user.type(screen.getByRole("textbox", { name: "Full name" }), "Alex Morgan");
  await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
  await user.selectOptions(screen.getByRole("combobox", { name: "Delivery method" }), "pickup");
  await user.selectOptions(screen.getByRole("combobox", { name: "Collection window" }), "morning");
  await user.click(screen.getByRole("button", { name: "Place practice order" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("The order was not confirmed.");
  expect(screen.getByRole("textbox", { name: "Full name" })).toHaveValue("Alex Morgan");
  expect(within(screen.getByRole("complementary", { name: "Checkout summary" })).getByText("2 items")).toBeVisible();
  expect(screen.getByRole("button", { name: "Place practice order" })).toBeEnabled();
  await user.click(screen.getByRole("button", { name: "Place practice order" }));
  expect(await screen.findByRole("heading", { name: "Your practice order is confirmed." })).toBeVisible();
  expect(screen.getByRole("link", { name: "Your bag 0" })).toBeVisible();
  const calls = vi.mocked(placeOrder).mock.calls;
  expect(calls).toHaveLength(2);
  expect(calls[1][2]).toBe(calls[0][2]);
  expect(calls[1][1]).toEqual([{ productId: "p1", quantity: 2 }]);
});
