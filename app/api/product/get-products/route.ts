import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request) {
    try {
        const products = await prisma.products.findMany();
        const productsWithQuantity = [];

        for (const product of products) {
            const inventory = await prisma.inventory.findFirst({
                where: {
                    productID: product.productID,
                    quantity: {
                        gt: 0,
                    },
                },
            });

            if (inventory) {
                productsWithQuantity.push(product);
            }
        }

        return NextResponse.json(productsWithQuantity);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}