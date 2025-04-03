import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Dashboard() {
  const [allExpenses, setAllExpenses] = useState([]);
  const handleNewSale = (saleData) => {
    console.log("New sale recorded:", saleData);
    // You can now save the sale data to a database or update the state
  };

  const handleExpenses = (expensesData) => {
    console.log("New sale recorded:", expensesData);
    setAllExpenses(expensesData);
    // You can now save the expenses data to a database or update the state
  };

  return (
    <div>
      <div className="p-4 rounded border">sales: 20</div>
      {allExpenses?.length > 0 && (
        <ExpenseSetCard expenseSet={allExpenses[0]} />
      )}
      <h3>ADD EXPENSES</h3>
      <div>
        <ExpenseForm onAddExpenses={handleExpenses} />

        <AddSale onSave={handleNewSale} />
      </div>
    </div>
  );
}

export type ExpenseType =
  | "bedsheet_material"
  | "plastic_packaging"
  | "fancy_bag"
  | "transportation"
  | "thread"
  | "bedsheets_procured";

export interface ExpenseItem {
  type: ExpenseType;
  amount?: number; // For direct amount expenses (transportation, thread)
  quantity?: number; // For materials like packaging or fancy bags
  ratePerUnit?: number; // For bedsheet material (rate per yard)
  totalCost?: number; // Auto-calculated for applicable expenses
}

export interface ExpenseSet {
  id: string; // Unique ID for the batch
  date: string; // Date of purchase
  expenses: ExpenseItem[];
  bedsheetsProduced?: number; // Number of bedsheets from this batch
  totalCost: number; // Sum of all expenses in the batch
  costPerBedsheet: number; // Auto-calculated (totalCost / bedsheetsProduced)
}

