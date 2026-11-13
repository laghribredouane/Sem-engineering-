import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { PageHeader } from '../components/PageHeader';
import { ContactFaqAccordion } from '../components/ContactFaqAccordion';

interface ContactPageProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  language,
  onNavigate,
}) => {
  const c = SEM_CONTENT[language].contactPage;

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(c.departments[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDepartment(c.departments[0]);
  }, [c.departments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !lastName.trim() ||
      !firstName.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      setError(
        language === 'fr'
          ? 'Veuillez renseigner tous les champs obligatoires (*).'
          : 'Please complete all required fields (*).'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setLastName('');
    setFirstName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
    setError(null);
    setSubmitted(false);
  };

  const handleFaqPrefill = (departmentIndex: number, subjectHint: string) => {
    setSubmitted(false);
    setError(null);
    setDepartment(c.departments[departmentIndex] || c.departments[0]);
    setSubject(subjectHint);
  };

  return (
    <div>
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        breadcrumbs={[{ label: c.title }]}
        language={language}
        onNavigate={onNavigate}
      />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: HQ Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {c.intro}
            </p>

            <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-7 space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {c.hqTitle}
                </h2>
                <div className="space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                    <a
                      href="tel:+212523322321"
                      className="font-medium hover:text-[#3769B3] dark:hover:text-[#24A9E0] tabular-nums"
                    >
                      {c.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                    <a
                      href="mailto:contact@sem.ma"
                      className="font-medium hover:text-[#3769B3] dark:hover:text-[#24A9E0]"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 dark:text-white mb-2.5">
                  <Clock className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0]" />
                  <span>{c.hoursTitle}</span>
                </h3>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300 tabular-nums">
                  <p>{c.hoursWeekday}</p>
                  <p>{c.hoursWeekend}</p>
                </div>
              </div>
            </div>

            {/* Clean Geospatial Coordinates Summary */}
            <div className="bg-[#0B192C] dark:bg-[#0F1E34] border border-transparent dark:border-slate-800 text-white rounded-xl p-6 space-y-2">
              <div className="text-xs font-medium text-[#24A9E0]">
                Mohammedia · Casablanca-Settat
              </div>
              <div className="font-display text-base font-bold">
                Quartier Industriel — 90, Mohammedia 20800
              </div>
              <div className="font-mono text-xs text-slate-400 tabular-nums pt-1">
                33.6861° N · 7.3829° W
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div id="contact-inquiry-form" className="lg:col-span-7 scroll-mt-24">
            {submitted ? (
              <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-8 sm:p-10 space-y-4">
                <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {c.labels.successTitle}
                  </h2>
                </div>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.labels.successBody}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
                  >
                    {c.labels.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-5"
              >
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                  {c.formTitle}
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-200 font-medium"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.lastName} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.firstName} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.email} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.department} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    >
                      {c.departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                      {c.labels.subject} <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    {c.labels.message} <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3769B3] focus:border-[#3769B3]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
                  >
                    {c.labels.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <ContactFaqAccordion
        language={language}
        onNavigate={onNavigate}
        onSelectDepartment={handleFaqPrefill}
      />
    </div>
  );
};
