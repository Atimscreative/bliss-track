import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, Search, AlertTriangle } from "lucide-react";
import { stock } from "@/services/mockData";
import { cn } from "@/lib/utils";
// import { StockItem } from "@/types";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("bedsheet");
  const [newItemSize, setNewItemSize] = useState("4.5");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemThreshold, setNewItemThreshold] = useState("");

  // Filter stock by type and search term
  const filteredStock = stock.filter((item) => {
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Low stock items
  const lowStockItems = stock.filter(
    (item) => item.quantity <= item.alertThreshold
  );

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the item to the database
    alert("Stock item added successfully!");
    // Reset form fields
    setNewItemName("");
    setNewItemType("bedsheet");
    setNewItemSize("4.5");
    setNewItemQuantity("");
    setNewItemThreshold("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Inventory Management
        </h1>
        <p className="text-muted-foreground">
          Track and manage your bedsheet and packaging inventory.
        </p>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-amber-300 bg-amber-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-amber-800">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Only {item.quantity} left (Alert threshold:{" "}
                      {item.alertThreshold})
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Stock
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="view">
        <TabsList className="grid sm:max-w-sm grid-cols-2 w-full mb-4 h-max p-1 bg-bliss-100">
          <TabsTrigger
            value="view"
            className="data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            View Inventory
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            Add New Stock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle>Current Stock</CardTitle>
              <CardDescription>
                Manage your bedsheet and packaging inventory
              </CardDescription>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search inventory..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("all")}
                    className="flex-1 sm:flex-none"
                  >
                    All
                  </Button>
                  <Button
                    variant={
                      selectedType === "bedsheet" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedType("bedsheet")}
                    className="flex-1 sm:flex-none"
                  >
                    Bedsheets
                  </Button>
                  <Button
                    variant={
                      selectedType === "packaging" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedType("packaging")}
                    className="flex-1 sm:flex-none"
                  >
                    Packaging
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
                <div className="grid grid-cols-4 p-3 bg-muted/50 font-medium">
                  <div>Item</div>
                  <div>Type</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredStock.length > 0 ? (
                    filteredStock.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-4 p-3 items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.type === "bedsheet" && (
                            <p className="text-xs text-gray-500">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <div className="capitalize">{item.type}</div>
                        <div className="text-center">
                          <span
                            className={
                              item.quantity <= item.alertThreshold
                                ? "text-red-600 font-bold"
                                : ""
                            }
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <div className="text-right space-x-2">
                          <Button variant="outline" size="sm">
                            +/-
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No inventory items found matching your filters
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Add New Stock
              </CardTitle>
              <CardDescription>
                Add new bedsheets or packaging materials to your inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-lg">
                <form onSubmit={handleAddStock} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-type">Item Type</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="type-bedsheet"
                          name="item-type"
                          value="bedsheet"
                          checked={newItemType === "bedsheet"}
                          onChange={() => setNewItemType("bedsheet")}
                          className="mr-2"
                        />
                        <Label htmlFor="type-bedsheet">Bedsheet</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="type-packaging"
                          name="item-type"
                          value="packaging"
                          checked={newItemType === "packaging"}
                          onChange={() => setNewItemType("packaging")}
                          className="mr-2"
                        />
                        <Label htmlFor="type-packaging">Packaging</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input
                      id="item-name"
                      placeholder="e.g., Premium Cotton Bedsheet"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      required
                    />
                  </div>

                  {newItemType === "bedsheet" && (
                    <div className="space-y-2">
                      <Label htmlFor="item-size">Bedsheet Size</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["4.5", "4x6", "6x6", "6x6-pillows"].map((size) => (
                          <Button
                            key={size}
                            type="button"
                            variant={
                              newItemSize === size ? "default" : "outline"
                            }
                            onClick={() => setNewItemSize(size)}
                            className={cn(
                              "justify-center ",
                              newItemSize === size
                                ? "bg-bliss-500 text-white hover:bg-bliss-400 hover:text-white"
                                : "border-2 border-bliss-500 text-bliss-500 hover:bg-bliss-100 hover:text-bliss-500"
                            )}
                          >
                            {size === "6x6-pillows" ? "6x6 + Pillows" : size}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 10"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="threshold">
                        Low Stock Alert Threshold
                        <span className="text-xs text-gray-500 block">
                          Alert when stock falls below this number
                        </span>
                      </Label>
                      <Input
                        id="threshold"
                        type="number"
                        placeholder="e.g., 5"
                        value={newItemThreshold}
                        onChange={(e) => setNewItemThreshold(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full py-3 bg-bliss-500 hover:bg-bliss-400 text-white"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Inventory
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
