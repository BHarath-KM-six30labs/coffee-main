// import logo from "../../assets/Uganda Coffee.svg";
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ClipboardCheck,
  Coffee,
  Eye,
  Package,
  Settings,
  UserCheck,
  Warehouse,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Sidebar({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: () => void;
}) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const navigate = useNavigate(); // Hook to navigate between pages

  const menuItems = [
    { icon: Coffee, label: "Dashboard", value: "dashboard" },
    { icon: Package, label: "Procurement", value: "procurement" },
    {
      icon: ClipboardCheck,
      label: "Approval Process",
      value: "approve",
      subItems: [
        { icon: CheckCircle2, label: "Receiver", value: "receiver" },
        { icon: Eye, label: "Grader", value: "grader" },
        { icon: UserCheck, label: "Witness", value: "witness" },
        { icon: ClipboardCheck, label: "Approver", value: "approver" },
      ],
    },
    { icon: Warehouse, label: "Inventory", value: "inventory" },
    // { icon: Settings, label: "Settings", value: "settings" },
  ];

  const toggleSubmenu = (itemValue: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemValue)
        ? prev.filter((item) => item !== itemValue)
        : [...prev, itemValue]
    );
  };

  // Check if a menu item should be expanded
  const isExpanded = (itemValue: string) => {
    return expandedItems.includes(itemValue);
  };

  return (
    <motion.div
      className={`bg-[#4A2C2A] text-white transition-all duration-300 min-h-screen fixed left-0 top-0`}
      style={{ width: collapsed ? "4rem" : "16rem" }}
      // initial={{ x: 0 }}
      // animate={{ x: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex items-center justify-between">
        {/* <img
          alt={"logo"}
          src={logo}
          
          className={`font-bold ${collapsed ? "hidden" : "block"} w-full h-full rotate-90`}
        ></img> */}
        <h1
          className={`font-bold ${
            collapsed ? "hidden" : "block"
          } text-2xl `}
        >
          coffeetrack UG
        </h1>
        <button
          onClick={onCollapse}
          className="text-white p-2 rounded hover:bg-[#3a2220]"
        >
          <ChevronLeft
            className={`transform transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col">
              <button
                className={`w-full flex items-center p-4 hover:bg-[#3a2220] transition-colors`}
                onClick={() => {
                  if (item.subItems) {
                    if (!collapsed) {
                      toggleSubmenu(item.value);
                    }
                  } else {
                    navigate(`/${item.value}`); // Navigates directly to the route
                  }
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <item.icon size={20} />
                    <span className={`ml-4 ${collapsed ? "hidden" : "block"}`}>
                      {item.label}
                    </span>
                  </div>
                  {!collapsed && item.subItems && (
                    <ChevronDown
                      className={`transform transition-transform ${
                        isExpanded(item.value) ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  )}
                </div>
              </button>

              {!collapsed && item.subItems && (
                <div
                  className={`pl-4 bg-[#3a2220] overflow-hidden transition-all duration-300 ${
                    isExpanded(item.value) ? "max-h-60" : "max-h-0"
                  }`}
                >
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.value}
                      to={`/${subItem.value}`} // Use react-router's Link component for navigation
                    >
                      <button
                        className={`w-full flex items-center p-3 hover:bg-[#2a1816] transition-colors`}
                      >
                        <subItem.icon size={16} />
                        <span className="ml-3 text-sm">{subItem.label}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}

export default Sidebar;
