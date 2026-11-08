import { queryClient } from "./queryClient";
import { useQuery, useMutation, useIsMutating } from "@tanstack/react-query";
import { productOptions, productKeys } from "./productQueries";
import { QueryFeedback } from "./QueryFeedback";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "../shared/productSchema";
import type { ProductFormInput, ProductFormValues } from "../shared/productSchema";
import type { productLoader } from "./loaders";
import type { Product } from "./types";
import { saveProduct, ApiError } from "./api";
import { ProductImageUpload } from "./ProductImageUpload";
import { UnsavedChanges } from "./UnsavedChanges";
export const toProductForm = (product: Product): ProductFormInput => ({
  ...product,
  price: String(product.price),
  maxQuantity: String(product.maxQuantity),
  features: product.features.map((feature) => ({ ...feature })),
});
export default function ProductEditor() {
  const { id } = useLoaderData<typeof productLoader>();
  const query = useQuery(productOptions(id));
  if (!query.data) return <QueryFeedback query={query} />;
  return (
    <>
      <QueryFeedback query={query} />
      <Editor key={id} product={query.data} />
    </>
  );
}
function Editor({ product }: { product: Product }) {
  const [uploading, setUploading] = useState(false);
  const [fileKey, setFileKey] = useState(0);
  const [message, setMessage] = useState("");
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setFocus,
    setValue,
    clearErrors,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: "onTouched",
    defaultValues: toProductForm(product),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });
  const image = useWatch({ control, name: "image" });
  const writeKey = ["product-write", product.id] as const;
  const activeWrites = useIsMutating({ mutationKey: writeKey, exact: true });
  const mutation = useMutation({
    mutationKey: writeKey,
    retry: false,
    mutationFn: (values: ProductFormValues) => saveProduct(product.id, values),
    onMutate: async (values) => {
      const key = productKeys.detail(product.id);
      await queryClient.cancelQueries({ queryKey: key, exact: true });
      const previous = queryClient.getQueryData<Product>(key);
      if (previous)
        queryClient.setQueryData(key, {
          ...previous,
          ...values,
          features: values.features.map((feature) => ({ ...feature })),
        });
      return { previous };
    },
    onError: (error, _values, snapshot) => {
      if (snapshot?.previous)
        queryClient.setQueryData(
          productKeys.detail(product.id),
          snapshot.previous,
        );
      showError(error);
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(productKeys.detail(saved.id), saved);
      reset(toProductForm(saved));
      setFileKey((key) => key + 1);
      setMessage("Product changes saved.");
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
  });
  const busy = isSubmitting || uploading || activeWrites > 0;
  useEffect(() => {
    if (!busy && errors.name?.type === "server") setFocus("name");
    else if (!busy && errors.price?.type === "server") setFocus("price");
  }, [busy, errors.name, errors.price, setFocus]);
  function showError(error: unknown) {
    if (error instanceof ApiError) {
      for (const name of ["name", "price"] as const) {
        if (error.errors[name])
          setError(name, { type: "server", message: error.errors[name] });
      }
    }
    setError("root.server", {
      message:
        error instanceof Error
          ? error.message
          : "The product could not be saved.",
    });
  }
  async function submit(values: ProductFormValues) {
    if (activeWrites > 0) return;
    clearErrors();
    setMessage("");
    try {
      await mutation.mutateAsync(values);
    } catch {
      /* onError has restored the cache and supplied form feedback. */
    }
  }

  return (
    <>
      <title>Edit product | ShopFront</title>
      <Link className="back-link" to="/inventory">
        ← Back to inventory
      </Link>
      <div className="page-heading">
        <p className="eyebrow">Collection details</p>
        <h1 tabIndex={-1}>Make every detail count.</h1>
        <p>A clear description makes every choice easier.</p>
      </div>
      <UnsavedChanges dirty={isDirty} busy={busy} />
      <form className="editor-layout" noValidate onSubmit={handleSubmit(submit)}>
        <aside className="editor-preview">
          <img src={product.image} alt={product.name} width="420" height="420" />
          <p className="eyebrow">Catalog preview</p>
          <h2>{product.name}</h2>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p>
            {activeWrites > 0
              ? "Showing your change while the save is pending."
              : "Saved catalog details. Your editable draft is shown beside them."}
          </p>
        </aside>
        <section className="editor-fields" aria-label="Product information">
          {errors.root?.server && (
            <p role="alert" className="field-error error-summary">
              {errors.root.server.message}
            </p>
          )}
          <fieldset disabled={busy}>
            <legend>Product information</legend>
            <label htmlFor="product-name">Product name</label>
            <input id="product-name" {...register("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && (
              <p id="name-error" className="field-error">
                {errors.name.message}
              </p>
            )}
            <label htmlFor="product-price">Price (USD)</label>
            <input id="product-price" {...register("price")} aria-invalid={Boolean(errors.price)} aria-describedby={errors.price ? "price-error" : undefined} />
            {errors.price && (
              <p id="price-error" className="field-error">
                {errors.price.message}
              </p>
            )}
            <label htmlFor="product-description">Description</label>
            <textarea id="product-description" {...register("description")} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "description-error" : undefined} />
            {errors.description && (
              <p id="description-error" className="field-error">
                {errors.description.message}
              </p>
            )}
            <label htmlFor="product-maxQuantity">Maximum per bag</label>
            <input id="product-maxQuantity" {...register("maxQuantity")} aria-invalid={Boolean(errors.maxQuantity)} aria-describedby={errors.maxQuantity ? "maxQuantity-error" : undefined} />
            {errors.maxQuantity && (
              <p id="maxQuantity-error" className="field-error">
                {errors.maxQuantity.message}
              </p>
            )}

            <p className="muted">
              Use 1 to 99 when available, or 0 when unavailable.
            </p>
            <label htmlFor="product-category">Category</label>
            <select id="product-category" {...register("category")}>
              <option>Home</option>
              <option>Travel</option>
              <option>Audio</option>
            </select>
            <label className="check-label">
              <input type="checkbox" {...register("inStock")} />
              Available to add to bag
            </label>
            <div className="product-features">
              <h2>Useful details</h2>
              <p className="muted">Add up to five short product features.</p>
              {fields.map((field, index) => (
                <div className="feature-row" key={field.id}>
                  <label htmlFor={`feature-${field.id}`}>
                    Feature {index + 1}
                  </label>
                  <div>
                    <input id={`feature-${field.id}`} {...register(`features.${index}.text`)} aria-invalid={Boolean(errors.features?.[index]?.text)} aria-describedby={errors.features?.[index]?.text ? `feature-error-${field.id}` : undefined} />
                    <button type="button" className="secondary" onClick={() => remove(index)} aria-label={`Remove feature ${index + 1}`}>
                      Remove
                    </button>
                  </div>
                  {errors.features?.[index]?.text && (
                    <p className="field-error" id={`feature-error-${field.id}`}>
                      {errors.features[index]?.text?.message}
                    </p>
                  )}
                </div>
              ))}
              <button type="button" className="secondary" onClick={() => append({ text: "" })} disabled={busy || fields.length >= 5}>
                Add feature
              </button>
            </div>
          </fieldset>
          <ProductImageUpload key={fileKey} value={image} disabled={busy} onChange={(url) => setValue("image", url, { shouldDirty: true, shouldValidate: true })} onBusyChange={setUploading} />
          {errors.image && (
            <p role="alert" className="field-error">
              {errors.image.message}
            </p>
          )}
          <div className="editor-actions">
            <button type="submit" disabled={busy}>
              {isSubmitting || activeWrites > 0
                ? "Saving changes…"
                : "Save changes"}
            </button>
            <button type="button" className="secondary" disabled={busy} onClick={() => {
              reset();
              setFileKey((key) => key + 1);
              setMessage("");
            }}>
              Reset to saved details
            </button>
          </div>
          <p role="status">{message}</p>
        </section>
      </form>
    </>
  );
}
