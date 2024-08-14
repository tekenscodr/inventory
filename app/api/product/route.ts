import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data.quantity)
        const { productName, description, category, unitPrice, sellingPrice, quantityPerUnit, reorderLevel, quantity } = await data;

        const ifExists = await prisma.products.findFirst({
            where: {
                productName: data.productName
            }
        })
        if (ifExists) NextResponse.error();
        const product = await prisma.products.create({
            data: { productName, description, category, unitPrice, sellingPrice, quantityPerUnit }
        })
        if (!product) NextResponse.error();
        const productID = await product.productID
        const inventory = await prisma.inventory.create({
            data: { productID, reorderLevel, reorderQuantity: quantity, quantity }
        })

        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }

}