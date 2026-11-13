import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import { IMAGES } from '../data/semContent';
import { Language } from '../types/sem';
import { ResilientImage } from './ResilientImage';

type SocialPlatform = 'all' | 'linkedin' | 'twitter';

interface CommentItem {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface SocialPost {
  id: string;
  platform: 'linkedin' | 'twitter';
  date: { fr: string; en: string };
  title: { fr: string; en: string };
  content: { fr: string; en: string };
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  badge: { fr: string; en: string };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  externalUrl: string;
}

const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'sp-1',
    platform: 'linkedin',
    date: { fr: 'Il y a 3 jours', en: '3 days ago' },
    title: {
      fr: 'Déploiement FTK achevé dans 2 nouveaux pays d’Afrique de l’Ouest',
      en: 'Turnkey FTK Roll-out Completed in West Africa',
    },
    content: {
      fr: 'Fiers d’annoncer la réception provisoire (PAT) sans réserve d’un réseau de transmission haut débit interconnectant 24 sites stratégiques. Nos équipes d’ingénierie ont assuré la fourniture, l’installation des pylônes et l’intégration clés en main sous contrôle EHS continu.',
      en: 'Proud to announce successful Provisional Acceptance (PAT) for a high-capacity transmission backbone interconnecting 24 strategic sites. Our field engineering teams delivered towers, optical links, and turnkey commissioning under strict EHS governance.',
    },
    tags: ['#SouthSouthCooperation', '#NetworkRollout', '#TurnkeyEngineering', '#TelecomAfrica'],
    imageSrc: IMAGES.services,
    imageAlt: 'Déploiement de pylônes et transmission télécoms SEM',
    badge: { fr: 'Projet Afrique', en: 'African Milestone' },
    metrics: { likes: 184, comments: 26, shares: 32 },
    externalUrl: 'https://www.linkedin.com/company/sem-smartengineeringandmanagement/',
  },
  {
    id: 'sp-2',
    platform: 'linkedin',
    date: { fr: 'Il y a 1 semaine', en: '1 week ago' },
    title: {
      fr: 'Campagne nationale de mesure QoS & benchmarking avec Keysight Technologies',
      en: 'National QoS Measurement & Benchmarking with Keysight',
    },
    content: {
      fr: 'En tant que distributeur exclusif de Keysight Technologies au Maroc, nos équipes QoS finalisent un audit de performance mobile multi-opérateurs couvrant plus de 4 200 km d’itinéraires Drive Test avec analyse fine de la qualité vocale et du débit data.',
      en: 'As Keysight Technologies’ exclusive distributor in Morocco, our QoS engineers finalized a multi-operator field benchmark spanning over 4,200 km of Drive Test corridors, delivering granular voice quality and high-speed data audits.',
    },
    tags: ['#KeysightTechnologies', '#DriveTest', '#QoS', '#SpectrumAnalysis', '#TelecomRegulation'],
    imageSrc: IMAGES.qos,
    imageAlt: 'Instrumentation de mesure radio Keysight Technologies',
    badge: { fr: 'Test & Mesure', en: 'Test & Measurement' },
    metrics: { likes: 142, comments: 19, shares: 21 },
    externalUrl: 'https://www.linkedin.com/company/sem-smartengineeringandmanagement/',
  },
  {
    id: 'sp-3',
    platform: 'linkedin',
    date: { fr: 'Il y a 2 semaines', en: '2 weeks ago' },
    title: {
      fr: 'Mise en service d’une salle Data Center haute disponibilité & énergie GENELEC',
      en: 'Commissioning of High-Availability Data Center & GENELEC Power',
    },
    content: {
      fr: 'Livraison clé en main d’une infrastructure Data Center sécurisée intégrant climatisation de précision, distribution électrique secourue par groupes électrogènes GENELEC et supervision M2M en temps réel pour un acteur bancaire de référence.',
      en: 'Turnkey handover of a mission-critical Data Center facility featuring precision cooling, redundant power backed by GENELEC industrial generators, and real-time M2M telemetry for a leading financial institution.',
    },
    tags: ['#DataCenter', '#GENELEC', '#CriticalPower', '#PrecisionCooling', '#ManagedServices'],
    imageSrc: IMAGES.hero,
    imageAlt: 'Salles serveurs et baies informatiques Data Center SEM',
    badge: { fr: 'Infrastructure IT', en: 'Critical Facility' },
    metrics: { likes: 208, comments: 34, shares: 45 },
    externalUrl: 'https://www.linkedin.com/company/sem-smartengineeringandmanagement/',
  },
  {
    id: 'sp-4',
    platform: 'twitter',
    date: { fr: 'Il y a 3 semaines', en: '3 weeks ago' },
    title: {
      fr: 'Recette usine et calibrage des radars de surveillance périmétrique',
      en: 'Factory Acceptance & Calibration for Coastal Radar Systems',
    },
    content: {
      fr: 'Nos spécialistes du Pôle Sûreté Électronique achèvent les tests d’intégration des capteurs radar et caméras thermiques longue portée reliés au centre de supervision unifié pour la protection d’infrastructures côtières.',
      en: 'Our Electronic Security engineers finalized integration tests for long-range coastal radar sensors and thermal analytics linked directly into a unified command and supervision center for maritime protection.',
    },
    tags: ['#SureteElectronique', '#Radars', '#CoastalDefense', '#SupervisionCenter'],
    imageSrc: IMAGES.security,
    imageAlt: 'Centre de commandement et sûreté électronique SEM',
    badge: { fr: 'Sûreté Critique', en: 'Electronic Security' },
    metrics: { likes: 96, comments: 14, shares: 28 },
    externalUrl: 'https://twitter.com/marocsem',
  },
];

