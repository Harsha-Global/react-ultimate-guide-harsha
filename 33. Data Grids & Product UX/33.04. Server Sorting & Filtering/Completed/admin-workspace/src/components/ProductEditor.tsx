import { useEffect, useId, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../catalog";
import { productEditSchema, type ProductEdit } from "../productSchema";
import { CatalogApiError, updateProduct } from "../catalogApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProductEditor({ product, onSaved, onCancel }: { product: Product; onSaved: (product: Product) => void; onCancel: () => void }) {
  const id = useId();
  const submitting = useRef(false);
  const failureRef = useRef<HTMLParagraphElement>(null);
  const { register, handleSubmit, setError, setFocus, formState: { errors, isSubmitting } } = useForm<ProductEdit>({
    resolver: zodResolver(productEditSchema), defaultValues: { name: product.name, stock: product.stock },
  });
  useEffect(() => { setFocus("name"); }, [setFocus]);

  useEffect(() => {
    if (!isSubmitting && errors.root?.server) failureRef.current?.focus();
  }, [isSubmitting, errors.root?.server]);

  async function save(values: ProductEdit) {
    try {
      const accepted = await updateProduct(product.id, values);
      onSaved(accepted);
    } catch (error) {
      if (error instanceof CatalogApiError && (error.fieldErrors.name || error.fieldErrors.stock)) {
        for (const field of ["name", "stock"] as const) {
          if (error.fieldErrors[field]) setError(field, { type: "server", message: error.fieldErrors[field] });
        }
        setFocus(error.fieldErrors.name ? "name" : "stock");
      } else {
        setError("root.server", { message: "Could not save. Your entries are kept. Check the service and try again." });
      }
    }
  }

  return (
    <form aria-labelledby={`${id}-heading`} noValidate aria-busy={isSubmitting} className="mt-6 rounded-2xl border-2 border-primary bg-card p-5 sm:p-6" onSubmit={async (event) => {
      event.preventDefault();
      if (submitting.current) return;
      submitting.current = true;
      try { await handleSubmit(save)(event); } finally { submitting.current = false; }
    }}>
      <p className="text-xs font-semibold tracking-widest text-primary">PRODUCT EDITOR</p>
      <h2 id={`${id}-heading`} className="mt-2 text-xl font-semibold">Edit {product.name}</h2>
      <p className="mt-2 text-sm text-muted-foreground">Update the name and stock. Changes appear in the catalog after the service accepts them.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-[minmax(0,1fr)_10rem]">
        <div>
          <Label htmlFor={`${id}-name`} className="mb-2 block">Product name</Label>
          <Input id={`${id}-name`} {...register("name")} readOnly={isSubmitting} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-help ${id}-name-error` : `${id}-name-help`} />
          <p id={`${id}-name-help`} className="mt-2 text-sm text-muted-foreground">Use 2–60 characters and a unique catalog name.</p>
          {errors.name && <p id={`${id}-name-error`} role="alert" className="mt-2 text-sm font-semibold text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor={`${id}-stock`} className="mb-2 block">Stock</Label>
          <Input id={`${id}-stock`} type="number" min={0} max={9999} step={1} {...register("stock", { valueAsNumber: true })} readOnly={isSubmitting} aria-invalid={Boolean(errors.stock)} aria-describedby={errors.stock ? `${id}-stock-help ${id}-stock-error` : `${id}-stock-help`} />
          <p id={`${id}-stock-help`} className="mt-2 text-sm text-muted-foreground">Whole units, 0–9999.</p>
          {errors.stock && <p id={`${id}-stock-error`} role="alert" className="mt-2 text-sm font-semibold text-danger">{errors.stock.message}</p>}
        </div>
      </div>
      {errors.root?.server && <p ref={failureRef} tabIndex={-1} role="alert" className="mt-4 rounded-lg bg-danger-surface p-3 text-sm font-semibold text-danger focus:outline-2 focus:outline-offset-2 focus:outline-ring">{errors.root.server.message}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving…" : "Save product"}</Button>
        <Button type="button" variant="outline" disabled={isSubmitting} onClick={onCancel}>Cancel edit</Button>
        <span role="status" className="text-sm text-muted-foreground">{isSubmitting ? "Saving product. Please wait." : ""}</span>
      </div>
    </form>
  );
}