const ExpenseForm = ({ onAddExpenses }) => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  const addExpense = (type: ExpenseType) => {
    const newExpense: ExpenseItem = { type };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (
    index: number,
    field: keyof ExpenseItem,
    value: number
  ) => {
    const updatedExpenses = expenses.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );

    // Auto-calculate cost for bedsheet material
    if (updatedExpenses[index].type === "bedsheet_material") {
      const { quantity, ratePerUnit } = updatedExpenses[index];
      if (quantity && ratePerUnit) {
        updatedExpenses[index].totalCost = quantity * ratePerUnit;
      }
    }

    setExpenses(updatedExpenses);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Add Expenses</h2>

        {expenses.map((expense, index) => (
          <div key={index} className="p-2 mb-2 border rounded">
            <p className="font-medium">
              {expense.type.replace("_", " ").toUpperCase()}
            </p>

            {/* Bedsheet Material Input */}
            {expense.type === "bedsheet_material" && (
              <>
                <input
                  type="number"
                  placeholder="Number of yards"
                  className="input"
                  onChange={(e) =>
                    updateExpense(index, "quantity", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  placeholder="Rate per yard"
                  className="input"
                  onChange={(e) =>
                    updateExpense(index, "ratePerUnit", Number(e.target.value))
                  }
                />
                <p>Total Cost: ₦{expense.totalCost || 0}</p>
              </>
            )}

            {/* Packaging & Fancy Bag Inputs */}
            {expense.type === "plastic_packaging" ||
            expense.type === "fancy_bag" ? (
              <>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="input"
                  onChange={(e) =>
                    updateExpense(index, "amount", Number(e.target.value))
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input"
                  onChange={(e) =>
                    updateExpense(index, "quantity", Number(e.target.value))
                  }
                />
              </>
            ) : null}

            {/* Transportation & Thread Fee */}
            {(expense.type === "transportation" ||
              expense.type === "thread") && (
              <input
                type="number"
                placeholder="Enter amount"
                className="input"
                onChange={(e) =>
                  updateExpense(index, "amount", Number(e.target.value))
                }
              />
            )}

            {/* Bedsheets Procured */}
            {expense.type === "bedsheets_procured" && (
              <input
                type="number"
                placeholder="Number of bedsheets"
                className="input"
                onChange={(e) =>
                  updateExpense(index, "quantity", Number(e.target.value))
                }
              />
            )}
          </div>
        ))}

        <button onClick={() => onAddExpenses(expenses)}>Save expenses</button>

        {/* Buttons to Add Expenses */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => addExpense("bedsheet_material")}
            className="btn"
          >
            Bedsheet Material
          </button>
          <button
            onClick={() => addExpense("plastic_packaging")}
            className="btn"
          >
            Plastic Packaging
          </button>
          <button onClick={() => addExpense("fancy_bag")} className="btn">
            Fancy Bag
          </button>
          <button onClick={() => addExpense("transportation")} className="btn">
            Transportation
          </button>
          <button onClick={() => addExpense("thread")} className="btn">
            Thread
          </button>
          <button
            onClick={() => addExpense("bedsheets_procured")}
            className="btn"
          >
            Bedsheets Procured
          </button>
        </div>
      </div>
    </>
  );
};

// const handleAddExpenseSet = () => {
//   const newExpenses: ExpenseItem[] = [
//     {
//       type: "bedsheet_material",
//       quantity: 10,
//       ratePerUnit: 500,
//       totalCost: 5000,
//     },
//     { type: "plastic_packaging", amount: 2000 },
//     { type: "fancy_bag", amount: 1500 },
//     { type: "transportation", amount: 1000 },
//     { type: "thread", amount: 500 },
//   ];

//   addExpenseSet(20, newExpenses); // Example: 20 bedsheets produced from this batch
// };

// ADDING SALES

const bedSizes = [
  { label: "4 1/2", value: "4_1_2", price: 5000 },
  { label: "4x6", value: "4x6", price: 7000 },
  { label: "6x6", value: "6x6", price: 9000 },
  { label: "6x6 (4 Pillowcases)", value: "6x6_4pillow", price: 11000 },
];

const AddSale = ({ onSave }: any) => {
  const [sales, setSales] = useState<any[]>([]);

  const addSaleItem = () => {
    setSales([
      ...sales,
      { id: crypto.randomUUID(), bedSize: "", quantity: "", soldPrice: "" },
    ]);
  };

  const updateSaleItem: any = (id, field, value) => {
    setSales(
      sales.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = () => {
    const totalAmount = sales.reduce(
      (sum, item) => sum + item.quantity * item.soldPrice,
      0
    );
    onSave({
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      items: sales,
      totalAmount,
    });
    setSales([]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-3">Add New Sale</h2>
      {sales.map((sale, index) => (
        <div key={sale.id} className="mb-3 p-2 border rounded">
          <select
            className="w-full p-2 border rounded mb-2"
            value={sale.bedSize}
            onChange={(e) => updateSaleItem(sale.id, "bedSize", e.target.value)}
          >
            <option value="">Select Bed Size</option>
            {bedSizes.map((bs) => (
              <option key={bs.value} value={bs.value}>
                {bs.label} - ₦{bs.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            value={sale.quantity}
            onChange={(e) =>
              updateSaleItem(sale.id, "quantity", Number(e.target.value))
            }
            placeholder="Quantity"
          />
          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            value={sale.soldPrice}
            onChange={(e) =>
              updateSaleItem(sale.id, "soldPrice", Number(e.target.value))
            }
            placeholder="Sold Price (₦)"
          />
        </div>
      ))}
      <button
        onClick={addSaleItem}
        className="w-full p-2 bg-gray-200 rounded mb-2"
      >
        + Add Another Size
      </button>
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Save Sale
      </button>
    </div>
  );
};

const ExpenseSetCard = ({ expenseSet }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full sm:w-96">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Expense Set - {expenseSet?.id || "AJS8839"}
      </h3>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Bedsheet Material</span>
        <div className="flex justify-between text-gray-700">
          <span>{expenseSet?.bedsheetMaterial?.yards || 10} yards</span>
          <span>₦{expenseSet?.bedsheetMaterial?.cost || 20000}</span>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Packaging</span>
        <div className="flex justify-between text-gray-700">
          <span>{expenseSet?.packaging?.quantity || 3} pcs</span>
          <span>₦{expenseSet?.packaging?.cost || 4000}</span>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Fancy Bags</span>
        <div className="flex justify-between text-gray-700">
          <span>{expenseSet?.fancyBags?.dozens || 3} dozen</span>
          <span>₦{expenseSet?.fancyBags?.cost || 3000}</span>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Transportation Fee</span>
        <div className="flex justify-between text-gray-700">
          <span>{expenseSet?.transportationFee || 1200} ₦</span>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-sm text-gray-500">Thread Fee</span>
        <div className="flex justify-between text-gray-700">
          <span>{expenseSet?.threadFee || 0} ₦</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-700">
          Total: ₦{expenseSet?.totalCost || 230405}
        </span>
        <button className="text-blue-500 hover:text-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};


const SaleCard = ({ sale }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full sm:w-96">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Sale ID: {sale.id}
      </h3>
      {sale.items.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500">{item.bedSize}</span>
            <span className="text-gray-700">{item.quantity} pcs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Sold Price</span>
            <span className="text-gray-700">₦{item.soldPrice}</span>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold text-gray-700">
          Total: ₦{sale.totalAmount}
        </span>
        <button className="text-blue-500 hover:text-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};
