function PerformanceMetrics() {
  const performanceData = [
    {
      employee: "John Doe",
      kpi: "Production Output",
      target: "2000 units",
      currentValue: "1900 units",
      status: "On Track",
    },
    {
      employee: "Jane Smith",
      kpi: "Customer Satisfaction",
      target: "95%",
      currentValue: "90%",
      status: "Needs Improvement",
    },
    {
      employee: "Michael Brown",
      kpi: "Production Output",
      target: "2500 units",
      currentValue: "2700 units",
      status: "Exceeded",
    },
    {
      employee: "Emily Davis",
      kpi: "Quality Assurance",
      target: "98%",
      currentValue: "96%",
      status: "On Track",
    },
    {
      employee: "William Johnson",
      kpi: "Production Output",
      target: "3000 units",
      currentValue: "2800 units",
      status: "Needs Improvement",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Performance Metrics
      </h2>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Employee Performance Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KPI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.map((data, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.employee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.kpi}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.currentValue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        data.status === "Exceeded"
                          ? "bg-green-100 text-green-800"
                          : data.status === "On Track"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {data.status}
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

export default PerformanceMetrics;
