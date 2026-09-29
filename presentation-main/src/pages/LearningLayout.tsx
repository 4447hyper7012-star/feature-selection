import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Info,
  AlertTriangle,
  Settings,
  Globe,
  TrendingUp,
  Calculator,
  Code2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  Lightbulb,
  Link2,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { allTopics, getTopicBySlug, getTopicIndex } from '@/data';
import { TopicSidebar } from '@/components/TopicSidebar';
import { TopicSection } from '@/components/TopicSection';
import { FormulaCard } from '@/components/FormulaCard';
import { CodeBlock } from '@/components/CodeBlock';
import { ExpectedOutput } from '@/components/ExpectedOutput';
import { KnowledgeCheck } from '@/components/KnowledgeCheck';
import { Callout } from '@/components/Callout';
import { ExplainItSimply } from '@/components/ExplainItSimply';
import { TopicNav } from '@/components/TopicNav';
import { ProgressToggle, ProgressBar } from '@/components/ProgressToggle';

export function LearningLayout() {
  const { slug } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!slug) {
    return <LearningOverview />;
  }

  const topic = getTopicBySlug(slug);
  if (!topic) return <Navigate to="/learn" replace />;

  const idx = getTopicIndex(slug);
  const prev = idx > 0 ? allTopics[idx - 1] : undefined;
  const next = idx < allTopics.length - 1 ? allTopics[idx + 1] : undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-20 surface overflow-hidden h-[calc(100vh-6rem)]">
            <TopicSidebar />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-500 mb-4">
            <Link to="/learn" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Learn
            </Link>
            <ChevronRight size={14} />
            <span className="text-stone-400 dark:text-stone-500">{topic.category}</span>
            <ChevronRight size={14} />
            <span className="text-stone-700 dark:text-stone-300 truncate">{topic.title}</span>
          </nav>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 btn-secondary text-sm py-2"
          >
            <Menu size={16} /> Browse Topics
          </button>

          <TopicPage topic={topic} prev={prev} next={next} />

          {/* Mobile sidebar drawer */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-900 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-zinc-800">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Topics</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-stone-400">
                    <X size={20} />
                  </button>
                </div>
                <TopicSidebar onNavigate={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LearningOverview() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          Learning Center
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-2xl">
          A complete beginner-friendly course on feature selection in machine learning.
          Start from the basics or jump to any topic.
        </p>

        <div className="mb-8">
          <ProgressBar items={allTopics.map((t) => ({ id: t.id, title: t.title, slug: t.slug }))} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link to={`/learn/${topic.slug}`} className="block card card-hover group h-full">
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                  {topic.category}
                </span>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mt-1.5 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                  {topic.shortDescription}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TopicPage({ topic, prev, next }: { topic: typeof allTopics[0]; prev?: typeof allTopics[0]; next?: typeof allTopics[0] }) {
  const c = topic.content;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              {topic.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1.5 mb-2 text-balance">
              {topic.title}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-3xl">
              {topic.shortDescription}
            </p>
          </div>
          <ProgressToggle topicId={topic.id} />
        </div>
      </div>

      <TopicSection id="introduction" title="Topic Introduction" icon={<BookOpen size={20} />}>
        <p>{c.introduction}</p>
        <ExplainItSimply>
          Think of feature selection like packing for a trip. You have a big suitcase (your dataset)
          with many items (features), but you can only carry the ones that are actually useful for your
              trip (prediction). Feature selection is deciding what to pack and what to leave behind.
        </ExplainItSimply>
      </TopicSection>

      <TopicSection id="objectives" title="Learning Objectives" icon={<Target size={20} />}>
        <ul>
          {c.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection id="explanation" title="Detailed Explanation" icon={<Info size={20} />}>
        {c.explanation.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TopicSection>

      {c.terminology && (
        <TopicSection id="terminology" title="Important Terminology" icon={<FileText size={20} />}>
          <div className="grid sm:grid-cols-2 gap-3 not-prose">
            {c.terminology.map((t, i) => (
              <div key={i} className="surface p-4">
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1">
                  {t.term}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">{t.definition}</p>
              </div>
            ))}
          </div>
        </TopicSection>
      )}

      <TopicSection id="why-matters" title="Why This Concept Matters" icon={<TrendingUp size={20} />}>
        {c.whyItMatters.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TopicSection>

      <TopicSection id="how-it-works" title="How It Works" icon={<Settings size={20} />}>
        {c.howItWorks.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </TopicSection>

      {/* Real-world example */}
      <TopicSection id="real-world" title="Real-World Example" icon={<Globe size={20} />}>
        <div className="surface p-5 not-prose">
          <p className="text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">{c.realWorldExample.problem}</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                Features
              </p>
              <ul className="space-y-1">
                {c.realWorldExample.features.map((f, i) => (
                  <li key={i} className="text-sm text-stone-700 dark:text-stone-300 flex gap-2">
                    <span className="text-primary-500">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            {c.realWorldExample.target && (
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                  Target
                </p>
                <p className="text-sm text-stone-700 dark:text-stone-300">{c.realWorldExample.target}</p>
              </div>
            )}
          </div>
          <p className="text-stone-700 dark:text-stone-300 mb-3 leading-relaxed">{c.realWorldExample.application}</p>
          {c.realWorldExample.reasoning.map((r, i) => (
            <p key={i} className="text-sm text-stone-600 dark:text-stone-400 mb-2 leading-relaxed">{r}</p>
          ))}
          <Callout type="tip" title="Interpretation">
            {c.realWorldExample.interpretation}
          </Callout>
          <Callout type="warning" title="What we cannot conclude">
            {c.realWorldExample.caveat}
          </Callout>
        </div>
      </TopicSection>

      {/* Worked example */}
      {c.workedExample && (
        <TopicSection id="worked-example" title="Step-by-Step Worked Example" icon={<Calculator size={20} />}>
          <div className="surface p-5 not-prose">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">{c.workedExample.title}</h4>
            <div className="space-y-3">
              {c.workedExample.steps.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-medium text-stone-900 dark:text-stone-100 text-sm">{s.label}: </span>
                    <span className="text-sm text-stone-600 dark:text-stone-400">{s.detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-accent-50 dark:bg-accent-950/30 border border-accent-200 dark:border-accent-800">
              <p className="text-sm text-stone-700 dark:text-stone-300">
                <span className="font-semibold">Result: </span>{c.workedExample.result}
              </p>
            </div>
          </div>
        </TopicSection>
      )}

      {/* Formula */}
      {c.formula && (
        <TopicSection id="formula" title="Formula and Symbol Explanation" icon={<Calculator size={20} />}>
          <FormulaCard
            formula={c.formula.expression}
            title={c.formula.title}
            symbols={c.formula.symbols}
          />
          {c.formula.explanation.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </TopicSection>
      )}

      {/* Code example */}
      {c.codeExample && (
        <>
          <TopicSection id="code" title="Python Implementation" icon={<Code2 size={20} />}>
            <p className="mb-2"><strong>{c.codeExample.title}</strong> — {c.codeExample.purpose}</p>
            <CodeBlock code={c.codeExample.imports + '\n' + c.codeExample.code} language="python" title="example.py" />
          </TopicSection>

          <TopicSection id="code-explanation" title="Code Explanation" icon={<Info size={20} />}>
            <ul>
              {c.codeExample.explanation.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
            <ExpectedOutput output={c.codeExample.output} />
            <p><strong>Interpretation: </strong>{c.codeExample.interpretation}</p>
            <Callout type="tip" title="Beginner Tip">
              {c.codeExample.tip}
            </Callout>
          </TopicSection>
        </>
      )}

      {/* Advantages */}
      <TopicSection id="advantages" title="Advantages" icon={<CheckCircle2 size={20} />}>
        <ul>
          {c.advantages.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </TopicSection>

      {/* Limitations */}
      <TopicSection id="limitations" title="Limitations" icon={<AlertCircle size={20} />}>
        <ul>
          {c.limitations.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </TopicSection>

      {/* Common mistakes */}
      <TopicSection id="mistakes" title="Common Mistakes" icon={<XCircle size={20} />}>
        <ul>
          {c.commonMistakes.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </TopicSection>

      {/* Summary */}
      <TopicSection id="summary" title="Topic Summary" icon={<FileText size={20} />}>
        <p>{c.summary}</p>
      </TopicSection>

      {/* Key takeaways */}
      <TopicSection id="takeaways" title="Key Takeaways" icon={<Lightbulb size={20} />}>
        <ul>
          {c.keyTakeaways.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>
      </TopicSection>

      {/* Knowledge check */}
      <TopicSection id="quiz" title="" icon={null}>
        <div className="surface p-6">
          <KnowledgeCheck questions={c.quiz} topicId={topic.id} />
        </div>
      </TopicSection>

      {/* Related topics */}
      <TopicSection id="related" title="Related Topics" icon={<Link2 size={20} />}>
        <div className="flex flex-wrap gap-2 not-prose">
          {c.relatedTopics.map((slug) => {
            const t = allTopics.find((a) => a.slug === slug);
            if (!t) return null;
            return (
              <Link
                key={slug}
                to={`/learn/${slug}`}
                className="px-3 py-2 rounded-xl surface card-hover text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t.title}
              </Link>
            );
          })}
        </div>
      </TopicSection>

      {/* Prev/Next navigation */}
      <TopicNav
        prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
        next={next ? { slug: next.slug, title: next.title } : undefined}
      />
    </motion.article>
  );
}
