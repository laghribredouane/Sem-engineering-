import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Loader2,
  MessageSquare,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { Language, RoutePath } from '../types/sem';

export interface PageContextInfo {
  path: RoutePath;
  title: string;
  summary: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

interface ContextualAssistantProps {
  pageContext: PageContextInfo;
  language: Language;
  onNavigate: (path: RoutePath) => void;
}

function getSuggestedPrompts(
  path: RoutePath,
  language: Language
): string[] {
  if (language === 'en') {
    switch (path) {
      case '/domaines-d-activites':
        return [
          'What are the technical specs of FTK optical and microwave backbones?',
          'How do you integrate long-range radar sensors and thermal cameras?',
          'Which M2M protocols do you use for Data Center telemetry?',
          'How are multi-operator QoS Drive Test audits conducted?',
        ];
      case '/portefeuille':
        return [
          'Which exclusive Keysight RF test & measurement instruments do you distribute?',
          'What power ranges do GENELEC industrial generators cover?',
          'What precision cooling architectures do you deploy for Data Centers?',
          'Which low current and solar backup systems do you integrate?',
        ];
      case '/histoire':
      case '/mission-et-valeurs':
      case '/mot-du-directeur-general':
        return [
          'How has SEM maintained engineering continuity since 2008?',
          'What is the South-South technical cooperation framework in Africa?',
          'How does SEM engineering directly reduce client OPEX?',
        ];
      case '/certifications':
      case '/organisation':
        return [
          'What are the ISO 9001 and OHSAS 18001 compliance requirements on site?',
          'How is SEM’s hybrid matrix and projectized organization structured?',
          'What EHS governance protocols apply during tower and shelter installation?',
        ];
      case '/offres-d-emplois':
      case '/candidature':
        return [
          'What core engineering profiles (IP, QoS, RF, PMO) do you recruit?',
          'How does the technical onboarding and OJT knowledge transfer work?',
        ];
      case '/nous-contacter':
        return [
          'What are your Mohammedia HQ hours, coordinates, and direct contacts?',
          'Which technical department evaluates engineering project specifications?',
        ];
      default:
        return [
          'What are SEM’s 4 strategic engineering business units?',
          'How do you engineer turnkey FTK infrastructure projects?',
          'What are your exclusive OEM partnerships (Keysight, Ericsson, GENELEC)?',
          'Where is your HQ and how can I request a technical quote?',
        ];
    }
  }

  switch (path) {
    case '/domaines-d-activites':
      return [
        'Quelles sont les spécifications des liaisons optiques et hertziennes FTK ?',
        'Comment intégrez-vous les capteurs radar et caméras thermiques longue portée ?',
        'Quels protocoles de supervision M2M utilisez-vous pour les Data Centers ?',
        'Comment sont menés les audits de performance QoS et Drive Test ?',
      ];
    case '/portefeuille':
      return [
        'Quels instruments de test RF Keysight distribuez-vous en exclusivité ?',
        'Quelles puissances de groupes électrogènes GENELEC proposez-vous ?',
        'Quelles sont les architectures de climatisation de précision pour Data Centers ?',
        'Quels systèmes de courants faibles et d’énergie solaire intégrez-vous ?',
      ];
    case '/histoire':
    case '/mission-et-valeurs':
    case '/mot-du-directeur-general':
      return [
        'Comment SEM assure-t-elle la continuité technique depuis 2008 ?',
        'Quelle est la méthodologie de coopération Sud-Sud en Afrique ?',
        'Comment l’ingénierie SEM permet-elle de réduire les OPEX clients ?',
      ];
    case '/certifications':
    case '/organisation':
      return [
        'Quelles sont les exigences de conformité ISO 9001 et OHSAS 18001 sur chantier ?',
        'Comment s’articule l’organisation hybride matricielle et projectized de SEM ?',
        'Quels protocoles EHS sont appliqués lors du levage de pylônes et shelters ?',
      ];
    case '/offres-d-emplois':
    case '/candidature':
      return [
        'Quels profils d’ingénieurs (IP, QoS, RF, PMO) recrutez-vous en priorité ?',
        'Comment fonctionne le transfert de compétences et le tutorat OJT ?',
      ];
    case '/nous-contacter':
      return [
        'Quels sont l’adresse, les coordonnées et les horaires du siège de Mohammedia ?',
        'Quel département technique évalue les cahiers des charges et devis projets ?',
      ];
    default:
      return [
        'Quels sont les 4 pôles stratégiques d’ingénierie de SEM ?',
        'Comment planifier un déploiement d’infrastructure FTK clé en main ?',
        'Quels sont vos partenariats exclusifs (Keysight, Ericsson, GENELEC) ?',
        'Où se situe le siège et comment demander un devis technique ?',
      ];
  }
}

export const ContextualAssistant: React.FC<ContextualAssistantProps> = ({
  pageContext,
  language,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(
    () => getSuggestedPrompts(pageContext.path, language),
    [pageContext.path, language]
  );

  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historySnapshot = messages
      .filter((m) => !m.isError)
      .slice(-8)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historySnapshot,
          pageContext,
          language,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(
          data.error ||
            (language === 'fr'
              ? 'Impossible de contacter l’assistant pour le moment.'
              : 'Unable to reach the assistant right now.')
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply!,
        },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : language === 'fr'
            ? 'Erreur de connexion au service.'
            : 'Service connection error.';
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'model',
          text: msg,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="print:hidden no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {isOpen ? (
        <section
          aria-label={
            language === 'fr'
              ? 'Assistant virtuel SEM'
              : 'SEM Virtual Assistant'
          }
          className="w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[calc(100vh-6rem)] bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0B192C] dark:bg-[#070F1B] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0 border-b border-transparent dark:border-slate-800">
            <div className="min-w-0">
              <div className="font-display text-sm font-bold leading-tight">
                {language === 'fr'
                  ? 'Assistant Ingénierie SEM'
                  : 'SEM Engineering Assistant'}
              </div>
              <div className="text-xs text-slate-300 truncate mt-0.5">
                {language === 'fr' ? 'Contexte' : 'Context'} · {pageContext.title}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  aria-label={
                    language === 'fr'
                      ? 'Réinitialiser la conversation'
                      : 'Reset conversation'
                  }
                  className="p-2 text-slate-300 hover:text-white rounded-md transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={
                  language === 'fr' ? 'Fermer l’assistant' : 'Close assistant'
                }
                className="p-2 text-slate-300 hover:text-white rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC] dark:bg-[#070F1B]">
            {/* Initial Greeting */}
            <div className="bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
              <p>
                {language === 'fr'
                  ? `Bonjour. Je peux répondre à vos questions sur nos services d’ingénierie IT & Télécoms en lien avec la page « ${pageContext.title} ».`
                  : `Hello. I can answer questions about SEM’s IT & Telecom engineering services tailored to the “${pageContext.title}” page.`}
              </p>
              <div className="pt-1 flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('/nous-contacter');
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                >
                  <span>
                    {language === 'fr'
                      ? 'Demander un devis'
                      : 'Request a quote'}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('/portefeuille');
                  }}
                  className="font-semibold text-slate-600 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0]"
                >
                  {language === 'fr' ? 'Portefeuille' : 'Portfolio'}
                </button>
              </div>
            </div>

            {/* Contextual FAQ Suggestions when conversation hasn't started */}
            {messages.length === 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-0.5">
                  {language === 'fr'
                    ? 'Questions fréquentes sur cette page'
                    : 'Frequent questions on this page'}
                </div>
                <div className="space-y-1.5">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0F1E34] hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-[#3769B3]/60 dark:hover:border-[#24A9E0]/60 rounded-lg transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat History */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#3769B3] text-white'
                      : msg.isError
                        ? 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                        : 'bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-600 dark:text-slate-300 inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3769B3] dark:text-[#24A9E0]" />
                  <span>
                    {language === 'fr'
                      ? 'Rédaction de la réponse…'
                      : 'Preparing response…'}
                  </span>
                </div>
              </div>
            )}

            <div ref={scrollEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white dark:bg-[#0B192C] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder={
                language === 'fr'
                  ? 'Posez votre question sur SEM…'
                  : 'Ask a question about SEM…'
              }
              className="flex-1 min-w-0 h-10 px-3 text-sm bg-[#F8FAFC] dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:bg-white dark:focus:bg-[#070F1B] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label={language === 'fr' ? 'Envoyer' : 'Send'}
              className="h-10 px-3.5 inline-flex items-center justify-center bg-[#3769B3] hover:bg-[#2B5492] disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={
            language === 'fr'
              ? 'Ouvrir l’assistant virtuel SEM'
              : 'Open SEM virtual assistant'
          }
          className="h-12 px-4 sm:px-5 inline-flex items-center gap-2.5 bg-[#0B192C] hover:bg-[#162944] text-white rounded-xl shadow-lg border border-slate-700/80 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3769B3]"
        >
          <MessageSquare className="w-4 h-4 text-[#24A9E0] shrink-0" />
          <span className="text-sm font-semibold whitespace-nowrap">
            {language === 'fr' ? 'Assistant SEM' : 'SEM Assistant'}
          </span>
        </button>
      )}
    </div>
  );
};
