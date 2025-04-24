import MetricCard from "@/components/widgets/cards/MetricCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
  TrendingDown,
} from "lucide-react";
import {
  financialSummary,
  // sales,
  // expenses,
  stock,
} from "@/services/mockData";

import { formatNaira } from "@/utils/helper";
import { useEffect } from "react";
import { account, databases } from "@/services/appwrite";
// import { useAuth } from "@/hooks/useAuth";
import { ADMIN_COLLECTION, DATABASE_ID } from "@/services/config";

const lowStockItems = stock.filter(
  (item) => item.quantity <= item.alertThreshold
);

const salesData = [
  { name: "Jan", amount: 20000 },
  { name: "Feb", amount: 35000 },
  { name: "Mar", amount: 28000 },
  { name: "Apr", amount: 50000 },
];

const stockData = [
  { name: "4.5", value: 15 },
  { name: "4x6", value: 10 },
  { name: "6x6", value: 8 },
  { name: "6x6 Pillows", value: 5 },
];

const COLORS = ["#aa88fd", "#63a1f7", "#fcdd4d", "#f59f74", "#d0f4a2"];

const chartData = [
  {
    name: "Jan",
    sales: 45000,
    expenses: 30000,
    profit: 15000,
  },
  {
    name: "Feb",
    sales: 52000,
    expenses: 32000,
    profit: 20000,
  },
  {
    name: "Mar",
    sales: 48000,
    expenses: 28000,
    profit: 20000,
  },
  {
    name: "Apr",
    sales: 70000,
    expenses: 42000,
    profit: 28000,
  },
  {
    name: "May",
    sales: 95000,
    expenses: 55000,
    profit: 40000,
  },
  {
    name: "Jun",
    sales: 125000,
    expenses: 75000,
    profit: 50000,
  },
];

const Dashboard = () => {
  useEffect(() => {
    async function getUser() {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID, // databaseId
          ADMIN_COLLECTION, // collectionId
          [] // queries (optional)
        );

        const result = await account.get();

        console.log(res.documents, result);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
          Dashboard
        </h1>
        <p className="text-neutral-500">Overview of your bedding business.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={formatNaira(financialSummary.totalSales)}
          icon={ShoppingBag}
        />
        <MetricCard
          title="Total Expenses"
          value={formatNaira(financialSummary.totalExpenses)}
          icon={DollarSign}
        />
        <MetricCard
          title="Current Stock"
          value={`${financialSummary.totalStock} Items`}
          icon={Package}
        />
        <MetricCard
          title="Profit/Loss"
          value={formatNaira(financialSummary.profit)}
          icon={financialSummary.profit >= 0 ? TrendingUp : TrendingDown}
          iconClassName={
            financialSummary.profit >= 0 ? "bg-green-500" : "bg-red-500"
          }
        />
      </div>
      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>
            View your business performance over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `₦${value}`}
                  labelStyle={{ color: "#333" }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill="#9b87f5"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#FDA4AF"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="profit"
                  name="Profit"
                  fill="#86EFAC"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-800">
              Monthly Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => formatNaira(value as number)}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="amount"
                    name="Sales"
                    className="fill-bliss-500"
                    fill="#8c62f0"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stock Distribution */}
        <Card className="shadow-[0_0_10px_rgba(0,0,0,.02)] bg-white border border-bliss-200/80">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-800">
              Stock Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {stockData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} items`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-amber-300">
          <CardHeader className="bg-amber-50 border-b border-amber-200">
            <CardTitle className="text-lg flex items-center text-amber-800">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Current: {item.quantity} | Alert when below:{" "}
                      {item.alertThreshold}
                    </p>
                  </div>
                  <div className="text-amber-600 font-semibold">Low Stock</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;

/* 
4½ ft → Twin

6×6 ft → King

4×6 ft → Single

6×6 ft (4P) → King+


  */
