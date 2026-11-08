CREATE TABLE "MerchantOrderNote" (
 "orderId" TEXT NOT NULL, "workspaceId" TEXT NOT NULL, "body" TEXT NOT NULL, "revision" INTEGER NOT NULL DEFAULT 1,
 CONSTRAINT "MerchantOrderNote_pkey" PRIMARY KEY ("orderId","workspaceId"),
 CONSTRAINT "MerchantOrderNote_body_check" CHECK (char_length("body") BETWEEN 1 AND 240),
 CONSTRAINT "MerchantOrderNote_revision_check" CHECK ("revision" > 0),
 CONSTRAINT "MerchantOrderNote_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT "MerchantOrderNote_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
