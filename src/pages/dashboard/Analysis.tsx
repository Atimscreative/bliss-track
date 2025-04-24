import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FileBarChart, TrendingUp } from "lucide-react";
import { formatNaira } from "@/utils/helper";

// Generate monthly data
const monthlyData = [
  { month: "Jan", sales: 120000, expenses: 80000, profit: 40000 },
  { month: "Feb", sales: 150000, expenses: 90000, profit: 60000 },
  { month: "Mar", sales: 180000, expenses: 100000, profit: 80000 },
  { month: "Apr", sales: 200000, expenses: 120000, profit: 80000 },
];

// Calculate product performance
const productPerformance = [
  { size: "4.5", sales: 45, revenue: 540000 },
  { size: "4x6", sales: 38, revenue: 570000 },
  { size: "6x6", sales: 32, revenue: 576000 },
  { size: "6x6-pillows", sales: 28, revenue: 616000 },
];

const Analysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold  tracking-tight text-neutral-800">
            Analysis
          </h1>
          <p className="text-muted-foreground">
            Financial reports and business insights.
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatNaira(value as number)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#E5DEFF"
                  strokeWidth={2}
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FDE1D3"
                  strokeWidth={2}
                  name="Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#F2FCE2"
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5" />
            Product Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="size" />
                <YAxis yAxisId="left" orientation="left" stroke="#E5DEFF" />
                <YAxis yAxisId="right" orientation="right" stroke="#FDE1D3" />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "revenue") return formatNaira(value as number);
                    return `${value} units`;
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  fill="#E5DEFF"
                  name="Units Sold"
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#FDE1D3"
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
