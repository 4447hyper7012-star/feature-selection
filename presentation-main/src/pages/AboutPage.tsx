import { motion } from 'framer-motion';
import { Info, ExternalLink, Users, GraduationCap, BookOpen } from 'lucide-react';
import { seminarConfig } from '@/config/seminar';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
            <Info size={22} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">About</h1>
        </div>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          About this seminar project and the learning platform.
        </p>

        {/* Seminar info */}
        <div className="surface p-6 mb-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">Seminar Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <BookOpen size={18} className="text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wide">Title</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">{seminarConfig.title}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap size={18} className="text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wide">Department</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">{seminarConfig.department}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-start gap-3">
              <Users size={18} className="text-primary-600 dark:text-primary-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wide">Presented by</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                  {seminarConfig.presenters.join(' · ')}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wide">College</p>
            <p className="text-sm text-stone-700 dark:text-stone-300 font-medium mt-0.5">{seminarConfig.college}</p>
          </div>
        </div>

        {/* About the platform */}
        <div className="surface p-6 mb-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">About This Platform</h2>
          <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            <p>
              This website is a complete educational platform for learning about feature selection techniques
              in machine learning. It combines two connected experiences:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span><strong>Presentation Mode:</strong> A 28-slide animated presentation designed for classroom delivery, with keyboard navigation, speaker notes, and a slide overview.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500 mt-0.5">•</span>
                <span><strong>Learning Mode:</strong> A detailed, self-paced course with 21 topics covering everything from machine learning basics to advanced feature selection methods, with real-world examples, Python code, quizzes, and interactive tools.</span>
              </li>
            </ul>
            <p>
              The platform is designed to be useful for both classroom seminar delivery and individual self-study.
              A beginner can open any topic, understand it from scratch, follow worked examples, study the code,
              and revise without needing additional resources.
            </p>
          </div>
        </div>

        {/* Key features */}
        <div className="surface p-6 mb-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Light and dark theme with system preference detection',
              'Interactive formula explorers for Variance, MAD, and Information Gain',
              '20+ viva questions with detailed answers',
              'Searchable glossary with 20 key terms',
              'Quick revision cards for all three main techniques',
              'Progress tracking with localStorage',
              'Side-by-side method comparison tool',
              'Python code examples with copy buttons',
              'Knowledge check quizzes for every topic',
              'Full keyboard navigation in presentation mode',
              'Responsive design for mobile, tablet, and desktop',
              'Reduced-motion support for accessibility',
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="text-accent-500 mt-0.5">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="surface p-6">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">References</h2>
          <ul className="space-y-2">
            {seminarConfig.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  <ExternalLink size={14} />
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-stone-400 dark:text-stone-500 mt-4">
            All references point to official documentation. No external services or APIs are used.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
