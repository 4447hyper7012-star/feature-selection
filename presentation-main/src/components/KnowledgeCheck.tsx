import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface KnowledgeCheckProps {
  questions: QuizQuestion[];
  topicId: string;
}

export function KnowledgeCheck({ questions, topicId }: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleSelect = (qIndex: number, optIndex: number) => {
    if (submitted[qIndex]) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = (qIndex: number) => {
    if (answers[qIndex] === undefined) return;
    setSubmitted((prev) => ({ ...prev, [qIndex]: true }));
  };

  const handleRetry = (qIndex: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: undefined }));
    setSubmitted((prev) => ({ ...prev, [qIndex]: false }));
  };

  const completedCount = Object.values(submitted).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Knowledge Check
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {completedCount} of {questions.length} answered
          </p>
        </div>
        <div className="w-28 h-2 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-500 transition-all duration-300"
            style={{ width: `${(completedCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {questions.map((q, qIdx) => {
        const selected = answers[qIdx];
        const isSubmitted = submitted[qIdx];
        const isCorrect = selected === q.correct;

        return (
          <div key={qIdx} className="surface p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 flex items-center justify-center text-sm font-semibold">
                {qIdx + 1}
              </span>
              <p className="font-medium text-stone-900 dark:text-stone-100 pt-0.5">
                {q.question}
              </p>
            </div>

            <div className="space-y-2 ml-10">
              {q.options.map((opt, optIdx) => {
                const isSelected = selected === optIdx;
                const showCorrect = isSubmitted && optIdx === q.correct;
                const showWrong = isSubmitted && isSelected && optIdx !== q.correct;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(qIdx, optIdx)}
                    disabled={isSubmitted}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all border ${
                      showCorrect
                        ? 'bg-success-50 dark:bg-success-900/20 border-success-300 dark:border-success-700 text-success-800 dark:text-success-300'
                        : showWrong
                        ? 'bg-error-50 dark:bg-error-900/20 border-error-300 dark:border-error-700 text-error-800 dark:text-error-300'
                        : isSelected
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-300'
                        : 'bg-stone-50 dark:bg-zinc-800/50 border-stone-200 dark:border-zinc-700 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-zinc-600'
                    } ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showCorrect && <CheckCircle2 size={16} className="shrink-0 text-success-600" />}
                      {showWrong && <XCircle size={16} className="shrink-0 text-error-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 ml-10"
                >
                  <div
                    className={`p-4 rounded-xl text-sm ${
                      isCorrect
                        ? 'bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-300'
                        : 'bg-error-50 dark:bg-error-900/20 text-error-800 dark:text-error-300'
                    }`}
                  >
                    <p className="font-semibold mb-1">
                      {isCorrect ? 'Correct!' : 'Not quite right.'}
                    </p>
                    <p className="text-stone-700 dark:text-stone-300">{q.explanation}</p>
                  </div>
                  <button
                    onClick={() => handleRetry(qIdx)}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <RotateCcw size={14} />
                    Try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSubmitted && selected !== undefined && (
              <button
                onClick={() => handleSubmit(qIdx)}
                className="mt-3 ml-10 btn-primary text-sm py-2"
              >
                Check Answer
              </button>
            )}
          </div>
        );
      })}

      <p className="text-xs text-stone-400 dark:text-stone-500 text-center" data-topic-id={topicId}>
        Progress is tracked on this device only.
      </p>
    </div>
  );
}
