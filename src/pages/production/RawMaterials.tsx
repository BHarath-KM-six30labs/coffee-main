import { useState } from 'react';

function RawMaterials() {
  const rawMaterials = [
    { name: 'Arabica Beans', quantity: '12,500 kg', location: 'Warehouse A', supplier: 'Supplier A', status: 'Available' },
    { name: 'Robusta Beans', quantity: '8,900 kg', location: 'Warehouse B', supplier: 'Supplier B', status: 'Low Stock' },
    { name: 'Green Tea', quantity: '4,200 kg', location: 'Warehouse C', supplier: 'Supplier C', status: 'Available' },
    { name: 'Cocoa Powder', quantity: '3,000 kg', location: 'Warehouse D', supplier: 'Supplier D', status: 'Out of Stock' },
    { name: 'Spices Blend', quantity: '6,700 kg', location: 'Warehouse E', supplier: 'Supplier E', status: 'Available' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Raw Materials Inventory</h2>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Raw Materials Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rawMaterials.map((material, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        material.status === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : material.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {material.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RawMaterials;
