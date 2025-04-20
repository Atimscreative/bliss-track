import { Sale } from "@/types";

// Mock sale data for use in the Orders component
export const sale1: Sale = {
  id: "ord-123456",
  customer: "Oluwaseyi Adeyemi",
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
  date: "2023-04-15T10:30:00Z",
  soldBy: "staff1",
  status: "completed",
};

export const sale2: Sale = {
  id: "ord-789012",
  customer: "Chioma Okafor",
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
  date: "2023-04-20T14:45:00Z",
  soldBy: "staff2",
  status: "pending",
};

export const sale3: Sale = {
  id: "ord-345678",
  customer: "Ibrahim Mohammed",
  items: [
    {
      id: "si3",
      size: "4.5",
      quantity: 1,
      pricePerUnit: 12000,
      discount: 0,
      total: 12000,
    },
    {
      id: "si4",
      size: "6x6",
      quantity: 1,
      pricePerUnit: 18000,
      discount: 1000,
      total: 17000,
    },
  ],
  totalAmount: 29000,
  date: "2023-04-18T09:15:00Z",
  soldBy: "staff1",
  status: "completed",
};

export const mockOrders: Sale[] = [sale1, sale2, sale3];
