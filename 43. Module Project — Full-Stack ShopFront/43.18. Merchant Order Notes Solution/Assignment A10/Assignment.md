# A10 — Merchant Order Notes

Estimated time: 60–90 minutes. Start from `Starter/shopfront-next`, a copy of the completed guided release. The main project remains separate. Use a separate local PostgreSQL instance/port with its own shopfront_dev and shopfront_test databases, as explained in the project README and A10 Run Guide.md. Use a further separate reference instance for the Solution, preserving your own attempted schema and data. Apply the extra migration only when building or reviewing the optional solution. Do not deploy the optional solution into the guided main.

## Client request

The Studio team needs a short internal note beside each of its orders. The note belongs to the pair of workspace and order. A customer note is a different field and must not become a merchant note.

## Three tasks

1. Design the database identity and server boundary. Require an authenticated owner/editor membership and an order containing that workspace's products. Reject another member's workspace and an unrelated order, even when a caller supplies valid-looking identifiers. Keep merchant notes out of customer responses.
2. Build a labeled 1–240-character note form. Trim and validate on the server, retain a failed draft, prevent repeated clicks while pending, and refresh the current merchant view after a confirmed save. Keep the active fulfillment filter. A viewer may read the note but cannot save it.
3. Test valid creation/update, whitespace/overlong input, another workspace, a different workspace's order, a viewer, uncertain save recovery and concurrent edits. Write a short explanation of browser draft ownership versus database authority. Define what happens if a save succeeds but the response is lost.

## Hints

- A composite database key expresses the note's identity.
- The route parameter chooses the requested scope; membership and item predicates authorize it.
- Use a revision for conditional updates so a stale form cannot overwrite a newer note.
- On an uncertain result, retain/copy the draft and reread the saved note before another revision-sensitive write.

## Rubric — 10 points

| Area | Points | Observable evidence |
| --- | ---: | --- |
| Workspace, order and role authorization | 3 | Direct requests outside any boundary fail; database remains unchanged. |
| Server validation and private storage | 2 | Trimmed bounded note; customer API never exposes it. |
| Form, pending state and correct refresh | 2 | Accessible label/help; current filter survives; saved note appears. |
| Recovery and concurrent edits | 2 | Draft survives failure; stale revision cannot silently overwrite. |
| Explanation and evidence | 1 | Clear state ownership and reproducible tests, with external-service limits stated. |

The complete reference is in `Solution/shopfront-next`. Read `Solution Review.md` and watch the "Merchant Order Notes Solution" lecture after attempting the work. The starter is the revised guided the "Deploy & Observe ShopFront" lecture project.
