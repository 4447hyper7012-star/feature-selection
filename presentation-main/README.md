# Feature Selection Techniques in Machine Learning

A premium, interactive educational website for a Computer Science and Engineering seminar on Feature Selection Techniques in Machine Learning.

## Features

- **Presentation Mode**: 28 animated slides with keyboard navigation, speaker notes, slide overview, and fullscreen support
- **Learning Mode**: 21 detailed topics with complete explanations, real-world examples, worked examples, formulas, Python code, and quizzes
- **Interactive Explorers**: Real-time calculators for Variance, MAD, and Information Gain
- **Method Comparison**: Side-by-side comparison tool for the three main techniques
- **Viva Questions**: 20+ questions with detailed, searchable answers
- **Glossary**: 20 key terms with searchable definitions
- **Quick Revision**: Formula cards, study checklist, and progress reset
- **Progress Tracking**: Completed topics and quizzes saved in localStorage
- **Light/Dark Theme**: System preference detection with manual toggle, saved in localStorage
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Accessibility**: Reduced-motion support, keyboard navigation, semantic HTML

## Three Main Techniques

1. **Information Gain** — measures how much a feature reduces uncertainty about the target
2. **Variance Threshold** — removes features whose values vary too little
3. **Mean Absolute Deviation (MAD)** — measures average absolute distance from the mean

## Technology Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion (animations)
- Lucide React (icons)
- React Router DOM (routing)
- Prism.js (Python syntax highlighting)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The dev server starts automatically. Open the provided URL in your browser.

### Build

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppShell.tsx
│   ├── BackToTop.tsx
│   ├── Callout.tsx
│   ├── CodeBlock.tsx
│   ├── ExpectedOutput.tsx
│   ├── ExplainItSimply.tsx
│   ├── Footer.tsx
│   ├── FormulaCard.tsx
│   ├── Header.tsx
│   ├── KnowledgeCheck.tsx
│   ├── ProgressToggle.tsx
│   ├── ThemeToggle.tsx
│   ├── TopicNav.tsx
│   ├── TopicSection.tsx
│   └── TopicSidebar.tsx
├── config/
│   └── seminar.ts       # Central configuration (title, presenters, college, nav)
├── context/
│   ├── ProgressContext.tsx
│   └── ThemeContext.tsx
├── data/                # All educational content (no backend needed)
│   ├── index.ts
│   ├── slides.ts
│   ├── topics-fundamentals.ts
│   ├── topics-fs-core.ts
│   ├── topics-techniques.ts
│   ├── topics-variance-mad.ts
│   ├── topics-supporting.ts
│   ├── types.ts
│   └── viva-glossary.ts
├── pages/               # Route-level page components
│   ├── HomePage.tsx
│   ├── PresentationMode.tsx
│   ├── LearningLayout.tsx
│   ├── TopicsPage.tsx
│   ├── CodeExamplesPage.tsx
│   ├── RevisionPage.tsx
│   ├── VivaPage.tsx
│   ├── GlossaryPage.tsx
│   ├── ComparisonPage.tsx
│   ├── InteractivePage.tsx
│   └── AboutPage.tsx
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind + Prism theme
```

## Customization

All seminar details (title, presenters, department, college name, navigation) are in `src/config/seminar.ts`.
Edit the `college` field to replace the `[College Name]` placeholder.

All educational content is in `src/data/` as structured TypeScript files. Each topic follows the `Topic` interface defined in `src/data/types.ts`.

## Presentation Controls

- **Left/Right Arrow**: Navigate slides
- **Spacebar**: Next slide
- **G**: Toggle slide overview grid
- **N**: Toggle speaker notes
- **F**: Toggle fullscreen
- **Escape**: Close overlays / exit fullscreen

## License

Educational project for seminar use. Content references point to official documentation (scikit-learn, NumPy, pandas).
