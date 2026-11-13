import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CLIENT_LOGOS, PARTNER_LOGOS, SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { PageHeader } from '../components/PageHeader';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { ResilientImage } from '../components/ResilientImage';

interface EcosystemPageProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
}

const EcosystemSubNav: React.FC<{
  active: 'partenaires' | 'clients';
  language: Language;
  onNavigate: (path: RoutePath) => void;
}> = ({ active, language, onNavigate }) => {
  const items = SEM_CONTENT[language].nav[3]?.children || [];
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-2">
        {items.map((item) => {
          const isCurrent =
            (active === 'partenaires' && item.path === '/partenaires') ||
            (active === 'clients' && item.path === '/clients');
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                isCurrent
                  ? 'bg-[#3769B3] text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const PartenairesPage: React.FC<EcosystemPageProps> = ({
  language,
  onNavigate,
}) => {
  const p = SEM_CONTENT[language].partnersPage;
  const ecoLabel = language === 'fr' ? 'Écosystème' : 'Ecosystem';

  return (
    <div>
      <ReadingProgressBar label={p.title} />
      <PageHeader
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[{ label: ecoLabel, path: '/partenaires' }, { label: p.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <EcosystemSubNav active="partenaires" language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {p.intro}
            </p>
            <div className="text-sm font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums shrink-0">
              {PARTNER_LOGOS.length} {language === 'fr' ? 'partenaires référencés' : 'listed partners'}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.id}
                className="bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 hover:border-[#3769B3]/50 rounded-xl p-6 h-32 flex items-center justify-center transition-colors"
              >
                <ResilientImage
                  src={partner.src}
                  alt={partner.name}
                  objectFit="contain"
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {language === 'fr'
                ? 'Découvrez également notre distribution exclusive (Keysight, Ericsson TV & Media, GENELEC).'
                : 'Explore our exclusive distribution channels (Keysight, Ericsson TV & Media, GENELEC).'}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/portefeuille')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap shrink-0"
            >
              <span>{SEM_CONTENT[language].portfolioPage.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ClientsPage: React.FC<EcosystemPageProps> = ({
  language,
  onNavigate,
}) => {
  const c = SEM_CONTENT[language].clientsPage;
  const ecoLabel = language === 'fr' ? 'Écosystème' : 'Ecosystem';

  return (
    <div>
      <ReadingProgressBar label={c.title} />
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        breadcrumbs={[{ label: ecoLabel, path: '/partenaires' }, { label: c.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <EcosystemSubNav active="clients" language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
              {c.intro}
            </p>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.acknowledgement}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.id}
                className="bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 hover:border-[#3769B3]/50 rounded-xl p-6 h-32 flex items-center justify-center transition-colors"
              >
                <ResilientImage
                  src={client.src}
                  alt={client.name}
                  objectFit="contain"
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                {language === 'fr'
                  ? 'Vous souhaitez engager un projet d’infrastructure avec SEM ?'
                  : 'Looking to start an infrastructure program with SEM?'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {language === 'fr'
                  ? 'Échangez directement avec nos ingénieurs et chefs de projets.'
                  : 'Connect directly with our engineering and project management teams.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/nous-contacter')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {SEM_CONTENT[language].contactCta}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
