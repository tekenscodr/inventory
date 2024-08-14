import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request, context: any) {
    try {
        const data = await request.json()
        console.log(data)
        // Validate request data
        if (!data || !data.fields || !data.totalPrice) {
            return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
        }

        // Create order
        const order = await prisma.orders.create({
            data: {
                paymentStatus: 'Paid',
                total: data.totalPrice,
                receiptPrinted: true,
                orderDate: new Date(),
            },
        })

        // Loop through field array and save each item with the orderID
        const orderDetailsPromises = data.fields.map(async (field: { productName: string; qty: any; unitPrice: any }) => {

            return prisma.orderDetails.create({
                data: {
                    orderID: order.orderID,
                    productID: field.productName,
                    quantity: field.qty,
                    unitPrice: field.unitPrice,
                },
            })
        })

        // Wait for all order details to be created
        await Promise.all(orderDetailsPromises)

        const subtractQtyPromises = data.fields.map((field: { productName: string; qty: any; unitPrice: any }) => {
            return prisma.inventory.update({
                where: {
                    productID: field.productName
                },
                data: {
                    quantity: {
                        decrement: field.qty
                    }
                }
            })
        })

        await Promise.all(subtractQtyPromises)

        // Create receipt
        const receipt = await prisma.receipts.create({
            data: {
                orderID: order.orderID,
                receiptNumber: `RCPT-${order.orderID}`,
                receiptDate: new Date(),
            },
        })

        // Return each order details by querying the orderDetails table
        const orderDetails = await prisma.orderDetails.findMany({
            where: { orderID: order.orderID },
            include: { Product: true },
        })
        const receiptDetails = { receipt, orderDetails }
        console.log(receiptDetails)
        return NextResponse.json(receiptDetails)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }
}