import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function TopicSection({ id, title, icon, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="mb-10"
    >
      <div className="flex items-center gap-2.5 mb-4">
        {icon && <span className="text-primary-600 dark:text-primary-400">{icon}</span>}
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
          {title}
        </h2>
      </div>
      <div className="prose-content">{children}</div>
    </motion.section>
  );
}
