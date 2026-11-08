-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "checkoutSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_checkoutSessionId_key" ON "Order"("checkoutSessionId");
