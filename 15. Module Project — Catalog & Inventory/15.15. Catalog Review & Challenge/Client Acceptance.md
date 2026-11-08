# ShopFront — client acceptance

Run with the seed data and normal API mode unless a check explicitly changes it. Use this checklist to record your outcomes and compare the controls with their results.

| Area | Check | Expected result |
|---|---|---|
| Identity | Desktop, 360/390px, and tablet widths | Coherent typography/imagery, usable actions, no horizontal page overflow |
| Catalog | Six seed products, three per page  | Total six, two pages; cards use stable ids |
| Shared view | Home + price ascending, reload and fresh tab | Cushion $39 before Lamp $49; controls agree |
| History | Change applied view, use Back | Earlier controls and results return |
| Paging | Page two, product, collection-return link | Same page and applied choices |
| Empty | Search unmatched text | Empty message with reset path |
| Missing | /products/p999 | Product-not-found view with collection link |
| Bag | Add p1 twice, decrease, reload | Limit enforced; count/subtotal and saved choice persist |
| Preferences | Save valid name/email, reload | Saved values restored |
| Edit | Empty name / invalid price / inconsistent stock limit | Field errors, focus, retained draft |
| Save | p1 price 79 to 89 | Pending feedback, inventory confirmation, current price after reload |
| Delete | Keep product, then confirm | Cancel retains six; success shows five with same inventory address |
| Removed saved product | Delete p1 while bag includes it | Removable unavailable line, no phantom available subtotal |
| Failures | Loader fail/retry; save fail/retry; delete fail/retry | Appropriate recovery, retained form or row |
| Draft guard | Keep editing / discard / successful save | Clear choice; draft retained/discarded appropriately; success proceeds |
| Reload guard | Edit then reload or close the browser tab | Browser-owned warning subject to browser rules; verify in your browser |
| Race investigation | L then lamp, controlled timing | Faulty ends with L; fixed keeps lamp |
| Availability challenge | In stock; unavailable + Home; unavailable + lamp | Four; cushion only; empty; shared choice survives navigation |

Finish with `npm run api:reset`, normal timing, and the intended main source checkpoint. Test preferences are browser data, not part of the distributed project.
