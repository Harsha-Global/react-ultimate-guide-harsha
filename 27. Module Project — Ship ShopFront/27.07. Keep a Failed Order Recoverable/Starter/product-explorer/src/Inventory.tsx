import { useQuery } from "@tanstack/react-query";
import { allProductsOptions } from "./productQueries";
import { QueryFeedback } from "./QueryFeedback";
import { Link, useSearchParams } from "react-router";
import DeleteProduct from "./DeleteProduct";
export default function Inventory() {
    const query = useQuery(allProductsOptions());
    const products = query.data?.items ?? [];
    const [search] = useSearchParams();
    if (!query.data)
        return <QueryFeedback query={query}/>;
    return (<>
      <QueryFeedback query={query}/>
      <title>Inventory | ShopFront</title>
      <div className="page-heading">
        <p className="eyebrow">ShopFront studio</p>
        <h1 tabIndex={-1}>Your collection, cared for.</h1>
        <p>Keep product information clear, useful and up to date.</p>
      </div>
      {search.has("saved") && (<p className="success" role="status">
          Product changes saved.
        </p>)}
      <section className="inventory-panel">
        <div className="inventory-heading">
          <h2>Products</h2>
          <span role="status">{products.length} in your collection</span>
        </div>
        <ul className="inventory-list">
          {products.map((p) => (<li key={p.id}>
              <img src={p.image} alt="" width="80" height="80"/>
              <div className="inventory-name">
                <h3>{p.name}</h3>
                <p>
                  {p.category} · {p.id}
                </p>
              </div>
              <span className="price">${p.price.toFixed(2)}</span>
              <span className={p.inStock ? "availability" : "availability unavailable"}>
                {p.inStock ? "In stock" : "Unavailable"}
              </span>
              <Link className="button secondary" to={`/inventory/${p.id}/edit`}>
                Edit {p.name}
              </Link>
              <DeleteProduct product={p}/>
            </li>))}
        </ul>
        {products.length === 0 && (<p className="empty-state">Your collection is empty.</p>)}
      </section>
      <p className="muted">
        Local inventory workspace for this course project.
      </p>
    </>);
}
