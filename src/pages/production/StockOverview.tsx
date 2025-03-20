function StockOverview() {
    const stockStats = [
      { label: 'Total Stock', value: '45,230 kg', change: '+12%' },
      { label: 'Raw Coffee', value: '15,600 kg', change: '-5%' },
      { label: 'Processed Coffee', value: '29,630 kg', change: '+8%' },
      { label: 'Reserved Stock', value: '8,450 kg', change: '+15%' },
    ];
  
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stockStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className={`ml-2 text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Stock Movements</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { date: '2025-03-13', type: 'Received', quantity: '500 kg', location: 'Warehouse A', status: 'Completed' },
                  { date: '2025-03-12', type: 'Shipped', quantity: '200 kg', location: 'Warehouse B', status: 'In Transit' },
                  { date: '2025-03-11', type: 'Processed', quantity: '350 kg', location: 'Processing Unit', status: 'Completed' },
                ].map((movement, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        movement.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {movement.status}
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

  export default StockOverview;