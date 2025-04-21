import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatNaira } from "@/services/mockData";
import InvoiceDialog from "@/components/widgets/Dialogs/InvoiceDialog";
import { sale1, sale2, sale3 } from "@/services/mockOrderData";
import { Sale } from "@/types";

const Orders = () => {
  // Use mockOrderData for now - in a real app this would come from an API
  const mockOrders: Sale[] = [sale1, sale2, sale3];

  const [orders, setOrders] = useState<Sale[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term.trim()) {
      setOrders(mockOrders);
      return;
    }

    const filtered = mockOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term) ||
        order.date.toLowerCase().includes(term)
    );

    setOrders(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium">No orders found</h2>
          <p className="text-muted-foreground mt-2">
            {searchTerm
              ? "Try a different search term"
              : "You haven't placed any orders yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "pending"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status === "pending" ? "Processing" : order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()} •{" "}
                    {order.items.length} items
                  </p>
                  <p className="font-medium text-primary mt-2">
                    {formatNaira(order.totalAmount)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <InvoiceDialog sale={order} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
