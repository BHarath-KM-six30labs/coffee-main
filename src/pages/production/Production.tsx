import { Link, Routes, Route, useLocation } from "react-router-dom";
import { subMenuItems } from "./const/constant";
import InventoryOverview from "./InventoryOverview";
import StockOverview from "./StockOverview";
import RawMaterials from "./RawMaterials";
import StockAlerts from "./StockAlerts";
import WastageTracking from "./WastageTracking";
import PerformanceMetrics from "./PerformanceMetrics";
import ERPIntegration from "./ERPIntegration";
import { motion, AnimatePresence } from "framer-motion";
// import { InventoryView } from "../InventoryView";

export default function Production() {
  const location = useLocation();
  // console.log()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 pb-4">
              Inventory Management
            </h1>
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {subMenuItems.map((item) => {
                const isActive = location.pathname.includes(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                  flex items-center px-1 py-4 border-b-2 text-sm font-medium whitespace-nowrap
                  ${
                    isActive
                      ? "border-brown-500 text-brown-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <Routes>
              <Route path="overview" element={<StockOverview />} />
              <Route path="raw-materials" element={<RawMaterials />} />
              <Route path="alerts" element={<StockAlerts />} />
              <Route path="wastage" element={<WastageTracking />} />
              <Route path="performance" element={<PerformanceMetrics />} />
              <Route path="integration" element={<ERPIntegration />} />
              {/* Default Route */}
              <Route path="" element={<InventoryOverview />} />
            </Routes>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
