import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { allTopics, topicCategories } from '@/data';
import { useProgress } from '@/context/ProgressContext';

interface TopicSidebarProps {
  onNavigate?: () => void;
}

export function TopicSidebar({ onNavigate }: TopicSidebarProps) {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const { isComplete } = useProgress();

  const filtered = useMemo(() => {
    if (!query) return allTopics;
    const q = query.toLowerCase();
    return allTopics.filter(
      (t) => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-stone-200 dark:border-zinc-800">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics..."
            className="input-field pl-9"
            aria-label="Search topics"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {query ? (
          <div className="px-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-stone-400 dark:text-stone-500 p-4 text-center">
                No topics found for "{query}"
              </p>
            ) : (
              filtered.map((topic) => (
                <TopicLink
                  key={topic.id}
                  topic={topic}
                  active={location.pathname === `/learn/${topic.slug}`}
                  complete={isComplete(topic.id)}
                  onClick={onNavigate}
                />
              ))
            )}
          </div>
        ) : (
          topicCategories.map((cat) => (
            <div key={cat} className="mb-1">
              <p className="px-4 py-2 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wide">
                {cat}
              </p>
              {filtered
                .filter((t) => t.category === cat)
                .map((topic) => (
                  <TopicLink
                    key={topic.id}
                    topic={topic}
                    active={location.pathname === `/learn/${topic.slug}`}
                    complete={isComplete(topic.id)}
                    onClick={onNavigate}
                  />
                ))}
            </div>
          ))
        )}
      </nav>
    </div>
  );
}

function TopicLink({
  topic,
  active,
  complete,
  onClick,
}: {
  topic: { slug: string; title: string; shortDescription: string };
  active: boolean;
  complete: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={`/learn/${topic.slug}`}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 mx-2 rounded-lg text-sm transition-all group ${
        active
          ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-medium'
          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-zinc-800'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          complete ? 'bg-accent-500' : active ? 'bg-primary-500' : 'bg-stone-300 dark:bg-zinc-700'
        }`}
      />
      <span className="flex-1 truncate">{topic.title}</span>
      {active && <ChevronRight size={14} className="shrink-0 text-primary-400" />}
    </Link>
  );
}
