import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

export async function GET(context: any) {
    const { params } = context;
    const productId = await params.productId
    try {
        const product = await prisma.products.findFirst({
            where: {
                productID: productId
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error)
    }
}