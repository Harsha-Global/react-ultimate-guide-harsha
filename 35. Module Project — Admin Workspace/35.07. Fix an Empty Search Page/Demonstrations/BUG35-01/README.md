# BUG35-01 — An apparently empty search

Copy admin-workspace into a separate folder, npm ci, then run API5191 and Vite5190. Open /?page=2&size=2, search travel. The address retains page2 and the one matching product lives on page1. Inspect the API result (total1/items empty) and the URL before editing. Repair setQuery to update q and page:1 together. Preserve current sort/direction/size and selection-clears-on-search behavior. The guided main is the repaired comparison; do not replace assertions or seed fake rows.
