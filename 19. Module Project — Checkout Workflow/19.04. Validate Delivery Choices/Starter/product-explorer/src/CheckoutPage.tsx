import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
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
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput, unknown, CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      contact: { name: delivery.name, email: delivery.email, phone: "" },
    },
  });
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