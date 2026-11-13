import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';

type SearchGroup = 'all' | 'pages' | 'poles' | 'portfolio';

interface SearchEntry {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  group: Exclude<SearchGroup, 'all'>;
  path: RoutePath;
  focusId?: string;
  keywords: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelect: (path: RoutePath, focusId?: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  language,
  onClose,
  onSelect,
}) => {
  const dict = SEM_CONTENT[language];
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<SearchGroup>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo<SearchEntry[]>(() => {
    const list: SearchEntry[] = [];

    // 1. All navigation pages & subpages
    dict.nav.forEach((item) => {
      if (item.path) {
        list.push({
          id: `page-${item.path}`,
          title: item.label,
          subtitle:
            item.path === '/'
              ? dict.home.headline
              : dict.portfolioPage.subtitle,
          categoryLabel: language === 'fr' ? 'Page' : 'Page',
          group: 'pages',
          path: item.path,
          keywords: `${item.label} ${item.path}`,
        });
      }
      if (item.children) {
        item.children.forEach((sub) => {
          list.push({
            id: `subpage-${sub.path}`,
            title: sub.label,
            subtitle: sub.description || '',
            categoryLabel: item.label,
            group: 'pages',
            path: sub.path,
            keywords: `${sub.label} ${sub.description || ''} ${item.label}`,
          });
        });
      }
    });

    // Contact page
    list.push({
      id: 'page-contact',
      title: dict.contactPage.title,
      subtitle: `${dict.contactPage.address} · ${dict.contactPage.phone}`,
      categoryLabel: language === 'fr' ? 'Contact' : 'Contact',
      group: 'pages',
      path: '/nous-contacter',
      keywords: `${dict.contactPage.title} Mohammedia contact email téléphone ${dict.contactPage.departments.join(' ')}`,
    });

    // Sitemap page
    list.push({
      id: 'page-sitemap',
      title: language === 'fr' ? 'Plan du site' : 'Website Sitemap',
      subtitle:
        language === 'fr'
          ? 'Arborescence complète des pages, pôles et solutions SEM'
          : 'Complete hierarchical directory of SEM pages, units, and solutions',
      categoryLabel: language === 'fr' ? 'Navigation & SEO' : 'Navigation & SEO',
      group: 'pages',
      path: '/plan-du-site',
      keywords: 'plan du site sitemap seo arborescence index directory navigation xml',
    });

    // 2. Strategic Poles & individual capabilities
    dict.polesPage.poles.forEach((pole) => {
      list.push({
        id: `pole-${pole.id}`,
        title: pole.title,
        subtitle: pole.shortDesc,
        categoryLabel:
          language === 'fr' ? 'Pôle Stratégique' : 'Strategic Unit',
        group: 'poles',
        path: '/domaines-d-activites',
        focusId: pole.id,
        keywords: `${pole.title} ${pole.shortDesc} ${pole.fullDesc} ${pole.capabilities.join(' ')} ${pole.deliverables.join(' ')}`,
      });

      pole.capabilities.forEach((cap, idx) => {
        list.push({
          id: `cap-${pole.id}-${idx}`,
          title: cap,
          subtitle: `${pole.title} · ${pole.deliverables.join(' / ')}`,
          categoryLabel: pole.title,
          group: 'poles',
          path: '/domaines-d-activites',
          focusId: pole.id,
          keywords: `${cap} ${pole.title} ${pole.deliverables.join(' ')}`,
        });
      });
    });

    // 3. Portfolio categories, items, and Exclusive Distribution brands
    dict.portfolioPage.categories.forEach((cat) => {
      list.push({
        id: `port-cat-${cat.id}`,
        title: cat.title,
        subtitle: `${cat.summary} — ${cat.items.join(', ')}`,
        categoryLabel: language === 'fr' ? 'Portefeuille' : 'Portfolio',
        group: 'portfolio',
        path: '/portefeuille',
        focusId: cat.id,
        keywords: `${cat.title} ${cat.summary} ${cat.items.join(' ')}`,
      });

      cat.items.forEach((item, idx) => {
        list.push({
          id: `port-item-${cat.id}-${idx}`,
          title: item,
          subtitle: `${dict.portfolioPage.title} · ${cat.title}`,
          categoryLabel: cat.title,
          group: 'portfolio',
          path: '/portefeuille',
          focusId: cat.id,
          keywords: `${item} ${cat.title} ${cat.summary}`,
        });
      });
    });

    dict.portfolioPage.exclusiveBrands.forEach((brand) => {
      list.push({
        id: `brand-${brand.brand}`,
        title: brand.brand,
        subtitle: brand.description,
        categoryLabel: brand.category,
        group: 'portfolio',
        path: '/portefeuille',
        focusId: 'distribution',
        keywords: `${brand.brand} ${brand.category} ${brand.description} distribution exclusive`,
      });
    });

    // 4. Certifications & Milestones
    dict.certPage.programs.forEach((prog) => {
      list.push({
        id: `cert-${prog.code}`,
        title: `${prog.code} — ${prog.name}`,
        subtitle: prog.scope,
        categoryLabel: dict.certPage.title,
        group: 'pages',
        path: '/certifications',
        keywords: `${prog.code} ${prog.name} ${prog.scope} ${prog.description}`,
      });
    });

    dict.historyPage.milestones.forEach((m, idx) => {
      list.push({
        id: `hist-${idx}`,
        title: `${m.year} — ${m.title}`,
        subtitle: m.description,
        categoryLabel: dict.historyPage.title,
        group: 'pages',
        path: '/histoire',
        keywords: `${m.year} ${m.title} ${m.description} ${m.category} Sicotel`,
      });
    });

    return list;
  }, [dict, language]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool =
      group === 'all' ? entries : entries.filter((e) => e.group === group);

    if (!q) {
      return pool.slice(0, 8);
    }

    const terms = q.split(/\s+/).filter(Boolean);
    return pool
      .filter((entry) => {
        const haystack =
          `${entry.title} ${entry.subtitle} ${entry.categoryLabel} ${entry.keywords}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 14);
  }, [entries, group, query]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(timer);
    } else {
      setQuery('');
      setGroup('all');
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, group]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length > 0 ? (prev + 1) % filtered.length : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length > 0
            ? (prev - 1 + filtered.length) % filtered.length
            : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        const chosen = filtered[activeIndex];
        onSelect(chosen.path, chosen.focusId);
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, filtered, activeIndex, onClose, onSelect]);

  if (!isOpen) return null;

  const suggestions =
    language === 'fr'
      ? ['Keysight', 'Data Center', 'VSAT', 'ISO 9001', 'Drive Test', 'AMOA']
      : ['Keysight', 'Data Center', 'VSAT', 'ISO 9001', 'Drive Test', 'AMOA'];

  const groupLabels: { id: SearchGroup; label: string }[] =
    language === 'fr'
      ? [
          { id: 'all', label: 'Tout' },
          { id: 'pages', label: 'Pages' },
          { id: 'poles', label: 'Pôles & Services' },
          { id: 'portfolio', label: 'Portefeuille' },
        ]
      : [
          { id: 'all', label: 'All' },
          { id: 'pages', label: 'Pages' },
          { id: 'poles', label: 'Business Units' },
          { id: 'portfolio', label: 'Portfolio' },
        ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={
        language === 'fr' ? 'Recherche globale SEM' : 'SEM Global Search'
      }
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input Row */}
        <div className="flex items-center gap-3 px-4 sm:px-5 h-14 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'fr'
                ? 'Rechercher un service, un pôle, Keysight, ISO 9001, une page…'
                : 'Search a service, unit, Keysight, ISO 9001, or page…'
            }
            className="flex-1 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={language === 'fr' ? 'Effacer' : 'Clear'}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Category Segmented Filter */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg shrink-0">
            {groupLabels.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(g.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  group === g.id
                    ? 'bg-white dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            {suggestions.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="hover:text-[#3769B3] dark:hover:text-[#24A9E0] font-medium transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center space-y-2">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                {language === 'fr'
                  ? 'Aucun résultat trouvé'
                  : 'No matching results'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'fr'
                  ? 'Essayez avec un autre mot-clé comme Data Center, VSAT, Keysight, QoS ou Contact.'
                  : 'Try another keyword such as Data Center, VSAT, Keysight, QoS, or Contact.'}
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    onSelect(item.path, item.focusId);
                    onClose();
                  }}
                  className={`w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 transition-colors ${
                    isSelected
                      ? 'bg-[#3769B3]/10 dark:bg-[#24A9E0]/12'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                      <span className="font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                        {item.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono truncate">{item.path}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isSelected
                        ? 'text-[#3769B3] dark:text-[#24A9E0]'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
