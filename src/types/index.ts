// Common types used throughout the application

export type UserRole = "admin" | "staff";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type BedSize = "4.5" | "4x6" | "6x6" | "6x6-pillows";

export interface BedsheetPrice {
  size: BedSize;
  price: number;
}

export interface Material {
  id: string;
  type: "bedsheet" | "packaging";
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  date: string;
}

export interface Sale {
  id: string;
  customer: string;
  items: SaleItem[];
  totalAmount: number;
  date: string;
  soldBy: string;
}

export interface SaleItem {
  id: string;
  size: BedSize;
  quantity: number;
  pricePerUnit: number;
  discount: number;
  total: number;
}

export interface Expense {
  id: string;
  category: "material" | "transport" | "thread" | "other";
  description: string;
  amount: number;
  date: string;
}

export interface StockItem {
  id: string;
  type: "bedsheet" | "packaging";
  name: string;
  size?: BedSize;
  quantity: number;
  alertThreshold: number;
}

export interface FinancialSummary {
  totalSales: number;
  totalExpenses: number;
  profit: number;
  totalStock: number;
}
