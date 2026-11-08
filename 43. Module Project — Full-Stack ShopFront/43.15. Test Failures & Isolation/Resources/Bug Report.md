# BUG-43-01 — duplicate fulfillment after replay

Reported behavior: repeating the same fulfillment operation inserts another row. Expected: one record for each order/workspace pair, while an independent order still creates its own record.

Reproduce with the isolated Bug Lab/Starter files copied into shopfront-next/bug-lab. From that project root run node bug-lab/replay.mjs. TEST_DATABASE_URL must be the separate local shopfront_test database. Baseline is deliberately red: count2 and an assertion failure. The temporary table is wrapped in a transaction and rolled back; no production table is altered.

Investigate the generated row ID versus the business identity. Add a composite unique constraint, then use ON CONFLICT(order_id,workspace_id) DO NOTHING. Rerun to see count1 after replay, and count2 after an independent order. Compare with the guided Prisma composite ID/createMany implementation. The completed Bug Lab/Solution is a separate reference.

Run the full guided fulfillment test for wrong amount, exact replay, distinct concurrent events, two workspaces and a second order. A database record does not make an arbitrary external shipping side effect exactly once; that provider operation needs its own idempotency contract.
