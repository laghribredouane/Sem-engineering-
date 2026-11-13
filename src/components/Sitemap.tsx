import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  FileCode2,
  FileDown,
  FolderTree,
  Maximize2,
  Search,
  X,
} from 'lucide-react';
import { SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { downloadCompanyBrochure } from '../utils/downloadBrochure';
import { PageHeader } from './PageHeader';

interface SitemapSubItem {
  id: string;
  label: string;
  path: RoutePath;
  focusId?: string;
}

interface SitemapNode {
  id: string;
  label: string;
  description: string;
  path: RoutePath;
  children?: SitemapSubItem[];
}

interface SitemapBranch {
  index: string;
  title: string;
  subtitle: string;
  nodes: SitemapNode[];
}

function buildSitemapBranches(language: Language): SitemapBranch[] {
  const dict = SEM_CONTENT[language];
  const isFr = language === 'fr';

  return [
    {
      index: '01',
      title: isFr ? 'Accueil & Portail Corporate' : 'Home & Corporate Portal',
      subtitle: isFr
        ? 'Présentation générale, empreinte continentale et actualités'
        : 'Executive overview, African footprint, and engineering updates',
      nodes: [
        {
          id: 'home-main',
          label: isFr ? 'Page d’accueil SEM' : 'SEM Homepage',
          description: dict.home.subheadline,
          path: '/',
          children: [
            {
              id: 'home-segments',
              label: dict.home.segmentsHeading,
              path: '/',
            },
            {
              id: 'home-africa',
              label: dict.home.africaHighlightTitle,
              path: '/',
            },
            {
              id: 'home-testimonials',
              label: dict.home.testimonialsHeading,
              path: '/',
            },
            {
              id: 'home-social',
              label: isFr
                ? 'Activité professionnelle & réalisations récentes'
                : 'Recent Professional Activity & Milestones',
              path: '/',
            },
            {
              id: 'home-newsletter',
              label: isFr
                ? 'Inscription à la veille d’ingénierie (Newsletter)'
                : 'Engineering Dispatches Subscription (Newsletter)',
              path: '/',
            },
          ],
        },
      ],
    },
    {
      index: '02',
      title: isFr ? 'À propos & Gouvernance' : 'About & Governance',
      subtitle: isFr
        ? 'Direction, parcours historique, pôles d’expertise et qualité'
        : 'Leadership, heritage, strategic poles, and quality systems',
      nodes: [
        {
          id: 'about-dg',
          label: dict.dgPage.title,
          description: dict.dgPage.subtitle,
          path: '/mot-du-directeur-general',
        },
        {
          id: 'about-history',
          label: dict.historyPage.title,
          description: dict.historyPage.subtitle,
          path: '/histoire',
        },
        {
          id: 'about-mission',
          label: dict.missionPage.title,
          description: dict.missionPage.subtitle,
          path: '/mission-et-valeurs',
        },
        {
          id: 'about-poles',
          label: dict.polesPage.title,
          description: isFr
            ? '4 pôles d’activités stratégiques et architecture interactive des services'
            : '4 strategic business units and interactive services architecture map',
          path: '/domaines-d-activites',
          children: dict.polesPage.poles.map((pole) => ({
            id: `pole-${pole.id}`,
            label: `${pole.index} · ${pole.title}`,
            path: '/domaines-d-activites' as RoutePath,
            focusId: pole.id,
          })),
        },
        {
          id: 'about-org',
          label: dict.orgPage.title,
          description: dict.orgPage.subtitle,
          path: '/organisation',
        },
        {
          id: 'about-cert',
          label: dict.certPage.title,
          description: dict.certPage.subtitle,
          path: '/certifications',
        },
      ],
    },
    {
      index: '03',
      title: isFr ? 'Portefeuille & Livraison' : 'Portfolio & Delivery',
      subtitle: isFr
        ? 'Catalogue complet de solutions clés en main et feuille de route'
        : 'Full turnkey engineering catalog and project delivery roadmap',
      nodes: [
        {
          id: 'portfolio-main',
          label: dict.portfolioPage.title,
          description: isFr
            ? '8 domaines de solutions intégrées, distribution exclusive et cycle projet'
            : '8 integrated solution domains, exclusive distribution, and delivery phases',
          path: '/portefeuille',
          children: dict.portfolioPage.categories.map((cat) => ({
            id: `cat-${cat.id}`,
            label: `${cat.index} · ${cat.title}`,
            path: '/portefeuille' as RoutePath,
            focusId: cat.id,
          })),
        },
      ],
    },
    {
      index: '04',
      title: isFr ? 'Écosystème & Carrières' : 'Ecosystem & Careers',
      subtitle: isFr
        ? 'Constructeurs partenaires, références clients et recrutement'
        : 'Technology OEMs, institutional references, and talent acquisition',
      nodes: [
        {
          id: 'eco-partners',
          label: dict.partnersPage.title,
          description: dict.partnersPage.subtitle,
          path: '/partenaires',
        },
        {
          id: 'eco-clients',
          label: dict.clientsPage.title,
          description: dict.clientsPage.subtitle,
          path: '/clients',
        },
        {
          id: 'careers-jobs',
          label: dict.jobsPage.title,
          description: dict.jobsPage.subtitle,
          path: '/offres-d-emplois',
        },
        {
          id: 'careers-apply',
          label: dict.applyPage.title,
          description: dict.applyPage.subtitle,
          path: '/candidature',
        },
      ],
    },
    {
      index: '05',
      title: isFr ? 'Contact, FAQ & Navigation' : 'Contact, FAQ & Navigation',
      subtitle: isFr
        ? 'Prise de contact multi-départements, réponses fréquentes et plan SEO'
        : 'Departmental inquiries, engineering FAQ, and SEO index',
      nodes: [
        {
          id: 'contact-main',
          label: dict.contactPage.title,
          description: `${dict.contactPage.address} · ${dict.contactPage.phone}`,
          path: '/nous-contacter',
          children: [
            {
              id: 'contact-faq',
              label: isFr
                ? 'Foire aux questions (Services, Délais, Onboarding)'
                : 'Frequently Asked Questions (Services, SLAs, Onboarding)',
              path: '/nous-contacter',
            },
          ],
        },
        {
          id: 'sitemap-page',
          label: isFr ? 'Plan du site complet' : 'Full Website Sitemap',
          description: isFr
            ? 'Index hiérarchique complet de toutes les pages et sections'
            : 'Complete hierarchical directory of all pages and sections',
          path: '/plan-du-site',
        },
      ],
    },
  ];
}

interface SitemapTreeProps {
  language: Language;
  currentPath: RoutePath;
  onSelect: (path: RoutePath, focusId?: string) => void;
  filterQuery: string;
  compact?: boolean;
}

export const SitemapTree: React.FC<SitemapTreeProps> = ({
  language,
  currentPath,
  onSelect,
  filterQuery,
  compact = false,
}) => {
  const isFr = language === 'fr';
  const branches = useMemo(() => buildSitemapBranches(language), [language]);

  const filteredBranches = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return branches;

    return branches
      .map((branch) => {
        const branchMatches =
          branch.title.toLowerCase().includes(q) ||
          branch.subtitle.toLowerCase().includes(q);

        if (branchMatches) return branch;

        const matchingNodes = branch.nodes
          .map((node) => {
            const nodeMatches =
              node.label.toLowerCase().includes(q) ||
              node.description.toLowerCase().includes(q) ||
              node.path.toLowerCase().includes(q);

            const matchingChildren = (node.children || []).filter((child) =>
              child.label.toLowerCase().includes(q)
            );

            if (nodeMatches) {
              return node;
            }
            if (matchingChildren.length > 0) {
              return { ...node, children: matchingChildren };
            }
            return null;
          })
          .filter((node): node is SitemapNode => node !== null);

        if (matchingNodes.length === 0) return null;
        return { ...branch, nodes: matchingNodes };
      })
      .filter((branch): branch is SitemapBranch => branch !== null);
  }, [branches, filterQuery]);

  const handleLinkClick = (
    e: React.MouseEvent,
    path: RoutePath,
    focusId?: string
  ) => {
    e.preventDefault();
    onSelect(path, focusId);
  };

  if (filteredBranches.length === 0) {
    return (
      <div className="py-14 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {isFr
            ? `Aucune rubrique trouvée pour « ${filterQuery} ».`
            : `No sitemap entries matching "${filterQuery}".`}
        </p>
      </div>
    );
  }

  return (
    <nav
      aria-label={isFr ? 'Plan hiérarchique du site SEM' : 'SEM hierarchical sitemap'}
      className={
        compact
          ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      }
    >
      {filteredBranches.map((branch) => (
        <section
          key={branch.index}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1E33] p-6 flex flex-col justify-between transition-colors"
        >
          <div>
            <div className="flex items-baseline gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                {branch.index}
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {branch.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {branch.subtitle}
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-3.5" role="list">
              {branch.nodes.map((node) => {
                const isActive = currentPath === node.path;
                return (
                  <li key={node.id} className="group">
                    <a
                      href={node.path}
                      onClick={(e) => handleLinkClick(e, node.path)}
                      aria-current={isActive ? 'page' : undefined}
                      className="flex items-start justify-between gap-3 rounded-lg px-2.5 py-2 -mx-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                              isActive
                                ? 'bg-[#24A9E0]'
                                : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-[#3769B3] dark:group-hover:bg-[#24A9E0]'
                            }`}
                            aria-hidden="true"
                          />
                          <span
                            className={`text-sm font-semibold transition-colors ${
                              isActive
                                ? 'text-[#3769B3] dark:text-[#24A9E0]'
                                : 'text-slate-800 dark:text-slate-100 group-hover:text-[#3769B3] dark:group-hover:text-[#24A9E0]'
                            }`}
                          >
                            {node.label}
                          </span>
                        </div>
                        <p className="mt-0.5 pl-3.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {node.description}
                        </p>
                        <span className="mt-0.5 pl-3.5 block font-mono text-[11px] text-slate-400 dark:text-slate-500">
                          {node.path}
                        </span>
                      </div>
                      <ArrowRight
                        className="w-3.5 h-3.5 mt-1 shrink-0 text-slate-400 group-hover:text-[#3769B3] dark:group-hover:text-[#24A9E0] group-hover:translate-x-0.5 transition-all"
                        aria-hidden="true"
                      />
                    </a>

                    {node.children && node.children.length > 0 && (
                      <ul
                        role="list"
                        className="mt-1.5 ml-3 pl-3.5 border-l border-slate-200 dark:border-slate-700/80 space-y-1"
                      >
                        {node.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={
                                child.focusId
                                  ? `${child.path}#${child.focusId}`
                                  : child.path
                              }
                              onClick={(e) =>
                                handleLinkClick(e, child.path, child.focusId)
                              }
                              className="flex items-center justify-between gap-2 py-1 px-2 -mx-1 rounded text-xs text-slate-600 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              <span className="truncate">{child.label}</span>
                              <ArrowRight
                                className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}
    </nav>
  );
};

interface SitemapModalProps {
  isOpen: boolean;
  language: Language;
  currentPath: RoutePath;
  onClose: () => void;
  onSelect: (path: RoutePath, focusId?: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  language,
  currentPath,
  onClose,
  onSelect,
}) => {
  const isFr = language === 'fr';
  const [filterQuery, setFilterQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setFilterQuery('');
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectAndClose = (path: RoutePath, focusId?: string) => {
    onClose();
    onSelect(path, focusId);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sem-sitemap-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[1060px] my-auto rounded-2xl bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-5 bg-white dark:bg-[#0F1E33] border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0] flex items-center justify-center shrink-0">
              <FolderTree className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="sem-sitemap-modal-title"
                className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
              >
                {isFr
                  ? 'Plan du site & Architecture SEM'
                  : 'SEM Website Sitemap & Architecture'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {isFr
                  ? 'Accès hiérarchique complet aux 14 pages, 4 pôles stratégiques et 8 domaines du portefeuille.'
                  : 'Full hierarchical index of all 14 routes, 4 strategic units, and 8 portfolio categories.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/plan-du-site"
              onClick={(e) => {
                e.preventDefault();
                handleSelectAndClose('/plan-du-site');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isFr ? 'Vue pleine page' : 'Full Page View'}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={isFr ? 'Fermer le plan du site' : 'Close sitemap'}
              className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-5 sm:px-7 py-3.5 bg-white/80 dark:bg-[#0F1E33]/80 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={
                isFr
                  ? 'Filtrer par page, pôle ou expertise (ex: QoS, Broadcast, ISO)...'
                  : 'Filter by page, pole, or service (e.g., QoS, Broadcast, ISO)...'
              }
              className="w-full pl-9 pr-8 py-2 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3769B3] dark:focus:ring-[#24A9E0]"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                aria-label={isFr ? 'Effacer le filtre' : 'Clear filter'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap"
            >
              <FileCode2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
              ESC
            </span>
          </div>
        </div>

        {/* Scrollable Hierarchical Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          <SitemapTree
            language={language}
            currentPath={currentPath}
            onSelect={handleSelectAndClose}
            filterQuery={filterQuery}
            compact
          />
        </div>
      </div>
    </div>
  );
};

interface SitemapPageProps {
  language: Language;
  onNavigate: (path: RoutePath, focusId?: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  language,
  onNavigate,
}) => {
  const isFr = language === 'fr';
  const [filterQuery, setFilterQuery] = useState('');
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    if (downloadingPdf) return;
    setDownloadingPdf(true);
    try {
      await downloadCompanyBrochure(language);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070F1B] transition-colors">
      <PageHeader
        title={isFr ? 'Plan du site' : 'Website Sitemap'}
        subtitle={
          isFr
            ? 'Architecture complète des rubriques institutionnelles, pôles d’ingénierie, solutions du portefeuille, recrutement et ressources SEO.'
            : 'Complete hierarchical directory of corporate pages, engineering poles, portfolio solutions, careers, and SEO index.'
        }
        breadcrumbs={[{ label: isFr ? 'Plan du site' : 'Sitemap' }]}
        language={language}
        onNavigate={(path) => onNavigate(path)}
      />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Filter & Resource Utility Bar */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0F1E33] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={
                isFr
                  ? 'Rechercher une page ou un domaine technique...'
                  : 'Search a page or technical domain...'
              }
              className="w-full pl-10 pr-8 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3769B3] dark:focus:ring-[#24A9E0]"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                aria-label={isFr ? 'Réinitialiser' : 'Reset'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:border-[#3769B3] dark:hover:border-[#24A9E0] text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap"
            >
              <FileDown className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
              <span>
                {isFr ? 'Brochure PDF (FR / EN)' : 'Company Brochure PDF'}
              </span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#3769B3] hover:bg-[#2B5492] text-white text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <FileCode2 className="w-4 h-4" aria-hidden="true" />
              <span>{isFr ? 'Index XML (/sitemap.xml)' : 'XML Index (/sitemap.xml)'}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Full Hierarchical Grid */}
        <SitemapTree
          language={language}
          currentPath="/plan-du-site"
          onSelect={onNavigate}
          filterQuery={filterQuery}
        />
      </section>
    </div>
  );
};
