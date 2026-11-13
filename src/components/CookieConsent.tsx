import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronUp, ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { Language } from '../types/sem';

export interface CookiePreferences {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;
  version: number;
}

const STORAGE_KEY = 'sem-cookie-consent-v1';
const CONSENT_VERSION = 1;

export function getStoredCookieConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      parsed.necessary === true &&
      typeof parsed.functional === 'boolean' &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean'
    ) {
      return parsed as CookiePreferences;
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

function saveCookieConsent(prefs: CookiePreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
}

interface CookieConsentProps {
  language: Language;
  forceOpenPreferences?: boolean;
  onCloseForcePreferences?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  language,
  forceOpenPreferences = false,
  onCloseForcePreferences,
}) => {
  const isFr = language === 'fr';
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const [functional, setFunctional] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Show banner automatically on first visit if no consent is stored
  useEffect(() => {
    const existing = getStoredCookieConsent();
    if (!existing) {
      setBannerVisible(true);
    } else {
      setFunctional(existing.functional);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
  }, []);

  // Allow reopening preferences anytime from the Footer
  useEffect(() => {
    if (forceOpenPreferences) {
      const existing = getStoredCookieConsent();
      if (existing) {
        setFunctional(existing.functional);
        setAnalytics(existing.analytics);
        setMarketing(existing.marketing);
      }
      setPreferencesOpen(true);
    }
  }, [forceOpenPreferences]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreferencesOpen(false);
        onCloseForcePreferences?.();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [preferencesOpen, onCloseForcePreferences]);

  const commitPreferences = (next: {
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    const payload: CookiePreferences = {
      necessary: true,
      functional: next.functional,
      analytics: next.analytics,
      marketing: next.marketing,
      consentedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    saveCookieConsent(payload);
    setFunctional(next.functional);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setBannerVisible(false);
    setPreferencesOpen(false);
    onCloseForcePreferences?.();
  };

  const handleAcceptAll = () => {
    commitPreferences({ functional: true, analytics: true, marketing: true });
  };

  const handleRejectOptional = () => {
    commitPreferences({ functional: false, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    commitPreferences({ functional, analytics, marketing });
  };

  const handleCloseModal = () => {
    setPreferencesOpen(false);
    onCloseForcePreferences?.();
  };

  const categories = [
    {
      id: 'necessary',
      title: isFr ? 'Cookies strictement nécessaires' : 'Strictly Necessary Cookies',
      description: isFr
        ? 'Indispensables à la sécurité de navigation, au routage et à la mémorisation de votre choix RGPD. Ne peuvent pas être désactivés.'
        : 'Required for core site security, navigation routing, and storing your GDPR consent state. Cannot be disabled.',
      locked: true,
      checked: true,
      onChange: undefined,
    },
    {
      id: 'functional',
      title: isFr ? 'Préférences fonctionnelles' : 'Functional Preferences',
      description: isFr
        ? 'Mémorisent votre langue (FR/EN), votre thème d’affichage (clair/sombre) et le contexte de page pour l’assistant.'
        : 'Remember your preferred language (FR/EN), light/dark theme mode, and page context.',
      locked: false,
      checked: functional,
      onChange: (val: boolean) => setFunctional(val),
    },
    {
      id: 'analytics',
      title: isFr ? 'Mesure d’audience & performance' : 'Analytics & Performance',
      description: isFr
        ? 'Statistiques agrégées et anonymisées permettant d’améliorer la performance des pages et des ressources techniques.'
        : 'Aggregated, anonymized usage metrics that help us improve page performance and engineering resources.',
      locked: false,
      checked: analytics,
      onChange: (val: boolean) => setAnalytics(val),
    },
    {
      id: 'marketing',
      title: isFr ? 'Communications & contenus tiers' : 'External Media & Dispatches',
      description: isFr
        ? 'Personnalisation des veilles sectorielles SEM et intégration de profils professionnels externes.'
        : 'Tailoring SEM engineering dispatches and enabling external professional profile integrations.',
      locked: false,
      checked: marketing,
      onChange: (val: boolean) => setMarketing(val),
    },
  ];

  return (
    <>
      {/* First-Visit Non-Blocking GDPR Consent Banner */}
      {bannerVisible && !preferencesOpen && (
        <aside
          aria-label={isFr ? 'Gestion des cookies et confidentialité' : 'Cookie consent banner'}
          role="region"
          className="no-print print:hidden fixed z-50 bottom-4 left-4 right-4 sm:right-auto sm:max-w-[560px] rounded-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 shadow-2xl p-5 sm:p-6 transition-all"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  {isFr
                    ? 'Respect de votre vie privée (RGPD)'
                    : 'Your Privacy & Cookie Choices (GDPR)'}
                </h2>
                <span className="font-mono text-[11px] font-medium text-slate-400 dark:text-slate-500 shrink-0">
                  RGPD / GDPR
                </span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isFr
                  ? 'SEM utilise des cookies strictement nécessaires au bon fonctionnement du portail ainsi que des cookies optionnels de préférences et de mesure d’audience. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.'
                  : 'SEM uses strictly necessary cookies for core portal operation, alongside optional preference and analytics cookies. You can accept, reject optional cookies, or customize your preferences at any time.'}
              </p>

              {/* Equal-weight GDPR Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  {isFr ? 'Tout refuser' : 'Reject All'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreferencesOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />
                  <span>{isFr ? 'Personnaliser' : 'Manage Preferences'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3769B3] hover:bg-[#2B5492] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isFr ? 'Tout accepter' : 'Accept All'}</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Granular GDPR Preferences Modal */}
      {preferencesOpen && (
        <div
          className="no-print print:hidden fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sem-cookie-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="w-full max-w-[640px] my-auto rounded-2xl bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="sem-cookie-modal-title"
                    className="font-display text-lg font-bold text-slate-900 dark:text-white"
                  >
                    {isFr
                      ? 'Centre de préférences des cookies'
                      : 'Cookie Preference Center'}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isFr
                      ? 'Configurez votre consentement par finalité conformément au Règlement Général sur la Protection des Données (RGPD).'
                      : 'Configure your consent per category in accordance with the General Data Protection Regulation (GDPR).'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label={isFr ? 'Fermer les préférences' : 'Close preferences'}
                className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Toggles */}
            <div className="p-6 overflow-y-auto space-y-3.5">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0F1E33]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                          {cat.title}
                        </h3>
                        {cat.locked && (
                          <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            {isFr ? 'TOUJOURS ACTIF' : 'ALWAYS ACTIVE'}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {cat.locked ? (
                      <div
                        aria-label={isFr ? 'Toujours actif' : 'Always active'}
                        className="w-11 h-6 rounded-full bg-emerald-600/85 dark:bg-emerald-500/80 relative shrink-0 cursor-not-allowed opacity-85"
                      >
                        <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white shadow-xs" />
                      </div>
                    ) : (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={cat.checked}
                        aria-label={cat.title}
                        onClick={() => cat.onChange?.(!cat.checked)}
                        className={`w-11 h-6 rounded-full relative shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] ${
                          cat.checked
                            ? 'bg-[#3769B3] dark:bg-[#24A9E0]'
                            : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                            cat.checked ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <CookieRetentionNote language={language} />
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-[#070F1B] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                {isFr ? 'Tout refuser (essentiels uniquement)' : 'Reject Optional'}
              </button>

              <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-4 py-2.5 rounded-lg border border-[#3769B3] dark:border-[#24A9E0] text-[#3769B3] dark:text-[#24A9E0] hover:bg-[#3769B3]/5 dark:hover:bg-[#24A9E0]/10 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  {isFr ? 'Enregistrer mes choix' : 'Save Preferences'}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2.5 rounded-lg bg-[#3769B3] hover:bg-[#2B5492] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  {isFr ? 'Tout accepter' : 'Accept All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CookieRetentionNote: React.FC<{ language: Language }> = ({ language }) => {
  const [expanded, setExpanded] = useState(false);
  const isFr = language === 'fr';

  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        <span>
          {isFr
            ? 'Informations sur la durée de conservation et vos droits'
            : 'Details on retention period and your rights'}
        </span>
      </button>
      {expanded && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-5">
          {isFr
            ? 'Votre choix est conservé localement pendant 6 mois maximum et peut être modifié ou retiré à tout moment via le lien « Gestion des cookies » en pied de page. Aucune donnée personnelle n’est vendue à des tiers.'
            : 'Your preference selection is stored locally for up to 6 months and may be modified or withdrawn at any time from the "Cookie Preferences" link in the footer. No personal data is sold to third parties.'}
        </p>
      )}
    </div>
  );
};
