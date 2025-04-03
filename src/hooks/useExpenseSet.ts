import { ExpenseItem, ExpenseSet } from "@/pages/dashboard/DashboardOld";
import { useState } from "react";

const useExpenseSets = () => {
  const [expenseSets, setExpenseSets] = useState<ExpenseSet[]>([]);

  const addExpenseSet = (
    bedsheetsProduced: number,
    expenses: ExpenseItem[]
  ) => {
    const totalCost = expenses.reduce(
      (sum, item) => sum + (item.totalCost || item.amount || 0),
      0
    );
    const costPerBedsheet = bedsheetsProduced
      ? totalCost / bedsheetsProduced
      : 0;

    const newExpenseSet: ExpenseSet = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      expenses,
      bedsheetsProduced,
      totalCost,
      costPerBedsheet,
    };

    setExpenseSets([...expenseSets, newExpenseSet]);
  };

  return { expenseSets, addExpenseSet };
};

export default useExpenseSets;
