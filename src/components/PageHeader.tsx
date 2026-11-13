import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language, RoutePath } from '../types/sem';

interface Crumb {
  label: string;
  path?: RoutePath;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: Crumb[];
  language: Language;
  onNavigate: (path: RoutePath) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  language,
  onNavigate,
}) => {
  return (
    <section className="bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-5"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-1.5 hover:text-[#3769B3] dark:hover:text-[#24A9E0] transition-colors font-medium py-0.5"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{language === 'fr' ? 'Accueil' : 'Home'}</span>
          </a>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden="true" />
                {crumb.path && !isLast ? (
                  <a
                    href={crumb.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(crumb.path!);
                    }}
                    className="hover:text-[#3769B3] dark:hover:text-[#24A9E0] transition-colors font-medium py-0.5"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={
                      isLast
                        ? 'text-slate-900 dark:text-slate-100 font-semibold py-0.5'
                        : 'text-slate-500 dark:text-slate-400 font-medium py-0.5'
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <div className="max-w-3xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-[1.15]">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
