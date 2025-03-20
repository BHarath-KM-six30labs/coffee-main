import { useProcurementStore } from "../../store/procurementStore";
import { UserCheck, AlertTriangle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReceptionModal from "../../components/Modal/ReceptionModal";
import { useState } from "react";

// export function WitnessView() {
//   const [items, updateStatus] = useProcurementStore((state) => [
//     state.getItemsByStatus("graded"),
//     state.updateStatus,
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<any>(null);

//   // const handleWitness = (id: string, currentSignature: string) => {
//   //   const notes = prompt("Add witness notes:") || "";
//   //   updateStatus(id, "witnessed", currentSignature, notes);
//   // };
//   const handleWitness = (id: string, notes: string) => {
//     updateStatus(id, 'witnessed', '', notes); 
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-[#4A2C2A] mb-4">
//               Pending Witness Validation
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       RDNO #
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Client
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Total Coffee
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Priority
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Est. Completion
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {items.map((item) => (
//                     <tr key={item.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A2C2A]">
//                         {item.rdnoNumber}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.clientName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {item.totalCoffeeIn} KGS
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <span
//                           className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
//                             item.priority === "high"
//                               ? "bg-red-100 text-red-800"
//                               : item.priority === "medium"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           <AlertTriangle className="w-4 h-4" />
//                           {item.priority.toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <span className="inline-flex items-center gap-1.5">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(
//                             item.estimatedCompletionTime!
//                           ).toLocaleDateString()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         <button
//                           onClick={() =>
//                             handleWitness(item.id, item.signatures.witnessedBy)
//                           }
//                           className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#4A2C2A] hover:bg-[#3a2220] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2C2A]"
//                         >
//                           <UserCheck className="w-4 h-4 mr-2" />
//                           Verify Quality
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         <ReceptionModal
//           isOpen={isModalOpen}
//           item={selectedItem}
//           onClose={() => setIsModalOpen(false)}
//           onReceive={handleWitness}
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// }
export function WitnessView() {
  const [items, updateStatus] = useProcurementStore((state) => [
    state.getItemsByStatus("graded"),
    state.updateStatus,
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Handle opening the modal and passing the selected item
  const handleWitness = (item: any) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen(true);   // Open the modal
  };

  const handleReceive = (id: string, notes: string) => {
    updateStatus(id, 'witnessed', '', notes); 
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#4A2C2A] mb-4">
              Pending Witness Validation
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      RDNO #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Total Coffee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Est. Completion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4A2C2A]">
                        {item.rdnoNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.totalCoffeeIn} KGS
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
                            item.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : item.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          <AlertTriangle className="w-4 h-4" />
                          {item.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.estimatedCompletionTime!).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleWitness(item)} // Correctly pass the item
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#4A2C2A] hover:bg-[#3a2220] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2C2A]"
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Verify Quality
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ReceptionModal
          isOpen={isModalOpen}
          item={selectedItem}
          onClose={() => setIsModalOpen(false)}
          onReceive={handleReceive}
        />
      </motion.div>
    </AnimatePresence>
  );
}
