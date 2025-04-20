import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Search, User, Mail, Phone } from "lucide-react";
import { generateMockCustomers } from "@/services/mockCustomerData";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

const Customers = () => {
  // Generate some mock customers
  const mockCustomers = generateMockCustomers(15);

  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term.trim()) {
      setCustomers(mockCustomers);
      return;
    }

    const filtered = mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
    );

    setCustomers(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {customers.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-lg font-medium">No customers found</h2>
            <p className="text-muted-foreground mt-2">
              Try a different search term
            </p>
          </div>
        ) : (
          customers.map((customer) => (
            <Card key={customer.id} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> {customer.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" /> {customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" /> {customer.phone}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {customer.orderCount} orders
                  </p>
                  <p className="font-medium">
                    Last order:{" "}
                    {new Date(customer.lastOrderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Customers;
