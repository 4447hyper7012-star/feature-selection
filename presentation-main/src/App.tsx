import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { BackToTop } from '@/components/BackToTop';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { HomePage } from '@/pages/HomePage';
import { PresentationMode } from '@/pages/PresentationMode';
import { LearningLayout } from '@/pages/LearningLayout';
import { TopicsPage } from '@/pages/TopicsPage';
import { CodeExamplesPage } from '@/pages/CodeExamplesPage';
import { RevisionPage } from '@/pages/RevisionPage';
import { VivaPage } from '@/pages/VivaPage';
import { GlossaryPage } from '@/pages/GlossaryPage';
import { ComparisonPage } from '@/pages/ComparisonPage';
import { InteractivePage } from '@/pages/InteractivePage';
import { AboutPage } from '@/pages/AboutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Presentation mode is full-screen, no shell */}
            <Route path="/presentation" element={<PresentationMode />} />

            {/* All other routes use the app shell */}
            <Route
              path="*"
              element={
                <AppShell>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/learn" element={<LearningLayout />} />
                    <Route path="/learn/:slug" element={<LearningLayout />} />
                    <Route path="/topics" element={<TopicsPage />} />
                    <Route path="/code" element={<CodeExamplesPage />} />
                    <Route path="/revision" element={<RevisionPage />} />
                    <Route path="/viva" element={<VivaPage />} />
                    <Route path="/glossary" element={<GlossaryPage />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/interactive" element={<InteractivePage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                  <BackToTop />
                </AppShell>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  );
}
