import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'note';
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: {
    container: 'bg-primary-50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800',
    title: 'text-primary-700 dark:text-primary-300',
  },
  warning: {
    container: 'bg-warning-50 dark:bg-warning-950/30 border-warning-200 dark:border-warning-800',
    title: 'text-warning-700 dark:text-warning-300',
  },
  tip: {
    container: 'bg-accent-50 dark:bg-accent-950/30 border-accent-200 dark:border-accent-800',
    title: 'text-accent-700 dark:text-accent-300',
  },
  note: {
    container: 'bg-stone-50 dark:bg-zinc-800/50 border-stone-200 dark:border-zinc-700',
    title: 'text-stone-700 dark:text-stone-300',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const s = styles[type];
  const labelMap = { info: 'Note', warning: 'Warning', tip: 'Tip', note: 'Note' };
  return (
    <div className={`rounded-xl border p-4 my-4 ${s.container}`}>
      {title && <p className={`font-semibold text-sm mb-1 ${s.title}`}>{title}</p>}
      <div className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="surface my-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone-50 dark:hover:bg-zinc-800/50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{title}</span>
        {open ? <ChevronUp size={18} className="text-stone-400" /> : <ChevronDown size={18} className="text-stone-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
