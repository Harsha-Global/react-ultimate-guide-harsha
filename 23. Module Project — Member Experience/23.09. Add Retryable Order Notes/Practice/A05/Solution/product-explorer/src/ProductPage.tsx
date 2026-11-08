import { useQuery } from "@tanstack/react-query";
import { productOptions } from "./productQueries";
import { QueryFeedback } from "./QueryFeedback";
import { Link, useLoaderData, useLocation } from "react-router";
import type { productLoader } from "./loaders";
import { useState } from "react";
import { useShop } from "./App";
export default function ProductPage() {
    const { id } = useLoaderData<typeof productLoader>();
    const query = useQuery(productOptions(id));
    const product = query.data;
    const { cart, add } = useShop();
    const { search } = useLocation();
    const [message, setMessage] = useState("");
    if (!product)
        return <QueryFeedback query={query}/>;
    const quantity = cart.find((line) => line.productId === product.id)?.quantity ?? 0;
    const canAdd = product.inStock && quantity < product.maxQuantity;
    return (<>
      <title>{product.name} | ShopFront</title>
      <Link className="back-link" to={`/${search}`}>
        ← Back to collection
      </Link>
      <QueryFeedback query={query}/>
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} width="720" height="720"/>
        </div>
        <section className="detail-copy">
          <p className="eyebrow">The {product.category.toLowerCase()} edit</p>
          <h1 tabIndex={-1}>{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          {product.features.length > 0 && (<ul className="detail-features">
              {product.features.map((feature, index) => (<li key={index}>{feature.text}</li>))}
            </ul>)}
          <p className={product.inStock ? "availability" : "availability unavailable"}>
            {product.inStock
            ? "In stock · Ready for your everyday"
            : "Currently unavailable"}
          </p>
          <button className="wide" disabled={!canAdd} onClick={() => {
            add(product);
            setMessage(`${product.name} added to your bag.`);
        }}>
            {!product.inStock
            ? "Currently unavailable"
            : !canAdd
                ? "Bag limit reached"
                : "Add to bag"}
          </button>
          <p className="muted">
            Limit {product.maxQuantity} per bag. Availability can change.
          </p>
          <p className="feedback" role="status">
            {message}
          </p>
          <div className="detail-footnote">
            <strong>Considered from the start.</strong>
            <p>Simple, useful essentials selected for the way you live.</p>
          </div>
        </section>
      </div>
    </>);
}
