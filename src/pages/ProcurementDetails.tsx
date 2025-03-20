import React from 'react';
import { toast } from 'react-hot-toast';
import { useProcurementStore, ProcurementStatus } from '../store/procurementStore';
import { CheckCircle2, Clock, AlertCircle, Calendar, AlertTriangle } from 'lucide-react';

const statusFlow: Record<ProcurementStatus, { next: ProcurementStatus | null; role: string; action: string }> = {
  pending: { next: 'received', role: 'Receiver', action: 'Validate Reception' },
  received: { next: 'graded', role: 'Grader', action: 'Complete Grading' },
  graded: { next: 'witnessed', role: 'Witness', action: 'Verify Quality' },
  witnessed: { next: 'approved', role: 'Approver', action: 'Give Final Approval' },
  approved: { next: null, role: 'Complete', action: 'Process Complete' }
};

export function ProcurementDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const [item, updateStatus] = useProcurementStore((state) => [
    state.getItemById(id),
    state.updateStatus
  ]);

  if (!item) return null;

  const currentFlow = statusFlow[item.status];
  const estimatedCompletion = item.estimatedCompletionTime ? 
    new Date(item.estimatedCompletionTime).toLocaleDateString() : 'Not set';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = () => {
    if (!currentFlow.next) return;

    const notes = prompt('Add any notes for this status update:') || '';
    let signature = '';
    
    switch (currentFlow.next) {
      case 'received':
        signature = item.signatures.receivedBy;
        break;
      case 'graded':
        signature = item.signatures.gradedBy;
        break;
      case 'witnessed':
        signature = item.signatures.witnessedBy;
        break;
      case 'approved':
        signature = item.signatures.approvedBy;
        break;
    }

    updateStatus(id, currentFlow.next, signature, notes);
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#4A2C2A] mb-2">
            Procurement Details: {item.rdnoNumber}
          </h2>
          <div className="flex gap-2 items-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              item.status === 'approved' ? 'bg-green-100 text-green-800' :
              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {item.status === 'approved' ? <CheckCircle2 className="w-4 h-4" /> :
               item.status === 'pending' ? <Clock className="w-4 h-4" /> :
               <AlertCircle className="w-4 h-4" />}
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
              <AlertTriangle className="w-4 h-4" />
              {item.priority.toUpperCase()} Priority
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              <Calendar className="w-4 h-4" />
              Est. Completion: {estimatedCompletion}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Client Information</h3>
          <div className="space-y-2">
            <p><span className="text-gray-600">Name:</span> {item.clientName}</p>
            <p><span className="text-gray-600">Email:</span> {item.clientEmail}</p>
            <p><span className="text-gray-600">Phone:</span> {item.clientPhone}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Procurement Details</h3>
          <div className="space-y-2">
            <p><span className="text-gray-600">Total Coffee:</span> {item.totalCoffeeIn} KGS</p>
            <p><span className="text-gray-600">Service:</span> {item.service}</p>
            <p><span className="text-gray-600">Date Created:</span> {new Date(item.dateCreated).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Status History</h3>
        <div className="space-y-3">
          {item.statusHistory.map((history, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                history.status === 'approved' ? 'bg-green-500' :
                history.status === 'pending' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div>
                <p className="text-sm">
                  <span className="font-medium">{history.status.charAt(0).toUpperCase() + history.status.slice(1)}</span>
                  <span className="text-gray-600"> by {history.updatedBy} on {new Date(history.date).toLocaleDateString()}</span>
                </p>
                {history.notes && (
                  <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
        {currentFlow.next && (
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-[#4A2C2A] text-white rounded-md text-sm font-medium hover:bg-[#3a2220] flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {currentFlow.action}
          </button>
        )}
      </div>
    </div>
  );
}