import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { vivaQuestions } from '@/data/viva-glossary';

export function VivaPage() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(vivaQuestions.map((q) => q.category)))];

  const filtered = useMemo(() => {
    let result = vivaQuestions;
    if (category !== 'All') result = result.filter((q) => q.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (v) => v.question.toLowerCase().includes(q) || v.answer.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query, category]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <HelpCircle size={22} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Viva Questions</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          {vivaQuestions.length} common questions with detailed answers. Search and filter to prepare for your viva.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="input-field pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="surface overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === q.id ? null : q.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-stone-50 dark:hover:bg-zinc-800/50 transition-colors"
                aria-expanded={openId === q.id}
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-semibold">
                    {q.id}
                  </span>
                  <span className="font-medium text-stone-900 dark:text-stone-100">{q.question}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-stone-400 transition-transform ${openId === q.id ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openId === q.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-15 ml-10">
                      <span className="inline-block text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 rounded-md mb-2">
                        {q.category}
                      </span>
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 dark:text-stone-500 py-12">
            No questions found for "{query}".
          </p>
        )}
      </motion.div>
    </div>
  );
}
