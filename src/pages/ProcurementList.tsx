import React from 'react';
import { useProcurementStore, ProcurementStatus } from '../store/procurementStore';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const statusColors: Record<ProcurementStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  received: 'bg-blue-100 text-blue-800',
  graded: 'bg-purple-100 text-purple-800',
  witnessed: 'bg-indigo-100 text-indigo-800',
  approved: 'bg-green-100 text-green-800'
};

const statusIcons: Record<ProcurementStatus, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  received: <AlertCircle className="w-4 h-4" />,
  graded: <AlertCircle className="w-4 h-4" />,
  witnessed: <AlertCircle className="w-4 h-4" />,
  approved: <CheckCircle2 className="w-4 h-4" />
};

export function ProcurementList({ onSelect }: { onSelect: (id: string) => void }) {
  const items = useProcurementStore((state) => state.items);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RDNO #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Coffee (KGS)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A2C2A]">
                  <button
                    onClick={() => onSelect(item.id)}
                    className="hover:underline"
                  >
                    {item.rdnoNumber}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.totalCoffeeIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                    {statusIcons[item.status]}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.dateUpdated).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => onSelect(item.id)}
                    className="text-[#4A2C2A] hover:text-[#3a2220] font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}