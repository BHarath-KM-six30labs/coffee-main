import { Link } from "react-router-dom";
import { subMenuItems } from "./const/constant";

function InventoryOverview() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-6 bg-white border rounded-lg shadow hover:bg-gray-50 ${
              item.name.toLowerCase() === "home" ? "hidden" : ""
            }`}
          >
            <div className="flex items-center">
              <item.icon className="h-8 w-8 text-brown-600" />
              <h3 className="ml-3 text-xl font-medium text-gray-900">
                {item.name}
              </h3>
            </div>
            <p className="mt-2 text-gray-500">
              Manage and monitor {item.name.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InventoryOverview;
