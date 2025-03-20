import { AnimatePresence, motion } from "framer-motion";

function StatCard({
  icon: Icon,
  title,
  value,
  unit,
  change,
  color,
}: {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  unit: string;
  change: string;
  color: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}

export default StatCard;
