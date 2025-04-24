import {
  User,
  BedsheetPrice,
  Material,
  Sale,
  Expense,
  StockItem,
  FinancialSummary,
} from "../types";

// Mock users data
export const users: User[] = [
  {
    id: "1",
    email: "admin@blisstrack.com",
    name: "Oluwaseyi (Admin)",
    role: "admin",
  },
  {
    id: "2",
    email: "staff1@blisstrack.com",
    name: "Daughter 1",
    role: "staff",
  },
];

// Mock bedsheet prices
export const prices: BedsheetPrice[] = [
  { size: "4.5", price: 12000 },
  { size: "4x6", price: 15000 },
  { size: "6x6", price: 18000 },
  { size: "6x6-pillows", price: 22000 },
];

// Mock materials/expenses data
export const materials: Material[] = [
  {
    id: "m1",
    type: "bedsheet",
    name: "Premium Cotton",
    quantity: 50,
    unit: "yards",
    costPerUnit: 1000,
    totalCost: 50000,
    date: "2023-04-10",
  },
  {
    id: "m2",
    type: "packaging",
    name: "Plastic Bags",
    quantity: 100,
    unit: "pieces",
    costPerUnit: 200,
    totalCost: 20000,
    date: "2023-04-15",
  },
];

// Mock sales data
export const sales: Sale[] = [
  {
    id: "s1",
    customer: "John Doe",
    items: [
      {
        id: "si1",
        size: "4x6",
        quantity: 2,
        pricePerUnit: 15000,
        discount: 0,
        total: 30000,
      },
    ],
    totalAmount: 30000,
    date: "2023-04-20",
    soldBy: "1",
  },
  {
    id: "s2",
    customer: "Jane Smith",
    items: [
      {
        id: "si2",
        size: "6x6-pillows",
        quantity: 1,
        pricePerUnit: 22000,
        discount: 2000,
        total: 20000,
      },
    ],
    totalAmount: 20000,
    date: "2023-04-22",
    soldBy: "2",
  },
];

// Mock expenses data
export const expenses: Expense[] = [
  {
    id: "e1",
    category: "material",
    description: "Premium Cotton Material",
    amount: 50000,
    date: "2023-04-10",
  },
  {
    id: "e2",
    category: "transport",
    description: "Delivery to warehouse",
    amount: 5000,
    date: "2023-04-12",
  },
  {
    id: "e3",
    category: "thread",
    description: "Sewing thread",
    amount: 3000,
    date: "2023-04-15",
  },
];

// Mock stock data
export const stock: StockItem[] = [
  {
    id: "st1",
    type: "bedsheet",
    name: "4.5 Bedsheet",
    size: "4.5",
    quantity: 15,
    alertThreshold: 5,
  },
  {
    id: "st2",
    type: "bedsheet",
    name: "4x6 Bedsheet",
    size: "4x6",
    quantity: 10,
    alertThreshold: 5,
  },
  {
    id: "st3",
    type: "bedsheet",
    name: "6x6 Bedsheet",
    size: "6x6",
    quantity: 8,
    alertThreshold: 3,
  },
  {
    id: "st4",
    type: "bedsheet",
    name: "6x6 Bedsheet with Pillowcases",
    size: "6x6-pillows",
    quantity: 5,
    alertThreshold: 3,
  },
  {
    id: "st5",
    type: "packaging",
    name: "Plastic Bags",
    quantity: 50,
    alertThreshold: 20,
  },
  {
    id: "st6",
    type: "packaging",
    name: "Fancy Bags",
    quantity: 25,
    alertThreshold: 10,
  },
];

// Mock financial summary
export const financialSummary: FinancialSummary = {
  totalSales: 50000,
  totalExpenses: 58000,
  profit: -8000,
  totalStock: 38,
};

