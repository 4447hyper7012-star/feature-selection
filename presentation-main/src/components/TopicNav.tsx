import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TopicNavProps {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export function TopicNav({ prev, next }: TopicNavProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-6 border-t border-stone-200 dark:border-zinc-800">
      {prev ? (
        <Link
          to={`/learn/${prev.slug}`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl surface card-hover flex-1 max-w-[48%]"
        >
          <ArrowLeft size={18} className="text-stone-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-stone-400 dark:text-stone-500">Previous</p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1 max-w-[48%]" />
      )}

      {next ? (
        <Link
          to={`/learn/${next.slug}`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl surface card-hover flex-1 max-w-[48%] text-right"
        >
          <div className="min-w-0 ml-auto">
            <p className="text-xs text-stone-400 dark:text-stone-500">Next</p>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
              {next.title}
            </p>
          </div>
          <ArrowRight size={18} className="text-stone-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors shrink-0" />
        </Link>
      ) : (
        <div className="flex-1 max-w-[48%]" />
      )}
    </div>
  );
}