interface SocialFeedSectionProps {
  language: Language;
}

interface PostInteractionState {
  liked: boolean;
  likesDelta: number;
  shared: boolean;
  sharesDelta: number;
  commentsOpen: boolean;
  commentInput: string;
  commentsList: CommentItem[];
  toastMessage: string | null;
}

export const SocialFeedSection: React.FC<SocialFeedSectionProps> = ({ language }) => {
  const isFr = language === 'fr';
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform>('all');
  const [interactions, setInteractions] = useState<Record<string, PostInteractionState>>(() => {
    const initial: Record<string, PostInteractionState> = {};
    INITIAL_POSTS.forEach((p) => {
      initial[p.id] = {
        liked: false,
        likesDelta: 0,
        shared: false,
        sharesDelta: 0,
        commentsOpen: false,
        commentInput: '',
        commentsList: [
          {
            id: 'c-1',
            author: isFr ? 'Ingénieur Réseaux Senior' : 'Senior Network Engineer',
            text: isFr
              ? 'Excellente réalisation technique. Félicitations à toute l’équipe !'
              : 'Outstanding technical achievement. Kudos to the entire team!',
            time: isFr ? 'Il y a 2 jours' : '2 days ago',
          },
        ],
        toastMessage: null,
      };
    });
    return initial;
  });

  const filteredPosts = useMemo(() => {
    if (platformFilter === 'all') return INITIAL_POSTS;
    return INITIAL_POSTS.filter((post) => post.platform === platformFilter);
  }, [platformFilter]);

  const handleToggleLike = (postId: string) => {
    setInteractions((prev) => {
      const current = prev[postId];
      if (!current) return prev;
      const nextLiked = !current.liked;
      return {
        ...prev,
        [postId]: {
          ...current,
          liked: nextLiked,
          likesDelta: nextLiked ? current.likesDelta + 1 : current.likesDelta - 1,
        },
      };
    });
  };

  const handleShare = async (postId: string, externalUrl: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(externalUrl);
      }
    } catch {
      // ignore
    }

    setInteractions((prev) => {
      const current = prev[postId];
      if (!current) return prev;
      return {
        ...prev,
        [postId]: {
          ...current,
          shared: true,
          sharesDelta: current.sharesDelta + 1,
          toastMessage: isFr ? 'Lien de la publication copié !' : 'Post link copied to clipboard!',
        },
      };
    });

    window.setTimeout(() => {
      setInteractions((prev) => {
        const current = prev[postId];
        if (!current) return prev;
        return {
          ...prev,
          [postId]: { ...current, toastMessage: null },
        };
      });
    }, 2500);
  };

  const handleToggleComments = (postId: string) => {
    setInteractions((prev) => {
      const current = prev[postId];
      if (!current) return prev;
      return {
        ...prev,
        [postId]: { ...current, commentsOpen: !current.commentsOpen },
      };
    });
  };

  const handleCommentInputChange = (postId: string, text: string) => {
    setInteractions((prev) => {
      const current = prev[postId];
      if (!current) return prev;
      return {
        ...prev,
        [postId]: { ...current, commentInput: text },
      };
    });
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    setInteractions((prev) => {
      const current = prev[postId];
      if (!current || !current.commentInput.trim()) return prev;

      const newComment: CommentItem = {
        id: `c-${Date.now()}`,
        author: isFr ? 'Visiteur Professionnel' : 'Professional Visitor',
        text: current.commentInput.trim(),
        time: isFr ? 'À l’instant' : 'Just now',
      };

      return {
        ...prev,
        [postId]: {
          ...current,
          commentInput: '',
          commentsList: [newComment, ...current.commentsList],
        },
      };
    });
  };

  return (
    <section
      aria-labelledby="social-feed-heading"
      className="py-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header & Platform Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0] mb-2 uppercase">
              {isFr
                ? 'Activité & Présence Professionnelle'
                : 'Activity & Industry Presence'}
            </div>
            <h2
              id="social-feed-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance"
            >
              {isFr
                ? 'Dernières réalisations et actualités du terrain'
                : 'Latest Deployments & Field Dispatches'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isFr
                ? 'Suivez nos déploiements en direct au Maroc et dans 17 pays d’Afrique, réagissez aux publications et partagez notre expertise.'
                : 'Follow our ongoing infrastructure deployments across Morocco and 17 African nations, react to posts, and share our expertise.'}
            </p>
          </div>

          {/* Social Platform Toggle Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 rounded-lg self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setPlatformFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                platformFilter === 'all'
                  ? 'bg-slate-100 dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isFr ? 'Tous les flux' : 'All Updates'}
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter('linkedin')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                platformFilter === 'linkedin'
                  ? 'bg-slate-100 dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter('twitter')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                platformFilter === 'twitter'
                  ? 'bg-slate-100 dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (Twitter)</span>
            </button>
          </div>
        </div>

        {/* Feed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredPosts.map((post) => {
            const st = interactions[post.id] || {
              liked: false,
              likesDelta: 0,
              shared: false,
              sharesDelta: 0,
              commentsOpen: false,
              commentInput: '',
              commentsList: [],
              toastMessage: null,
            };

            const totalLikes = post.metrics.likes + st.likesDelta;
            const totalShares = post.metrics.shares + st.sharesDelta;
            const totalComments = post.metrics.comments + st.commentsList.length - 1; // subtract initial sample comment if any

            return (
              <article
                key={post.id}
                className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-150 relative"
              >
                {/* Toast feedback popup */}
                {st.toastMessage && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-lg animate-fade-in whitespace-nowrap">
                    {st.toastMessage}
                  </div>
                )}

                <div>
                  {/* Author & Header Strip */}
                  <div className="p-5 sm:p-6 pb-4 flex items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shrink-0">
                        <img
                          src="/images/sem-logo.png"
                          alt="SEM Logo"
                          className="h-5 w-auto object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">
                            SEM
                          </span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#24A9E0] shrink-0" aria-label="Compte vérifié" />
                          <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                            · Smart Engineering & Management
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <span>{post.date[language]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-600 dark:text-slate-300 font-medium">
                            {post.badge[language]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Platform Icon Badge */}
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Voir la publication sur ${post.platform === 'linkedin' ? 'LinkedIn' : 'X (Twitter)'}`}
                      className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#3769B3] dark:hover:text-[#24A9E0] transition-colors shrink-0"
                    >
                      {post.platform === 'linkedin' ? (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                    </a>
                  </div>

                  {/* Post Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {post.title[language]}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {post.content[language]}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#3769B3] dark:text-[#24A9E0] font-medium">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Media Image Showcase */}
                  <div className="mx-5 sm:mx-6 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/9] bg-slate-900">
                    <ResilientImage
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Interactive Reactions Toolbar (Like, Comment, Share) */}
                <div className="p-5 sm:p-6 pt-4 mt-4 border-t border-slate-200/70 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" aria-hidden="true" />
                        <span>{totalLikes}</span>
                      </span>
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <MessageCircle className="w-3.5 h-3.5 text-sky-500" aria-hidden="true" />
                        <span>{totalComments}</span>
                      </span>
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <Share2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                        <span>{totalShares}</span>
                      </span>
                    </div>

                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                    >
                      <span>{isFr ? 'Voir sur le profil' : 'View post'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(post.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        st.liked
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${st.liked ? 'fill-current' : ''}`} />
                      <span>{st.liked ? (isFr ? 'Aimé' : 'Liked') : (isFr ? 'J’aime' : 'Like')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleComments(post.id)}
                      className="py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isFr ? 'Commenter' : 'Comment'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(post.id, post.externalUrl)}
                      className="py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{isFr ? 'Partager' : 'Share'}</span>
                    </button>
                  </div>

                  {/* Expandable Comments Drawer */}
                  {st.commentsOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={st.commentInput}
                          onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                          placeholder={isFr ? 'Ajouter un commentaire professionnel...' : 'Add a professional comment...'}
                          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3769B3]"
                        />
                        <button
                          type="submit"
                          aria-label={isFr ? 'Envoyer le commentaire' : 'Send comment'}
                          className="p-2 rounded-lg bg-[#3769B3] text-white hover:bg-[#2B5492] transition-colors shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {st.commentsList.map((c) => (
                          <div key={c.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-xs space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{c.author}</span>
                              <span>{c.time}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Social Community Callout */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-slate-900 dark:text-white">
              {isFr
                ? 'Rejoignez la communauté technique SEM sur LinkedIn'
                : 'Join SEM’s Engineering Community on LinkedIn'}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {isFr
                ? 'Plus de 12 000 professionnels de l’ingénierie, directeurs techniques et opérateurs suivent nos projets.'
                : 'Over 12,000 engineering leaders, CTOs, and telecom operators follow our dispatches.'}
            </p>
          </div>

          <a
            href="https://www.linkedin.com/company/sem-smartengineeringandmanagement/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#3769B3] hover:bg-[#2B5492] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <span>{isFr ? 'S’abonner à la page' : 'Follow on LinkedIn'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
