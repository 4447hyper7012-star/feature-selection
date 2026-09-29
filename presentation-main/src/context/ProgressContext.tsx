import { createContext, useContext, useState, type ReactNode } from 'react';

type ProgressContextValue = {
  completed: string[];
  toggleComplete: (id: string) => void;
  isComplete: (id: string) => boolean;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('progress') || '[]');
    } catch {
      return [];
    }
  });

  const save = (items: string[]) => {
    localStorage.setItem('progress', JSON.stringify(items));
  };

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      save(next);
      return next;
    });
  };

  const isComplete = (id: string) => completed.includes(id);

  const reset = () => {
    setCompleted([]);
    save([]);
  };

  return (
    <ProgressContext.Provider value={{ completed, toggleComplete, isComplete, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
