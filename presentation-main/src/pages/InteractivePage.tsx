import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, SlidersHorizontal, Ruler } from 'lucide-react';

export function InteractivePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <Calculator size={22} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Interactive Explorers</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          Edit values and see calculations update in real time. Build intuition by experimenting.
        </p>

        <div className="space-y-12">
          <VarianceExplorer />
          <MadExplorer />
          <InformationGainExplorer />
        </div>
      </motion.div>
    </div>
  );
}

function VarianceExplorer() {
  const [values, setValues] = useState<number[]>([30, 35, 28, 42, 25]);

  const stats = useMemo(() => {
    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const deviations = values.map((v) => v - mean);
    const squaredDeviations = deviations.map((d) => d * d);
    const variance = squaredDeviations.reduce((a, b) => a + b, 0) / n;
    return { n, mean, deviations, squaredDeviations, variance };
  }, [values]);

  const updateValue = (i: number, val: string) => {
    const num = parseFloat(val) || 0;
    setValues((prev) => prev.map((v, idx) => (idx === i ? num : v)));
  };

  const addValue = () => setValues((prev) => [...prev, 30]);
  const removeValue = (i: number) => setValues((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="surface p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <SlidersHorizontal size={20} className="text-accent-600 dark:text-accent-400" />
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Variance Explorer</h2>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        Edit the values below and watch the mean, deviations, and variance recalculate instantly.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {values.map((v, i) => (
          <div key={i} className="relative">
            <input
              type="number"
              value={v}
              onChange={(e) => updateValue(i, e.target.value)}
              className="w-20 px-3 py-2 rounded-lg bg-stone-50 dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-stone-100 text-sm text-center font-mono focus:ring-2 focus:ring-accent-500/40 outline-none"
            />
            {values.length > 2 && (
              <button
                onClick={() => removeValue(i)}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-error-500 text-white text-xs flex items-center justify-center hover:bg-error-600"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {values.length < 10 && (
          <button onClick={addValue} className="px-3 py-2 rounded-lg border-2 border-dashed border-stone-300 dark:border-zinc-700 text-stone-400 hover:border-accent-500 hover:text-accent-500 text-sm transition-colors">
            + Add value
          </button>
        )}
      </div>

      {/* Visual representation */}
      <div className="flex items-end gap-2 h-32 mb-6 bg-stone-50 dark:bg-zinc-800/30 rounded-xl p-3">
        {values.map((v, i) => {
          const max = Math.max(...values, 1);
          const heightPct = (v / max) * 100;
          return (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-accent-600 to-accent-400 rounded-t-md relative group"
              animate={{ height: `${heightPct}%` }}
              transition={{ duration: 0.3 }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-mono text-stone-500 dark:text-stone-400">
                {v}
              </span>
            </motion.div>
          );
        })}
        <div className="flex-1 border-t-2 border-dashed border-primary-500 relative" style={{ height: `${(stats.mean / Math.max(...values, 1)) * 100}%` }}>
          <span className="absolute -top-5 right-0 text-xs font-mono text-primary-600 dark:text-primary-400">
            μ={stats.mean.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Count (n)" value={stats.n.toString()} />
        <StatCard label="Mean (μ)" value={stats.mean.toFixed(2)} />
        <StatCard label="Variance" value={stats.variance.toFixed(2)} highlight />
      </div>

      <div className="surface-elevated p-4">
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          Calculation Steps
        </p>
        <div className="space-y-1 text-sm font-mono text-stone-700 dark:text-stone-300">
          <p>Mean: μ = ({values.join(' + ')}) / {stats.n} = {stats.mean.toFixed(2)}</p>
          {stats.deviations.map((d, i) => (
            <p key={i} className="text-stone-500 dark:text-stone-400">
  ({values[i]} - {stats.mean.toFixed(2)})² = {(d * d).toFixed(2)}
            </p>
          ))}
          <p className="text-accent-600 dark:text-accent-400 font-semibold pt-1">
  Var = ({stats.squaredDeviations.map((s) => s.toFixed(2)).join(' + ')}) / {stats.n} = {stats.variance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

function MadExplorer() {
  const [values, setValues] = useState<number[]>([30, 35, 28, 42, 25]);

  const stats = useMemo(() => {
    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const absDeviations = values.map((v) => Math.abs(v - mean));
    const mad = absDeviations.reduce((a, b) => a + b, 0) / n;
    return { n, mean, absDeviations, mad };
  }, [values]);

  const updateValue = (i: number, val: string) => {
    const num = parseFloat(val) || 0;
    setValues((prev) => prev.map((v, idx) => (idx === i ? num : v)));
  };

  return (
    <div className="surface p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <Ruler size={20} className="text-warning-600 dark:text-warning-400" />
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">MAD Explorer</h2>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        Edit values to see Mean Absolute Deviation recalculate. Notice how it stays in the same units as your data.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        {values.map((v, i) => (
          <input
            key={i}
            type="number"
            value={v}
            onChange={(e) => updateValue(i, e.target.value)}
            className="w-20 px-3 py-2 rounded-lg bg-stone-50 dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-stone-100 text-sm text-center font-mono focus:ring-2 focus:ring-warning-500/40 outline-none"
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Count (n)" value={stats.n.toString()} />
        <StatCard label="Mean (μ)" value={stats.mean.toFixed(2)} />
        <StatCard label="MAD" value={stats.mad.toFixed(2)} highlight />
      </div>

      <div className="surface-elevated p-4">
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          Calculation Steps
        </p>
        <div className="space-y-1 text-sm font-mono text-stone-700 dark:text-stone-300">
          <p>Mean: μ = {stats.mean.toFixed(2)}</p>
          {stats.absDeviations.map((d, i) => (
            <p key={i} className="text-stone-500 dark:text-stone-400">
  |{values[i]} - {stats.mean.toFixed(2)}| = {d.toFixed(2)}
            </p>
          ))}
          <p className="text-warning-600 dark:text-warning-400 font-semibold pt-1">
  MAD = ({stats.absDeviations.map((d) => d.toFixed(2)).join(' + ')}) / {stats.n} = {stats.mad.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

function InformationGainExplorer() {
  // Small classification dataset: 6 customers
  // Feature: visited_demo (0 or 1), Target: subscribed (0 or 1)
  const [data, setData] = useState([
    { visited: 0, subscribed: 0 },
    { visited: 1, subscribed: 1 },
    { visited: 0, subscribed: 0 },
    { visited: 1, subscribed: 1 },
    { visited: 1, subscribed: 1 },
    { visited: 0, subscribed: 1 },
  ]);

  const calc = useMemo(() => {
    const n = data.length;
    const yes = data.filter((d) => d.subscribed === 1).length;
    const no = n - yes;
    const pYes = yes / n;
    const pNo = no / n;

    const entropy = (p: number) => (p === 0 || p === 1 ? 0 : -p * Math.log2(p));
    const hY = entropy(pYes) + entropy(pNo);

    // Split by visited
    const visitedYes = data.filter((d) => d.visited === 1);
    const visitedNo = data.filter((d) => d.visited === 0);

    const calcGroupEntropy = (group: typeof data) => {
      if (group.length === 0) return 0;
      const y = group.filter((d) => d.subscribed === 1).length;
      const nn = group.filter((d) => d.subscribed === 0).length;
      const py = y / group.length;
      const pn = nn / group.length;
      return entropy(py) + entropy(pn);
    };

    const hVisitedYes = calcGroupEntropy(visitedYes);
    const hVisitedNo = calcGroupEntropy(visitedNo);

    const hYX =
      (visitedYes.length / n) * hVisitedYes +
      (visitedNo.length / n) * hVisitedNo;

    const ig = hY - hYX;

    return {
      n, yes, no, pYes, pNo, hY,
      visitedYes: visitedYes.length, visitedNo: visitedNo.length,
      hVisitedYes, hVisitedNo, hYX, ig,
    };
  }, [data]);

  const toggleRow = (i: number, field: 'visited' | 'subscribed') => {
    setData((prev) =>
      prev.map((row, idx) =>
        idx === i ? { ...row, [field]: row[field] === 0 ? 1 : 0 } : row
      )
    );
  };

  return (
    <div className="surface p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <Sparkles size={20} className="text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Information Gain Explorer</h2>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-5">
        Click cells to toggle values (0 or 1). Watch entropy, conditional entropy, and Information Gain update instantly.
      </p>

      {/* Data table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 dark:border-zinc-700">
              <th className="px-3 py-2 text-left text-stone-500 dark:text-stone-400 font-medium">Customer</th>
              <th className="px-3 py-2 text-center text-stone-500 dark:text-stone-400 font-medium">Visited Demo</th>
              <th className="px-3 py-2 text-center text-stone-500 dark:text-stone-400 font-medium">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-stone-100 dark:border-zinc-800/50">
                <td className="px-3 py-2 text-stone-600 dark:text-stone-400">#{i + 1}</td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => toggleRow(i, 'visited')}
                    className={`w-10 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      row.visited === 1
                        ? 'bg-primary-600 text-white'
                        : 'bg-stone-200 dark:bg-zinc-700 text-stone-500'
                    }`}
                  >
                    {row.visited}
                  </button>
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => toggleRow(i, 'subscribed')}
                    className={`w-10 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      row.subscribed === 1
                        ? 'bg-accent-600 text-white'
                        : 'bg-stone-200 dark:bg-zinc-700 text-stone-500'
                    }`}
                  >
                    {row.subscribed}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Split visualization */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="surface-elevated p-4">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Visited = Yes ({calc.visitedYes} customers)
          </p>
          <div className="flex gap-1.5">
            {data.filter((d) => d.visited === 1).map((d, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  d.subscribed === 1
                    ? 'bg-accent-500 text-white'
                    : 'bg-stone-300 dark:bg-zinc-700 text-stone-600'
                }`}
              >
                {d.subscribed}
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-mono">
            H = {calc.hVisitedYes.toFixed(3)} bits
          </p>
        </div>
        <div className="surface-elevated p-4">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Visited = No ({calc.visitedNo} customers)
          </p>
          <div className="flex gap-1.5">
            {data.filter((d) => d.visited === 0).map((d, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                  d.subscribed === 1
                    ? 'bg-accent-500 text-white'
                    : 'bg-stone-300 dark:bg-zinc-700 text-stone-600'
                }`}
              >
                {d.subscribed}
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-mono">
            H = {calc.hVisitedNo.toFixed(3)} bits
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-4 gap-4 mb-4">
        <StatCard label="H(Y)" value={calc.hY.toFixed(3)} sub="Initial entropy" />
        <StatCard label="H(Y|X)" value={calc.hYX.toFixed(3)} sub="Conditional entropy" />
        <StatCard label="IG" value={calc.ig.toFixed(3)} sub="Information Gain" highlight />
        <StatCard label="Subscribed" value={`${calc.yes}/${calc.n}`} sub="Yes/Total" />
      </div>

      <div className="surface-elevated p-4">
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
          Step-by-Step Calculation
        </p>
        <div className="space-y-1 text-sm font-mono text-stone-700 dark:text-stone-300">
          <p>H(Y) = -({calc.pYes.toFixed(3)} log₂ {calc.pYes.toFixed(3)}) - ({calc.pNo.toFixed(3)} log₂ {calc.pNo.toFixed(3)}) = {calc.hY.toFixed(3)}</p>
          <p>H(Y|Visited=Yes) = {calc.hVisitedYes.toFixed(3)}</p>
          <p>H(Y|Visited=No) = {calc.hVisitedNo.toFixed(3)}</p>
          <p>H(Y|X) = ({calc.visitedYes}/{calc.n})×{calc.hVisitedYes.toFixed(3)} + ({calc.visitedNo}/{calc.n})×{calc.hVisitedNo.toFixed(3)} = {calc.hYX.toFixed(3)}</p>
          <p className="text-primary-600 dark:text-primary-400 font-semibold pt-1">
  IG = {calc.hY.toFixed(3)} - {calc.hYX.toFixed(3)} = {calc.ig.toFixed(3)} bits
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, highlight }: { label: string; value: string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl ${highlight ? 'bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800' : 'surface-elevated'}`}>
      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">{label}</p>
      <p className={`text-xl font-bold font-mono mt-1 ${highlight ? 'text-primary-600 dark:text-primary-400' : 'text-stone-900 dark:text-stone-100'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{sub}</p>}
    </div>
  );
}
