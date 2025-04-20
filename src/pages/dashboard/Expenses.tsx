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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Plus,
  Search,
  FileText,
  Package,
  Truck,
  Scissors,
} from "lucide-react";
import { expenses, formatNaira, materials } from "@/services/mockData";
// import { Expense, Material } from "@/types";

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Material expense form state
  const [materialName, setMaterialName] = useState("");
  const [materialType, setMaterialType] = useState("bedsheet");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [materialUnit, setMaterialUnit] = useState("yards");
  const [materialCostPerUnit, setMaterialCostPerUnit] = useState("");

  // Other expense form state
  const [expenseCategory, setExpenseCategory] = useState("transport");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Filter expenses by category and search term
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate total costs
  const totalMaterialCost = materials.reduce(
    (sum, material) => sum + material.totalCost,
    0
  );
  const totalOtherCost = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the expense to the database
    alert("Material expense added successfully!");
    // Reset form fields
    setMaterialName("");
    setMaterialType("bedsheet");
    setMaterialQuantity("");
    setMaterialUnit("yards");
    setMaterialCostPerUnit("");
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the expense to the database
    alert("Expense added successfully!");
    // Reset form fields
    setExpenseCategory("transport");
    setExpenseDescription("");
    setExpenseAmount("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Expense Tracking
        </h1>
        <p className="text-muted-foreground">
          Manage and track your business expenses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
          <CardHeader className="bg-bliss-blue/20 pb-2">
            <CardTitle className="text-lg flex text-neutral-800 items-center">
              <Package className="h-5 w-5 mr-2 text-blue-600" />
              Material Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-xl font-semibold text-neutral-800">
              {formatNaira(totalMaterialCost)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total spent on materials
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
          <CardHeader className="bg-bliss-lavender/20 pb-2">
            <CardTitle className="text-lg flex items-center text-neutral-800">
              <Truck className="h-5 w-5 mr-2 text-purple-600" />
              Other Costs
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-xl font-semibold text-neutral-800">
              {formatNaira(totalOtherCost)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Transport, thread, etc.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
          <CardHeader className="bg-bliss-cream/30 pb-2">
            <CardTitle className="text-lg flex items-center text-neutral-800">
              <DollarSign className="h-5 w-5 mr-2 text-yellow-600" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-xl font-semibold text-neutral-800">
              {formatNaira(totalMaterialCost + totalOtherCost)}
            </p>
            <p className="text-sm text-gray-500 mt-1">All expenses combined</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="view">
        <TabsList className="grid sm:max-w-sm grid-cols-2 w-full mb-4 h-max p-1 bg-bliss-100">
          <TabsTrigger
            value="view"
            className="data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            View Expenses
          </TabsTrigger>
          <TabsTrigger
            value="add"
            className="data-[state=active]:bg-bliss-500 data-[state=active]:text-white py-2"
          >
            Add New Expense
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view">
          <Card className="bg-white border shadow-[0_0_10px_rgba(0,0,0,.02)] border-bliss-200/80">
            <CardHeader>
              <CardTitle className="text-lg">Expense History</CardTitle>
              <CardDescription>
                View and filter your past expenses
              </CardDescription>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search expenses..."
                    className="pl-9 focus-visible:ring-bliss-500 focus-visible:ring-2 focus-visible:border-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full focus:border-2 focus:border-bliss-500 sm:w-[200px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="thread">Thread</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-white border shadow-[0_0_10px_rgba(0,0,0,.02)] border-bliss-200/80">
                <div className="grid grid-cols-4 p-3 bg-muted/50 font-medium">
                  <div>Description</div>
                  <div>Category</div>
                  <div>Date</div>
                  <div className="text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="grid grid-cols-4 p-3 items-center"
                      >
                        <div>{expense.description}</div>
                        <div className="capitalize">{expense.category}</div>
                        <div className="capitalize">{expense.date}</div>
                        <div className="text-right font-medium">
                          {formatNaira(expense.amount)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No expenses found matching your filters
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Material Expense Form */}
            <Card className="bg-white border shadow-[0_0_10px_rgba(0,0,0,.02)] border-bliss-200/80">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Add Material Expense
                </CardTitle>
                <CardDescription>
                  Record expenses for bedsheet materials or packaging
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMaterialSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-type">Material Type</Label>
                    <Select
                      value={materialType}
                      onValueChange={setMaterialType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bedsheet">
                          Bedsheet Material
                        </SelectItem>
                        <SelectItem value="packaging">
                          Packaging Material
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="material-name">Material Name</Label>
                    <Input
                      id="material-name"
                      placeholder="e.g., Premium Cotton"
                      value={materialName}
                      className="placeholder:text-sm"
                      onChange={(e) => setMaterialName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="e.g., 50"
                        value={materialQuantity}
                        onChange={(e) => setMaterialQuantity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={materialUnit}
                        onValueChange={setMaterialUnit}
                      >
                        <SelectTrigger id="unit" className="w-full">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yards">Yards</SelectItem>
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="dozens">Dozens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost-per-unit">Cost Per Unit (₦)</Label>
                    <Input
                      id="cost-per-unit"
                      type="number"
                      placeholder="e.g., 1000"
                      value={materialCostPerUnit}
                      onChange={(e) => setMaterialCostPerUnit(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-bliss-500 h-auto py-3 hover:bg-bliss-400"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Material Expense
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Other Expense Form */}
            <Card className="bg-white border shadow-[0_0_10px_rgba(0,0,0,.02)] border-bliss-200/80">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Add Other Expense
                </CardTitle>
                <CardDescription>
                  Record transport, thread, or other expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleExpenseSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="expense-category">Expense Category</Label>
                    <Select
                      value={expenseCategory}
                      onValueChange={setExpenseCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transport">
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-2" />
                            <span>Transportation</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="thread">
                          <div className="flex items-center">
                            <Scissors className="h-4 w-4 mr-2" />
                            <span>Thread</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-description">Description</Label>
                    <Input
                      id="expense-description"
                      placeholder="e.g., Delivery to warehouse"
                      value={expenseDescription}
                      onChange={(e) => setExpenseDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expense-amount">Amount (₦)</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      placeholder="e.g., 5000"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-bliss-500 h-auto py-3 hover:bg-bliss-400"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;
