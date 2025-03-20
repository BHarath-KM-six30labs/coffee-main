
import { AnimatePresence, motion } from "framer-motion";

import React from "react";
import {
  Users,
  Award,
  Clock,
  AlertTriangle,
  FileText,
  BarChart as BarChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
//   Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data
const stats = [
  {
    name: "Active Suppliers",
    value: "24",
    change: "+2 this month",
    icon: Users,
    color: "#4ade80",
  },
  {
    name: "Average Quality Score",
    value: "92%",
    change: "+5% vs last month",
    icon: Award,
    color: "#3b82f6",
  },
  {
    name: "On-Time Delivery",
    value: "95%",
    change: "+2% vs last month",
    icon: Clock,
    color: "#8b5cf6",
  },
  {
    name: "Quality Issues",
    value: "3",
    change: "-2 vs last month",
    icon: AlertTriangle,
    color: "#ef4444",
  },
];

const topSuppliers = [
  {
    name: "Kilimanjaro Estates",
    score: 98,
    deliveries: 45,
    quality: "Excellent",
  },
  {
    name: "Uganda Cooperative",
    score: 95,
    deliveries: 38,
    quality: "Excellent",
  },
  { name: "Kenya Highlands Ltd", score: 92, deliveries: 42, quality: "Good" },
  { name: "Rwanda Premium", score: 90, deliveries: 36, quality: "Good" },
  {
    name: "Tanzania Farmers Co-op",
    score: 88,
    deliveries: 40,
    quality: "Good",
  },
];

const recentDeliveries = [
  {
    supplier: "Kilimanjaro Estates",
    date: "2024-03-13",
    quantity: "2,500 kg",
    quality: "98%",
    status: "Completed",
  },
  {
    supplier: "Uganda Cooperative",
    date: "2024-03-12",
    quantity: "1,800 kg",
    quality: "95%",
    status: "Processing",
  },
  {
    supplier: "Kenya Highlands Ltd",
    date: "2024-03-11",
    quantity: "2,200 kg",
    quality: "92%",
    status: "Completed",
  },
];

// Chart data
const qualityTrendData = [
  { month: "Jan", score: 88 },
  { month: "Feb", score: 90 },
  { month: "Mar", score: 89 },
  { month: "Apr", score: 93 },
  { month: "May", score: 92 },
  { month: "Jun", score: 94 },
];

const deliveryPerformanceData = [
  { month: "Jan", percentage: 85 },
  { month: "Feb", percentage: 88 },
  { month: "Mar", percentage: 90 },
  { month: "Apr", percentage: 92 },
  { month: "May", percentage: 95 },
  { month: "Jun", percentage: 94 },
];

// Components
const StatCard = ({ stat }: { stat: any }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-md">
    <div className="p-5">
      <div className="flex items-center">
        <div
          className="flex-shrink-0 p-3 rounded-full"
          style={{ backgroundColor: `${stat.color}15` }}
        >
          <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 truncate">
            {stat.name}
          </p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className="ml-2 text-sm font-medium truncate"
              style={{ color: stat.color }}
            >
              {stat.change}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export default function DashboardMain() {
  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Supplier Performance Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze supplier performance metrics
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#4A2C2A] text-white rounded-md hover:bg-[#4A2C2A] transition-colors">
          <FileText className="h-4 w-4 mr-2" />
          Download Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Quality Score Trends
            </h3>
            <BarChartIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={qualityTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis domain={[80, 100]} tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value}%`, "Quality Score"]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8B4513"
                strokeWidth={3}
                dot={{ fill: "#8B4513", r: 4 }}
                activeDot={{ r: 6, fill: "#8B4513" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Delivery Performance
            </h3>
            <BarChartIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={deliveryPerformanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
              <YAxis domain={[0, 100]} tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value}%`, "On-Time Deliveries"]}
              />
              <Bar
                dataKey="percentage"
                fill="#8B4513"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Suppliers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Performing Suppliers
          </h3>
          <span className="text-sm text-gray-500">Showing top 5 suppliers</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>Supplier Name</TableHeader>
                <TableHeader>Performance Score</TableHeader>
                <TableHeader>Total Deliveries</TableHeader>
                <TableHeader>Quality Rating</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topSuppliers.map((supplier, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {supplier.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="font-medium">{supplier.score}</span>
                      <span className="text-gray-500">/100</span>
                      <div className="ml-2 h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          style={{ width: `${supplier.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {supplier.deliveries}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        supplier.quality === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {supplier.quality}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Deliveries
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader>Supplier</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Quality Score</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDeliveries.map((delivery, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {delivery.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {delivery.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {delivery.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                      <span>{delivery.quality}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        delivery.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>  </motion.div>
    </AnimatePresence>
  );
}
