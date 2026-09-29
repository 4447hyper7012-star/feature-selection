import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Search } from 'lucide-react';
import { glossaryTerms } from '@/data/viva-glossary';

export function GlossaryPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return glossaryTerms;
    const q = query.toLowerCase();
    return glossaryTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/40 flex items-center justify-center">
            <BookMarked size={22} className="text-accent-600 dark:text-accent-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Glossary</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          {glossaryTerms.length} key terms and their definitions. Search to find any term quickly.
        </p>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search glossary..."
            className="input-field pl-9"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="surface p-4"
            >
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1.5 text-sm">
                {item.term}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.definition}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 dark:text-stone-500 py-12">
            No terms found for "{query}".
          </p>
        )}
      </motion.div>
    </div>
  );
}
