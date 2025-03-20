import {
  Warehouse,
  Package,
  AlertTriangle,
  // TrendingDown,
  BarChart2,
  Database,
  Home,
} from "lucide-react";

export const subMenuItems = [
  { name: "Home", icon: Home, path: "/inventory-management" },
  { name: "Stock Overview", icon: Warehouse, path: "overview" },
  { name: "Raw Materials", icon: Package, path: "raw-materials" },
  { name: "Stock Alerts", icon: AlertTriangle, path: "alerts" },
  // { name: "Wastage Tracking", icon: TrendingDown, path: "wastage" },
  { name: "Performance", icon: BarChart2, path: "performance" },
  { name: "ERP Integration", icon: Database, path: "integration" },
];
