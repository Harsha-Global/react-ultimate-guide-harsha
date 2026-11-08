-- After the additive migration: the old query still works.
SELECT id, note FROM "Order" WHERE id = 'O-1001';
-- A later reader can accept rows that have not been backfilled.
SELECT id, COALESCE("deliveryLabel", note) AS displayed_note FROM "Order" WHERE id = 'O-1001';
-- Backfill is a separate reviewed operation, not a reason to delete the old column.
-- Keep both columns until old application versions no longer depend on the old one.
