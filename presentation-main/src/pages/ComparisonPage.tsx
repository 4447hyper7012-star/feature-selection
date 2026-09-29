import { useState } from 'react';
import { motion } from 'framer-motion';
import { Columns3, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const methods = [
  {
    id: 'ig',
    name: 'Information Gain',
    slug: 'information-gain',
    mainIdea: 'Reduction in target uncertainty',
    usesLabels: 'Yes, in supervised use',
    typicalUse: 'Classification feature ranking',
    measures: 'Feature-target dependence',
    scaleSensitive: 'Depends on representation and estimator',
    mainLimitation: 'Estimation and redundancy issues',
  },
  {
    id: 'vt',
    name: 'Variance Threshold',
    slug: 'variance-threshold',
    mainIdea: 'Feature variance',
    usesLabels: 'No',
    typicalUse: 'Remove constant or low-variance features',
    measures: 'Spread around mean, squared units',
    scaleSensitive: 'Yes',
    mainLimitation: 'Ignores target relevance',
  },
  {
    id: 'mad',
    name: 'Mean Absolute Deviation',
    slug: 'mean-absolute-deviation',
    mainIdea: 'Average absolute distance from mean',
    usesLabels: 'No',
    typicalUse: 'Describe or rank variability',
    measures: 'Spread around mean, original units',
    scaleSensitive: 'Yes',
    mainLimitation: 'Ignores target relevance',
  },
];

const aspects = [
  { key: 'mainIdea', label: 'Main Idea' },
  { key: 'usesLabels', label: 'Uses Target Labels' },
  { key: 'typicalUse', label: 'Typical Use' },
  { key: 'measures', label: 'Measures' },
  { key: 'scaleSensitive', label: 'Scale-Sensitive' },
  { key: 'mainLimitation', label: 'Main Limitation' },
] as const;

export function ComparisonPage() {
  const [selected, setSelected] = useState<string[]>(['ig', 'vt']);

  const toggleMethod = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length > 1) return prev.filter((x) => x !== id);
        return prev;
      }
      if (prev.length >= 2) return [prev[prev.length - 1], id];
      return [...prev, id];
    });
  };

  const compareMethods = methods.filter((m) => selected.includes(m.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <Columns3 size={22} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Method Comparison</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          Compare the three feature selection methods side by side. Select two to view their differences.
        </p>

        {/* Method selector */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <ArrowLeftRight size={16} /> Select two to compare:
          </span>
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleMethod(m.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selected.includes(m.id)
                  ? 'bg-primary-600 text-white'
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-zinc-700'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Side-by-side comparison */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {compareMethods.map((m) => (
            <div key={m.id} className="surface p-5">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">{m.name}</h3>
              <dl className="space-y-3">
                {aspects.map((a) => (
                  <div key={a.key}>
                    <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {a.label}
                    </dt>
                    <dd className="text-sm text-stone-700 dark:text-stone-300 mt-0.5">
                      {m[a.key]}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                to={`/learn/${m.slug}`}
                className="mt-4 inline-block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* Full comparison table */}
        <div className="surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-zinc-700">
                  <th className="px-4 py-3 text-left font-semibold text-stone-700 dark:text-stone-300">Aspect</th>
                  {methods.map((m) => (
                    <th key={m.id} className="px-4 py-3 text-left font-semibold text-stone-700 dark:text-stone-300">
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aspects.map((a, ri) => (
                  <tr key={a.key} className={ri % 2 === 0 ? 'bg-stone-50 dark:bg-zinc-800/30' : ''}>
                    <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100">{a.label}</td>
                    {methods.map((m) => (
                      <td key={m.id} className="px-4 py-3 text-stone-600 dark:text-stone-400">
                        {m[a.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-5 rounded-xl bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800">
          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            <strong>No method is universally best.</strong> The right choice depends on your data, task,
            and evaluation results. Information Gain is the only one that uses the target variable, making
            it the most informative for supervised classification. Variance Threshold and MAD are unsupervised
            and useful for removing obviously useless features as a first step. In practice, you might use
            Variance Threshold first to remove constants, then Information Gain to rank the remaining features.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
