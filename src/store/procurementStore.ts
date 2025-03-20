import { create } from 'zustand';
import { toast } from 'react-hot-toast';

export type ProcurementStatus = 'pending' | 'received' | 'graded' | 'witnessed' | 'approved';

const statusMessages = {
  pending: 'Procurement submitted successfully',
  received: 'Coffee received and validated',
  graded: 'Grading completed successfully',
  witnessed: 'Quality witnessed and verified',
  approved: 'Final approval completed'
};

const nextSteps = {
  pending: 'Awaiting receiver validation',
  received: 'Ready for grader review',
  graded: 'Waiting for witness verification',
  witnessed: 'Pending final approval',
  approved: 'Process completed successfully'
};

export interface ProcurementItem {
  id: string;
  rdnoNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  totalCoffeeIn: number;
  service: string;
  status: ProcurementStatus;
  outputs: {
    category: string;
    bags: number;
    weight: number;
    percentage: number;
  }[];
  charges: {
    grading: { kgs: number; rate: number; amount: number };
    colorSorting: { kgs: number; rate: number; amount: number };
    hulling: { kgs: number; rate: number; amount: number };
  };
  signatures: {
    receivedBy: string;
    gradedBy: string;
    witnessedBy: string;
    approvedBy: string;
  };
  dateCreated: string;
  dateUpdated: string;
  statusHistory: {
    status: ProcurementStatus;
    date: string;
    updatedBy: string;
    notes?: string;
  }[];
  priority: 'low' | 'medium' | 'high';
  estimatedCompletionTime?: string;
}

interface ProcurementStore {
  items: ProcurementItem[];
  notifications: { id: string; message: string; type: 'info' | 'success' | 'warning' }[];
  addItem: (item: Omit<ProcurementItem, 'id' | 'status' | 'dateCreated' | 'dateUpdated' | 'statusHistory' | 'priority'>) => void;
  updateStatus: (id: string, status: ProcurementStatus, updatedBy: string, notes?: string) => void;
  getItemById: (id: string) => ProcurementItem | undefined;
  getPendingTasks: () => ProcurementItem[];
  getItemsByStatus: (status: ProcurementStatus) => ProcurementItem[];
  addNotification: (message: string, type: 'info' | 'success' | 'warning') => void;
  clearNotification: (id: string) => void;
}

export const useProcurementStore = create<ProcurementStore>((set, get) => ({
  items: [],
  notifications: [],

  addItem: (item) => {
    const priority = item.totalCoffeeIn > 20000 ? 'high' : 
                    item.totalCoffeeIn > 10000 ? 'medium' : 'low';

    const estimatedCompletionTime = new Date();
    estimatedCompletionTime.setHours(estimatedCompletionTime.getHours() + 
      (priority === 'high' ? 24 : priority === 'medium' ? 48 : 72));

    const newItem: ProcurementItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      statusHistory: [{
        status: 'pending',
        date: new Date().toISOString(),
        updatedBy: item.signatures.receivedBy,
        notes: 'Initial procurement submission'
      }],
      priority,
      estimatedCompletionTime: estimatedCompletionTime.toISOString()
    };

    set((state) => ({
      items: [...state.items, newItem]
    }));

    toast.success(statusMessages.pending);
    get().addNotification(`New procurement ${newItem.rdnoNumber} added`, 'info');
  },

  updateStatus: (id, status, updatedBy, notes) => {
    set((state) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            status,
            dateUpdated: new Date().toISOString(),
            statusHistory: [
              ...item.statusHistory,
              {
                status,
                date: new Date().toISOString(),
                updatedBy,
                notes
              }
            ]
          };

          // Show success message and next step
          toast.success(statusMessages[status]);
          if (status !== 'approved') {
            // Using custom toast for next steps instead of toast.info
            toast.success(nextSteps[status], { 
              duration: 5000,
              icon: '📋'
            });
          }

          return updatedItem;
        }
        return item;
      });

      return { items: updatedItems };
    });

    // Add notification for status change
    get().addNotification(
      `Procurement ${get().getItemById(id)?.rdnoNumber} ${status}`,
      'success'
    );
  },

  getItemById: (id) => {
    return get().items.find(item => item.id === id);
  },

  getPendingTasks: () => {
    return get().items.filter(item => item.status !== 'approved')
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  },

  getItemsByStatus: (status) => {
    return get().items.filter(item => item.status === status)
      .sort((a, b) => new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime());
  },

  addNotification: (message, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }));

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      get().clearNotification(id);
    }, 5000);
  },

  clearNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  }
}));