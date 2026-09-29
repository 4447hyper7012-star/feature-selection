import { Link } from 'react-router-dom';
import { GitBranch, Github, BookOpen } from 'lucide-react';
import { seminarConfig } from '@/config/seminar';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <GitBranch className="text-white" size={18} />
              </div>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                Feature Selection ML
              </span>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              {seminarConfig.subtitle}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3 text-sm">
              Seminar Info
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">
              {seminarConfig.department}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-1">
              {seminarConfig.college}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {seminarConfig.presenters.join(' · ')}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3 text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Start Learning
                </Link>
              </li>
              <li>
                <Link to="/presentation" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Presentation Mode
                </Link>
              </li>
              <li>
                <Link to="/viva" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Viva Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/glossary" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Compare Methods
                </Link>
              </li>
              <li>
                <Link to="/interactive" className="text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Interactive Explorers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Educational seminar project. Content for learning purposes only.
          </p>
          <div className="flex items-center gap-3">
            <Link to="/learn" className="text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <BookOpen size={16} />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
