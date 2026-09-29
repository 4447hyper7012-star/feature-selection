import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, SlidersHorizontal, Ruler, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface RevisionCard {
  icon: typeof Sparkles;
  title: string;
  definition: string;
  formula: string;
  usesLabels: boolean;
  mainUse: string;
  mainLimitation: string;
  realWorldReminder: string;
  color: string;
  bg: string;
}

const cards: RevisionCard[] = [
  {
    icon: Sparkles,
    title: 'Information Gain',
    definition: 'Measures how much knowing a feature reduces uncertainty about the target.',
    formula: 'IG(Y, X) = H(Y) - H(Y | X)',
    usesLabels: true,
    mainUse: 'Classification feature ranking',
    mainLimitation: 'Estimation and redundancy issues; does not establish causality',
    realWorldReminder: 'In customer subscription prediction, IG tells you which features reduce uncertainty about whether a customer will subscribe.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-950/40',
  },
  {
    icon: SlidersHorizontal,
    title: 'Variance Threshold',
    definition: 'Removes features whose values vary too little across observations.',
    formula: 'Var(X) = (1/n) Σ (xᵢ - μ)²',
    usesLabels: false,
    mainUse: 'Remove constant or low-variance features',
    mainLimitation: 'Ignores target relevance; sensitive to measurement scale',
    realWorldReminder: 'In product inspection, a column that is always the same value has zero variance and should be removed.',
    color: 'text-accent-600 dark:text-accent-400',
    bg: 'bg-accent-50 dark:bg-accent-950/40',
  },
  {
    icon: Ruler,
    title: 'Mean Absolute Deviation',
    definition: 'Measures the average absolute distance of values from their mean.',
    formula: 'MAD(X) = (1/n) Σ |xᵢ - μ|',
    usesLabels: false,
    mainUse: 'Describe or rank feature variability',
    mainLimitation: 'Ignores target labels; high variability does not imply predictive value',
    realWorldReminder: 'In delivery time analysis, MAD tells you how spread out delivery times are from the average, in the same units (minutes).',
    color: 'text-warning-600 dark:text-warning-400',
    bg: 'bg-warning-50 dark:bg-warning-950/40',
  },
];

export function RevisionPage() {
  const { completed, toggleComplete, reset } = useProgress();
  const [showReset, setShowReset] = useState(false);

  const checklist = [
    { id: 'explain-entropy', label: 'Explain entropy', slug: 'entropy' },
    { id: 'calculate-ig', label: 'Calculate Information Gain', slug: 'information-gain' },
    { id: 'explain-variance', label: 'Explain variance', slug: 'variance' },
    { id: 'calculate-mad', label: 'Calculate MAD', slug: 'mean-absolute-deviation' },
    { id: 'method-limitations', label: 'Describe each method\'s limitations', slug: 'comparison-three-methods' },
    { id: 'fs-vs-extraction', label: 'Explain feature selection vs extraction', slug: 'feature-selection-vs-extraction' },
    { id: 'data-leakage', label: 'Explain data leakage', slug: 'data-leakage' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">Quick Revision</h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          Essential facts and formulas at a glance. Perfect for last-minute review before exams or viva.
        </p>

        {/* Revision cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="surface p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon size={20} className={card.color} />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{card.title}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 leading-relaxed">{card.definition}</p>

              <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-zinc-800/50 mb-3">
                <p className="font-mono text-sm text-center text-stone-800 dark:text-stone-200">{card.formula}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-stone-400 dark:text-stone-500 shrink-0">Uses labels:</span>
                  <span className={`font-medium ${card.usesLabels ? 'text-success-600 dark:text-success-400' : 'text-stone-500'}`}>
                    {card.usesLabels ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-stone-400 dark:text-stone-500 shrink-0">Main use:</span>
                  <span className="text-stone-700 dark:text-stone-300 text-right">{card.mainUse}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-200 dark:border-zinc-700 space-y-2">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold">Limitation: </span>{card.mainLimitation}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold">Reminder: </span>{card.realWorldReminder}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study checklist */}
        <div className="surface p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Study Checklist</h2>
            <span className="text-sm text-stone-400">
              {checklist.filter((c) => completed.includes(c.id)).length}/{checklist.length} done
            </span>
          </div>
          <div className="space-y-2">
            {checklist.map((item) => {
              const done = completed.includes(item.id);
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl surface-elevated cursor-pointer hover:border-stone-300 dark:hover:border-zinc-600 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => {
                      toggleComplete(item.id);
                    }}
                    className="w-5 h-5 rounded accent-primary-600"
                  />
                  <span className={`text-sm ${done ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-700 dark:text-stone-300'}`}>
                    {item.label}
                  </span>
                  {done && <CheckCircle2 size={16} className="ml-auto text-success-500" />}
                </label>
              );
            })}
          </div>
        </div>

        {/* Reset progress */}
        <div className="surface p-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">Reset Progress</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            Clear all completed topics and quiz results stored on this device.
          </p>
          {showReset ? (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  reset();
                  setShowReset(false);
                }}
                className="btn-primary bg-error-600 hover:bg-error-700"
              >
                Yes, reset everything
              </button>
              <button onClick={() => setShowReset(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowReset(true)} className="btn-secondary text-sm">
              <RotateCcw size={16} /> Reset Progress
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
