// import React from "react";
import { useProcurementStore } from "../store/procurementStore";
import { Package, Scale, Coffee, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InventoryView() {
  const items = useProcurementStore((state) => state.items);

  // Calculate total inventory metrics
  const totalCoffeeIn = items.reduce(
    (sum, item) => sum + item.totalCoffeeIn,
    0
  );

  // Calculate inventory by category
  const inventoryByCategory = items.reduce((acc, item) => {
    item.outputs.forEach((output) => {
      acc[output.category] = (acc[output.category] || 0) + output.weight;
    });
    return acc;
  }, {} as Record<string, number>);

  // Calculate service totals
  const serviceTotals = items.reduce((acc, item) => {
    acc[item.service] = (acc[item.service] || 0) + item.totalCoffeeIn;
    return acc;
  }, {} as Record<string, number>);

  return (
    // <AnimatePresence>
    //   <motion.div
    //     initial={{ opacity: 0, y: 50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    <div className="space-y-6 py-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
              <Scale size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Total Coffee in Stock</h3>
          <p className="text-2xl font-bold mt-1">
            {totalCoffeeIn.toLocaleString()}
            <span className="text-gray-500 text-sm ml-1">KGS</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600">
              <Coffee size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Clean Coffee Available</h3>
          <p className="text-2xl font-bold mt-1">
            {(inventoryByCategory["Clean Coffee"] || 0).toLocaleString()}
            <span className="text-gray-500 text-sm ml-1">KGS</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-amber-600">
              <Package size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Total Batches</h3>
          <p className="text-2xl font-bold mt-1">
            {items.length}
            <span className="text-gray-500 text-sm ml-1">batches</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-red-600">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm">Low Stock Items</h3>
          <p className="text-2xl font-bold mt-1">
            {Object.values(inventoryByCategory).filter((v) => v < 1000).length}
            <span className="text-gray-500 text-sm ml-1">categories</span>
          </p>
        </div>
      </div>

      {/* Detailed Inventory Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#4A2C2A] mb-4">
          Inventory by Category
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(inventoryByCategory).map(([category, weight]) => (
                <tr key={category} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {weight.toLocaleString()} KGS
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        weight < 1000
                          ? "bg-red-100 text-red-800"
                          : weight < 5000
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {weight < 1000
                        ? "Low Stock"
                        : weight < 5000
                        ? "Moderate"
                        : "Good Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((weight / totalCoffeeIn) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#4A2C2A] mb-4">
          Processing Services Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  % of Total Volume
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(serviceTotals).map(([service, volume]) => (
                <tr key={service} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {volume.toLocaleString()} KGS
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {items.filter((item) => item.service === service).length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((volume / totalCoffeeIn) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    //   </motion.div>
    // </AnimatePresence>
  );
}
