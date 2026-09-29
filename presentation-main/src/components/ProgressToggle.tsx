import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { useProgress } from '@/context/ProgressContext';

interface ProgressToggleProps {
  topicId: string;
}

export function ProgressToggle({ topicId }: ProgressToggleProps) {
  const { isComplete, toggleComplete } = useProgress();
  const done = isComplete(topicId);

  return (
    <button
      onClick={() => toggleComplete(topicId)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
        done
          ? 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300'
          : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-zinc-700'
      }`}
    >
      {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
      {done ? 'Completed' : 'Mark as Complete'}
    </button>
  );
}

export function ProgressBar({ items }: { items: { id: string; title: string; slug: string }[] }) {
  const { isComplete } = useProgress();
  const done = items.filter((i) => isComplete(i.id)).length;
  const pct = Math.round((done / items.length) * 100);

  return (
    <div className="surface p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
          Learning Progress
        </span>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
          {done}/{items.length}
        </span>
      </div>
      <div className="h-2.5 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => {
          const complete = isComplete(item.id);
          return (
            <Link
              key={item.id}
              to={`/learn/${item.slug}`}
              title={item.title}
              className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${
                complete ? 'bg-accent-500' : 'bg-stone-300 dark:bg-zinc-700'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
