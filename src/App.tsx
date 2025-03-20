import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { ProcurementForm } from "./pages/ProcurementForm";
// import { ProcurementList } from "./pages/ProcurementList";
import { ApprovalList } from "./pages/ApprovalList";
import { ReceiverView } from "./pages/approval/ReceiverView";
import { GraderView } from "./pages/approval/GraderView";
import { WitnessView } from "./pages/approval/WitnessView";
import { ApproverView } from "./pages/approval/ApproverView";
import { InventoryView } from "./pages/InventoryView";
// import { useProcurementStore } from "./store/procurementStore";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/sidebar/Sidebar";
// import StatCard from "./components/statCard/StatCard";
// import ProcessingCard from "./components/ProcessingCard/ProcessingCard";
import { Route, Link, Routes } from "react-router-dom";
import Dashboard from "./pages/dashbord/Dashbord";
import { Bell, User } from "lucide-react";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const [items, getItemsByStatus] = useProcurementStore((state) => [
  //   state.items,
  //   state.getItemsByStatus,
  // ]);

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gray-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Toaster position="top-right" />

        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          // onNavigate={setCurrentView}
          // currentView={currentView}
        />

        {/* Content Container */}
        <motion.div
          className={`transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
          // initial={{ x: -100 }}
          // animate={{ x: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-2xl font-bold text-[#4A2C2A]">
                <Link to="/">Dashboard</Link>
              </h1>
              <div className="flex items-center space-x-4">
                <Link to="/procurement">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Bell/>
                  </button>
                </Link>
                <Link to="/receiver">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <User/>
                  </button>
                </Link>
              </div>
            </div>
          </header>

          <main className="p-6">
            {/* <Switch> */}

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/procurement"
                element={
                  <>
                    <ProcurementForm />
                    {/* <ProcurementList onSelect={() => {}} /> */}
                  </>
                }
              />
              <Route path="/receiver" element={<ReceiverView />} />
              <Route path="/grader" element={<GraderView />} />
              <Route path="/witness" element={<WitnessView />} />
              <Route path="/approver" element={<ApproverView />} />
              <Route
                path="/approve"
                element={<ApprovalList onSelect={() => {}} />}
              />
              <Route path="/inventory" element={<InventoryView />} />
            </Routes>
          </main>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
