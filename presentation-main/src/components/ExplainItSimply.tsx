import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExplainItSimply({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
      >
        <Lightbulb size={16} />
        Explain It Simply
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-4 rounded-xl bg-accent-50 dark:bg-accent-950/30 border border-accent-200 dark:border-accent-800 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
