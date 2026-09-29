import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, GitBranch } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { seminarConfig } from '@/config/seminar';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-stone-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <GitBranch className="text-white" size={20} />
            </div>
            <span className="hidden sm:block font-bold text-stone-900 dark:text-stone-100 text-sm leading-tight">
              CODILAM
              <span className="block text-[10px] font-normal text-stone-500 dark:text-stone-400">
                The Complete Learning Hub 
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {seminarConfig.navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-stone-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <nav className="px-4 py-3 space-y-1">
              {seminarConfig.navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
