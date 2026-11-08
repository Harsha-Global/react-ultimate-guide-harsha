ALTER TABLE "Product" ADD COLUMN "workspaceId" TEXT;
ALTER TABLE "Product" ADD CONSTRAINT "Product_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "Fulfillment" (
  "orderId" TEXT NOT NULL, "workspaceId" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'ready', "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Fulfillment_pkey" PRIMARY KEY ("orderId", "workspaceId"),
  CONSTRAINT "Fulfillment_status_check" CHECK ("status" IN ('ready','dispatched')),
  CONSTRAINT "Fulfillment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "Fulfillment_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "Fulfillment_workspaceId_status_idx" ON "Fulfillment"("workspaceId", "status");
