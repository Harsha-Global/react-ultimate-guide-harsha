type CheckoutValues = Readonly<{
  contact: { name: string; email: string; phone: string };
  address: { street: string; city: string; postal: string };
  method: "standard" | "express" | "pickup";
  note: string;
}>;
type CartLine = Readonly<{ productId: string; quantity: number }>;
type CheckoutRequest = {
  method: "POST";
  headers: { "Content-Type": "application/json" };
  body: string;
};

function buildCheckoutRequest(details: CheckoutValues, cart: readonly CartLine[]): CheckoutRequest {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ details, cart })
  };
}
