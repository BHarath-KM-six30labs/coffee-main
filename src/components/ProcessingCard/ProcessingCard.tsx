import { motion, AnimatePresence } from "framer-motion";
function ProcessingCard({
  icon: Icon,
  title,
  items,
  color,
}: {
  icon: React.ComponentType<any>;
  title: string;
  items: { label: string; value: string }[];
  color: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-white rounded-lg p-6 shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <div className="bg-white rounded-lg p-6 shadow-md"> */}
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
        {/* </div> */}
      </motion.div>
    </AnimatePresence>
  );
}
export default ProcessingCard;
