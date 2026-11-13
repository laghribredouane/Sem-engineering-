/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { BackToTop } from './components/BackToTop';
import { CookieConsent } from './components/CookieConsent';
import {
  ContextualAssistant,
  PageContextInfo,
} from './components/ContextualAssistant';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SitemapModal, SitemapPage } from './components/Sitemap';
import { IMAGES, ROUTE_ALIASES, SEM_CONTENT } from './data/semContent';
import {
  CertificationsPage,
  DomainesPage,
  HistoirePage,
  MissionValeursPage,
  MotDGPage,
  OrganisationPage,
} from './pages/AboutPages';
import { CandidaturePage, OffresEmploiPage } from './pages/CareersPages';
import { ContactPage } from './pages/ContactPage';
import { ClientsPage, PartenairesPage } from './pages/EcosystemPages';
import { HomePage } from './pages/HomePage';
import { PortefeuillePage } from './pages/PortfolioPage';
import { Language, RoutePath } from './types/sem';

function resolvePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return ROUTE_ALIASES[clean] || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    resolvePath(window.location.pathname)
  );
  const [language, setLanguage] = useState<Language>(() =>
    window.location.pathname.startsWith('/en') ? 'en' : 'fr'
  );
  const [focusedItemId, setFocusedItemId] = useState<string | undefined>(undefined);
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('sem-theme');
      if (stored === 'dark' || stored === 'light') return stored;
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('sem-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(resolvePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (path: RoutePath, focusId?: string) => {
    setFocusedItemId(focusId);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageContext = useMemo<PageContextInfo>(() => {
    const dict = SEM_CONTENT[language];
    switch (currentPath) {
      case '/mot-du-directeur-general':
        return {
          path: currentPath,
          title: dict.dgPage.title,
          summary: dict.dgPage.subtitle,
        };
      case '/histoire':
        return {
          path: currentPath,
          title: dict.historyPage.title,
          summary: dict.historyPage.intro,
        };
      case '/mission-et-valeurs':
        return {
          path: currentPath,
          title: dict.missionPage.title,
          summary: dict.missionPage.missionText,
        };
      case '/domaines-d-activites':
        return {
          path: currentPath,
          title: dict.polesPage.title,
          summary: dict.polesPage.intro,
        };
      case '/organisation':
        return {
          path: currentPath,
          title: dict.orgPage.title,
          summary: dict.orgPage.intro,
        };
      case '/certifications':
        return {
          path: currentPath,
          title: dict.certPage.title,
          summary: dict.certPage.intro,
        };
      case '/portefeuille':
        return {
          path: currentPath,
          title: dict.portfolioPage.title,
          summary: dict.portfolioPage.intro,
        };
      case '/partenaires':
        return {
          path: currentPath,
          title: dict.partnersPage.title,
          summary: dict.partnersPage.intro,
        };
      case '/clients':
        return {
          path: currentPath,
          title: dict.clientsPage.title,
          summary: dict.clientsPage.intro,
        };
      case '/offres-d-emplois':
        return {
          path: currentPath,
          title: dict.jobsPage.title,
          summary: dict.jobsPage.intro,
        };
      case '/candidature':
        return {
          path: currentPath,
          title: dict.applyPage.title,
          summary: dict.applyPage.intro,
        };
      case '/nous-contacter':
        return {
          path: currentPath,
          title: dict.contactPage.title,
          summary: `${dict.contactPage.address} · ${dict.contactPage.phone}`,
        };
      case '/plan-du-site':
        return {
          path: currentPath,
          title: language === 'fr' ? 'Plan du site' : 'Website Sitemap',
          summary:
            language === 'fr'
              ? 'Arborescence hiérarchique complète des 14 pages, 4 pôles stratégiques et 8 domaines du portefeuille SEM.'
              : 'Complete hierarchical directory of all 14 pages, 4 strategic units, and 8 portfolio domains.',
        };
      default:
        return {
          path: '/',
          title: language === 'fr' ? 'Accueil' : 'Home',
          summary: dict.home.subheadline,
        };
    }
  }, [currentPath, language]);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage language={language} onNavigate={handleNavigate} />;
      case '/mot-du-directeur-general':
        return (
          <MotDGPage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
          />
        );
      case '/histoire':
        return (
          <HistoirePage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
          />
        );
      case '/mission-et-valeurs':
        return (
          <MissionValeursPage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
          />
        );
      case '/domaines-d-activites':
        return (
          <DomainesPage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
            initialPoleId={focusedItemId}
          />
        );
      case '/organisation':
        return (
          <OrganisationPage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
          />
        );
      case '/certifications':
        return (
          <CertificationsPage
            currentPath={currentPath}
            language={language}
            onNavigate={handleNavigate}
          />
        );
      case '/portefeuille':
        return (
          <PortefeuillePage
            language={language}
            onNavigate={handleNavigate}
            initialCategoryId={focusedItemId}
          />
        );
      case '/partenaires':
        return <PartenairesPage language={language} onNavigate={handleNavigate} />;
      case '/clients':
        return <ClientsPage language={language} onNavigate={handleNavigate} />;
      case '/offres-d-emplois':
        return <OffresEmploiPage language={language} onNavigate={handleNavigate} />;
      case '/candidature':
        return <CandidaturePage language={language} onNavigate={handleNavigate} />;
      case '/nous-contacter':
        return <ContactPage language={language} onNavigate={handleNavigate} />;
      case '/plan-du-site':
        return <SitemapPage language={language} onNavigate={handleNavigate} />;
      default:
        return <HomePage language={language} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        currentPath={currentPath}
        language={language}
        theme={theme}
        onNavigate={handleNavigate}
        onLanguageChange={setLanguage}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1">
        {/* Paper Document Letterhead (visible only when printing) */}
        <div className="hidden print:flex items-center justify-between border-b border-slate-300 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={IMAGES.logoColor}
              alt="SEM — Smart Engineering & Management"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="text-right text-[9pt] text-slate-600 leading-snug">
            <div className="font-semibold text-slate-900">
              SEM — Smart Engineering &amp; Management
            </div>
            <div>90 Quartier Industriel, Mohammedia 20800 · www.sem.ma</div>
          </div>
        </div>
        {renderPage()}
      </main>

      <Footer
        language={language}
        onNavigate={handleNavigate}
        onLanguageChange={setLanguage}
        onOpenSitemap={() => setSitemapOpen(true)}
        onOpenCookiePreferences={() => setCookiePrefsOpen(true)}
      />

      <BackToTop language={language} />

      <SitemapModal
        isOpen={sitemapOpen}
        language={language}
        currentPath={currentPath}
        onClose={() => setSitemapOpen(false)}
        onSelect={handleNavigate}
      />

      <CookieConsent
        language={language}
        forceOpenPreferences={cookiePrefsOpen}
        onCloseForcePreferences={() => setCookiePrefsOpen(false)}
      />

      <ContextualAssistant
        pageContext={pageContext}
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
