import { useState } from "react";
import { useFetcher } from "react-router";
import type { Product } from "./types";
import type { deleteProductAction } from "./actions";
export default function DeleteProduct({ product }: {
    product: Product;
}) {
    const [confirming, setConfirming] = useState(false);
    const fetcher = useFetcher<typeof deleteProductAction>();
    const pending = fetcher.state !== "idle";
    return (<div className="delete-control">
      {!confirming ? (<button type="button" className="text-danger" onClick={() => setConfirming(true)}>
          Delete {product.name}
        </button>) : (<fetcher.Form method="delete" action={`/inventory/${product.id}/delete`} className="delete-confirm">
          <p>
            Remove <strong>{product.name}</strong> from the collection?
          </p>
          <p className="muted">Saved bags may still refer to this item.</p>
          <div className="actions">
            <button className="danger" type="submit" disabled={pending}>
              {pending ? "Deleting…" : "Confirm deletion"}
            </button>
            <button className="secondary" type="button" disabled={pending} onClick={() => setConfirming(false)}>
              Keep product
            </button>
          </div>
        </fetcher.Form>)}
      {fetcher.data && !fetcher.data.ok && (<p className="field-error" role="alert">
          {fetcher.data.message}
        </p>)}
    </div>);
}
