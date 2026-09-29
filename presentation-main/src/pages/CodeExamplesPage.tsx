import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code2, Search } from 'lucide-react';
import { allTopics } from '@/data';
import { CodeBlock } from '@/components/CodeBlock';
import { ExpectedOutput } from '@/components/ExpectedOutput';
import { Callout } from '@/components/Callout';

export function CodeExamplesPage() {
  const [query, setQuery] = useState('');

  const codeTopics = useMemo(
    () => allTopics.filter((t) => t.content.codeExample),
    []
  );

  const filtered = useMemo(() => {
    if (!query) return codeTopics;
    const q = query.toLowerCase();
    return codeTopics.filter((t) => t.title.toLowerCase().includes(q));
  }, [query, codeTopics]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <Code2 size={22} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Python Code Examples</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          Complete, beginner-friendly Python code for every technique. Copy and run in your environment.
        </p>

        <div className="relative mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search code examples..."
            className="input-field pl-9"
          />
        </div>

        <div className="space-y-10">
          {filtered.map((topic, i) => {
            const code = topic.content.codeExample!;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {topic.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">{topic.title}</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">{code.purpose}</p>

                <CodeBlock code={code.imports + '\n' + code.code} language="python" title={`${topic.slug}.py`} />

                <div className="mt-4">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-2">
                    Code Explanation
                  </h3>
                  <ul className="space-y-1.5 text-sm text-stone-600 dark:text-stone-400 ml-4">
                    {code.explanation.map((e, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-primary-500 mt-0.5">•</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>

                <ExpectedOutput output={code.output} />

                <p className="text-sm text-stone-600 dark:text-stone-400 mt-3">
                  <span className="font-semibold">Interpretation: </span>{code.interpretation}
                </p>

                <Callout type="tip" title="Beginner Tip">
                  {code.tip}
                </Callout>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 dark:text-stone-500 py-12">
            No code examples found for "{query}".
          </p>
        )}
      </motion.div>
    </div>
  );
}
