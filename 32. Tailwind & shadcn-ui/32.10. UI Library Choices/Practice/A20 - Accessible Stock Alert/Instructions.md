# A20 — Accessible Stock Alert

Estimated attempt: 40 minutes. Work in the independent Starter/admin-workspace. Obtain this package using the course's “How to Download Source Code” workflow. Keep the guided main project unchanged.

The inventory coordinator needs a different reorder level for each product. Add a usable editor field and make the low-stock display follow the accepted level.

## Setup

1. Stop other Admin Workspace processes on 5190/5191 with Ctrl+C. Open Starter/admin-workspace in a separate editor window.
2. Run npm ci, then npm run api. Check http://127.0.0.1:5191/api/health for {"status":"ok"}.
3. In a second terminal, run npm run dev; open http://127.0.0.1:5190.
4. Read API Contract.md. The service, types, schema, default values and response handling are supplied. Existing name/stock edits still work and retain the supplied reorder level. The missing field and fixed-threshold helper are the tasks.

## Implement

- Add a Reorder level field to ProductEditor. Use the existing React Hook Form owner, with integer validation from 0 to 999. Empty, fractional, negative and 1000 values must be rejected.
- Provide a visible label, helper text, aria-invalid, linked error text and first-invalid-field focus. Keep values after a failed save. Preserve pending feedback and duplicate-submit protection.
- Implement isLowStock: positive stock at or below that product's reorder level is low; zero stock remains Unavailable. The card, review dialog and whole-catalog count must agree.
- Update the list only from the accepted API response. Keep keyboard use, both themes and a 390 px layout usable. Save/Cancel focus and error focus must continue to work.

## Evidence and checks

- Fresh data: edit Lamp (stock 12), save reorder level 12. Expect Low stock, and the low-stock count increases from 1 to 2.
- Edit Mug (stock 3), save level 2. Expect In stock. Set level 3 and expect Low stock; equality counts.
- Save level 0 for a positive-stock product. It is not low stock. Backpack stock 0 remains Unavailable for every allowed level.
- Try blank, -1, 1.5 and 1000; inspect the message and focus. Stop API while saving another valid level; keep the draft, restart and retry.
- Run npm run test:stock (Starter: 2 passes / 4 expected failures; Solution: 6 passes), npm run test:api (8 checks), npm run test:theme, npm run build and npm run lint.

Submit explanations, relevant changed code and screenshots/test results for the three questions. Attempt before opening Solution/admin-workspace. Install that independent copy with its own npm ci. 

## Manual rubric — 10 points

2: one form owner and valid numeric boundaries; 2: labels/errors/focus/keyboard; 2: shared threshold behavior including equality/zero; 2: accepted response and failure/pending preservation; 2: reproducible browser/test evidence. Different implementations are valid when the observable contract is met.
