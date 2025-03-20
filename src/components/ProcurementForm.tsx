import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useProcurementStore } from "../store/procurementStore";
import { Plus, Minus } from "lucide-react"; // Import icons

interface OutputRow {
  category: string;
  bags: number;
  weight: number;
  percentage: number;
}

const defaultOutputs: OutputRow[] = [
  { category: "BHP", bags: 0, weight: 0, percentage: 0 },
  { category: "1199 [Chips]", bags: 0, weight: 0, percentage: 0 },
  { category: "Pods [Kiboko]", bags: 0, weight: 0, percentage: 0 },
  { category: "Dust", bags: 0, weight: 0, percentage: 0 },
  { category: "Sweeping Grading", bags: 0, weight: 0, percentage: 0 },
  { category: "Husks", bags: 0, weight: 0, percentage: 0 },
  { category: "Rabbles", bags: 0, weight: 0, percentage: 0 },
  { category: "Stones", bags: 0, weight: 0, percentage: 0 },
  { category: "Screen 1800", bags: 0, weight: 0, percentage: 0 },
  { category: "Screen 1500", bags: 0, weight: 0, percentage: 0 },
  { category: "Screen 1200", bags: 0, weight: 0, percentage: 0 },
  { category: "Blacks", bags: 0, weight: 0, percentage: 0 },
  { category: "Sweeping C/Sorting", bags: 0, weight: 0, percentage: 0 },
];

