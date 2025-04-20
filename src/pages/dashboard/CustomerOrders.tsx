import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatNaira } from "@/services/mockData";
import { sales } from "@/services/mockData";
import { Sale } from "@/types";
import InvoiceDialog from "@/components/widgets/InvoiceDialog";
// import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerOrders = () => {
  const [orders, setOrders] = useState<Sale[]>(sales);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  // const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (
    orderId: string,
    newStatus: "pending" | "completed" | "cancelled"
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // toast({
    //   title: "Order status updated",
    //   description: `Order #${orderId} has been marked as ${newStatus}`,
    // });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Orders</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by customer or ID..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-lg font-medium">No orders found</h2>
            <p className="text-muted-foreground mt-2">
              Try changing your search criteria
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{order.customer}</h3>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "pending"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {order.status || "Processing"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order #{order.id} •{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} items
                  </p>
                  <p className="font-medium text-primary mt-2">
                    {formatNaira(order.totalAmount)}
                  </p>
                </div>

                <div className="space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                  <InvoiceDialog sale={order} />

                  {(!order.status || order.status === "pending") && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() =>
                          handleUpdateStatus(order.id, "completed")
                        }
                      >
                        <Check className="h-4 w-4" /> Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          handleUpdateStatus(order.id, "cancelled")
                        }
                      >
                        <X className="h-4 w-4" /> Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
