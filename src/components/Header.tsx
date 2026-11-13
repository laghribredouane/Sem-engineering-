import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Download, FileText, Loader2, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { IMAGES, SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { downloadCompanyBrochure } from '../utils/downloadBrochure';
import { GlobalSearch } from './GlobalSearch';

interface HeaderProps {
  currentPath: RoutePath;
  language: Language;
  theme: 'light' | 'dark';
  onNavigate: (path: RoutePath, focusId?: string) => void;
  onLanguageChange: (lang: Language) => void;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  language,
  theme,
  onNavigate,
  onLanguageChange,
  onToggleTheme,
}) => {
  const dict = SEM_CONTENT[language];
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brochureState, setBrochureState] = useState<'idle' | 'loading' | 'done'>('idle');
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenDropdown(null);
        setMobileOpen(false);
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = (path: RoutePath, focusId?: string) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    onNavigate(path, focusId);
  };

  const handleDownloadBrochure = async () => {
    if (brochureState === 'loading') return;
    setBrochureState('loading');
    try {
      await downloadCompanyBrochure(language);
      setBrochureState('done');
      window.setTimeout(() => setBrochureState('idle'), 2200);
    } catch {
      setBrochureState('idle');
    }
  };

  const isNavItemActive = (item: (typeof dict.nav)[number]): boolean => {
    if (item.path) return currentPath === item.path;
    return item.children?.some((c) => c.path === currentPath) ?? false;
  };

  const themeToggleLabel =
    theme === 'dark'
      ? language === 'fr'
        ? 'Passer en mode clair'
        : 'Switch to light mode'
      : language === 'fr'
        ? 'Passer en mode sombre'
        : 'Switch to dark mode';

  return (
    <header
      ref={headerRef}
      className="print:hidden no-print sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand mark (single clean element) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="shrink-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] rounded-sm"
          aria-label="SEM — Smart Engineering & Management"
        >
          <img
            src={theme === 'dark' ? IMAGES.logoWhite : IMAGES.logoColor}
            alt="SEM — Smart Engineering & Management"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        {/* Zone 2: Primary navigation links (5 concise items) */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-6"
        >
          {dict.nav.map((item) => {
            const active = isNavItemActive(item);
            if (item.children) {
              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                    className={`inline-flex items-center gap-1 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] rounded-sm ${
                      active
                        ? 'text-[#3769B3] dark:text-[#24A9E0]'
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#3769B3] dark:hover:text-[#24A9E0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full pt-1.5 w-[320px] z-50">
                      <div className="bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-2">
                        {item.children.map((sub) => {
                          const subActive = currentPath === sub.path;
                          return (
                            <a
                              key={sub.path}
                              href={sub.path}
                              onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(sub.path);
                              }}
                              className={`block px-3 py-2.5 rounded-md transition-colors duration-150 ${
                                subActive
                                  ? 'bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0]'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-900 dark:text-slate-100'
                              }`}
                            >
                              <div className="text-sm font-semibold leading-snug">
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                  {sub.description}
                                </div>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.path) handleLinkClick(item.path);
                }}
                className={`py-2 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] ${
                  active
                    ? 'text-[#3769B3] dark:text-[#24A9E0] border-[#3769B3] dark:border-[#24A9E0]'
                    : 'text-slate-700 dark:text-slate-200 border-transparent hover:text-[#3769B3] dark:hover:text-[#24A9E0] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Search, Theme Toggle & Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              setMobileOpen(false);
              setSearchOpen(true);
            }}
            aria-label={language === 'fr' ? 'Rechercher sur le site (⌘K)' : 'Search website (⌘K)'}
            className="inline-flex items-center gap-1.5 h-10 px-2.5 sm:px-3 text-sm text-slate-600 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0] bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3]"
          >
            <Search className="w-4 h-4 shrink-0" />
            <kbd className="hidden xl:inline-block text-[11px] font-mono text-slate-400 dark:text-slate-500">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeToggleLabel}
            aria-pressed={theme === 'dark'}
            title={themeToggleLabel}
            className="inline-flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0] bg-slate-50 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadBrochure}
            disabled={brochureState === 'loading'}
            aria-label={
              language === 'fr'
                ? 'Télécharger la brochure de présentation (PDF)'
                : 'Download company presentation brochure (PDF)'
            }
            title={
              language === 'fr'
                ? 'Télécharger la brochure (PDF)'
                : 'Download Brochure (PDF)'
            }
            className="hidden sm:inline-flex items-center gap-2 h-10 px-3.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#3769B3] dark:hover:text-[#24A9E0] bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] disabled:opacity-70"
          >
            {brochureState === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
            ) : brochureState === 'done' ? (
              <Check className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            ) : (
              <Download className="w-4 h-4 shrink-0 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
            )}
            <span className="hidden xl:inline">
              {brochureState === 'done'
                ? language === 'fr'
                  ? 'Brochure prête'
                  : 'Downloaded'
                : language === 'fr'
                  ? 'Télécharger la brochure'
                  : 'Download Brochure'}
            </span>
            <span className="xl:hidden">Brochure</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            aria-label={language === 'fr' ? 'Télécharger la version PDF (Imprimer la page)' : 'Download PDF Version (Print page)'}
            title={language === 'fr' ? 'Version PDF / Imprimer' : 'PDF Version / Print'}
            className="hidden md:inline-flex items-center gap-1.5 h-10 px-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#3769B3] dark:hover:text-[#24A9E0] bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            <FileText className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
            <span className="hidden lg:inline">{language === 'fr' ? 'Version PDF' : 'PDF Version'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('/nous-contacter')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3769B3]"
          >
            {dict.contactCta}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B192C] max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="px-4 py-5 space-y-5">
            {dict.nav.map((item) => (
              <div key={item.label} className="space-y-2">
                {item.path ? (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.path!);
                    }}
                    className={`block py-2 text-base font-semibold ${
                      currentPath === item.path
                        ? 'text-[#3769B3] dark:text-[#24A9E0]'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wide">
                      {item.label}
                    </div>
                    <div className="grid grid-cols-1 gap-1 pl-2 border-l border-slate-200 dark:border-slate-700">
                      {item.children?.map((sub) => (
                        <a
                          key={sub.path}
                          href={sub.path}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(sub.path);
                          }}
                          className={`py-2 px-3 rounded-md text-sm font-medium ${
                            currentPath === sub.path
                              ? 'bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0]'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                disabled={brochureState === 'loading'}
                className="w-full py-3 px-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#3769B3]"
              >
                {brochureState === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
                ) : brochureState === 'done' ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <Download className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
                )}
                <span>
                  {language === 'fr' ? 'Télécharger la brochure (PDF)' : 'Download Brochure (PDF)'}
                </span>
              </button>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleLinkClick('/nous-contacter')}
                  className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg text-center"
                >
                  {dict.contactCta}
                </button>

                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('fr')}
                    className={`px-3 py-2 text-xs font-semibold rounded-md ${
                      language === 'fr'
                        ? 'bg-white dark:bg-[#3769B3] text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-2 text-xs font-semibold rounded-md ${
                      language === 'en'
                        ? 'bg-white dark:bg-[#3769B3] text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <GlobalSearch
        isOpen={searchOpen}
        language={language}
        onClose={() => setSearchOpen(false)}
        onSelect={(path, focusId) => handleLinkClick(path, focusId)}
      />
    </header>
  );
};
