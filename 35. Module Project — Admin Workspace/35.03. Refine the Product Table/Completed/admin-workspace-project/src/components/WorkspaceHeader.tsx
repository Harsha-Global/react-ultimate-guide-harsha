import type { ReactNode } from "react";

export function WorkspaceHeader({ themeControl }: { themeControl: ReactNode }) {
  return <header className="workspace-header rounded-3xl border border-border bg-card p-5 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-5">
      <a href="#catalog-heading" className="rounded-md font-semibold tracking-tight text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">SHOPFRONT <span className="font-normal text-muted-foreground">/ Admin</span></a>
      <p className="rounded-full bg-muted px-4 py-2 text-xs font-semibold">LOCAL DEMO · CHANGES RESET WITH THE API</p>
    </div>
    <div className="mt-7 grid items-end gap-6 sm:grid-cols-[minmax(0,1fr)_12rem]">
      <div><p className="text-xs font-semibold tracking-widest text-primary">CATALOG OPERATIONS</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A clearer view of your catalog.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Find the right products, review availability and make a confident update.</p></div>
      <div className="min-w-0">{themeControl}</div>
    </div>
  </header>;
}
