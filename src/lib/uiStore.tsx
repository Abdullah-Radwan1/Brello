import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isTaskModalOpen: boolean;
  selectedTask: any | null;
  openTaskModal: (task?: any) => void;
  closeTaskModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const openTaskModal = (task?: any) => {
    setSelectedTask(task || null);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <UIContext.Provider value={{ isTaskModalOpen, selectedTask, openTaskModal, closeTaskModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
}
