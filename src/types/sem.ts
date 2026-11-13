export type Language = 'fr' | 'en';

export type RoutePath =
  | '/'
  | '/mot-du-directeur-general'
  | '/histoire'
  | '/mission-et-valeurs'
  | '/domaines-d-activites'
  | '/organisation'
  | '/certifications'
  | '/portefeuille'
  | '/partenaires'
  | '/clients'
  | '/offres-d-emplois'
  | '/candidature'
  | '/nous-contacter'
  | '/plan-du-site';

export interface NavSubItem {
  label: string;
  description?: string;
  path: RoutePath;
}

export interface NavItem {
  label: string;
  path?: RoutePath;
  children?: NavSubItem[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  category: string;
}

export interface CoreValue {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StrategicPole {
  id: string;
  index: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
  capabilities: string[];
  deliverables: string[];
}

export interface OrgDepartment {
  id: string;
  name: string;
  role: string;
  units: string[];
}

export interface PortfolioCategory {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
  highlightBrand?: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  src: string;
  sector?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  contract: string;
  summary: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  sector: string;
  pole: string;
  logoSrc: string;
  logoAlt: string;
}
