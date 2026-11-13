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
          'What does the Electronic Security Pole cover?',
          'How does SEM manage QoS & Drive Testing?',
          'Do you build turnkey Data Centers?',
        ];
      case '/portefeuille':
        return [
          'Which brands does SEM distribute exclusively?',
          'What power & shelter infrastructure do you deploy?',
          'Tell me about Keysight & Ericsson solutions',
        ];
      case '/histoire':
      case '/mission-et-valeurs':
      case '/mot-du-directeur-general':
        return [
          'How did SEM evolve since 2008?',
          'What is SEM’s footprint in Africa?',
          'How does SEM help optimize OPEX?',
        ];
      case '/certifications':
      case '/organisation':
        return [
          'How does SEM’s hybrid organization work?',
          'Which ISO & EHS standards does SEM follow?',
        ];
      case '/offres-d-emplois':
      case '/candidature':
        return [
          'Which engineering profiles do you recruit?',
          'How do I submit a spontaneous application?',
        ];
      case '/nous-contacter':
        return [
          'What are your Mohammedia HQ hours & phone?',
          'Which department handles project quotes?',
        ];
      default:
        return [
          'What are SEM’s 4 strategic business units?',
          'How does SEM reduce telecom OPEX?',
          'Where is SEM located and how can I request a quote?',
        ];
    }
  }

  switch (path) {
    case '/domaines-d-activites':
      return [
        'Que couvre le Pôle Sûreté Électronique ?',
        'En quoi consiste le Pôle QoS & Drive Test ?',
        'Déployez-vous des Data Centers clés en main ?',
      ];
    case '/portefeuille':
      return [
        'Quelles marques distribuez-vous en exclusivité ?',
        'Quelles solutions d’énergie et shelters proposez-vous ?',
        'Parlez-moi des équipements Keysight et Ericsson',
      ];
    case '/histoire':
    case '/mission-et-valeurs':
    case '/mot-du-directeur-general':
      return [
        'Quelle est l’histoire de SEM depuis 2008 ?',
        'Dans combien de pays d’Afrique intervenez-vous ?',
        'Comment SEM aide à réduire les coûts OPEX ?',
      ];
    case '/certifications':
    case '/organisation':
      return [
        'Comment fonctionne votre organisation hybride ?',
        'Quelles démarches ISO 9001 et EHS appliquez-vous ?',
      ];
    case '/offres-d-emplois':
    case '/candidature':
      return [
        'Quels profils d’ingénieurs recrutez-vous ?',
        'Comment envoyer une candidature spontanée ?',
      ];
    case '/nous-contacter':
      return [
        'Quels sont l’adresse et les horaires du siège ?',
        'Quelle direction contacter pour un devis ?',
      ];
    default:
      return [
        'Quels sont les 4 pôles d’activités de SEM ?',
        'Comment réduire nos coûts OPEX avec SEM ?',
        'Où se situe le siège et comment demander un devis ?',
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
