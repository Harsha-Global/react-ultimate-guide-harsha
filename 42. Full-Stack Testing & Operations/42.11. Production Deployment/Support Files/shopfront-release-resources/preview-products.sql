BEGIN;

INSERT INTO "Product" (
    id,
    slug,
    name,
    "priceMinor",
    stock
)
VALUES
    ('P-101', 'studio-desk-lamp', 'Studio Desk Lamp', 8900, 12),
    ('P-103', 'terracotta-travel-mug', 'Terracotta Travel Mug', 2800, 3)
ON CONFLICT (id) DO NOTHING;

SELECT
    id,
    name,
    "priceMinor",
    stock
FROM "Product"
WHERE id IN ('P-101', 'P-103')
ORDER BY id;

COMMIT;
