/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Receipts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "OrderDetails" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Receipts" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Logs" (
    "logsID" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("logsID")
);
