import { useState } from "react";
import {
  Link,
  useLoaderData,
} from "react-router";
import type { productLoader } from "./loaders";
import type { ProductValues } from "./productForm";

export default function ProductEditor() {
  const product = useLoaderData<typeof productLoader>();
  return (
    <Editor
      key={product.id}
      initial={{
        name: product.name,
        category: product.category,
        price: String(product.price),
        description: product.description,
        inStock: product.inStock,
        maxQuantity: String(product.maxQuantity),
      }}
      image={product.image}
    />
  );
}
function Editor({ initial, image }: { initial: ProductValues; image: string }) {
  const [values, setValues] = useState(initial);
  function update<K extends keyof ProductValues>(
    field: K,
    value: ProductValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  return (
    <>
      <title>{"Edit " + initial.name + " | ShopFront"}</title>
      <Link className="back-link" to="/inventory">
        ← Back to inventory
      </Link>
      <div className="page-heading">
        <p className="eyebrow">Collection details</p>
        <h1 tabIndex={-1}>Edit {initial.name}</h1>
        <p>A clear description makes every choice easier.</p>
      </div>

      <form className="editor-layout" onSubmit={(event) => event.preventDefault()}>
        <aside className="editor-preview">
          <img src={image} alt={initial.name} width="420" height="420" />
          <p className="eyebrow">Product image</p>
          <p>Current collection photography.</p>
        </aside>
        <section className="editor-fields" aria-label="Product information">
          <fieldset>
            <legend>Product information</legend>
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              name="name"
              value={values.name}
              maxLength={80}
              onChange={(e) => update("name", e.target.value)}

            />
            <div className="field-row">
              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(e) => update("category", e.target.value)}

                >
                  <option>Home</option>
                  <option>Travel</option>
                  <option>Audio</option>
                </select>
              </div>
              <div>
                <label htmlFor="price">Price (USD)</label>
                <input
                  id="price"
                  name="price"
                  inputMode="decimal"
                  value={values.price}
                  onChange={(e) => update("price", e.target.value)}

                />
              </div>
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={values.description}
              maxLength={240}
              onChange={(e) => update("description", e.target.value)}

            />
            <label className="check-label">
              <input
                type="checkbox"
                name="inStock"
                checked={values.inStock}
                onChange={(e) => update("inStock", e.target.checked)}
              />
              Available to add to bag
            </label>
            <label htmlFor="maxQuantity">Maximum per bag</label>
            <input
              id="maxQuantity"
              name="maxQuantity"
              inputMode="numeric"
              value={values.maxQuantity}
              onChange={(e) => update("maxQuantity", e.target.value)}

              aria-describedby="quantity-hint"
            />
            <p id="quantity-hint" className="muted">
              Use 1 to 99 when available, or 0 when unavailable.
            </p>
            <div className="editor-actions">
              <button type="button" disabled>Save changes</button>
                <Link className="button secondary" to="/inventory">
                  Cancel
                </Link>
            </div>
          </fieldset>
        </section>
      </form>
    </>
  );
}