export function ProcurementForm() {
  const addItem = useProcurementStore((state) => state.addItem);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    rdnoNumber: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    totalCoffeeIn: 0,
    service: "Grading",
    outputs: defaultOutputs,
    charges: {
      grading: { kgs: 0, rate: 60, amount: 0 },
      colorSorting: { kgs: 0, rate: 60, amount: 0 },
      hulling: { kgs: 0, rate: 100, amount: 0 },
    },
    signatures: {
      receivedBy: "",
      gradedBy: "",
      coffeeSortedBy: "",
      witnessedBy: "",
      approvedBy: "",
    },
  });

  useEffect(() => {
    // Calculate charges amounts whenever kgs change
    const updatedCharges = {
      grading: {
        ...formData.charges.grading,
        amount: formData.charges.grading.kgs * formData.charges.grading.rate,
      },
      colorSorting: {
        ...formData.charges.colorSorting,
        amount:
          formData.charges.colorSorting.kgs *
          formData.charges.colorSorting.rate,
      },
      hulling: {
        ...formData.charges.hulling,
        amount: formData.charges.hulling.kgs * formData.charges.hulling.rate,
      },
    };

    setFormData((prev) => ({
      ...prev,
      charges: updatedCharges,
    }));
  }, [
    formData.charges.grading.kgs,
    formData.charges.colorSorting.kgs,
    formData.charges.hulling.kgs,
  ]);

  const handleOutputChange = (
    index: number,
    field: keyof OutputRow,
    value: number
  ) => {
    const newOutputs = [...formData.outputs];
    newOutputs[index] = {
      ...newOutputs[index],
      [field]: value,
    };

    // Calculate percentage if weight is changed
    if (field === "weight" && formData.totalCoffeeIn > 0) {
      newOutputs[index].percentage = (value / formData.totalCoffeeIn) * 100;
    }

    setFormData({
      ...formData,
      outputs: newOutputs,
    });
  };

  // Function to increment/decrement numeric fields
  const adjustValue = (
    type: string,
    field: string,
    index?: number,
    subField?: string,
    amount: number = 1
  ) => {
    if (type === "output" && index !== undefined) {
      const newValue = Math.max(
        0,
        (formData.outputs[index][field as keyof OutputRow] as number) + amount
      );
      handleOutputChange(index, field as keyof OutputRow, newValue);
    } else if (type === "totalCoffee") {
      const newValue = Math.max(0, formData.totalCoffeeIn + amount);
      setFormData({ ...formData, totalCoffeeIn: newValue });
    } else if (type === "charges" && subField) {
      const charges = { ...formData.charges };
      const service = field as keyof typeof charges;
      const newValue = Math.max(0, charges[service].kgs + amount);

      charges[service] = {
        ...charges[service],
        kgs: newValue,
      };

      setFormData({
        ...formData,
        charges,
      });
    }
  };

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) {
      // [phoneError , setPhoneError] = useState('')
      setPhoneError("Phone number is required");
      return false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    } else {
      setPhoneError("");
      return true;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, clientEmail: email });
    validateEmail(email);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setFormData({ ...formData, clientPhone: phone });
    validatePhoneNumber(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.rdnoNumber || !formData.clientName) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email before submission
    if (!validateEmail(formData.clientEmail)) {
      return;
    }

    // Calculate total weight from outputs
    const totalOutputWeight = formData.outputs.reduce(
      (sum, output) => sum + output.weight,
      0
    );
    const weightDifference = Math.abs(
      totalOutputWeight - formData.totalCoffeeIn
    );

    if (weightDifference > 1) {
      // Allow for small rounding differences
      toast.error(
        `Total output weight (${totalOutputWeight} KGS) does not match total coffee in (${formData.totalCoffeeIn} KGS)`
      );
      return;
    }

    addItem(formData);
    toast.success("Procurement added successfully");

    // Reset form
    setFormData({
      rdnoNumber: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      totalCoffeeIn: 0,
      service: "Grading",
      outputs: defaultOutputs,
      charges: {
        grading: { kgs: 0, rate: 60, amount: 0 },
        colorSorting: { kgs: 0, rate: 60, amount: 0 },
        hulling: { kgs: 0, rate: 100, amount: 0 },
      },
      signatures: {
        receivedBy: "",
        gradedBy: "",
        coffeeSortedBy: "",
        witnessedBy: "",
        approvedBy: "",
      },
    });
    setEmailError("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RDNO Number*
          </label>
          <input
            type="text"
            value={formData.rdnoNumber}
            onChange={(e) =>
              setFormData({ ...formData, rdnoNumber: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Name*
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) =>
              setFormData({ ...formData, clientName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Email*
          </label>
          <input
            type="email"
            value={formData.clientEmail}
            onChange={handleEmailChange}
            className={`w-full px-3 py-2 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]`}
            required
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Client Phone*
          </label>
          <input
            type="tel"
            value={formData.clientPhone}
            // onChange={(e) =>
            //   setFormData({ ...formData, clientPhone: e.target.value })
            // }
            onChange={handlePhoneChange}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
            className={`w-full px-3 py-2 border ${
              emailError ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]`}
            required/>
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Coffee (KGS)*
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() =>
                adjustValue("totalCoffee", "", undefined, undefined, -1)
              }
              className="px-2 py-2 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              value={formData.totalCoffeeIn}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalCoffeeIn: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
              required
              min="0"
            />
            <button
              type="button"
              onClick={() =>
                adjustValue("totalCoffee", "", undefined, undefined, 1)
              }
              className="px-2 py-2 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service*
          </label>
          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
            required
          >
            <option value="Grading">Grading</option>
            <option value="Color Sorting">Color Sorting</option>
            <option value="Grading, Color Sorting">
              Grading, Color Sorting
            </option>
            <option value="Hulling">Hulling</option>
          </select>
        </div>
      </div>

      {/* Output Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Output</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Bags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Weight (KGS)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.outputs.map((output, index) => (
                <tr key={output.category}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {output.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          adjustValue("output", "bags", index, undefined, -1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={output.bags}
                        onChange={(e) =>
                          handleOutputChange(
                            index,
                            "bags",
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 border-t border-b border-gray-300"
                        min="0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          adjustValue("output", "bags", index, undefined, 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          adjustValue("output", "weight", index, undefined, -1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={output.weight}
                        onChange={(e) =>
                          handleOutputChange(
                            index,
                            "weight",
                            Number(e.target.value)
                          )
                        }
                        className="w-16 px-2 py-1 border-t border-b border-gray-300"
                        min="0"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          adjustValue("output", "weight", index, undefined, 1)
                        }
                        className="px-2 py-1 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {output.percentage.toFixed(3)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charges Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Charges</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  KGS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Grading
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue("charges", "grading", undefined, "kgs", -1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      value={formData.charges.grading.kgs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          charges: {
                            ...formData.charges,
                            grading: {
                              ...formData.charges.grading,
                              kgs: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-16 px-2 py-1 border-t border-b border-gray-300"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue("charges", "grading", undefined, "kgs", 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.grading.rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.grading.amount}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  C/S
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue(
                          "charges",
                          "colorSorting",
                          undefined,
                          "kgs",
                          -1
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      value={formData.charges.colorSorting.kgs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          charges: {
                            ...formData.charges,
                            colorSorting: {
                              ...formData.charges.colorSorting,
                              kgs: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-16 px-2 py-1 border-t border-b border-gray-300"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue(
                          "charges",
                          "colorSorting",
                          undefined,
                          "kgs",
                          1
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.colorSorting.rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.colorSorting.amount}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Hulling
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue("charges", "hulling", undefined, "kgs", -1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-l-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number"
                      value={formData.charges.hulling.kgs}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          charges: {
                            ...formData.charges,
                            hulling: {
                              ...formData.charges.hulling,
                              kgs: Number(e.target.value),
                            },
                          },
                        })
                      }
                      className="w-16 px-2 py-1 border-t border-b border-gray-300"
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        adjustValue("charges", "hulling", undefined, "kgs", 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded-r-md border border-gray-300 hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.hulling.rate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formData.charges.hulling.amount}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td
                  colSpan={3}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formData.charges.grading.amount +
                    formData.charges.colorSorting.amount +
                    formData.charges.hulling.amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Signatures Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Received By*
          </label>
          <input
            type="text"
            value={formData.signatures.receivedBy}
            onChange={(e) =>
              setFormData({
                ...formData,
                signatures: {
                  ...formData.signatures,
                  receivedBy: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coffee Sorted By
          </label>
          <input
            type="text"
            value={formData.signatures.coffeeSortedBy}
            onChange={(e) =>
              setFormData({
                ...formData,
                signatures: {
                  ...formData.signatures,
                  coffeeSortedBy: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graded By
          </label>
          <input
            type="text"
            value={formData.signatures.gradedBy}
            onChange={(e) =>
              setFormData({
                ...formData,
                signatures: {
                  ...formData.signatures,
                  gradedBy: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A2C2A]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-[#4A2C2A] text-white rounded-md hover:bg-[#3a2220] focus:outline-none focus:ring-2 focus:ring-[#4A2C2A] focus:ring-offset-2"
        >
          Add Procurement
        </button>
      </div>
    </form>
  );
}
