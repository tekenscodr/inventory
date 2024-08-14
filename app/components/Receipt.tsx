import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ReceiptContent = (props: any) => {
    const { receiptDetails } = props;
    if (!receiptDetails) {
        return <div>Loading...</div>;
    }


    const totalPrice = receiptDetails.orderDetails.reduce((acc: number, order: { quantity: any; unitPrice: any; }) => {
        return acc + Number(order.quantity) * Number(order.unitPrice);
    }, 0);

    const date = new Date(receiptDetails.receipt.receiptDate).toDateString();
    console.log(date)
    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">BIG NANA</h1>
                <p className="text-gray-600">0505417927 / 0505417297</p>
            </div>
            <h1 className="text-2xl font-bold mb-4">Receipt</h1>
            <div className="receipt-container bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600 mb-2">Receipt Number: {receiptDetails.receipt.receiptNumber}</p>
                <p className="text-gray-600 mb-2">Receipt Date: {date}</p>
                <p className="text-gray-600 mb-4">Order ID: {receiptDetails.receipt.orderID}</p>

                <h2 className="text-lg font-bold mb-2">Order Details:</h2>
                <table className="w-full mb-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-2">Product Name</th>
                            <th className="text-right py-2">Quantity</th>
                            <th className="text-right py-2">Unit Price</th>
                            <th className="text-right py-2">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptDetails.orderDetails.map((order: { Product: { productName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; quantity: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; unitPrice: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                            <tr key={index} className="border-none">
                                <td className="text-left py-2">{order.Product.productName}</td>
                                <td className="text-right py-2">{order.quantity}</td>
                                <td className="text-right py-2">{order.unitPrice}</td>
                                <td className="text-right py-2">{Number(order.quantity) * Number(order.unitPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="text-lg font-bold mb-2">Summary:</h2>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Subtotal:</p>
                    <p className="font-bold">{totalPrice}</p>
                </div>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600">Tax (0%):</p>
                    <p>0</p>
                </div>
                <div className="flex justify-between font-bold mb-4">
                    <p>Total:</p>
                    <p>{totalPrice}</p>
                </div>

                <div className="text-center">
                    <p className="text-gray-600">Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
};

interface ReceiptProps {
    receiptDetails: any;
    onClose: () => void;
    showReceipt: any
}

const Receipt: React.FC<ReceiptProps> = ({ receiptDetails = {}, showReceipt, onClose }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current || null,
    });
    if (!receiptDetails) {
        return <></>
    }

    return (
        <Dialog open={showReceipt}>
            <DialogHeader>
                <DialogTitle>
                    <h1>Success!</h1>
                </DialogTitle>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </DialogClose>
            </DialogHeader>
            <DialogContent>
                <p>Receipt saved successfully!</p>
                <DialogFooter className="sm:justify-start">
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            onClick={handlePrint}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Print
                        </Button>
                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>

            {typeof handlePrint === 'function' && (
                <div style={{ display: "none" }}>
                    <div ref={componentRef}>
                        <ReceiptContent receiptDetails={receiptDetails} />
                    </div>
                </div>
            )
            }
        </Dialog >
    );
};

export default Receipt;