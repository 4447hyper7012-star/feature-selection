import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Maximize,
  Minimize,
  X,
  Eye,
  Layout,
  ArrowRight,
} from 'lucide-react';
import { slides } from '@/data/slides';
import { CodeBlock } from '@/components/CodeBlock';
import { seminarConfig } from '@/config/seminar';

export function PresentationMode() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const slide = slides[current];
  const total = slides.length;

  const next = useCallback(() => setCurrent((c) => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Escape') {
        if (overview) setOverview(false);
        else if (showNotes) setShowNotes(false);
        else if (fullscreen) setFullscreen(false);
      } else if (e.key === 'g' || e.key === 'G') {
        setOverview((o) => !o);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((s) => !s);
      } else if (e.key === 'f' || e.key === 'F') {
        setFullscreen((f) => !f);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, overview, showNotes, fullscreen]);

  const progress = ((current + 1) / total) * 100;

  return (
    <div className={`min-h-screen bg-zinc-950 text-stone-100 flex flex-col ${fullscreen ? 'fixed inset-0 z-[100]' : ''}`}>
      {/* Progress bar */}
      <div className="h-1 bg-zinc-800 shrink-0">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-zinc-400">
            {current + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
              showNotes ? 'bg-primary-600 text-white' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
            title="Toggle speaker notes (N)"
          >
            <Eye size={16} /> Notes
          </button>
          <button
            onClick={() => setOverview(!overview)}
            className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
            title="Slide overview (G)"
          >
            <Grid3x3 size={16} /> Overview
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            title="Fullscreen (F)"
          >
            {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          <Link
            to="/"
            className="px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <X size={16} /> Exit
          </Link>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl"
          >
            <SlideContent slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker notes */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800 bg-zinc-900 shrink-0 overflow-hidden"
          >
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">
                Speaker Notes
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed">{slide.speakerNotes}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 shrink-0">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-xs text-zinc-500 hidden sm:block">
          ← → navigate · Space: next · G: overview · N: notes · F: fullscreen · Esc: close
        </span>
        <button
          onClick={next}
          disabled={current === total - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      {/* Overview grid */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/95 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-stone-100">Slide Overview</h2>
              <button
                onClick={() => setOverview(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrent(i);
                      setOverview(false);
                    }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      i === current
                        ? 'border-primary-500 bg-primary-950/30'
                        : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'
                    }`}
                  >
                    <span className="text-xs font-mono text-zinc-500 mb-1 block">
                      Slide {s.id}
                    </span>
                    <span className="text-sm font-medium text-stone-200 line-clamp-2">
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideContent({ slide }: { slide: typeof slides[0] }) {
  if (slide.type === 'title') {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-950/40 border border-primary-800 mb-6">
          <Layout size={14} className="text-primary-400" />
          <span className="text-xs font-semibold text-primary-300">CSE Seminar</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-50 leading-tight mb-6 text-balance">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-8">
            {slide.subtitle}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          {seminarConfig.presenters.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <p className="mt-2 text-sm text-zinc-600">{seminarConfig.department} · {seminarConfig.college}</p>
      </div>
    );
  }

  if (slide.type === 'qa') {
    return (
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-stone-50 mb-4">Thank You</h1>
        {slide.subtitle && (
          <p className="text-xl sm:text-2xl text-primary-400">{slide.subtitle}</p>
        )}
        <div className="mt-8 text-zinc-500 text-sm">
          {seminarConfig.presenters.join(' · ')}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-4xl font-bold text-stone-50 mb-6 sm:mb-8 text-balance">
        {slide.title}
      </h2>

      {slide.type === 'formula' && slide.formula && (
        <div className="mb-8 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <p className="text-2xl sm:text-3xl font-mono text-primary-300 mb-3">
            {slide.formula.expression}
          </p>
          {slide.formula.caption && (
            <p className="text-sm text-zinc-500">{slide.formula.caption}</p>
          )}
        </div>
      )}

      {slide.type === 'code' && slide.code && (
        <div className="mb-6">
          <CodeBlock code={slide.code.snippet} language={slide.code.language || 'python'} title="example.py" />
        </div>
      )}

      {slide.type === 'comparison' && slide.table && (
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-900">
                {slide.table.headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-semibold text-stone-200 border-b border-zinc-800">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.table.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-zinc-800/50 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'font-medium text-stone-200' : 'text-zinc-400'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {slide.type === 'workflow' && slide.workflow && (
        <div className="space-y-3 mb-6">
          {slide.workflow.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold">
                {i + 1}
              </span>
              <span className="text-stone-300">{step}</span>
            </motion.div>
          ))}
        </div>
      )}

      {slide.bullets && (
        <ul className="space-y-3 sm:space-y-4">
          {slide.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 text-base sm:text-lg text-zinc-300"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
              {b}
            </motion.li>
          ))}
        </ul>
      )}

      {slide.learnMoreSlug && (
        <Link
          to={`/learn/${slide.learnMoreSlug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
        >
          Learn more <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
