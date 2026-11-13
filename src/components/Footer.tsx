import React, { useState } from 'react';
import { Check, FileDown, FolderTree, Globe, Loader2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { IMAGES, SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { downloadCompanyBrochure } from '../utils/downloadBrochure';

interface FooterProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
  onLanguageChange: (lang: Language) => void;
  onOpenSitemap?: () => void;
  onOpenCookiePreferences?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onLanguageChange,
  onOpenSitemap,
  onOpenCookiePreferences,
}) => {
  const dict = SEM_CONTENT[language];
  const aboutNav = dict.nav[1]?.children || [];
  const ecosystemNav = dict.nav[3]?.children || [];
  const careersNav = dict.nav[4]?.children || [];
  const [brochureState, setBrochureState] = useState<'idle' | 'loading' | 'done'>('idle');

  const go = (e: React.MouseEvent, path: RoutePath) => {
    e.preventDefault();
    onNavigate(path);
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

  return (
    <footer className="print:hidden no-print bg-[#0B192C] text-slate-300 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Contact Overview */}
          <div className="lg:col-span-4 space-y-6">
            <a
              href="/"
              onClick={(e) => go(e, '/')}
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24A9E0] rounded-sm"
            >
              <img
                src={IMAGES.logoWhite}
                alt="SEM — Smart Engineering & Management"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {dict.footer.tagline}
            </p>

            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#24A9E0] shrink-0 mt-0.5" />
                <span>{dict.contactPage.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#24A9E0] shrink-0" />
                <a
                  href="tel:+212523322321"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  +212 (0) 523 322 321
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#24A9E0] shrink-0" />
                <a
                  href="mailto:contact@sem.ma"
                  className="hover:text-white transition-colors"
                >
                  contact@sem.ma
                </a>
              </div>
            </div>

            {/* Corporate Presentation PDF Download */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                disabled={brochureState === 'loading'}
                aria-label={
                  language === 'fr'
                    ? 'Télécharger la brochure de présentation (PDF)'
                    : 'Download company presentation brochure (PDF)'
                }
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#3769B3] hover:bg-[#2B5492] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24A9E0] disabled:opacity-75"
              >
                {brochureState === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                ) : brochureState === 'done' ? (
                  <Check className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                ) : (
                  <FileDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                <span>
                  {brochureState === 'done'
                    ? language === 'fr'
                      ? 'Brochure téléchargée'
                      : 'Brochure Downloaded'
                    : language === 'fr'
                      ? 'Télécharger la brochure'
                      : 'Download Brochure'}
                </span>
              </button>
              <p className="mt-2 text-xs text-slate-400">
                {language === 'fr'
                  ? 'Présentation institutionnelle · Document PDF (FR / EN)'
                  : 'Corporate presentation · PDF document (FR / EN)'}
              </p>
            </div>

            {/* Social & Professional Profiles */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-400 mb-3">
                {language === 'fr' ? 'Réseaux & Profils Professionnels' : 'Social & Professional Profiles'}
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/company/sem-smartengineeringandmanagement/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SEM sur LinkedIn"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900/70 hover:bg-[#3769B3] hover:border-[#3769B3] text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/marocsem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SEM sur Twitter / X"
                  title="Twitter / X"
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900/70 hover:bg-[#3769B3] hover:border-[#3769B3] text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/SMARTENGINEERINGANDMANAGEMENT/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SEM sur Facebook"
                  title="Facebook"
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900/70 hover:bg-[#3769B3] hover:border-[#3769B3] text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
                <a
                  href="https://www.sem.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portail officiel sem.ma"
                  title="sem.ma"
                  className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900/70 hover:bg-[#3769B3] hover:border-[#3769B3] text-slate-300 hover:text-white inline-flex items-center justify-center transition-colors"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* About Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {dict.footer.aboutColTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {aboutNav.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => go(e, item.path)}
                    className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Ecosystem Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              {dict.footer.solutionsColTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/portefeuille"
                  onClick={(e) => go(e, '/portefeuille')}
                  className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                >
                  {dict.portfolioPage.title}
                </a>
              </li>
              {ecosystemNav.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => go(e, item.path)}
                    className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/nous-contacter"
                  onClick={(e) => go(e, '/nous-contacter')}
                  className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                >
                  {dict.contactCta}
                </a>
              </li>
              <li>
                <a
                  href="/plan-du-site"
                  onClick={(e) => go(e, '/plan-du-site')}
                  className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                >
                  {language === 'fr' ? 'Plan du site' : 'Website Sitemap'}
                </a>
              </li>
            </ul>
          </div>

          {/* Careers & Language Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                {dict.footer.careersColTitle}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {careersNav.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="text-slate-300 hover:text-[#24A9E0] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <Globe className="w-3.5 h-3.5" />
                <span>{dict.footer.languageLabel}</span>
              </div>
              <div className="inline-flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-700 rounded-lg">
                <button
                  type="button"
                  onClick={() => onLanguageChange('fr')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    language === 'fr'
                      ? 'bg-[#3769B3] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Français
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    language === 'en'
                      ? 'bg-[#3769B3] text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Sitemap & Official Social Links */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>{dict.footer.rights}</p>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            {onOpenSitemap && (
              <button
                type="button"
                onClick={onOpenSitemap}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#24A9E0] font-medium transition-colors whitespace-nowrap"
              >
                <FolderTree className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{language === 'fr' ? 'Plan du site' : 'Sitemap'}</span>
              </button>
            )}
            <a
              href="/plan-du-site"
              onClick={(e) => go(e, '/plan-du-site')}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {language === 'fr' ? 'Index complet' : 'Full Directory'}
            </a>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] hover:text-white transition-colors whitespace-nowrap"
            >
              sitemap.xml
            </a>
            {onOpenCookiePreferences && (
              <button
                type="button"
                onClick={onOpenCookiePreferences}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#24A9E0] font-medium transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{language === 'fr' ? 'Gestion des cookies' : 'Cookie Preferences'}</span>
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://www.linkedin.com/company/sem-smartengineeringandmanagement/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/marocsem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </a>
            <a
              href="https://www.facebook.com/SMARTENGINEERINGANDMANAGEMENT/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
