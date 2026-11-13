import React, { useState } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { Language } from '../types/sem';

interface NewsletterSectionProps {
  language: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  language,
}) => {
  const topicOptions =
    language === 'fr'
      ? [
          { id: 'it-dc', label: 'IT & Data Centers' },
          { id: 'telecom-qos', label: 'Télécoms & QoS' },
          { id: 'security-africa', label: 'Sûreté & Projets Afrique' },
        ]
      : [
          { id: 'it-dc', label: 'IT & Data Centers' },
          { id: 'telecom-qos', label: 'Telecoms & QoS' },
          { id: 'security-africa', label: 'Security & Africa Roll-outs' },
        ];

  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'it-dc',
    'telecom-qos',
  ]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg(
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          topics: selectedTopics,
          language,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            (language === 'fr'
              ? 'Impossible de valider votre inscription pour le moment.'
              : 'Unable to complete your subscription right now.')
        );
      }

      setFeedbackMsg(
        data.message ||
          (language === 'fr'
            ? 'Inscription confirmée.'
            : 'Subscription confirmed.')
      );
      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : language === 'fr'
            ? 'Erreur réseau lors de l’inscription.'
            : 'Network error while subscribing.'
      );
      setStatus('idle');
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="py-14 lg:py-16 bg-white dark:bg-[#070F1B] border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
              <Mail className="w-4 h-4 shrink-0" />
              <span>
                {language === 'fr'
                  ? 'Veille Technologique & Projets SEM'
                  : 'SEM Engineering Briefings'}
              </span>
            </div>
            <h2
              id="newsletter-heading"
              className="font-display text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 dark:text-white text-balance"
            >
              {language === 'fr'
                ? 'Suivez nos déploiements IT, Télécoms et actualités sectorielles'
                : 'Stay informed on SEM’s IT, Telecom & critical infrastructure roll-outs'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {language === 'fr'
                ? 'Recevez nos notes techniques sur les Data Centers, l’audit QoS, les solutions Keysight / Ericsson et nos réalisations au Maroc et en Afrique.'
                : 'Receive concise technical dispatches covering Data Centers, QoS benchmarking, Keysight & Ericsson solutions, and deployments across Morocco and Africa.'}
            </p>
          </div>

          <div className="lg:col-span-6">
            {status === 'success' ? (
              <div className="bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-700 rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {feedbackMsg}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('');
                    setStatus('idle');
                    setFeedbackMsg(null);
                  }}
                  className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                >
                  {language === 'fr'
                    ? 'Inscrire une autre adresse'
                    : 'Subscribe another address'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {topicOptions.map((topic) => {
                    const active = selectedTopics.includes(topic.id);
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleTopic(topic.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-[#3769B3] text-white border-[#3769B3]'
                            : 'bg-white dark:bg-[#070F1B] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#3769B3]'
                        }`}
                      >
                        {topic.label}
                      </button>
                    );
                  })}
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="px-3.5 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium"
                  >
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="sem-newsletter-email" className="sr-only">
                    {language === 'fr' ? 'Adresse e-mail professionnelle' : 'Work email address'}
                  </label>
                  <input
                    id="sem-newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      language === 'fr'
                        ? 'votre.nom@entreprise.ma'
                        : 'name@company.com'
                    }
                    className="flex-1 min-w-0 h-11 px-4 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-11 px-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] disabled:opacity-70 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {status === 'loading' && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    <span>
                      {language === 'fr' ? 'S’abonner' : 'Subscribe'}
                    </span>
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'fr'
                    ? 'Publication mensuelle sans spam. Désinscription possible à tout moment.'
                    : 'Monthly engineering digest. No spam, unsubscribe at any time.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
