import type { Topic } from './types';
import { mlFundamentals } from './topics-fundamentals';
import { featureSelectionTopics } from './topics-fs-core';
import { techniqueTopics } from './topics-techniques';
import { varianceMadTopics } from './topics-variance-mad';
import { supportingTopics } from './topics-supporting';

export const allTopics: Topic[] = [
  ...mlFundamentals,
  ...featureSelectionTopics,
  ...techniqueTopics,
  ...varianceMadTopics,
  ...supportingTopics,
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return allTopics.find((t) => t.slug === slug);
}

export function getTopicIndex(slug: string): number {
  return allTopics.findIndex((t) => t.slug === slug);
}

export const topicCategories = Array.from(new Set(allTopics.map((t) => t.category)));

export type { Topic, TopicContent, TopicLink } from './types';
