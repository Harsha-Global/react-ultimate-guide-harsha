-- CreateTable
CREATE TABLE "Outbox" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Outbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Outbox_orderId_key" ON "Outbox"("orderId");

-- CreateIndex
CREATE INDEX "Outbox_deliveredAt_createdAt_idx" ON "Outbox"("deliveredAt", "createdAt");

-- AddForeignKey
ALTER TABLE "Outbox" ADD CONSTRAINT "Outbox_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Preserve receipt delivery for payments completed before this feature.
INSERT INTO "Outbox" ("id", "orderId")
SELECT 'paid-' || "id", "id" FROM "Order" WHERE "status" = 'paid'
ON CONFLICT ("orderId") DO NOTHING;
