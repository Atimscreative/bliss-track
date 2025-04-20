import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sale } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { sales } from "@/services/mockData";
import { formatNaira } from "@/services/mockData";
import InvoiceDialog from "@/components/widgets/InvoiceDialog";

const Sales = () => {
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sales);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = sales.filter(
      (sale) =>
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSales(filtered);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Sales
        </h1>
        <Button className="py-3 bg-bliss-500 text-white hover:text-white hover:bg-bliss-400">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      <div className="w-full max-w-sm">
        <Label htmlFor="search" className="inline-block mb-2">
          Search Sales
        </Label>
        <Input
          id="search"
          placeholder="Search by customer or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="focus-visible:ring-bliss-500 focus-visible:ring-[1.5px] focus-visible:border-0"
        />
      </div>

      <div className="grid gap-4">
        {filteredSales.map((sale) => (
          <Card
            key={sale.id}
            className="p-4 shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{sale.customer}</h3>
                <p className="text-sm text-muted-foreground">ID: {sale.id}</p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(sale.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right space-y-2">
                <p className="font-medium text-bliss-500">
                  {formatNaira(sale.totalAmount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sale.items.length} items
                </p>
                <InvoiceDialog sale={sale} />
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {sale.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {item.size} × {item.quantity}
                  </span>
                  <span>{formatNaira(item.total)}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sales;
