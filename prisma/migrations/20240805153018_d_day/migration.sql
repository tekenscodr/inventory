-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "orderDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Receipts" ALTER COLUMN "receiptDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);
