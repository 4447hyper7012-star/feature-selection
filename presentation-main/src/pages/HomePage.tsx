import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  BookOpen,
  Code2,
  GitBranch,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Ruler,
  TrendingUp,
  Shield,
  Layers,
  Calculator,
  Columns3,
  BookMarked,
} from 'lucide-react';
import { seminarConfig } from '@/config/seminar';
import { allTopics } from '@/data';

export function HomePage() {
  const mainTechniques = [
    {
      icon: Sparkles,
      title: 'Information Gain',
      desc: 'Measures how much a feature reduces uncertainty about the target.',
      slug: 'information-gain',
      color: 'text-primary-600 dark:text-primary-400',
      bg: 'bg-primary-50 dark:bg-primary-950/40',
    },
    {
      icon: SlidersHorizontal,
      title: 'Variance Threshold',
      desc: 'Removes features whose values vary too little across observations.',
      slug: 'variance-threshold',
      color: 'text-accent-600 dark:text-accent-400',
      bg: 'bg-accent-50 dark:bg-accent-950/40',
    },
    {
      icon: Ruler,
      title: 'Mean Absolute Deviation',
      desc: 'Measures average absolute distance of values from their mean.',
      slug: 'mean-absolute-deviation',
      color: 'text-warning-600 dark:text-warning-400',
      bg: 'bg-warning-50 dark:bg-warning-950/40',
    },
  ];

  const features = [
    { icon: BookOpen, title: '21 Detailed Topics', desc: 'Complete beginner-friendly explanations with real-world examples.' },
    { icon: Code2, title: 'Python Code Examples', desc: 'Executable code with explanations, expected output, and copy buttons.' },
    { icon: Play, title: 'Slide Presentation', desc: '28 animated slides with keyboard navigation and speaker notes.' },
    { icon: Shield, title: 'Knowledge Checks', desc: 'Interactive quizzes with explained answers for every topic.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 mb-6">
                <GitBranch size={14} className="text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">
                  CSE Seminar · {seminarConfig.department}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-50 leading-tight text-balance">
                Feature Selection
                <span className="block text-primary-600 dark:text-primary-400">
                  in Machine Learning
                </span>
              </h1>

              <p className="mt-6 text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                {seminarConfig.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/presentation" className="btn-primary">
                  <Play size={18} />
                  Start Presentation
                </Link>
                <Link to="/learn" className="btn-secondary">
                  <BookOpen size={18} />
                  Explore Learning Content
                </Link>
                <Link to="/code" className="btn-secondary">
                  <Code2 size={18} />
                  View Python Examples
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500 dark:text-stone-400">
                <span>Presented by {seminarConfig.presenters.join(', ')}</span>
              </div>
              <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">{seminarConfig.college}</p>
            </motion.div>

            {/* Animated Feature Selection Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <FeatureVisualization />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white dark:bg-zinc-900/50 border-y border-stone-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-balance">
              What is Feature Selection?
            </h2>
            <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              <p>
                Feature selection is the process of choosing the most useful input features from a dataset
                while removing irrelevant, redundant, noisy, or low-value features. It is a critical step
                in building efficient and accurate machine learning models.
              </p>
              <p>
                By selecting only the features that genuinely contribute to prediction, you can reduce model
                complexity, improve interpretability, reduce training time, and sometimes improve
                generalization to new data. The results depend on the dataset and the model being used.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Techniques */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Three Main Techniques
            </h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
              Each method approaches feature selection from a different angle. Click to explore each in depth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {mainTechniques.map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/learn/${tech.slug}`}
                  className="block card card-hover group h-full"
                >
                  <div className={`w-12 h-12 rounded-xl ${tech.bg} flex items-center justify-center mb-4`}>
                    <tech.icon size={24} className={tech.color} />
                  </div>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                    {tech.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-zinc-900/50 border-y border-stone-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-4">
                  <f.icon size={22} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Interactive Learning Tools
            </h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
              Explore formulas and methods hands-on. Edit values and see results update in real time.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/interactive" className="card card-hover text-center group">
              <Calculator size={24} className="mx-auto mb-3 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Formula Explorers</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">Variance, MAD, and Information Gain calculators</p>
            </Link>
            <Link to="/compare" className="card card-hover text-center group">
              <Columns3 size={24} className="mx-auto mb-3 text-accent-600 dark:text-accent-400" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Compare Methods</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">Side-by-side comparison of all three techniques</p>
            </Link>
            <Link to="/glossary" className="card card-hover text-center group">
              <BookMarked size={24} className="mx-auto mb-3 text-warning-600 dark:text-warning-400" />
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Glossary</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">Searchable definitions of 20 key terms</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              {allTopics.length} Learning Topics
            </h2>
            <p className="text-stone-500 dark:text-stone-400">
              A complete course from machine learning basics to advanced feature selection methods.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTopics.slice(0, 9).map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link to={`/learn/${topic.slug}`} className="block surface p-4 card-hover group h-full">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {topic.category}
                  </span>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 mt-1.5 mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                    {topic.shortDescription}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/learn" className="btn-secondary">
              View All Topics <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureVisualization() {
  const columns = [
    { name: 'Age', selected: true, values: [0.7, 0.3, 0.9, 0.5, 0.2] },
    { name: 'Income', selected: true, values: [0.8, 0.6, 0.4, 0.9, 0.3] },
    { name: 'ID', selected: false, values: [0.5, 0.5, 0.5, 0.5, 0.5] },
    { name: 'Score', selected: true, values: [0.2, 0.7, 0.5, 0.8, 0.1] },
    { name: 'Zip', selected: false, values: [0.3, 0.3, 0.3, 0.3, 0.3] },
    { name: 'Visits', selected: true, values: [0.9, 0.1, 0.6, 0.4, 0.8] },
  ];

  return (
    <div className="relative surface p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Feature Selection</span>
        <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">dataset.csv</span>
      </div>
      <div className="flex gap-3">
        {columns.map((col, ci) => (
          <div key={col.name} className="flex-1">
            <div
              className={`text-xs font-mono text-center mb-2 ${
                col.selected ? 'text-primary-600 dark:text-primary-400' : 'text-stone-400 dark:text-stone-600 line-through'
              }`}
            >
              {col.name}
            </div>
            <div className="space-y-2">
              {col.values.map((v, vi) => (
                <motion.div
                  key={vi}
                  className={`h-8 rounded-lg ${
                    col.selected
                      ? 'bg-gradient-to-t from-primary-600/80 to-primary-400/80'
                      : 'bg-stone-200 dark:bg-zinc-800'
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${v * 32 + 8}px`, opacity: 1 }}
                  transition={{ duration: 0.5, delay: ci * 0.08 + vi * 0.04 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-stone-200 dark:border-zinc-700 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
          <span className="w-3 h-3 rounded bg-primary-500" /> Selected (4)
        </span>
        <span className="flex items-center gap-1.5 text-stone-400 dark:text-stone-600">
          <span className="w-3 h-3 rounded bg-stone-300 dark:bg-zinc-700" /> Removed (2)
        </span>
      </div>
    </div>
  );
}
