import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Sale } from "@/types";
import { formatNaira } from "@/services/mockData";

interface InvoiceDialogProps {
  sale: Sale;
}

const InvoiceDialog = ({ sale }: InvoiceDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-bliss-500 py-3 text-sm border-2 text-bliss-500 hover:bg-bliss-50 hover:text-bliss-500"
          size="sm"
        >
          <FileText className="mr-2 h-4 w-4" />
          View Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Invoice #{sale.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          {/* Header */}
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-xl">BEDSHEET STORE</h3>
              <p className="text-sm text-muted-foreground">
                123 Business Street
              </p>
              <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                Date: {new Date(sale.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Invoice #: {sale.id}
              </p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Bill To:</h4>
            <p>{sale.customer}</p>
          </div>

          {/* Items Table */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {sale.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.size} Bedsheet</td>
                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">
                      {formatNaira(item.pricePerUnit)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatNaira(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t bg-muted">
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-right font-medium">
                    Total:
                  </td>
                  <td className="px-4 py-2 text-right font-medium">
                    {formatNaira(sale.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p>Payment is due within 30 days</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDialog;
