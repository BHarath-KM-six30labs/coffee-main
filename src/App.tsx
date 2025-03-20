import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Coffee,
  Package,
  Settings,
  Bell,
  UserCircle,
  ChevronLeft,
  AlertTriangle,
  ClipboardCheck,
  CheckCircle2,
  Eye,
  UserCheck,
  Clock,
  DollarSign,
  Scale,
  BarChart,
  PieChart,
  Warehouse
} from 'lucide-react';
import { ProcurementForm } from './components/ProcurementForm';
import { ProcurementList } from './components/ProcurementList';
import { ApprovalList } from './components/ApprovalList';
import { ReceiverView } from './components/approval/ReceiverView';
import { GraderView } from './components/approval/GraderView';
import { WitnessView } from './components/approval/WitnessView';
import { ApproverView } from './components/approval/ApproverView';
import { InventoryView } from './components/InventoryView';
import { useProcurementStore } from './store/procurementStore';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [items, getItemsByStatus] = useProcurementStore(state => [state.items, state.getItemsByStatus]);

  const renderContent = () => {
    switch (currentView) {
      case 'procurement':
        return (
          <>
            <div className="mb-6">
              <ProcurementForm />
            </div>
            <ProcurementList />
          </>
        );
      case 'receiver':
        return <ReceiverView />;
      case 'grader':
        return <GraderView />;
      case 'witness':
        return <WitnessView />;
      case 'approver':
        return <ApproverView />;
      case 'approve':
        return <ApprovalList />;
      case 'inventory':
        return <InventoryView />;
      default:
        const pendingItems = getItemsByStatus('pending');
        const receivedItems = getItemsByStatus('received');
        const gradedItems = getItemsByStatus('graded');
        const witnessedItems = getItemsByStatus('witnessed');
        const approvedItems = getItemsByStatus('approved');

        // Calculate total coffee volume
        const totalCoffeeVolume = items.reduce((sum, item) => sum + item.totalCoffeeIn, 0);
        
        // Calculate service distribution
        const services = items.reduce((acc, item) => {
          acc[item.service] = (acc[item.service] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Calculate total charges
        const totalCharges = items.reduce((sum, item) => {
          return sum + 
            item.charges.grading.amount +
            item.charges.colorSorting.amount +
            item.charges.hulling.amount;
        }, 0);

        return (
          <div className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={CheckCircle2}
                title="Pending Reception"
                value={pendingItems.length.toString()}
                unit="items"
                change={`${pendingItems.length} waiting`}
                color="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <StatCard
                icon={Eye}
                title="Awaiting Grading"
                value={receivedItems.length.toString()}
                unit="items"
                change={`${receivedItems.length} in queue`}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
              />
              <StatCard
                icon={UserCheck}
                title="Pending Witness"
                value={gradedItems.length.toString()}
                unit="items"
                change={`${gradedItems.length} to verify`}
                color="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
              <StatCard
                icon={ClipboardCheck}
                title="Awaiting Approval"
                value={witnessedItems.length.toString()}
                unit="items"
                change={`${witnessedItems.length} for review`}
                color="bg-gradient-to-br from-amber-500 to-amber-600"
              />
            </div>

            {/* Volume and Financial Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Scale}
                title="Total Coffee Volume"
                value={totalCoffeeVolume.toLocaleString()}
                unit="KGS"
                change="All time volume"
                color="bg-gradient-to-br from-teal-500 to-teal-600"
              />
              <StatCard
                icon={DollarSign}
                title="Total Processing Value"
                value={totalCharges.toLocaleString()}
                unit="KES"
                change="All services"
                color="bg-gradient-to-br from-green-500 to-green-600"
              />
              <StatCard
                icon={BarChart}
                title="Completion Rate"
                value={((approvedItems.length / (items.length || 1)) * 100).toFixed(1)}
                unit="%"
                change={`${approvedItems.length} completed`}
                color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
              <StatCard
                icon={PieChart}
                title="Average Processing Time"
                value={(items.length ? 48 : 0).toString()}
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
                    label: 'High Priority', 
                    value: [...pendingItems, ...receivedItems, ...gradedItems, ...witnessedItems]
                      .filter(item => item.priority === 'high').length.toString()
                  },
                  { 
                    label: 'Medium Priority',
                    value: [...pendingItems, ...receivedItems, ...gradedItems, ...witnessedItems]
                      .filter(item => item.priority === 'medium').length.toString()
                  },
                  { 
                    label: 'Low Priority',
                    value: [...pendingItems, ...receivedItems, ...gradedItems, ...witnessedItems]
                      .filter(item => item.priority === 'low').length.toString()
                  }
                ]}
                color="bg-gradient-to-br from-red-500 to-red-600"
              />
              <ProcessingCard
                icon={AlertTriangle}
                title="Items Past Due"
                items={[
                  { 
                    label: 'Overdue Reception', 
                    value: pendingItems.filter(item => new Date(item.estimatedCompletionTime!) < new Date()).length.toString()
                  },
                  { 
                    label: 'Overdue Grading',
                    value: receivedItems.filter(item => new Date(item.estimatedCompletionTime!) < new Date()).length.toString()
                  },
                  { 
                    label: 'Overdue Verification',
                    value: gradedItems.filter(item => new Date(item.estimatedCompletionTime!) < new Date()).length.toString()
                  }
                ]}
                color="bg-gradient-to-br from-orange-500 to-orange-600"
              />
            </div>

            {/* Service Distribution */}
            <div className="grid grid-cols-1 gap-6">
              <ProcessingCard
                icon={Package}
                title="Service Distribution"
                items={Object.entries(services).map(([service, count]) => ({
                  label: service,
                  value: `${count} orders (${((count / (items.length || 1)) * 100).toFixed(1)}%)`
                }))}
                color="bg-gradient-to-br from-violet-500 to-violet-600"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-[#4A2C2A]">
              {currentView === 'procurement' ? 'Procurement' : 
               currentView === 'receiver' ? 'Receiver Validation' :
               currentView === 'grader' ? 'Grader Review' :
               currentView === 'witness' ? 'Witness Validation' :
               currentView === 'approver' ? 'Final Approval' :
               currentView === 'approve' ? 'Approval Workflow' :
               currentView === 'inventory' ? 'Inventory Management' :
               'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <UserCircle size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ collapsed, onCollapse, onNavigate, currentView }: {
  collapsed: boolean;
  onCollapse: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}) {
  const menuItems = [
    { icon: Coffee, label: 'Dashboard', value: 'dashboard' },
    { icon: Package, label: 'Procurement', value: 'procurement' },
    { 
      icon: ClipboardCheck, 
      label: 'Approval Process', 
      value: 'approve',
      subItems: [
        { icon: CheckCircle2, label: 'Receiver', value: 'receiver' },
        { icon: Eye, label: 'Grader', value: 'grader' },
        { icon: UserCheck, label: 'Witness', value: 'witness' },
        { icon: ClipboardCheck, label: 'Approver', value: 'approver' }
      ]
    },
    { icon: Warehouse, label: 'Inventory', value: 'inventory' },
    { icon: Settings, label: 'Settings', value: 'settings' }
  ];

  return (
    <div className={`bg-[#4A2C2A] text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen fixed left-0 top-0`}>
      <div className="p-4 flex items-center justify-between">
        <h1 className={`font-bold ${collapsed ? 'hidden' : 'block'}`}>Six30Labs</h1>
        <button onClick={onCollapse} className="text-white p-2 rounded hover:bg-[#3a2220]">
          <ChevronLeft className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => (
          <div key={item.value}>
            <button
              className={`w-full flex items-center p-4 hover:bg-[#3a2220] transition-colors ${
                (currentView === item.value || (item.subItems?.some(sub => sub.value === currentView))) ? 'bg-[#3a2220]' : ''
              }`}
              onClick={() => onNavigate(item.value)}
            >
              <item.icon size={20} />
              <span className={`ml-4 ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
            </button>
            {!collapsed && item.subItems && (
              <div className="pl-4 bg-[#3a2220]">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.value}
                    className={`w-full flex items-center p-3 hover:bg-[#2a1816] transition-colors ${
                      currentView === subItem.value ? 'bg-[#2a1816]' : ''
                    }`}
                    onClick={() => onNavigate(subItem.value)}
                  >
                    <subItem.icon size={16} />
                    <span className="ml-3 text-sm">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, unit, change, color }: {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  unit: string;
  change: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-1">
        {value}
        <span className="text-gray-500 text-sm ml-1">{unit}</span>
      </p>
      <p className="text-sm text-gray-500 mt-2">{change}</p>
    </div>
  );
}

function ProcessingCard({ icon: Icon, title, items, color }: {
  icon: React.ComponentType<any>;
  title: string;
  items: { label: string; value: string }[];
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-gray-800 font-medium ml-3">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;