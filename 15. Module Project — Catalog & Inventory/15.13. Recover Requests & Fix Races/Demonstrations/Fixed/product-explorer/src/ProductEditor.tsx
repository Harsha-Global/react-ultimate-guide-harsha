import { useEffect, useRef, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import type { productLoader } from "./loaders";
import type { saveProductAction } from "./actions";
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
  const result = useActionData<typeof saveProductAction>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const pending = navigation.state !== "idle";
  function update<K extends keyof ProductValues>(
    field: K,
    value: ProductValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }
  useEffect(() => {
    if (result)
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid=true], [role=alert]")
        ?.focus();
  }, [result]);
  const errorFor = (field: keyof ProductValues) => result?.errors[field];
  return (
    <>
      <title>Edit {initial.name} | ShopFront</title>
      <Link className="back-link" to="/inventory">
        ← Back to inventory
      </Link>
      <div className="page-heading">
        <p className="eyebrow">Collection details</p>
        <h1 tabIndex={-1}>Edit {initial.name}</h1>
        <p>A clear description makes every choice easier.</p>
      </div>

      <Form ref={formRef} method="post" className="editor-layout" noValidate>
        <aside className="editor-preview">
          <img src={image} alt={initial.name} width="420" height="420" />
          <p className="eyebrow">Product image</p>
          <p>Current collection photography.</p>
        </aside>
        <section className="editor-fields" aria-label="Product information">
          {result?.message && (
            <p className="field-error error-summary" role="alert" tabIndex={-1}>
              {result.message}
            </p>
          )}
          <fieldset disabled={pending}>
            <legend>Product information</legend>
            <label htmlFor="product-name">Product name</label>
            <input
              id="product-name"
              name="name"
              value={values.name}
              maxLength={80}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errorFor("name"))}
              aria-describedby={errorFor("name") ? "name-error" : undefined}
            />
            {errorFor("name") && (
              <p className="field-error" id="name-error">
                {errorFor("name")}
              </p>
            )}
            <div className="field-row">
              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(e) => update("category", e.target.value)}
                  aria-invalid={Boolean(errorFor("category"))}
                  aria-describedby={
                    errorFor("category") ? "category-error" : undefined
                  }
                >
                  <option>Home</option>
                  <option>Travel</option>
                  <option>Audio</option>
                </select>
                {errorFor("category") && (
                  <p className="field-error" id="category-error">
                    {errorFor("category")}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="price">Price (USD)</label>
                <input
                  id="price"
                  name="price"
                  inputMode="decimal"
                  value={values.price}
                  onChange={(e) => update("price", e.target.value)}
                  aria-invalid={Boolean(errorFor("price"))}
                  aria-describedby={
                    errorFor("price") ? "price-error" : undefined
                  }
                />
                {errorFor("price") && (
                  <p className="field-error" id="price-error">
                    {errorFor("price")}
                  </p>
                )}
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
              aria-invalid={Boolean(errorFor("description"))}
              aria-describedby={
                errorFor("description") ? "description-error" : undefined
              }
            />
            {errorFor("description") && (
              <p className="field-error" id="description-error">
                {errorFor("description")}
              </p>
            )}
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
              aria-invalid={Boolean(errorFor("maxQuantity"))}
              aria-describedby="quantity-hint quantity-error"
            />
            <p id="quantity-hint" className="muted">
              Use 1 to 99 when available, or 0 when unavailable.
            </p>
            <p id="quantity-error" className="field-error">
              {errorFor("maxQuantity")}
            </p>
            <div className="editor-actions">
              <button type="submit">
                {pending ? "Saving changes…" : "Save changes"}
              </button>
              {!pending && (
                <Link className="button secondary" to="/inventory">
                  Cancel
                </Link>
              )}
            </div>
          </fieldset>
          <p role="status">{pending ? "Saving your product changes." : ""}</p>
        </section>
      </Form>
    </>
  );
}
