-- Read-only aggregate observations; no secrets or customer note bodies.
SELECT count(*) AS undelivered, min("createdAt") AS oldest FROM "Outbox" WHERE "deliveredAt" IS NULL;
SELECT status, count(*) FROM "PaymentEvent" GROUP BY status;
SELECT status, count(*) FROM "Fulfillment" GROUP BY status;
SELECT count(*) AS paid_without_receipt FROM "Order" o LEFT JOIN "Receipt" r ON r."orderId"=o.id WHERE o.status='paid' AND r."orderId" IS NULL;
SELECT count(*) AS unassigned_products FROM "Product" WHERE "workspaceId" IS NULL;
