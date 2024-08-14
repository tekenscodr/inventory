import { type Orders } from "@prisma/client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

const SalesTable = (props: Orders) => {
  const { orderID, orderDate, total, paymentStatus, receiptPrinted } = props
  return (

    <TableBody>
      <TableRow>
        <TableCell className="font-medium">{orderID} </TableCell>
        <TableCell>{orderDate.toDateString()}</TableCell>
        <TableCell className="text-right">{total.toFixed(2)}</TableCell>
      </TableRow>
    </TableBody>

  )
}

export default SalesTable
