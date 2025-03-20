import React, { useState, useEffect } from 'react';

interface Item {
  id: string;
  rdnoNumber: string;
  clientName: string;
  totalCoffeeIn: number;
  priority: string;
  estimatedCompletionTime: string;
  signatures: {
    receivedBy: string;
  };
}

interface ReceptionModalProps {
  isOpen: boolean;
  item: Item | null;
  onClose: () => void;
  onReceive: (id: string, notes: string) => void;
}

const ReceptionModal: React.FC<ReceptionModalProps> = ({ isOpen, item, onClose, onReceive }) => {
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setNotes(''); // Reset notes when modal is opened
    }
  }, [isOpen]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full space-y-4">
        <h2 className="text-xl font-semibold text-[#4A2C2A]">Validate Reception for {item.rdnoNumber}</h2>
        
        <div className="space-y-2">
          <div><strong>Client:</strong> {item.clientName}</div>
          <div><strong>Total Coffee:</strong> {item.totalCoffeeIn} KGS</div>
          <div><strong>Priority:</strong> 
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${item.priority === 'high' ? 'bg-red-100 text-red-800' : item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              {item.priority.toUpperCase()}
            </span>
          </div>
          <div><strong>Estimated Completion:</strong> {new Date(item.estimatedCompletionTime!).toLocaleDateString()}</div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter any notes for receiving here..."
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-sm text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onReceive(item.id, notes)}
            className="px-4 py-2 bg-[#4A2C2A] text-white text-sm rounded-md"
          >
            Receive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceptionModal;
