import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormulaSymbol {
  symbol: string;
  description: string;
}

interface FormulaCardProps {
  formula: string;
  title?: string;
  symbols?: FormulaSymbol[];
}

export function FormulaCard({ formula, title, symbols = [] }: FormulaCardProps) {
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);

  const handleClick = (sym: string) => {
    setActiveSymbol(activeSymbol === sym ? null : sym);
  };

  const renderFormula = () => {
    if (symbols.length === 0) return <span>{formula}</span>;
    let result = formula;
    return <span>{result}</span>;
  };

  return (
    <div className="surface p-5 my-4">
      {title && (
        <h4 className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-3 uppercase tracking-wide">
          {title}
        </h4>
      )}
      <div className="text-center py-4 px-2 bg-stone-50 dark:bg-zinc-800/40 rounded-xl">
        <p className="font-mono text-lg sm:text-xl text-stone-900 dark:text-stone-100 tracking-wide">
          {renderFormula()}
        </p>
      </div>
      {symbols.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">
            Click a symbol to learn what it means:
          </p>
          <div className="flex flex-wrap gap-2">
            {symbols.map((s) => (
              <div key={s.symbol} className="relative">
                <button
                  onClick={() => handleClick(s.symbol)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-all ${
                    activeSymbol === s.symbol
                      ? 'bg-primary-600 text-white'
                      : 'bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {s.symbol}
                </button>
                <AnimatePresence>
                  {activeSymbol === s.symbol && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 surface-elevated p-3 text-sm text-stone-700 dark:text-stone-300 absolute z-10 left-0 right-0 min-w-[200px] shadow-lg"
                    >
                      <span className="font-mono font-semibold text-primary-600 dark:text-primary-400">
                        {s.symbol}
                      </span>
                      {' — '}
                      {s.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {activeSymbol && (
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 p-3 surface-elevated">
              {symbols.find((s) => s.symbol === activeSymbol)?.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function FormulaSymbolTooltip({
  symbol,
  description,
}: {
  symbol: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="font-mono font-semibold text-primary-600 dark:text-primary-400 underline decoration-dotted underline-offset-2 cursor-pointer hover:text-primary-700 dark:hover:text-primary-300"
      >
        {symbol}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-20 top-full mt-1 left-0 w-64 p-3 surface-elevated text-sm text-stone-700 dark:text-stone-300 shadow-xl"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
