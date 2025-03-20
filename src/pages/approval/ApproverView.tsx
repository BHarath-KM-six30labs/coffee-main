// import { useProcurementStore } from "../../store/procurementStore";
// import { ClipboardCheck, AlertTriangle, Calendar } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import ReceptionModal from "../../components/Modal/ReceptionModal";

// export function ApproverView() {
//   const [items, updateStatus] = useProcurementStore((state) => [
//     state.getItemsByStatus("witnessed"),
//     state.updateStatus,
//   ]);

//   // const handleApprove = (id: string, currentSignature: string) => {
//   //   const notes = prompt("Add approval notes:") || "";
//   //   updateStatus(id, "approved", currentSignature, notes);
//   // };
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const handleApprove = (id: string, notes: string) => {
//     updateStatus(id, "received", "", notes); // Use empty string for currentSignature or provide as needed
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
//               Pending Final Approval
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
//                             handleApprove(item.id, item.signatures.approvedBy)
//                           }
//                           className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#4A2C2A] hover:bg-[#3a2220] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2C2A]"
//                         >
//                           <ClipboardCheck className="w-4 h-4 mr-2" />
//                           Give Final Approval
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>{" "}
//         <ReceptionModal
//           isOpen={isModalOpen}
//           item={selectedItem}
//           onClose={() => setIsModalOpen(false)}
//           onReceive={handleApprove}
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// }
import { useProcurementStore } from "../../store/procurementStore";
import { ClipboardCheck, AlertTriangle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReceptionModal from "../../components/Modal/ReceptionModal";

export function ApproverView() {
  const [items, updateStatus] = useProcurementStore((state) => [
    state.getItemsByStatus("witnessed"),
    state.updateStatus,
  ]);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // This function opens the modal and sets the selected item
  const handleApprove = (item: any) => {
    setSelectedItem(item); // Set the selected item to pass to the modal
    setIsModalOpen(true);   // Open the modal
  };

  // This function handles the approval action in the modal
  const handleApproveConfirmation = (id: string, notes: string) => {
    updateStatus(id, "approved", "", notes); // Approve the item
    setIsModalOpen(false); // Close the modal
    setSelectedItem(null); // Reset selected item
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
              Pending Final Approval
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
                          {new Date(
                            item.estimatedCompletionTime!
                          ).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => handleApprove(item)} // Pass the entire item
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#4A2C2A] hover:bg-[#3a2220] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2C2A]"
                        >
                          <ClipboardCheck className="w-4 h-4 mr-2" />
                          Give Final Approval
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Modal to show when approve button is clicked */}
        <ReceptionModal
          isOpen={isModalOpen}
          item={selectedItem} // Pass selected item to the modal
          onClose={() => setIsModalOpen(false)} // Close the modal
          onReceive={handleApproveConfirmation} // Handle approval confirmation in the modal
        />
      </motion.div>
    </AnimatePresence>
  );
}
