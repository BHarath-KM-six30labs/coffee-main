import { AlertTriangle, BarChart, CheckCircle2, ClipboardCheck, Clock, DollarSign, Eye, Package, PieChart, Scale, UserCheck } from "lucide-react";
import ProcessingCard from "../../components/ProcessingCard/ProcessingCard";
import StatCard from "../../components/statCard/StatCard";

const Dashboard = () => {
    return (
      <div className="space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CheckCircle2}
            title="Pending Reception"
            value={"100"}
            unit="items"
            change="100 waiting"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Eye}
            title="Awaiting Grading"
            value={"10"}
            unit="items"
            change="10 in queue"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            icon={UserCheck}
            title="Pending Witness"
            value="7"
            unit="items"
            change="7 to verify"
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={ClipboardCheck}
            title="Awaiting Approval"
            value="2"
            unit="items"
            change="2 for review"
            color="bg-gradient-to-br from-amber-500 to-amber-600"
          />
        </div>

        {/* Volume and Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Scale}
            title="Total Coffee Volume"
            value={"1000"}
            unit="KGS"
            change="All time volume"
            color="bg-gradient-to-br from-teal-500 to-teal-600"
          />
          <StatCard
            icon={DollarSign}
            title="Total Processing Value"
            value={"100000"}
            unit="UGX"
            change="All services"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            icon={BarChart}
            title="Completion Rate"
            value={"100"}
            unit="%"
            change="70"
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
          <StatCard
            icon={PieChart}
            title="Average Processing Time"
            value="12"
            unit="hrs"
            change="From reception to approval"
            color="bg-gradient-to-br from-pink-500 to-pink-600"
          />
        </div>

        {/* Detailed Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProcessingCard
            icon={Clock}
            title="Pending Items by Priority"
            items={[
              {
                label: "High Priority",
                value: "50",
              },
              {
                label: "Medium Priority",
                value: "30",
              },
              {
                label: "Low Priority",
                value: "20",
              },
            ]}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
          <ProcessingCard
            icon={AlertTriangle}
            title="Items Past Due"
            items={[
              {
                label: "Overdue Reception",
                value: "10",
              },
              {
                label: "Overdue Grading",
                value: "5",
              },
              {
                label: "Overdue Verification",
                value: "3",
              },
            ]}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Service Distribution */}
        <div className="grid grid-cols-1 gap-6">
          <ProcessingCard
            icon={Package}
            title="Service Distribution"
            items={[]}
            color="bg-gradient-to-br from-violet-500 to-violet-600"
          />
        </div>
      </div>
    );
  };

  export default Dashboard