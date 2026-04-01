'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import RfpPage from './pages/RfpPage';
import AuditPage from './pages/AuditPage';
import PhasedPage from './pages/PhasedPage';
import QaPage from './pages/QaPage';
import AuditProgressPage from './pages/AuditProgressPage';
import SonarDetailPage from './pages/SonarDetailPage';
import AuditFindingsPage from './pages/AuditFindingsPage';
import FactsheetPage from './pages/FactsheetPage';
import DiscoveryPage from './pages/DiscoveryPage';
import ConsolidationOptionsPage from './pages/ConsolidationOptionsPage';
import DiscoveryTimelinePage from './pages/DiscoveryTimelinePage';
import { pageTitles } from '@/data/client-config';

type PageId = 'home' | 'rfp' | 'audit' | 'phased' | 'qa' | 'technical-audit-report' | 'sonar-detail' | 'audit-findings' | 'factsheet' | 'discovery' | 'consolidation-options' | 'discovery-timeline';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Instant variants for returning to a page with saved scroll (no animation flicker)
const instantVariants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0, transition: { duration: 0 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Pages where "Home" should go to their parent page (not homepage)
const parentOf: Partial<Record<PageId, PageId>> = {
  'sonar-detail': 'technical-audit-report',
  'audit-findings': 'technical-audit-report',
};

export default function SiteShell() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [useInstant, setUseInstant] = useState(false);
  const scrollMap = useRef<Record<string, number>>({});
  const pendingScroll = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const valid: PageId[] = ['home', 'rfp', 'audit', 'phased', 'qa', 'technical-audit-report', 'sonar-detail', 'audit-findings', 'factsheet', 'discovery', 'consolidation-options', 'discovery-timeline'];

  const pageFromPath = useCallback((pathname: string): PageId => {
    const slug = pathname.replace(/^\//, '') || 'home';
    return valid.includes(slug as PageId) ? (slug as PageId) : 'home';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuously assert scroll position via RAF until the page is tall enough and position sticks
  const startScrollRestore = useCallback((target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    pendingScroll.current = target;
    const startTime = performance.now();
    const maxDuration = 2500;

    const tick = () => {
      if (pendingScroll.current === null) return;
      const elapsed = performance.now() - startTime;
      if (elapsed > maxDuration) { pendingScroll.current = null; return; }
      window.scrollTo({ top: pendingScroll.current, behavior: 'instant' as ScrollBehavior });
      if (Math.abs(window.scrollY - pendingScroll.current) <= 2 && document.documentElement.scrollHeight > pendingScroll.current + window.innerHeight * 0.5) {
        rafRef.current = requestAnimationFrame(() => {
          if (pendingScroll.current !== null) {
            window.scrollTo({ top: pendingScroll.current, behavior: 'instant' as ScrollBehavior });
          }
          pendingScroll.current = null;
        });
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const doNavigate = useCallback((page: string, restoreScroll: boolean) => {
    const p = valid.includes(page as PageId) ? (page as PageId) : ('home' as PageId);
    const currentSlug = location.pathname.replace(/^\//, '') || 'home';
    if (p === currentSlug) return;
    pendingScroll.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    scrollMap.current[currentSlug] = window.scrollY;
    history.replaceState({ scrollY: window.scrollY, page: currentSlug }, '');
    const savedScroll = restoreScroll ? scrollMap.current[p] : undefined;
    const targetScroll = (typeof savedScroll === 'number' && savedScroll > 0) ? savedScroll : 0;
    if (targetScroll > 0) {
      setUseInstant(true);
      window.scrollTo({ top: targetScroll, behavior: 'instant' as ScrollBehavior });
    } else {
      setUseInstant(false);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    setCurrentPage(p);
    const url = p === 'home' ? '/' : '/' + p;
    history.pushState({ scrollY: targetScroll, page: p }, '', url);
    document.title = pageTitles[p] || pageTitles.home;
    if (targetScroll > 0) {
      startScrollRestore(targetScroll);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startScrollRestore]);

  const navigateTo = useCallback((page: string) => {
    doNavigate(page, false);
  }, [doNavigate]);

  const goHome = useCallback((fromPage: PageId) => {
    const target = parentOf[fromPage] || 'home';
    doNavigate(target, true);
  }, [doNavigate]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const routeFromPath = (e?: PopStateEvent) => {
      pendingScroll.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const page = pageFromPath(location.pathname);
      const savedScroll = e?.state?.scrollY ?? scrollMap.current[page];
      const targetScroll = (typeof savedScroll === 'number' && savedScroll > 0) ? savedScroll : 0;
      if (targetScroll > 0) {
        setUseInstant(true);
        window.scrollTo({ top: targetScroll, behavior: 'instant' as ScrollBehavior });
      } else {
        setUseInstant(false);
      }
      setCurrentPage(page);
      document.title = pageTitles[page];
      if (targetScroll > 0) {
        startScrollRestore(targetScroll);
      }
    };

    routeFromPath();
    const handler = (e: PopStateEvent) => routeFromPath(e);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromPath, startScrollRestore]);

  useEffect(() => {
    if (useInstant) {
      const timer = setTimeout(() => setUseInstant(false), 100);
      return () => clearTimeout(timer);
    }
  }, [useInstant, currentPage]);

  const variants = useInstant ? instantVariants : pageVariants;

  return (
    <div className="page-transition-wrapper">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'rfp' && <RfpPage navigateTo={navigateTo} goHome={() => goHome('rfp')} />}
          {currentPage === 'audit' && <AuditPage navigateTo={navigateTo} goHome={() => goHome('audit')} />}
          {currentPage === 'phased' && <PhasedPage navigateTo={navigateTo} goHome={() => goHome('phased')} />}
          {currentPage === 'qa' && <QaPage navigateTo={navigateTo} goHome={() => goHome('qa')} />}
          {currentPage === 'technical-audit-report' && <AuditProgressPage navigateTo={navigateTo} goHome={() => goHome('technical-audit-report')} />}
          {currentPage === 'sonar-detail' && <SonarDetailPage navigateTo={navigateTo} goHome={() => goHome('sonar-detail')} />}
          {currentPage === 'audit-findings' && <AuditFindingsPage navigateTo={navigateTo} goHome={() => goHome('audit-findings')} />}
          {currentPage === 'factsheet' && <FactsheetPage navigateTo={navigateTo} goHome={() => goHome('factsheet')} />}
          {currentPage === 'discovery' && <DiscoveryPage navigateTo={navigateTo} goHome={() => goHome('discovery')} />}
          {currentPage === 'consolidation-options' && <ConsolidationOptionsPage navigateTo={navigateTo} goHome={() => goHome('consolidation-options')} />}

          {currentPage === 'discovery-timeline' && <DiscoveryTimelinePage navigateTo={navigateTo} goHome={() => goHome('discovery-timeline')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
