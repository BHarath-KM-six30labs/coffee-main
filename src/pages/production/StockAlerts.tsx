function StockAlerts() {
  const stockAlerts = [
    { product: 'Arabica Beans', alertType: 'Low Stock', quantity: '500 kg', threshold: '1,000 kg', status: 'Critical' },
    { product: 'Robusta Beans', alertType: 'Excess Stock', quantity: '2,000 kg', threshold: '1,500 kg', status: 'Warning' },
    { product: 'Green Tea', alertType: 'Low Stock', quantity: '200 kg', threshold: '500 kg', status: 'Critical' },
    { product: 'Cocoa Powder', alertType: 'Low Stock', quantity: '100 kg', threshold: '300 kg', status: 'Critical' },
    { product: 'Spices Blend', alertType: 'Excess Stock', quantity: '1,200 kg', threshold: '1,000 kg', status: 'Warning' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Stock Alerts</h2>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Alerts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockAlerts.map((alert, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.alertType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.threshold}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        alert.status === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {alert.status}
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

export default StockAlerts;
