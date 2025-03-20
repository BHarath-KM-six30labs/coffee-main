import {
  ArrowRight,
  CheckCircle,
  Coffee,
  FileCheck,
  Package,
  Scale,
  TruckIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ProcessFlow() {
  const processSteps = [
    {
      title: "Source",
      icon: Coffee,
      description: "Coffee received from farmers/brokers",
      details: [
        "Farmer/Broker details",
        "Initial quantity check",
        "Basic quality assessment",
      ],
    },
    {
      title: "Intake",
      icon: Scale,
      description: "Weight measurement and documentation",
      details: [
        "Weight recording",
        "Moisture content check",
        "Initial grading",
      ],
    },
    {
      title: "Processing",
      icon: Package,
      description: "Coffee processing and sorting",
      details: ["Clean coffee separation", "Triage process", "Defect removal"],
    },
    {
      title: "Grading",
      icon: CheckCircle,
      description: "Quality assessment and grading",
      details: [
        "Clean coffee: 82.672%",
        "Triage: 14.094%",
        "Other components: 3.234%",
      ],
    },
    {
      title: "Documentation",
      icon: FileCheck,
      description: "Final documentation and approval",
      details: [
        "Grading certificate",
        "Quality report",
        "Export documentation",
      ],
    },
    {
      title: "Export",
      icon: TruckIcon,
      description: "Preparation for export",
      details: ["Packaging", "Container loading", "Shipping documentation"],
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Coffee Processing Flow
          </h2>

          <div className="relative">
            {/* Process Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex flex-col">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full z-10">
                    <div className="flex items-center mb-4">
                      <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                        <step.icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-sm text-gray-500"
                        >
                          <ArrowRight className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Connect steps with arrows - horizontal arrows between cards in the same row */}
                  {index < processSteps.length - 1 && (index + 1) % 3 !== 0 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 z-0">
                      <ArrowRight className="h-8 w-8 text-amber-400" />
                    </div>
                  )}

                  {/* Vertical + horizontal arrows for row transitions */}
                  {/* {index < processSteps.length - 3 && (index + 1) % 3 === 0 && (
                <div className="hidden lg:flex absolute -right-6 bottom-0 flex-col items-center z-0">
                  <div className="h-12 border-r-2 border-amber-400"></div>
                  <div className="transform rotate-90">
                    <ArrowRight className="h-8 w-8 text-amber-400" />
                  </div>
                  <div className="h-12 border-r-2 border-amber-400"></div>
                </div>
              )} */}
                </div>
              ))}
            </div>

            {/* Current Batch Status */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Current Batch Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                  <p className="text-sm font-medium text-green-800">
                    Total Coffee In
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    25,387 Kgs
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                  <p className="text-sm font-medium text-blue-800">
                    Clean Coffee
                  </p>
                  <p className="text-2xl font-bold text-blue-900">20,988 Kgs</p>
                </div>
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                  <p className="text-sm font-medium text-yellow-800">
                    Processing Rate
                  </p>
                  <p className="text-2xl font-bold text-yellow-900">
                    60 UGX/Kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProcessFlow;
