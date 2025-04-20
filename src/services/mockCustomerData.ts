export interface MockCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

// Helper function to generate a random date in the last 60 days
function randomRecentDate(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 60);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
}

// Helper function to generate a random Nigerian phone number
function generateRandomPhone(): string {
  const prefixes = ["080", "070", "081", "090", "091"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let result = randomPrefix;

  // Add 8 more digits
  for (let i = 0; i < 8; i++) {
    result += Math.floor(Math.random() * 10);
  }

  return result;
}

// Names to use for mock customers
const firstNames = [
  "Adeola",
  "Chibuike",
  "Ngozi",
  "Oluwaseun",
  "Chinedu",
  "Funmilayo",
  "Emeka",
  "Yewande",
  "Obinna",
  "Folake",
  "Tunde",
  "Amara",
  "Oluwasegun",
  "Chinwe",
  "Akin",
];

const lastNames = [
  "Adeyemi",
  "Okafor",
  "Okonkwo",
  "Eze",
  "Adebayo",
  "Nwachukwu",
  "Obasanjo",
  "Afolabi",
  "Okoye",
  "Adeleke",
  "Ibrahim",
  "Mohammed",
  "Yusuf",
  "Balogun",
  "Olawale",
];

export function generateMockCustomers(count: number = 10): MockCustomer[] {
  const customers: MockCustomer[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;

    // Generate a lowercase email based on name
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(
      Math.random() * 100
    )}@example.com`;

    // Generate a random order count between 1 and 10
    const orderCount = Math.floor(Math.random() * 10) + 1;

    // Generate a random total spent between ₦10,000 and ₦500,000
    const totalSpent = Math.floor(Math.random() * 490000) + 10000;

    customers.push({
      id: `c${i + 1}`,
      name,
      email,
      phone: generateRandomPhone(),
      orderCount,
      totalSpent,
      lastOrderDate: randomRecentDate(),
    });
  }

  return customers;
}

// Export some specific mock customers that can be referenced directly
export const customer1: MockCustomer = {
  id: "c1",
  name: "Oluwaseyi Adeyemi",
  email: "oluwaseyi.adeyemi@example.com",
  phone: "08012345678",
  orderCount: 5,
  totalSpent: 120000,
  lastOrderDate: "2023-04-15T10:30:00Z",
};

export const customer2: MockCustomer = {
  id: "c2",
  name: "Chioma Okafor",
  email: "chioma.okafor@example.com",
  phone: "07098765432",
  orderCount: 3,
  totalSpent: 84000,
  lastOrderDate: "2023-04-10T14:45:00Z",
};
