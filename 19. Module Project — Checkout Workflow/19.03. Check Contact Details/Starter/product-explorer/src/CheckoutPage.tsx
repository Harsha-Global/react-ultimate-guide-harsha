import { Link, useLoaderData } from "react-router";
import type { allProductsLoader } from "./loaders";
import { CheckoutSummary } from "./CheckoutSummary";
export default function CheckoutPage() {
  const { items: products } = useLoaderData<typeof allProductsLoader>();
  return (
    <>
      <title>Review your bag | ShopFront</title>
      <Link className="back-link" to="/cart">
        ← Back to your bag
      </Link>
      <div className="page-heading">
        <p className="eyebrow">Made for your everyday</p>
        <h1 tabIndex={-1}>Check your choices.</h1>
        <p>A final look at the useful things you have chosen.</p>
      </div>
      <div className="checkout-review">
        <div className="checkout-story">
          <span className="story-number">02 /</span>
          <h2>A little more considered.</h2>
          <p>
            Adjust your quantities here. Your bag stays with you as you move
            through the collection.
          </p>
          <Link to="/">Keep exploring the collection</Link>
        </div>
        <CheckoutSummary products={products} />
      </div>
    </>
  );
}