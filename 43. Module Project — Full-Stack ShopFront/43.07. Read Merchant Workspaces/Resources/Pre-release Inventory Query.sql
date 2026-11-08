-- Read-only release review. Run against the intended database; inspect the environment first.
SELECT count(*) AS unassigned_products FROM "Product" WHERE "workspaceId" IS NULL;
SELECT id, name, "workspaceId" FROM "Product" ORDER BY id;
SELECT id, name FROM "Workspace" ORDER BY id;
-- Prepare a reviewed product->actual workspace mapping separately. No automatic update is supplied.
-- Merchant transfers for existing ordered products are outside this sample's fixed-ownership model.
