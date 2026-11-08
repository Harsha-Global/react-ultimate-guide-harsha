-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "requestFingerprint" TEXT,
ADD COLUMN     "requestKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_requestKey_key" ON "Order"("customerId", "requestKey");
