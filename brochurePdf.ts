import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type BrochureLanguage = 'fr' | 'en';

interface PoleSummary {
  index: string;
  title: string;
  items: string[];
}

interface BrochureCopy {
  filename: string;
  docTitle: string;
  editionLine: string;
  heroTitle: string;
  heroSubtitle: string;
  motto: string;
  kpis: { value: string; label: string; detail: string }[];
  aboutHeading: string;
  aboutBody: string;
  dgHeading: string;
  dgQuote: string;
  dgAttribution: string;
  segmentsHeading: string;
  segments: { index: string; name: string; scope: string }[];
  commitmentsHeading: string;
  commitments: string[];
  page1Footer: string;
  page2HeaderTag: string;
  polesHeading: string;
  poles: PoleSummary[];
  portfolioHeading: string;
  exclusiveTitle: string;
  exclusiveItems: { brand: string; desc: string }[];
  infraTitle: string;
  infraItems: string[];
  milestonesHeading: string;
  milestones: { year: string; label: string }[];
  contactBoxTitle: string;
  contactAddress: string;
  contactLine: string;
  contactHours: string;
  page2Footer: string;
}

const BROCHURE_COPY: Record<BrochureLanguage, BrochureCopy> = {
  fr: {
    filename: 'SEM-Presentation-Entreprise-FR.pdf',
    docTitle: 'SEM - Smart Engineering & Management | Presentation Entreprise',
    editionLine: 'PLAQUETTE INSTITUTIONNELLE · EDITION 2026',
    heroTitle: 'Ingenierie IT, Telecoms et Infrastructures Cles en Main',
    heroSubtitle:
      'Depuis 2008, SEM accompagne les administrations publiques, operateurs telecoms, institutions financieres et industriels au Maroc et dans 17 pays d\'Afrique.',
    motto: '"Your challenge is our progress" — Excellence operationnelle & Maitrise OPEX',
    kpis: [
      { value: '2008', label: 'Fondation au Maroc', detail: '18 ans d\'expertise continue' },
      { value: '17 Pays', label: 'Rayonnement Africain', detail: 'Cooperation Sud-Sud active' },
      { value: '4 Poles', label: 'Activites Strategiques', detail: 'Services · Conseil · Surete · QoS' },
      { value: 'ISO 9001', label: 'Qualite & EHS', detail: 'Programmes ISO & OHSAS 18001' },
    ],
    aboutHeading: 'IDENTITE & MISSION',
    aboutBody:
      'Fondee en 2008 sous le nom de Sicotel Engineering & Management et rebaptisee Smart Engineering & Management (SEM) en 2016 sans changement d\'actionnariat, notre entreprise intervient sur l\'ensemble de la chaine de valeur des infrastructures critiques : conseil technique, ingenierie, deploiement cles en main, transfert de competences et infogerance (Managed Services).',
    dgHeading: 'MOT DU DIRECTEUR GENERAL',
    dgQuote:
      '"En choisissant SEM, vous choisissez un partenaire maitrisant la technologie, les delais, les couts et la qualite pour atteindre l\'excellence operationnelle et optimiser durablement vos OPEX."',
    dgAttribution: 'Youssef El Malali — Directeur General, SEM',
    segmentsHeading: 'SECTEURS & SEGMENTS CLIENTS',
    segments: [
      { index: '01', name: 'Defense et Securite', scope: 'Radars, sonars, videosurveillance & reseaux securises' },
      { index: '02', name: 'Administrations Publiques', scope: 'Data Centers, modernisation SI & reseaux etatiques' },
      { index: '03', name: 'Operateurs Telecoms & Regulateurs', scope: 'Deploiement FTK, audits QoS & benchmarking' },
      { index: '04', name: 'Equipementiers Telecoms', scope: 'Execution terrain, Roll-out & integration certifiee' },
      { index: '05', name: 'Banques et Assurances', scope: 'Haute disponibilite IP, securite SI & Managed Services' },
    ],
    commitmentsHeading: 'NOS 4 ENGAGEMENTS CONTRACTUELS',
    commitments: [
      'Respect strict de vos normes de qualite et d\'assurance qualite terrain',
      'Conformite aux standards EHS et de securite (demarche OHSAS 18001)',
      'Respect rigoureux des jalons et delais de livraison convenus',
      'Optimisation economique des couts d\'investissement et d\'exploitation',
    ],
    page1Footer: 'SEM — Smart Engineering & Management · www.sem.ma · Page 1 / 2',
    page2HeaderTag: 'DOMAINES D\'ACTIVITES, PORTEFEUILLE & CONTACT',
    polesHeading: 'QUATRE POLES D\'ACTIVITES STRATEGIQUES',
    poles: [
      {
        index: '01',
        title: 'Pole Services',
        items: [
          'Reseaux IP, Telecoms & Infrastructures cles en main (FTK)',
          'Data Centers, Energie, Climatisation de precision & Shelters',
          'Infrastructures Broadcast TV & liaisons satellitaires VSAT',
          'Securite SI, Managed Services & IT industriel / M2M',
        ],
      },
      {
        index: '02',
        title: 'Pole Conseil & Formation',
        items: [
          'Conseil technique et managerial & etudes d\'architecture',
          'Network Design & Planning, Project Management & AMOA',
          'Formation technique, leadership & transfert de competences OJT',
          'Recrutement et detachement de profils experts certifies',
        ],
      },
      {
        index: '03',
        title: 'Pole Surete Electronique',
        items: [
          'Protection electronique des sites critiques et perimetres sensibles',
          'Videosurveillance HD & analyse video intelligente',
          'Integration de radars cotiers/perimetriques et sonars maritimes',
          'Centres de commandement et supervision multi-sites',
        ],
      },
      {
        index: '04',
        title: 'Pole Qualite de Service (QoS)',
        items: [
          'Audits de performance des reseaux fixes, mobiles et IP',
          'Campagnes Drive Test & Benchmarking multi-operateurs',
          'Management QoS, NPO & controle QA / QC sur sites',
          'Distribution d\'appareils et instruments de test et de mesure',
        ],
      },
    ],
    portfolioHeading: 'ALLIANCES EXCLUSIVES & PORTEFEUILLE TECHNIQUE',
    exclusiveTitle: 'Distribution Exclusive & Constructeurs',
    exclusiveItems: [
      {
        brand: 'Keysight Technologies',
        desc: 'Distributeur exclusif : equipements de test & mesure RF, micro-ondes et sans fil.',
      },
      {
        brand: 'Ericsson TV & Media',
        desc: 'Solutions de diffusion Broadcast, compression video et contribution media.',
      },
      {
        brand: 'GENELEC',
        desc: 'Groupes electrogenes industriels haute fiabilite pour sites critiques.',
      },
    ],
    infraTitle: 'Infrastructures, Energie & Deploiement',
    infraItems: [
      'Courants faibles, energie secourue, solaire & refroidissement de precision',
      'Shelters techniques, pylones telecoms & amenagement de Data Centers',
      'Transmission fixe/faisceaux hertziens, Broadcast & stations VSAT',
      'Deploiement reseau (Network Roll-out) & projets Full Turnkey (FTK)',
    ],
    milestonesHeading: 'JALONS CLES (2008 – 2026)',
    milestones: [
      { year: '2008', label: 'Creation de Sicotel E&M & lancement du Pole Conseil' },
      { year: '2009', label: 'Offre de construction d\'infrastructures telecoms cles en main' },
      { year: '2012', label: 'Ouverture de la distribution d\'appareils de test & mesure' },
      { year: '2016', label: 'Identite SEM & lancement des solutions Broadcast / VSAT' },
      { year: '2017+', label: 'Demarches ISO 9001 / OHSAS 18001 & projets dans 17 pays africains' },
    ],
    contactBoxTitle: 'SIEGE SOCIAL & CONTACT DIRECT',
    contactAddress: '90 Quartier Industriel, Mohammedia 20800, Royaume du Maroc',
    contactLine: 'Tel : +212 (0) 523 322 321  |  Email : contact@sem.ma  |  Site web : https://www.sem.ma',
    contactHours: 'Horaires : Lundi au Vendredi, 08h30 - 17h00  |  Directions : Commerciale · Operations · RH · Admin & Finance',
    page2Footer: '© 2008 – 2026 SEM — Smart Engineering & Management · Tous droits reserves · Page 2 / 2',
  },
  en: {
    filename: 'SEM-Company-Presentation-EN.pdf',
    docTitle: 'SEM - Smart Engineering & Management | Corporate Brochure',
    editionLine: 'CORPORATE PRESENTATION · 2026 EDITION',
    heroTitle: 'IT, Telecoms & Turnkey Critical Infrastructure Engineering',
    heroSubtitle:
      'Since 2008, SEM designs, builds, secures, and optimizes mission-critical networks, Data Centers, Broadcast & VSAT systems across Morocco and 17 African countries.',
    motto: '"Your challenge is our progress" — Operational Excellence & OPEX Control',
    kpis: [
      { value: '2008', label: 'Founded in Morocco', detail: '18 years of continuous engineering' },
      { value: '17 Countries', label: 'African Footprint', detail: 'Active South-South cooperation' },
      { value: '4 Units', label: 'Strategic Poles', detail: 'Services · Consulting · Security · QoS' },
      { value: 'ISO 9001', label: 'Quality & EHS', detail: 'ISO 9001 & OHSAS 18001 programs' },
    ],
    aboutHeading: 'IDENTITY & MISSION',
    aboutBody:
      'Founded in 2008 as Sicotel Engineering & Management and rebranded Smart Engineering & Management (SEM) in 2016 with unchanged shareholding, we deliver end-to-end engineering across the infrastructure value chain: technical consulting, network design, full turnkey construction, OJT knowledge transfer, and Managed Services.',
    dgHeading: 'GENERAL MANAGER MESSAGE',
    dgQuote:
      '"By choosing SEM, you choose a partner mastering technology, schedules, costs, and quality to achieve your operational excellence objectives and keep OPEX under control."',
    dgAttribution: 'Youssef El Malali — General Manager, SEM',
    segmentsHeading: 'CLIENT SECTORS & SEGMENTS',
    segments: [
      { index: '01', name: 'Defense & Security', scope: 'Radars, sonars, video surveillance & hardened networks' },
      { index: '02', name: 'Public Administrations', scope: 'Data Centers, IS modernization & government backbones' },
      { index: '03', name: 'Telecom Operators & Regulators', scope: 'Turnkey Roll-out, QoS audits & benchmarking' },
      { index: '04', name: 'Telecom Equipment Vendors', scope: 'Field execution partner, integration & QA/QC' },
      { index: '05', name: 'Banking & Insurance', scope: 'High-availability IP networks, IT security & Managed Services' },
    ],
    commitmentsHeading: 'OUR 4 CORE COMMITMENTS',
    commitments: [
      'Strict adherence to client quality standards and field QA/QC assurance',
      'Full compliance with occupational health & safety standards (OHSAS 18001)',
      'Disciplined project scheduling and on-time milestone delivery',
      'Cost efficiency across CAPEX engineering and long-term OPEX',
    ],
    page1Footer: 'SEM — Smart Engineering & Management · www.sem.ma · Page 1 / 2',
    page2HeaderTag: 'STRATEGIC BUSINESS UNITS, PORTFOLIO & CONTACT',
    polesHeading: 'FOUR INTEGRATED STRATEGIC BUSINESS UNITS',
    poles: [
      {
        index: '01',
        title: 'Services Unit',
        items: [
          'End-to-end IP & Telecom networks and Full Turnkey (FTK) projects',
          'Data Centers, Energy, Precision cooling & technical Shelters',
          'Broadcast TV & Media platforms and VSAT satellite links',
          'Information Systems Security, Managed Services & Industrial M2M',
        ],
      },
      {
        index: '02',
        title: 'Consulting & Training Unit',
        items: [
          'Technical & managerial consulting and engineering studies',
          'Network Design & Planning, Project Management & AMOA',
          'Technical & leadership training and OJT knowledge transfer',
          'Specialized engineering recruitment and technical staffing',
        ],
      },
      {
        index: '03',
        title: 'Electronic Security Unit',
        items: [
          'Electronic protection of critical facilities and strategic perimeters',
          'HD video surveillance and intelligent video analytics',
          'Perimeter/coastal Radars and maritime Sonar integration',
          'Unified command, control and multi-site supervision centers',
        ],
      },
      {
        index: '04',
        title: 'Quality of Service (QoS) Unit',
        items: [
          'Fixed, mobile, and IP network performance audits',
          'Multi-operator Drive Test campaigns and Benchmarking',
          'QoS Management, Network Performance Optimization & Site QA/QC',
          'Distribution of RF, optical, and IP test & measurement instruments',
        ],
      },
    ],
    portfolioHeading: 'EXCLUSIVE ALLIANCES & TECHNOLOGY PORTFOLIO',
    exclusiveTitle: 'Exclusive Distribution & OEM Partners',
    exclusiveItems: [
      {
        brand: 'Keysight Technologies',
        desc: 'Exclusive distributor for RF, microwave, wireless & general T&M gear.',
      },
      {
        brand: 'Ericsson TV & Media',
        desc: 'Broadcast headend, video compression, and media contribution solutions.',
      },
      {
        brand: 'GENELEC',
        desc: 'Heavy-duty industrial power generators for mission-critical sites.',
      },
    ],
    infraTitle: 'Infrastructure, Power & Field Deployment',
    infraItems: [
      'Low current systems, backup power, solar energy & precision cooling',
      'Technical shelters, telecom towers (pylons) & Data Center fit-outs',
      'Fixed & wireless transmission backbones, Broadcast & VSAT earth stations',
      'Turnkey Network Roll-out and multi-country engineering execution',
    ],
    milestonesHeading: 'KEY MILESTONES (2008 – 2026)',
    milestones: [
      { year: '2008', label: 'Founding of Sicotel E&M & launch of Consulting practice' },
      { year: '2009', label: 'Launch of turnkey telecom & IT infrastructure construction' },
      { year: '2012', label: 'Launch of Test & Measurement equipment distribution unit' },
      { year: '2016', label: 'Rebranding to SEM & launch of Broadcast & VSAT division' },
      { year: '2017+', label: 'ISO 9001 / OHSAS 18001 programs & delivery in 17 African nations' },
    ],
    contactBoxTitle: 'HEADQUARTERS & DIRECT CONTACT',
    contactAddress: '90 Quartier Industriel, Mohammedia 20800, Kingdom of Morocco',
    contactLine: 'Phone: +212 (0) 523 322 321  |  Email: contact@sem.ma  |  Web: https://www.sem.ma',
    contactHours: 'Office Hours: Monday to Friday, 08:30 - 17:00  |  Departments: Sales · Operations · HR · Admin & Finance',
    page2Footer: '© 2008 – 2026 SEM — Smart Engineering & Management · All rights reserved · Page 2 / 2',
  },
};

