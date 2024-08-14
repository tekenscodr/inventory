/*
  Warnings:

  - The primary key for the `Inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `InventoryID` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `ProductID` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `ReorderLevel` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `ReorderQuantity` on the `Inventory` table. All the data in the column will be lost.
  - The primary key for the `OrderDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OrderDetailID` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `OrderID` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `ProductID` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `OrderDetails` table. All the data in the column will be lost.
  - You are about to drop the column `UnitPrice` on the `OrderDetails` table. All the data in the column will be lost.
  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OrderDate` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `OrderID` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `PaymentStatus` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiptPrinted` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Total` on the `Orders` table. All the data in the column will be lost.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Category` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ProductID` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ProductName` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `QuantityPerUnit` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `SellingPrice` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `UnitPrice` on the `Products` table. All the data in the column will be lost.
  - The primary key for the `Receipts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `OrderID` on the `Receipts` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiptDate` on the `Receipts` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiptID` on the `Receipts` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiptNumber` on the `Receipts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productID]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - The required column `inventoryID` was added to the `Inventory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productID` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorderLevel` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorderQuantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - The required column `orderDetailID` was added to the `OrderDetails` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `orderID` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productID` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `OrderDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDate` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - The required column `orderID` was added to the `Orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `paymentStatus` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.
  - The required column `productID` was added to the `Products` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productName` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityPerUnit` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderID` to the `Receipts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptDate` to the `Receipts` table without a default value. This is not possible if the table is not empty.
  - The required column `receiptID` was added to the `Receipts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `receiptNumber` to the `Receipts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_ProductID_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_OrderID_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_ProductID_fkey";

-- DropForeignKey
ALTER TABLE "Receipts" DROP CONSTRAINT "Receipts_OrderID_fkey";

-- DropIndex
DROP INDEX "Inventory_ProductID_key";

-- AlterTable
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_pkey",
DROP COLUMN "InventoryID",
DROP COLUMN "ProductID",
DROP COLUMN "Quantity",
DROP COLUMN "ReorderLevel",
DROP COLUMN "ReorderQuantity",
ADD COLUMN     "inventoryID" TEXT NOT NULL,
ADD COLUMN     "productID" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "reorderLevel" INTEGER NOT NULL,
ADD COLUMN     "reorderQuantity" INTEGER NOT NULL,
ADD CONSTRAINT "Inventory_pkey" PRIMARY KEY ("inventoryID");

-- AlterTable
ALTER TABLE "OrderDetails" DROP CONSTRAINT "OrderDetails_pkey",
DROP COLUMN "OrderDetailID",
DROP COLUMN "OrderID",
DROP COLUMN "ProductID",
DROP COLUMN "Quantity",
DROP COLUMN "UnitPrice",
ADD COLUMN     "orderDetailID" TEXT NOT NULL,
ADD COLUMN     "orderID" TEXT NOT NULL,
ADD COLUMN     "productID" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("orderDetailID");

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
DROP COLUMN "OrderDate",
DROP COLUMN "OrderID",
DROP COLUMN "PaymentStatus",
DROP COLUMN "ReceiptPrinted",
DROP COLUMN "Total",
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderID" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "receiptPrinted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderID");

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "Category",
DROP COLUMN "Description",
DROP COLUMN "ProductID",
DROP COLUMN "ProductName",
DROP COLUMN "QuantityPerUnit",
DROP COLUMN "SellingPrice",
DROP COLUMN "UnitPrice",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "productID" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "quantityPerUnit" INTEGER NOT NULL,
ADD COLUMN     "sellingPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unitPrice" DECIMAL(65,30) NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("productID");

-- AlterTable
ALTER TABLE "Receipts" DROP CONSTRAINT "Receipts_pkey",
DROP COLUMN "OrderID",
DROP COLUMN "ReceiptDate",
DROP COLUMN "ReceiptID",
DROP COLUMN "ReceiptNumber",
ADD COLUMN     "orderID" TEXT NOT NULL,
ADD COLUMN     "receiptDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "receiptID" TEXT NOT NULL,
ADD COLUMN     "receiptNumber" TEXT NOT NULL,
ADD CONSTRAINT "Receipts_pkey" PRIMARY KEY ("receiptID");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productID_key" ON "Inventory"("productID");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Products"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Products"("productID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipts" ADD CONSTRAINT "Receipts_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Orders"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;
