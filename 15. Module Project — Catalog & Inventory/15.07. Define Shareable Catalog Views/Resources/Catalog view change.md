# Catalog view change — share the applied catalog view

Prepared follow-up in the fictional Emily scenario.

“I want to send someone the collection I am looking at. Please keep my search, category, sort order and page when the address is shared or reloaded, and restore my earlier choices when I use Back.”

## Design revision

Review the accompanying catalog design. Add sort and an Apply filters button; use three-product pages for the six-product teaching catalog. Form controls are a draft until submission. The applied URL and loader result own the displayed view.

## Acceptance

- Search/category/sort/page determine the API request and displayed result.
- A GET form submission starts at page one; page links retain the other choices.
- A product's collection-return link retains the applied query.
- Reload, direct links and Back restore both the products and applied control values.
- Invalid category/sort/page values fall back safely. A page beyond the final page redirects to its clamped valid page.
- The total is the number of matches before pagination; empty results offer Reset.
- Cart and inventory still load the complete small catalog, independently of the collection page size.
- Availability remains the separate A03 extension. No second effect or duplicate applied-filter state is required.

## Teaching checkpoints

Define Shareable Catalog Views establishes the applied query contract and loader. Build Filters & Pagination connects the form, result summary, paging and return links; complete the acceptance checks after that connection.
