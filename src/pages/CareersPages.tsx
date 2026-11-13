import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  Info,
  Upload,
  UserCheck,
} from 'lucide-react';
import { SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { PageHeader } from '../components/PageHeader';
import { ReadingProgressBar } from '../components/ReadingProgressBar';

interface CareersPageProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
}

const CareersSubNav: React.FC<{
  active: 'offres' | 'candidature';
  language: Language;
  onNavigate: (path: RoutePath) => void;
}> = ({ active, language, onNavigate }) => {
  const items = SEM_CONTENT[language].nav[4]?.children || [];
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-2">
        {items.map((item) => {
          const isCurrent =
            (active === 'candidature' && item.path === '/candidature') ||
            (active === 'offres' && item.path === '/offres-d-emplois');
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

export const OffresEmploiPage: React.FC<CareersPageProps> = ({
  language,
  onNavigate,
}) => {
  const j = SEM_CONTENT[language].jobsPage;
  const careersLabel = language === 'fr' ? 'Carrières' : 'Careers';

  return (
    <div>
      <ReadingProgressBar label={j.title} />
      <PageHeader
        title={j.title}
        subtitle={j.subtitle}
        breadcrumbs={[{ label: careersLabel, path: '/offres-d-emplois' }, { label: j.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <CareersSubNav active="offres" language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {j.intro}
          </p>

          {/* Current Opening Status Notice */}
          <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <Info className="w-6 h-6 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {j.emptyNoticeTitle}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {j.emptyNoticeBody}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/candidature')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>{j.spontaneousCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Core Engineering Profiles */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              {j.profilesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {j.profiles.map((prof) => (
                <div
                  key={prof.title}
                  className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] mb-1.5">
                      {prof.pole}
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {prof.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {prof.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => onNavigate('/candidature')}
                      className="text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                    >
                      {j.spontaneousCta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface StructuredFormLabels {
  sections: {
    personal: string;
    education: string;
    experience: string;
    documents: string;
  };
  educationLevel: string;
  educationLevelPlaceholder: string;
  educationOptions: string[];
  fieldOfStudy: string;
  fieldOfStudyPlaceholder: string;
  institution: string;
  institutionPlaceholder: string;
  graduationYear: string;
  experienceYears: string;
  experiencePlaceholder: string;
  experienceOptions: string[];
  currentRole: string;
  currentRolePlaceholder: string;
  recentEmployer: string;
  recentEmployerPlaceholder: string;
  availability: string;
  availabilityPlaceholder: string;
  availabilityOptions: string[];
  skills: string;
  skillsPlaceholder: string;
  summaryLabels: {
    applicant: string;
    education: string;
    experience: string;
    pole: string;
    cv: string;
  };
}

const STRUCTURED_APPLY_COPY: Record<Language, StructuredFormLabels> = {
  fr: {
    sections: {
      personal: '01. Identité & Coordonnées',
      education: '02. Parcours académique',
      experience: '03. Expérience professionnelle',
      documents: '04. Dossier & Soumission',
    },
    educationLevel: 'Niveau de formation / Diplôme le plus élevé',
    educationLevelPlaceholder: 'Sélectionnez votre niveau d’études',
    educationOptions: [
      'Bac +5 / Diplôme d’Ingénieur d’État',
      'Master / Mastère Spécialisé',
      'Bac +3 / Licence Professionnelle',
      'Bac +2 / Technicien Spécialisé (DUT, BTS, ISTA)',
      'Doctorat / PhD',
      'Autre qualification technique certifiée',
    ],
    fieldOfStudy: 'Spécialité / Filière',
    fieldOfStudyPlaceholder: 'Ex : Télécoms, Réseaux IP, Cybersécurité, Génie Électrique',
    institution: 'Établissement / Université',
    institutionPlaceholder: 'Ex : INPT, EMI, ENSIAS, EHTP, Université Hassan II...',
    graduationYear: 'Année d’obtention',
    experienceYears: 'Années d’expérience professionnelle',
    experiencePlaceholder: 'Sélectionnez votre expérience',
    experienceOptions: [
      'Jeune diplômé (< 1 an)',
      '1 à 3 ans d’expérience',
      '3 à 5 ans d’expérience',
      '5 à 10 ans d’expérience',
      'Plus de 10 ans d’expérience',
    ],
    currentRole: 'Intitulé du poste actuel ou dernier poste occupé',
    currentRolePlaceholder: 'Ex : Ingénieur Réseaux & Sécurité / Chef de Projet Télécoms',
    recentEmployer: 'Entreprise / Organisation actuelle ou précédente',
    recentEmployerPlaceholder: 'Optionnel (ex : Opérateur, Intégrateur, Équipementier)',
    availability: 'Disponibilité',
    availabilityPlaceholder: 'Sélectionnez votre disponibilité',
    availabilityOptions: [
      'Immédiate',
      'Préavis de 1 mois',
      'Préavis de 2 à 3 mois',
    ],
    skills: 'Certifications & compétences techniques clés',
    skillsPlaceholder: 'Ex : CCNP, PMP, ISO 9001, Keysight, VSAT, Drive Test, Data Center...',
    summaryLabels: {
      applicant: 'Candidat',
      education: 'Formation',
      experience: 'Expérience',
      pole: 'Pôle ciblé',
      cv: 'Document joint',
    },
  },
  en: {
    sections: {
      personal: '01. Personal Information',
      education: '02. Educational Background',
      experience: '03. Professional Experience',
      documents: '04. Documents & Submission',
    },
    educationLevel: 'Highest Education Level / Degree',
    educationLevelPlaceholder: 'Select your education level',
    educationOptions: [
      'Engineering Degree (Bac +5)',
      'Master’s Degree / Specialized Master',
      'Bachelor’s Degree (Bac +3)',
      'Technical Diploma (Bac +2 / DUT / BTS)',
      'PhD / Doctorate',
      'Other Certified Technical Qualification',
    ],
    fieldOfStudy: 'Major / Field of Study',
    fieldOfStudyPlaceholder: 'e.g., Telecoms, IP Networks, Cybersecurity, Electrical Engineering',
    institution: 'University / Engineering School',
    institutionPlaceholder: 'e.g., INPT, EMI, ENSIAS, EHTP, Hassan II University...',
    graduationYear: 'Graduation Year',
    experienceYears: 'Years of Professional Experience',
    experiencePlaceholder: 'Select experience range',
    experienceOptions: [
      'Fresh Graduate (< 1 year)',
      '1 to 3 years',
      '3 to 5 years',
      '5 to 10 years',
      'More than 10 years',
    ],
    currentRole: 'Current or Most Recent Job Title',
    currentRolePlaceholder: 'e.g., Network & Security Engineer / Telecom Project Manager',
    recentEmployer: 'Current or Previous Employer',
    recentEmployerPlaceholder: 'Optional (e.g., Operator, Integrator, OEM Vendor)',
    availability: 'Availability / Notice Period',
    availabilityPlaceholder: 'Select availability',
    availabilityOptions: [
      'Immediate',
      '1 Month Notice',
      '2 to 3 Months Notice',
    ],
    skills: 'Key Technical Certifications & Skills',
    skillsPlaceholder: 'e.g., CCNP, PMP, ISO 9001, Keysight, VSAT, Drive Test, Data Center...',
    summaryLabels: {
      applicant: 'Applicant',
      education: 'Education',
      experience: 'Experience',
      pole: 'Target Practice',
      cv: 'Attached Resume',
    },
  },
};

type ApplicationField =
  | 'lastName'
  | 'firstName'
  | 'email'
  | 'phone'
  | 'educationLevel'
  | 'fieldOfStudy'
  | 'institution'
  | 'graduationYear'
  | 'experienceYears'
  | 'currentRole'
  | 'availability'
  | 'cvFile'
  | 'coverLetter'
  | 'captcha';

export const CandidaturePage: React.FC<CareersPageProps> = ({
  language,
  onNavigate,
}) => {
  const a = SEM_CONTENT[language].applyPage;
  const s = STRUCTURED_APPLY_COPY[language];
  const careersLabel = language === 'fr' ? 'Carrières' : 'Careers';

  // Section 1: Personal Info
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Section 2: Educational Background
  const [educationLevel, setEducationLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  // Section 3: Professional Experience
  const [experienceYears, setExperienceYears] = useState('');
  const [pole, setPole] = useState(a.poleOptions[0]);
  const [currentRole, setCurrentRole] = useState('');
  const [recentEmployer, setRecentEmployer] = useState('');
  const [availability, setAvailability] = useState('');
  const [skills, setSkills] = useState('');

  // Section 4: Documents & Verification
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [captcha, setCaptcha] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ApplicationField, string>>>({});
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setPole(a.poleOptions[0]);
  }, [a.poleOptions]);

  const clearFieldError = (field: ApplicationField) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateAll = (): Partial<Record<ApplicationField, string>> => {
    const errors: Partial<Record<ApplicationField, string>> = {};
    const isFr = language === 'fr';

    if (lastName.trim().length < 2) {
      errors.lastName = isFr
        ? 'Veuillez saisir votre nom (au moins 2 caractères).'
        : 'Please enter your last name (at least 2 characters).';
    }
    if (firstName.trim().length < 2) {
      errors.firstName = isFr
        ? 'Veuillez saisir votre prénom (au moins 2 caractères).'
        : 'Please enter your first name (at least 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = isFr
        ? 'Veuillez saisir une adresse e-mail valide.'
        : 'Please enter a valid email address.';
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      errors.phone = isFr
        ? 'Veuillez saisir un numéro de téléphone valide (min. 8 chiffres).'
        : 'Please enter a valid phone number (min. 8 digits).';
    }

    if (!educationLevel) {
      errors.educationLevel = isFr
        ? 'Veuillez sélectionner votre niveau de formation.'
        : 'Please select your highest education level.';
    }
    if (fieldOfStudy.trim().length < 2) {
      errors.fieldOfStudy = isFr
        ? 'Veuillez préciser votre filière ou spécialité.'
        : 'Please specify your field of study.';
    }
    if (institution.trim().length < 2) {
      errors.institution = isFr
        ? 'Veuillez indiquer le nom de votre établissement.'
        : 'Please indicate your university or school name.';
    }
    const yearNum = Number(graduationYear.trim());
    if (
      !/^\d{4}$/.test(graduationYear.trim()) ||
      Number.isNaN(yearNum) ||
      yearNum < 1975 ||
      yearNum > 2030
    ) {
      errors.graduationYear = isFr
        ? 'Année invalide (format AAAA entre 1975 et 2030).'
        : 'Invalid year (enter a 4-digit year between 1975 and 2030).';
    }

    if (!experienceYears) {
      errors.experienceYears = isFr
        ? 'Veuillez sélectionner votre tranche d’expérience.'
        : 'Please select your years of experience.';
    }
    if (currentRole.trim().length < 2) {
      errors.currentRole = isFr
        ? 'Veuillez indiquer votre poste actuel ou dernier poste (ou « Étudiant / Jeune diplômé »).'
        : 'Please enter your current/most recent title (or "Recent Graduate").';
    }
    if (!availability) {
      errors.availability = isFr
        ? 'Veuillez préciser votre disponibilité.'
        : 'Please select your availability.';
    }

    if (!cvFile) {
      errors.cvFile = isFr
        ? 'Veuillez joindre votre C.V. au format PDF, DOC ou DOCX.'
        : 'Please attach your CV / Resume (PDF, DOC, or DOCX).';
    } else if (cvFile.size > 10 * 1024 * 1024) {
      errors.cvFile = isFr
        ? 'Le fichier dépasse la limite autorisée de 10 Mo.'
        : 'File size exceeds the 10 MB limit.';
    }

    if (coverLetter.trim().length < 30) {
      errors.coverLetter = isFr
        ? 'Veuillez rédiger au moins 30 caractères présentant votre motivation.'
        : 'Please write at least 30 characters summarizing your motivation.';
    }

    if (captcha.trim() !== '9') {
      errors.captcha = isFr
        ? 'Réponse incorrecte : 4 + 5 = 9.'
        : 'Incorrect answer: 4 + 5 = 9.';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateAll();
    const errorCount = Object.keys(errors).length;

    if (errorCount > 0) {
      setFieldErrors(errors);
      setSummaryError(
        language === 'fr'
          ? `${errorCount} champ${errorCount > 1 ? 's obligatoires nécessitent' : ' obligatoire nécessite'} votre attention ci-dessous.`
          : `${errorCount} required field${errorCount > 1 ? 's require' : ' requires'} your attention below.`
      );
      const alertEl = document.getElementById('application-form-alert');
      alertEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setFieldErrors({});
    setSummaryError(null);
    setSubmitted(true);
  };

  const resetForm = () => {
    setLastName('');
    setFirstName('');
    setEmail('');
    setPhone('');
    setEducationLevel('');
    setFieldOfStudy('');
    setInstitution('');
    setGraduationYear('');
    setExperienceYears('');
    setPole(a.poleOptions[0]);
    setCurrentRole('');
    setRecentEmployer('');
    setAvailability('');
    setSkills('');
    setCvFile(null);
    setCoverLetter('');
    setCaptcha('');
    setFieldErrors({});
    setSummaryError(null);
    setSubmitted(false);
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? 'border-red-500 dark:border-red-400 focus:ring-red-500/30 focus:border-red-500'
        : 'border-slate-300 dark:border-slate-700 focus:ring-[#3769B3] focus:border-[#3769B3]'
    }`;

  return (
    <div>
      <PageHeader
        title={a.title}
        subtitle={a.subtitle}
        breadcrumbs={[{ label: careersLabel, path: '/offres-d-emplois' }, { label: a.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <CareersSubNav active="candidature" language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {a.intro}
            </p>

            <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {language === 'fr' ? 'Processus de recrutement SEM' : 'SEM Recruitment Process'}
              </h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li>
                  {language === 'fr'
                    ? '01. Analyse du parcours académique et des expériences terrain par la Direction RH'
                    : '01. Academic & field experience review by Human Resources'}
                </li>
                <li>
                  {language === 'fr'
                    ? '02. Entretien technique avec le responsable du pôle concerné'
                    : '02. Technical interview with the relevant Practice Lead'}
                </li>
                <li>
                  {language === 'fr'
                    ? '03. Intégration & parcours Testbed / Formations continues'
                    : '03. Onboarding & continuous Testbed training'}
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3">
              <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                {language === 'fr' ? 'Structure du dossier' : 'Application Checklist'}
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                  <span>{s.sections.personal}</span>
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                  <span>{s.sections.education}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                  <span>{s.sections.experience}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                  <span>{s.sections.documents}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-8 sm:p-10 space-y-6">
                <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {a.labels.successTitle}
                  </h2>
                </div>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {a.labels.successBody}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.summaryLabels.applicant}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {firstName} {lastName} · {email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.summaryLabels.pole}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white mt-0.5">{pole}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.summaryLabels.education}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {educationLevel} — {fieldOfStudy} ({institution}, {graduationYear})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.summaryLabels.experience}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {experienceYears} · {currentRole} ({availability})
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.summaryLabels.cv}
                    </dt>
                    <dd className="font-medium text-slate-900 dark:text-white mt-0.5">
                      {cvFile?.name}
                    </dd>
                  </div>
                </dl>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
                  >
                    {a.labels.newApplication}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-8"
              >
                {summaryError && (
                  <div
                    id="application-form-alert"
                    role="alert"
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-200 font-medium"
                  >
                    {summaryError}
                  </div>
                )}

                {/* SECTION 01: Personal Information */}
                <fieldset className="space-y-4">
                  <legend className="w-full font-display text-base font-bold text-slate-900 dark:text-white pb-2.5 border-b border-slate-200 dark:border-slate-800">
                    {s.sections.personal}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {a.labels.lastName} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        aria-invalid={Boolean(fieldErrors.lastName)}
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          clearFieldError('lastName');
                        }}
                        className={inputClass(Boolean(fieldErrors.lastName))}
                      />
                      {fieldErrors.lastName && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {a.labels.firstName} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        aria-invalid={Boolean(fieldErrors.firstName)}
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          clearFieldError('firstName');
                        }}
                        className={inputClass(Boolean(fieldErrors.firstName))}
                      />
                      {fieldErrors.firstName && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.firstName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {a.labels.email} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        aria-invalid={Boolean(fieldErrors.email)}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearFieldError('email');
                        }}
                        className={inputClass(Boolean(fieldErrors.email))}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {a.labels.phone} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        aria-invalid={Boolean(fieldErrors.phone)}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearFieldError('phone');
                        }}
                        placeholder="+212 6 00 00 00 00"
                        className={`${inputClass(Boolean(fieldErrors.phone))} tabular-nums`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* SECTION 02: Educational Background */}
                <fieldset className="space-y-4">
                  <legend className="w-full font-display text-base font-bold text-slate-900 dark:text-white pb-2.5 border-b border-slate-200 dark:border-slate-800">
                    {s.sections.education}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.educationLevel} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <select
                        required
                        aria-invalid={Boolean(fieldErrors.educationLevel)}
                        value={educationLevel}
                        onChange={(e) => {
                          setEducationLevel(e.target.value);
                          clearFieldError('educationLevel');
                        }}
                        className={inputClass(Boolean(fieldErrors.educationLevel))}
                      >
                        <option value="">{s.educationLevelPlaceholder}</option>
                        {s.educationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.educationLevel && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.educationLevel}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.fieldOfStudy} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        aria-invalid={Boolean(fieldErrors.fieldOfStudy)}
                        value={fieldOfStudy}
                        onChange={(e) => {
                          setFieldOfStudy(e.target.value);
                          clearFieldError('fieldOfStudy');
                        }}
                        placeholder={s.fieldOfStudyPlaceholder}
                        className={inputClass(Boolean(fieldErrors.fieldOfStudy))}
                      />
                      {fieldErrors.fieldOfStudy && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.institution} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        aria-invalid={Boolean(fieldErrors.institution)}
                        value={institution}
                        onChange={(e) => {
                          setInstitution(e.target.value);
                          clearFieldError('institution');
                        }}
                        placeholder={s.institutionPlaceholder}
                        className={inputClass(Boolean(fieldErrors.institution))}
                      />
                      {fieldErrors.institution && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.institution}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.graduationYear} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        required
                        aria-invalid={Boolean(fieldErrors.graduationYear)}
                        value={graduationYear}
                        onChange={(e) => {
                          setGraduationYear(e.target.value);
                          clearFieldError('graduationYear');
                        }}
                        placeholder="2022"
                        className={`${inputClass(Boolean(fieldErrors.graduationYear))} tabular-nums`}
                      />
                      {fieldErrors.graduationYear && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.graduationYear}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* SECTION 03: Professional Experience */}
                <fieldset className="space-y-4">
                  <legend className="w-full font-display text-base font-bold text-slate-900 dark:text-white pb-2.5 border-b border-slate-200 dark:border-slate-800">
                    {s.sections.experience}
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.experienceYears} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <select
                        required
                        aria-invalid={Boolean(fieldErrors.experienceYears)}
                        value={experienceYears}
                        onChange={(e) => {
                          setExperienceYears(e.target.value);
                          clearFieldError('experienceYears');
                        }}
                        className={inputClass(Boolean(fieldErrors.experienceYears))}
                      >
                        <option value="">{s.experiencePlaceholder}</option>
                        {s.experienceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.experienceYears && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.experienceYears}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {a.labels.pole}
                      </label>
                      <select
                        value={pole}
                        onChange={(e) => setPole(e.target.value)}
                        className={inputClass(false)}
                      >
                        {a.poleOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.currentRole} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        aria-invalid={Boolean(fieldErrors.currentRole)}
                        value={currentRole}
                        onChange={(e) => {
                          setCurrentRole(e.target.value);
                          clearFieldError('currentRole');
                        }}
                        placeholder={s.currentRolePlaceholder}
                        className={inputClass(Boolean(fieldErrors.currentRole))}
                      />
                      {fieldErrors.currentRole && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.currentRole}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.availability} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <select
                        required
                        aria-invalid={Boolean(fieldErrors.availability)}
                        value={availability}
                        onChange={(e) => {
                          setAvailability(e.target.value);
                          clearFieldError('availability');
                        }}
                        className={inputClass(Boolean(fieldErrors.availability))}
                      >
                        <option value="">{s.availabilityPlaceholder}</option>
                        {s.availabilityOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.availability && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                          {fieldErrors.availability}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.recentEmployer}
                      </label>
                      <input
                        type="text"
                        value={recentEmployer}
                        onChange={(e) => setRecentEmployer(e.target.value)}
                        placeholder={s.recentEmployerPlaceholder}
                        className={inputClass(false)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                        {s.skills}
                      </label>
                      <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder={s.skillsPlaceholder}
                        className={inputClass(false)}
                      />
                    </div>
                  </div>
                </fieldset>

                {/* SECTION 04: Documents & Submission */}
                <fieldset className="space-y-4">
                  <legend className="w-full font-display text-base font-bold text-slate-900 dark:text-white pb-2.5 border-b border-slate-200 dark:border-slate-800">
                    {s.sections.documents}
                  </legend>

                  <div className="pt-1">
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {a.labels.cv} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <label
                      className={`flex items-center justify-between gap-4 px-4 py-3.5 border border-dashed rounded-lg bg-[#F8FAFC] dark:bg-[#070F1B] cursor-pointer transition-colors ${
                        fieldErrors.cvFile
                          ? 'border-red-500 dark:border-red-400'
                          : 'border-slate-300 dark:border-slate-700 hover:border-[#3769B3] dark:hover:border-[#24A9E0]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {cvFile ? (
                          <FileText className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                        ) : (
                          <Upload className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                        <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                          {cvFile ? cvFile.name : a.labels.cvHint}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="sr-only"
                        onChange={(e) => {
                          setCvFile(e.target.files?.[0] || null);
                          clearFieldError('cvFile');
                        }}
                      />
                    </label>
                    {fieldErrors.cvFile && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {fieldErrors.cvFile}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {a.labels.coverLetter} <span className="text-red-600 dark:text-red-400">*</span>
                      </label>
                      <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
                        {coverLetter.trim().length} / 30+ min
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      required
                      aria-invalid={Boolean(fieldErrors.coverLetter)}
                      value={coverLetter}
                      onChange={(e) => {
                        setCoverLetter(e.target.value);
                        clearFieldError('coverLetter');
                      }}
                      className={inputClass(Boolean(fieldErrors.coverLetter))}
                    />
                    {fieldErrors.coverLetter && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {fieldErrors.coverLetter}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {a.labels.captcha} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.captcha)}
                      value={captcha}
                      onChange={(e) => {
                        setCaptcha(e.target.value);
                        clearFieldError('captcha');
                      }}
                      placeholder="9"
                      className={`w-32 px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border rounded-lg focus:outline-none focus:ring-2 tabular-nums ${
                        fieldErrors.captcha
                          ? 'border-red-500 dark:border-red-400 focus:ring-red-500/30 focus:border-red-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-[#3769B3] focus:border-[#3769B3]'
                      }`}
                    />
                    {fieldErrors.captcha && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {fieldErrors.captcha}
                      </p>
                    )}
                  </div>
                </fieldset>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
                  >
                    {a.labels.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
