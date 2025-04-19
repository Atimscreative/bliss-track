import MetricCard from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import {
  financialSummary,
  formatNaira,
  // sales,
  // expenses,
  stock,
} from "@/services/mockData";

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

const COLORS = ["#E5DEFF", "#D3E4FD", "#FEF7CD", "#FDE1D3", "#F2FCE2"];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-800">
          Dashboard
        </h1>
        <p className="text-neutral-500">Overview of your bedding business.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value={formatNaira(financialSummary.totalSales)}
          icon={ShoppingBag}
          iconClassName="bg-primary"
          className="bg-white"
        />
        <MetricCard
          title="Total Expenses"
          value={formatNaira(financialSummary.totalExpenses)}
          icon={DollarSign}
          iconClassName="bg-accent"
          className="bg-white"
        />
        <MetricCard
          title="Current Stock"
          value={`${financialSummary.totalStock} Items`}
          icon={Package}
          iconClassName="bg-secondary"
          className="bg-white"
        />
        <MetricCard
          title="Profit/Loss"
          value={formatNaira(financialSummary.profit)}
          icon={TrendingUp}
          iconClassName={
            financialSummary.profit >= 0 ? "bg-green-500" : "bg-red-500"
          }
          className="bg-white"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Sales</CardTitle>
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
                  <Bar dataKey="amount" name="Sales" fill="#E5DEFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stock Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stock Distribution</CardTitle>
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
                    {stockData.map((entry, index) => (
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


   <div>
      <header className=" py-4">
        <div className="wrapper flex justify-between">
          <div>
            <div className="inline-flex gap-3">
              <Sun1 size={24} variant="Outline" className="fill-main" />
              <p>Wed, 25 Apr 2025 </p>
            </div>
            <h1 className="font-semibold text-xl">Welcome, Oluwaseyi Bliss!</h1>
          </div>

    
          <span className="border-2 rounded-full border-main w-10 h-10 inline-flex justify-center items-center">
            BT
          </span>
        </div>
      </header>
      <section>
        <div className="wrapper grid grid-cols-2 gap-2">
          <div className="p-6 bg-gradient-to-bl from-0% relative to-100 rounded-2xl from-[#4A1716] to-[#9C302D]">
            <span className="text-bg bg-black/30 absolute top-2 right-2 w-8 h-8 rounded-full inline-flex justify-center items-center">
              <ArrowUpRight size={24} color="#fff" />
            </span>
            <span className="block text-bg">Expenses</span>
            <span className="block font-medium text-bg text-2xl my-1">
              ₦210,450
            </span>
            <span className="block text-xs text-surface">17 transaction</span>
          </div>

          <div className="p-6 bg-gradient-to-bl relative from-0% to-100 rounded-2xl from-[#1A3D10] to-[#2A8D2A]">
            <span className="text-bg bg-black/30 absolute top-2 right-2 w-8 h-8 rounded-full inline-flex justify-center items-center">
              <ArrowDownLeft size={24} color="#fff" />
            </span>
            <span className="block text-bg">Sales</span>
            <span className="block font-medium text-bg text-2xl my-1">
              ₦210,450
            </span>
            <span className="block text-xs text-surface">5 transaction</span>
          </div>

          <div className="bg-main p-6 rounded-2xl">
            <span className="block font-medium text-heading text-2xl">
              ₦210,450
            </span>
            <span className="text-sm text-body">Estimated Profit</span>
          </div>
          <div className="bg-main p-6 rounded-2xl">
            <span className="block font-medium text-heading text-2xl">05</span>
            <span className="text-sm text-body">Bedsheets left</span>
          </div>
        </div>
      </section>
   
      <div className="wrapper flex justify-center gap-2 *:grow mt-5">
        <Button className="text-heading h-auto py-3 bg-transparent border shadow-none border-heading">
          <Plus size={20} className="" />
          Add Sales
        </Button>
        <Button className="text-heading h-auto py-3 bg-transparent border shadow-none border-heading">
          <Plus size={20} className="" />
          Add Expenses
        </Button>
      </div>{" "}

      <div className="wrapper mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-heading">Latest Sales</h2>
          <Link
            to="/sales"
            className="text-main underline underline-offset-2 uppercase"
          >
            View all
          </Link>
        </div>

        <div className="border-surface p-4 border rounded-[8px]">
          <div className="text-body text-sm">Wed, 13 Apr 2025</div>
          <span className="text-heading">ID: BT12332</span> <br />
          <span className="text-heading">
            Sizes: &nbsp;
            <Badge className="bg-surface">King+</Badge> &nbsp;
            <Badge className="bg-surface">King</Badge> &nbsp;
            <Badge className="bg-surface">Twin</Badge>
          </span>
          <br />
          <span className="text-heading">Quantity: 3</span>
          <br />
          <div className="flex justify-between items-center pt-2 border-t border-surface mt-4">
            <span className="font-medium">Total: ₦12,000</span>
            <Button
              size="sm"
              className="rounded-[4px] text-sm bg-main hover:bg-main/90"
            >
              Full Details
            </Button>
          </div>
        </div>
      </div>

      <div className="wrapper mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-heading">
            Latest Expenses
          </h2>
          <Link
            to="/sales"
            className="text-main underline underline-offset-2 uppercase"
          >
            View all
          </Link>
        </div>

        <div className="border-surface p-4 border rounded-[8px]">
          <div className="text-body text-sm">Wed, 13 Apr 2025</div>
          <span className="text-heading">ID: BT12332</span> <br />
          <span className="text-heading">
            Expenses: &nbsp; <br />
            <Badge className="bg-surface rounded-[4px]">
              Bedsheet Materials
            </Badge>{" "}
            &nbsp;
            <Badge className="bg-surface rounded-[4px]">Nylon</Badge> &nbsp;
            <Badge className="bg-surface rounded-[4px]">Fancy bag</Badge>
            <Badge className="bg-surface rounded-[4px]">Transportation</Badge>
            <Badge className="bg-surface rounded-[4px]">Threads</Badge>
          </span>
          <br />
          <div className="flex justify-between items-center pt-2 border-t border-surface mt-4">
            <span className="font-medium">Total: ₦122,100</span>
            <Button
              size="sm"
              className="rounded-[4px] text-sm bg-main hover:bg-main/90"
            >
              Full Details
            </Button>
          </div>
        </div>
      </div>
    </div>


*/
