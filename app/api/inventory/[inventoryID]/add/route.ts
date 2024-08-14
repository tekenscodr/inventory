import prisma from "@/app/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: { inventoryID: string } }) {
    try {
        const { reorderLevel, reorderQuantity, sellingPrice, unitPrice } = await request.json();
        const { inventoryID } = context.params;

        if (
            typeof reorderLevel !== "number" ||
            typeof reorderQuantity !== "number" ||
            typeof sellingPrice !== "number" ||
            typeof unitPrice !== "number"
        ) {
            return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
        }

        const oldQty = await prisma.inventory.findFirst({
            where: { productID: inventoryID },
            select: { quantity: true },
        });

        if (!oldQty) {
            return NextResponse.json({ message: "Inventory not found" }, { status: 404 });
        }

        const totalQty = oldQty.quantity + reorderQuantity;
        if (totalQty < 0) {
            return NextResponse.json({ message: "Invalid quantity" }, { status: 400 });
        }

        const updatedInventory = await prisma.inventory.update({
            where: { productID: inventoryID },
            data: { quantity: totalQty, reorderLevel, reorderQuantity },
        });

        const updatedProduct = await prisma.products.update({
            where: { productID: inventoryID },
            data: { sellingPrice, unitPrice },
        });

        const updated = { updatedInventory, updatedProduct };
        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating inventory" }, { status: 500 });
    }
}