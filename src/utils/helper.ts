// Helper to format numbers as Naira
export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// To Get total cart Items
export const totalCartItems = (items: any[]) =>
  items.reduce((acc, cur) => acc + cur.quantity, 0);

// Calculate Total cart price
export const totalCartPrice = (items: any[]) =>
  items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
