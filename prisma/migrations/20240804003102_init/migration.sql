-- CreateTable
CREATE TABLE "Products" (
    "ProductID" TEXT NOT NULL,
    "ProductName" TEXT NOT NULL,
    "Description" TEXT,
    "Category" TEXT NOT NULL,
    "UnitPrice" DECIMAL(65,30) NOT NULL,
    "SellingPrice" DECIMAL(65,30) NOT NULL,
    "QuantityPerUnit" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductID")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "InventoryID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "ReorderLevel" INTEGER NOT NULL,
    "ReorderQuantity" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("InventoryID")
);

-- CreateTable
CREATE TABLE "Orders" (
    "OrderID" TEXT NOT NULL,
    "OrderDate" TIMESTAMP(3) NOT NULL,
    "Total" DECIMAL(65,30) NOT NULL,
    "PaymentStatus" TEXT NOT NULL,
    "ReceiptPrinted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderID")
);

-- CreateTable
CREATE TABLE "OrderDetails" (
    "OrderDetailID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "ProductID" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "OrderDetails_pkey" PRIMARY KEY ("OrderDetailID")
);

-- CreateTable
CREATE TABLE "Receipts" (
    "ReceiptID" TEXT NOT NULL,
    "OrderID" TEXT NOT NULL,
    "ReceiptDate" TIMESTAMP(3) NOT NULL,
    "ReceiptNumber" TEXT NOT NULL,

    CONSTRAINT "Receipts_pkey" PRIMARY KEY ("ReceiptID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_ProductID_key" ON "Inventory"("ProductID");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetails" ADD CONSTRAINT "OrderDetails_ProductID_fkey" FOREIGN KEY ("ProductID") REFERENCES "Products"("ProductID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipts" ADD CONSTRAINT "Receipts_OrderID_fkey" FOREIGN KEY ("OrderID") REFERENCES "Orders"("OrderID") ON DELETE RESTRICT ON UPDATE CASCADE;
