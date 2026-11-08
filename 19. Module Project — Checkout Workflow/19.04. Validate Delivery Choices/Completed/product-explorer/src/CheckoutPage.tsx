import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../shared/checkoutSchema";
import type { CheckoutInput, CheckoutValues } from "../shared/checkoutSchema";
import { useShop } from "./App";
import type { allProductsLoader } from "./loaders";
import { CheckoutSummary, hasCartIssue } from "./CheckoutSummary";
export default function CheckoutPage() {
  const { items: products } = useLoaderData<typeof allProductsLoader>();
  const { cart, delivery } = useShop();
  const [checkedEmail, setCheckedEmail] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<CheckoutInput, unknown, CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      contact: { name: delivery.name, email: delivery.email, phone: "" },
      address: { street: "", city: "", postal: "" },
      method: "standard",
      note: delivery.note,
    },
  });
  const method = useWatch({ control, name: "method" });
  useEffect(() => {
    if (isSubmitted)
      void trigger(["address.street", "address.city", "address.postal"]);
  }, [method, isSubmitted, trigger]);
  function submit(values: CheckoutValues) {
    setCheckedEmail(values.contact.email);
  }
  const cartBlocked = cart.length === 0 || hasCartIssue(cart, products);
  return (
    <>
      <title>Checkout | ShopFront</title>
      <Link className="back-link" to="/cart">
        ← Back to your bag
      </Link>
      <div className="page-heading">
        <p className="eyebrow">Made for your everyday</p>
        <h1 tabIndex={-1}>A thoughtful next step.</h1>
        <p>Your details, your delivery choice, and a clear summary.</p>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" noValidate onSubmit={handleSubmit(submit)}>
          <fieldset>
            <legend>01 / Contact details</legend>
            <p className="muted">
              Use sample details for this practice checkout.
            </p>
            <div className="checkout-field">
              <label htmlFor="contact-name">Full name</label>
              <input id="contact-name" type="text" autoComplete="name" {...register("contact.name")} aria-invalid={Boolean(errors.contact?.name)} aria-describedby={errors.contact?.name ? "contact-name-error" : undefined} />
              {errors.contact?.name && (
                <p id="contact-name-error" className="field-error">
                  {errors.contact?.name.message}
                </p>
              )}
            </div>
            <div className="checkout-field">
              <label htmlFor="contact-email">Email address</label>
              <input id="contact-email" type="email" autoComplete="email" {...register("contact.email")} aria-invalid={Boolean(errors.contact?.email)} aria-describedby={errors.contact?.email ? "contact-email-error" : undefined} />
              {errors.contact?.email && (
                <p id="contact-email-error" className="field-error">
                  {errors.contact?.email.message}
                </p>
              )}
            </div>
            <div className="checkout-field">
              <label htmlFor="contact-phone">Phone number, optional</label>
              <input id="contact-phone" type="tel" autoComplete="tel-national" {...register("contact.phone")} aria-invalid={Boolean(errors.contact?.phone)} aria-describedby={errors.contact?.phone ? "contact-phone-error" : undefined} />
              {errors.contact?.phone && (
                <p id="contact-phone-error" className="field-error">
                  {errors.contact?.phone.message}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset>
            <legend>02 / Delivery</legend>
            <label htmlFor="method">Delivery method</label>
            <select id="method" {...register("method")}>
              <option value="standard">Standard delivery · $5</option>
              <option value="express">Express delivery · $12</option>
              <option value="pickup">Studio pickup · free</option>
            </select>
            <p className="muted">
              {method === "pickup"
                ? "No delivery address is required for pickup."
                : "Enter a delivery address for this option."}
            </p>
            <div className="address-fields">
              <div className="checkout-field">
                <label htmlFor="address-street">Street address</label>
                <input id="address-street" type="text" autoComplete="street-address" {...register("address.street")} aria-invalid={Boolean(errors.address?.street)} aria-describedby={errors.address?.street ? "address-street-error" : undefined} />
                {errors.address?.street && (
                  <p id="address-street-error" className="field-error">
                    {errors.address?.street.message}
                  </p>
                )}
              </div>
              <div className="checkout-field">
                <label htmlFor="address-city">City</label>
                <input id="address-city" type="text" autoComplete="address-level2" {...register("address.city")} aria-invalid={Boolean(errors.address?.city)} aria-describedby={errors.address?.city ? "address-city-error" : undefined} />
                {errors.address?.city && (
                  <p id="address-city-error" className="field-error">
                    {errors.address?.city.message}
                  </p>
                )}
              </div>
              <div className="checkout-field">
                <label htmlFor="address-postal">ZIP code</label>
                <input id="address-postal" type="text" autoComplete="postal-code" {...register("address.postal")} aria-invalid={Boolean(errors.address?.postal)} aria-describedby={errors.address?.postal ? "address-postal-error" : undefined} />
                {errors.address?.postal && (
                  <p id="address-postal-error" className="field-error">
                    {errors.address?.postal.message}
                  </p>
                )}
              </div>
            </div>
            <label htmlFor="note">Delivery note, optional</label>
            <textarea id="note" {...register("note")} aria-invalid={Boolean(errors.note)} aria-describedby={errors.note ? "note-error" : undefined} />
            {errors.note && (
              <p id="note-error" className="field-error">
                {errors.note.message}
              </p>
            )}
          </fieldset>
          <div className="checkout-footer">
            <button disabled={cartBlocked} type="submit">
              Check details
            </button>
            <p className="muted">
              This checks the form in your browser. Nothing is sent to the service yet.
            </p>
            {cartBlocked && (
              <p className="field-error">
                Add available products and review their quantities before
                continuing.
              </p>
            )}
          </div>
          {checkedEmail && (
            <section className="checkout-confirmation" role="status">
              <h2>Last checked details</h2>
              <p>The form passed its checks for {checkedEmail}.</p>
              <p>This result describes your last check. No checkout draft has been saved.</p>
            </section>
          )}
        </form>
        <CheckoutSummary products={products} />
      </div>
    </>
  );
}