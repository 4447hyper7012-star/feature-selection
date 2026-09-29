import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { allTopics, topicCategories } from '@/data';
import { useProgress } from '@/context/ProgressContext';

export function TopicsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const { isComplete } = useProgress();

  const filtered = useMemo(() => {
    let result = allTopics;
    if (category !== 'All') result = result.filter((t) => t.category === category);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)
      );
    }
    return result;
  }, [query, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">All Topics</h1>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          Browse all {allTopics.length} learning topics. Filter by category or search.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics..."
              className="input-field pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategory('All')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              All
            </button>
            {topicCategories.map((cat) => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link to={`/learn/${topic.slug}`} className="block card card-hover group h-full">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {topic.category}
                  </span>
                  {isComplete(topic.id) && (
                    <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">
                      Done
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                  {topic.shortDescription}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 dark:text-stone-500 py-12">
            No topics found. Try a different search or category.
          </p>
        )}
      </motion.div>
    </div>
  );
}
