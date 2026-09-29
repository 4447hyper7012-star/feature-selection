export interface TopicLink {
  slug: string;
  title: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  icon: string;
  content: TopicContent;
}

export interface TopicContent {
  introduction: string;
  objectives: string[];
  explanation: string[];
  terminology?: { term: string; definition: string }[];
  whyItMatters: string[];
  howItWorks: string[];
  realWorldExample: {
    problem: string;
    features: string[];
    target?: string;
    application: string;
    reasoning: string[];
    interpretation: string;
    caveat: string;
  };
  workedExample?: {
    title: string;
    steps: { label: string; detail: string }[];
    result: string;
  };
  formula?: {
    expression: string;
    title: string;
    symbols: { symbol: string; description: string }[];
    explanation: string[];
  };
  codeExample?: {
    title: string;
    purpose: string;
    imports: string;
    code: string;
    output: string;
    explanation: string[];
    interpretation: string;
    tip: string;
  };
  advantages: string[];
  limitations: string[];
  commonMistakes: string[];
  summary: string;
  keyTakeaways: string[];
  quiz: { question: string; options: string[]; correct: number; explanation: string }[];
  relatedTopics: string[];
}
