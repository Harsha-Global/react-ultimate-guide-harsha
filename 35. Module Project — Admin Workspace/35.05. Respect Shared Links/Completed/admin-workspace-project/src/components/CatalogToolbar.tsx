import type { RefObject } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = { query: string; onQuery: (value: string) => void; searchRef: RefObject<HTMLInputElement | null>; onReset: () => void; sorted: boolean; onClearSorting: () => void };

export function CatalogToolbar({ query, onQuery, searchRef, onReset, sorted, onClearSorting }: Props) {
  return <div className="mt-5 flex flex-wrap items-end gap-3">
    <div className="min-w-0 flex-1 basis-64">
      <Label htmlFor="product-search" className="mb-2 block text-sm font-semibold">Search products</Label>
      <Input ref={searchRef} id="product-search" type="search" maxLength={60} value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Try lamp or travel" />
    </div>
    <Button type="button" variant="outline" onClick={onReset} disabled={!query}>Clear search</Button>
    <Button type="button" variant="outline" onClick={onClearSorting} disabled={!sorted}>Clear sorting</Button>
    {query && <p className="basis-full text-sm text-muted-foreground">Searching for <strong className="text-foreground">{query}</strong>. Selection clears when the search changes.</p>}
  </div>;
}