const safeText = (input: string): string =>
  input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014/g, ' - ')
    .replace(/\u2013/g, '-')
    .replace(/\u0153/g, 'oe')
    .replace(/\u0152/g, 'OE')
    .replace(/\u00a0/g, ' ');

const COLORS = {
  navy: '#0B192C',
  navyLight: '#132844',
  blue: '#3769B3',
  cyan: '#24A9E0',
  slate900: '#0F172A',
  slate700: '#334155',
  slate500: '#64748B',
  slate200: '#E2E8F0',
  slate50: '#F8FAFC',
  white: '#FFFFFF',
};

export function getBrochureFilename(language: BrochureLanguage): string {
  return BROCHURE_COPY[language].filename;
}

export async function generateSemBrochurePdf(language: BrochureLanguage): Promise<Buffer> {
  const copy = BROCHURE_COPY[language];
  const logoWhitePath = path.resolve(__dirname, 'public/images/sem-logo-white.png');
  const logoColorPath = path.resolve(__dirname, 'public/images/sem-logo.png');
  const hasWhiteLogo = fs.existsSync(logoWhitePath);
  const hasColorLogo = fs.existsSync(logoColorPath);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      info: {
        Title: safeText(copy.docTitle),
        Author: 'SEM - Smart Engineering & Management',
        Subject:
          language === 'fr'
            ? 'Presentation institutionnelle et domaines d\'activites de SEM'
            : 'Corporate presentation and strategic business units of SEM',
        Keywords: 'SEM, Smart Engineering & Management, Telecom, IT, Data Center, Broadcast, QoS, Morocco, Africa',
      },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width; // 595.28
    const pageHeight = doc.page.height; // 841.89
    const marginX = 40;
    const contentWidth = pageWidth - marginX * 2; // 515.28

    // =========================================================================
    // PAGE 1: COVER HEADER, KPIS, IDENTITY, DG MESSAGE, SEGMENTS & COMMITMENTS
    // =========================================================================
    doc.rect(0, 0, pageWidth, 205).fill(COLORS.navy);
    doc.rect(0, 205, pageWidth, 4).fill(COLORS.cyan);

    if (hasWhiteLogo) {
      doc.image(logoWhitePath, marginX, 28, { height: 32 });
    } else {
      doc.fillColor(COLORS.white).font('Helvetica-Bold').fontSize(20).text('SEM', marginX, 32);
    }

    doc
      .fillColor(COLORS.cyan)
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .text(safeText(copy.editionLine), pageWidth - marginX - 240, 38, {
        width: 240,
        align: 'right',
      });

    doc
      .fillColor(COLORS.white)
      .font('Helvetica-Bold')
      .fontSize(21)
      .text(safeText(copy.heroTitle), marginX, 78, {
        width: contentWidth,
        lineGap: 3,
      });

    doc
      .fillColor('#CBD5E1')
      .font('Helvetica')
      .fontSize(10.5)
      .text(safeText(copy.heroSubtitle), marginX, 134, {
        width: contentWidth,
        lineGap: 2.5,
      });

    doc
      .fillColor(COLORS.cyan)
      .font('Helvetica-BoldOblique')
      .fontSize(9.5)
      .text(safeText(copy.motto), marginX, 178, {
        width: contentWidth,
      });

    // 4-Column KPI Row
    const kpiTop = 228;
    const kpiGap = 10;
    const kpiWidth = (contentWidth - kpiGap * 3) / 4;
    const kpiHeight = 66;

    copy.kpis.forEach((kpi, idx) => {
      const x = marginX + idx * (kpiWidth + kpiGap);
      doc.roundedRect(x, kpiTop, kpiWidth, kpiHeight, 5).fillAndStroke(COLORS.slate50, COLORS.slate200);
      doc
        .fillColor(COLORS.blue)
        .font('Helvetica-Bold')
        .fontSize(15)
        .text(safeText(kpi.value), x + 10, kpiTop + 10, { width: kpiWidth - 20 });
      doc
        .fillColor(COLORS.slate900)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text(safeText(kpi.label), x + 10, kpiTop + 31, { width: kpiWidth - 20 });
      doc
        .fillColor(COLORS.slate500)
        .font('Helvetica')
        .fontSize(7.5)
        .text(safeText(kpi.detail), x + 10, kpiTop + 44, { width: kpiWidth - 20 });
    });

    // Identity & Mission + DG Quote (Left Column) | Client Segments & Commitments (Right Column)
    const splitTop = 314;
    const colGap = 22;
    const leftWidth = (contentWidth - colGap) * 0.48;
    const rightWidth = (contentWidth - colGap) * 0.52;
    const rightX = marginX + leftWidth + colGap;

    // Left Column: Identity & Mission
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(safeText(copy.aboutHeading), marginX, splitTop);
    doc
      .moveTo(marginX, splitTop + 14)
      .lineTo(marginX + leftWidth, splitTop + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    doc
      .fillColor(COLORS.slate700)
      .font('Helvetica')
      .fontSize(9.5)
      .text(safeText(copy.aboutBody), marginX, splitTop + 22, {
        width: leftWidth,
        lineGap: 3,
      });

    // Left Column: DG Quote Box
    const quoteBoxY = 480;
    doc
      .roundedRect(marginX, quoteBoxY, leftWidth, 142, 6)
      .fillAndStroke(COLORS.navy, COLORS.navy);
    doc
      .fillColor(COLORS.cyan)
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .text(safeText(copy.dgHeading), marginX + 14, quoteBoxY + 14, { width: leftWidth - 28 });
    doc
      .fillColor(COLORS.white)
      .font('Helvetica-Oblique')
      .fontSize(9.5)
      .text(safeText(copy.dgQuote), marginX + 14, quoteBoxY + 32, {
        width: leftWidth - 28,
        lineGap: 3,
      });
    doc
      .fillColor('#94A3B8')
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .text(safeText(copy.dgAttribution), marginX + 14, quoteBoxY + 114, { width: leftWidth - 28 });

    // Left Column: 4 Commitments below quote box
    const commY = 640;
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(safeText(copy.commitmentsHeading), marginX, commY);
    doc
      .moveTo(marginX, commY + 14)
      .lineTo(marginX + leftWidth, commY + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    let commLineY = commY + 22;
    copy.commitments.forEach((item) => {
      doc.circle(marginX + 4, commLineY + 4.5, 2).fill(COLORS.cyan);
      doc
        .fillColor(COLORS.slate700)
        .font('Helvetica')
        .fontSize(8.7)
        .text(safeText(item), marginX + 13, commLineY, { width: leftWidth - 13, lineGap: 1.5 });
      commLineY += 27;
    });

    // Right Column: 5 Client Segments
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(safeText(copy.segmentsHeading), rightX, splitTop);
    doc
      .moveTo(rightX, splitTop + 14)
      .lineTo(rightX + rightWidth, splitTop + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    let segY = splitTop + 24;
    copy.segments.forEach((seg) => {
      doc
        .roundedRect(rightX, segY, rightWidth, 68, 5)
        .fillAndStroke(COLORS.white, COLORS.slate200);
      doc
        .fillColor(COLORS.blue)
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(seg.index, rightX + 12, segY + 11);
      doc
        .fillColor(COLORS.slate900)
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(safeText(seg.name), rightX + 34, segY + 11, { width: rightWidth - 46 });
      doc
        .fillColor(COLORS.slate500)
        .font('Helvetica')
        .fontSize(8.7)
        .text(safeText(seg.scope), rightX + 34, segY + 28, {
          width: rightWidth - 46,
          lineGap: 2,
        });
      segY += 78;
    });

    // Page 1 Bottom Footer
    doc
      .moveTo(marginX, pageHeight - 40)
      .lineTo(pageWidth - marginX, pageHeight - 40)
      .strokeColor(COLORS.slate200)
      .lineWidth(0.75)
      .stroke();
    doc
      .fillColor(COLORS.slate500)
      .font('Helvetica')
      .fontSize(8)
      .text(safeText(copy.page1Footer), marginX, pageHeight - 30, {
        width: contentWidth,
        align: 'center',
      });

    // =========================================================================
    // PAGE 2: 4 STRATEGIC POLES, PORTFOLIO, MILESTONES & HEADQUARTERS CONTACT
    // =========================================================================
    doc.addPage({ size: 'A4', margin: 0 });

    // Top running bar
    doc.rect(0, 0, pageWidth, 62).fill(COLORS.slate50);
    doc
      .moveTo(0, 62)
      .lineTo(pageWidth, 62)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    if (hasColorLogo) {
      doc.image(logoColorPath, marginX, 17, { height: 26 });
    } else {
      doc.fillColor(COLORS.navy).font('Helvetica-Bold').fontSize(16).text('SEM', marginX, 20);
    }

    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .text(safeText(copy.page2HeaderTag), pageWidth - marginX - 280, 26, {
        width: 280,
        align: 'right',
      });

    // 4 Strategic Business Units (2x2 Grid)
    const polesStartY = 82;
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .text(safeText(copy.polesHeading), marginX, polesStartY);
    doc
      .moveTo(marginX, polesStartY + 14)
      .lineTo(pageWidth - marginX, polesStartY + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    const poleCardGap = 14;
    const poleCardW = (contentWidth - poleCardGap) / 2;
    const poleCardH = 128;

    copy.poles.forEach((pole, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = marginX + col * (poleCardW + poleCardGap);
      const y = polesStartY + 24 + row * (poleCardH + poleCardGap);

      doc.roundedRect(x, y, poleCardW, poleCardH, 6).fillAndStroke(COLORS.white, COLORS.slate200);
      doc
        .fillColor(COLORS.blue)
        .font('Helvetica-Bold')
        .fontSize(10.5)
        .text(`${pole.index}. ${safeText(pole.title)}`, x + 12, y + 12, { width: poleCardW - 24 });

      let itemY = y + 32;
      pole.items.forEach((item) => {
        doc.circle(x + 15, itemY + 4, 1.8).fill(COLORS.cyan);
        doc
          .fillColor(COLORS.slate700)
          .font('Helvetica')
          .fontSize(8.3)
          .text(safeText(item), x + 23, itemY, { width: poleCardW - 35, lineGap: 1 });
        itemY += 22;
      });
    });

    // Portfolio & Alliances Section
    const portY = 392;
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .text(safeText(copy.portfolioHeading), marginX, portY);
    doc
      .moveTo(marginX, portY + 14)
      .lineTo(pageWidth - marginX, portY + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    const boxTop = portY + 24;
    const boxW = (contentWidth - poleCardGap) / 2;
    const boxH = 146;

    // Left Box: Exclusive OEM Distribution
    doc.roundedRect(marginX, boxTop, boxW, boxH, 6).fillAndStroke(COLORS.slate50, COLORS.slate200);
    doc
      .fillColor(COLORS.slate900)
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .text(safeText(copy.exclusiveTitle), marginX + 12, boxTop + 12, { width: boxW - 24 });

    let exY = boxTop + 34;
    copy.exclusiveItems.forEach((ex) => {
      doc
        .fillColor(COLORS.blue)
        .font('Helvetica-Bold')
        .fontSize(8.7)
        .text(safeText(ex.brand), marginX + 12, exY, { width: boxW - 24 });
      doc
        .fillColor(COLORS.slate700)
        .font('Helvetica')
        .fontSize(8.2)
        .text(safeText(ex.desc), marginX + 12, exY + 11, { width: boxW - 24, lineGap: 1 });
      exY += 35;
    });

    // Right Box: Infrastructure & Deployment
    const rightBoxX = marginX + boxW + poleCardGap;
    doc.roundedRect(rightBoxX, boxTop, boxW, boxH, 6).fillAndStroke(COLORS.slate50, COLORS.slate200);
    doc
      .fillColor(COLORS.slate900)
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .text(safeText(copy.infraTitle), rightBoxX + 12, boxTop + 12, { width: boxW - 24 });

    let infY = boxTop + 34;
    copy.infraItems.forEach((inf) => {
      doc.circle(rightBoxX + 15, infY + 4, 1.8).fill(COLORS.blue);
      doc
        .fillColor(COLORS.slate700)
        .font('Helvetica')
        .fontSize(8.3)
        .text(safeText(inf), rightBoxX + 23, infY, { width: boxW - 35, lineGap: 1.5 });
      infY += 26;
    });

    // Milestones Compact Section
    const mileY = 582;
    doc
      .fillColor(COLORS.blue)
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .text(safeText(copy.milestonesHeading), marginX, mileY);
    doc
      .moveTo(marginX, mileY + 14)
      .lineTo(pageWidth - marginX, mileY + 14)
      .strokeColor(COLORS.slate200)
      .lineWidth(1)
      .stroke();

    let mY = mileY + 23;
    copy.milestones.forEach((m) => {
      doc
        .fillColor(COLORS.blue)
        .font('Helvetica-Bold')
        .fontSize(9)
        .text(m.year, marginX, mY, { width: 42 });
      doc
        .fillColor(COLORS.slate700)
        .font('Helvetica')
        .fontSize(8.8)
        .text(safeText(m.label), marginX + 46, mY, { width: contentWidth - 46 });
      mY += 17;
    });

    // Headquarters & Direct Contact Callout Box
    const contactY = 702;
    doc
      .roundedRect(marginX, contactY, contentWidth, 86, 6)
      .fillAndStroke(COLORS.navy, COLORS.navy);
    doc
      .fillColor(COLORS.cyan)
      .font('Helvetica-Bold')
      .fontSize(9)
      .text(safeText(copy.contactBoxTitle), marginX + 16, contactY + 13, {
        width: contentWidth - 32,
      });
    doc
      .fillColor(COLORS.white)
      .font('Helvetica-Bold')
      .fontSize(9.8)
      .text(safeText(copy.contactAddress), marginX + 16, contactY + 29, {
        width: contentWidth - 32,
      });
    doc
      .fillColor('#E2E8F0')
      .font('Helvetica')
      .fontSize(8.8)
      .text(safeText(copy.contactLine), marginX + 16, contactY + 46, {
        width: contentWidth - 32,
      });
    doc
      .fillColor('#94A3B8')
      .font('Helvetica')
      .fontSize(8.2)
      .text(safeText(copy.contactHours), marginX + 16, contactY + 62, {
        width: contentWidth - 32,
      });

    // Page 2 Bottom Footer
    doc
      .moveTo(marginX, pageHeight - 40)
      .lineTo(pageWidth - marginX, pageHeight - 40)
      .strokeColor(COLORS.slate200)
      .lineWidth(0.75)
      .stroke();
    doc
      .fillColor(COLORS.slate500)
      .font('Helvetica')
      .fontSize(8)
      .text(safeText(copy.page2Footer), marginX, pageHeight - 30, {
        width: contentWidth,
        align: 'center',
      });

    doc.end();
  });
}
