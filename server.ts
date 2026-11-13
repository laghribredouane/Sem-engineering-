import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { generateSemBrochurePdf, getBrochureFilename } from './brochurePdf.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

interface AssistantTurn {
  role: 'user' | 'model';
  text: string;
}

interface PageContextPayload {
  path?: string;
  title?: string;
  summary?: string;
}

interface AssistantRequestBody {
  message?: string;
  history?: AssistantTurn[];
  pageContext?: PageContextPayload;
  language?: 'fr' | 'en';
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

function buildSystemInstruction(
  language: 'fr' | 'en',
  pageContext: PageContextPayload
): string {
  const langLabel = language === 'en' ? 'English' : 'French (Français)';
  const currentTitle = pageContext.title || 'Accueil';
  const currentPath = pageContext.path || '/';
  const currentSummary = pageContext.summary || '';

  return `You are the official engineering virtual assistant for SEM — Smart Engineering & Management (sem.ma), an engineering, IT, telecommunications, and critical infrastructure company headquartered in Mohammedia, Morocco.

Always respond in ${langLabel} (matching the user's message language if they explicitly switch, otherwise ${langLabel}).
Keep responses concise, structured, accurate, and professional (typically 2 to 5 short sentences or clean numbered lines). Format strictly as clean plain text without Markdown symbols (do not use **, ##, or [label](/url) link syntax). Never invent fake prices, fake client names not in SEM's official profile, or unverified claims.

CURRENT PAGE CONTEXT:
- Route: ${currentPath}
- Page Title: ${currentTitle}
- Page Summary: ${currentSummary}
Prioritize information relevant to the page the visitor is currently viewing, while connecting them to other SEM pages when helpful (e.g. /domaines-d-activites, /portefeuille, /nous-contacter, /candidature).

OFFICIAL SEM KNOWLEDGE BASE:
- Identity: SEM — Smart Engineering & Management. Founded in 2008 in Morocco as Sicotel Engineering & Management; rebranded to Smart Engineering & Management (SEM) in 2016 without shareholding change. General Manager: Youssef El Malali. Motto: "Your challenge is our progress".
- Headquarters & Contact: 90 Quartier Industriel, Mohammedia 20800, Morocco. Phone: +212 (0) 523 322 321. Email: contact@sem.ma. Hours: Monday–Friday, 08:30–17:00 (closed weekends). Target departments on contact form: Commerciale, Opérations, Ressources humaines, Administrative et financière.
- Footprint: Strong presence in Morocco and international delivery across 17 African countries under South-South cooperation.
- Target Client Segments: Defense & Security, Public Administrations, Telecom Operators & Regulators, Telecom Equipment Vendors, Banking & Insurance.
- 4 Strategic Business Units (Domaines d'activités stratégiques):
  1. Pôle Services: End-to-end IT & telecom network deployment & integration, turnkey IP/Telecom networks, Broadcast & VSAT infrastructures, Data Centers, Information Systems Security (Sécurité SI), Managed Services (OPEX reduction), Industrial IT / M2M remote facility management.
  2. Pôle Conseil & Formation: Technical & managerial consulting, Network Design & Planning, Project Management, AMOA, technical & leadership training, OJT & knowledge transfer, technical recruitment & staffing.
  3. Pôle Sûreté Électronique: Electronic protection for critical sites, HD/analytic Video Surveillance (VS), perimeter & coastal Radars, maritime Sonars, command & supervision centers.
  4. Pôle Qualité de Service (QoS): Fixed/mobile/IP network audits, Drive Test & Benchmarking, QoS Management & NPO, distribution of network test & measurement instruments, field Site QA & QC.
- Portfolio & Exclusive Distribution (/portefeuille):
  - Exclusive Distribution: Keysight Technologies (RF/microwave/wireless & general-purpose T&M equipment), Ericsson TV & Media products, GENELEC industrial power generators.
  - Infrastructure & Environment: Low current systems, Energy, Precision cooling, Solar systems, Shelters, Telecom towers (Pylônes).
  - Deployment: Network Roll-out, Full Turnkey (FTK) projects, Transmission (Fixed & Wireless), Broadcast & VSAT.
- Organization & Quality: Hybrid agile structure (matrix to projectized) with 5 divisions (Human Resources, Finance & Administrative Office, Sales & Business Development, Delivery & Operations, dedicated Customer Team including Quality & EHS Controller). Quality & EHS programs aligned with ISO 9001 and OHSAS 18001.
- Careers (/offres-d-emplois, /candidature): Spontaneous applications are always welcome across IP/Data Center, Transmission/Broadcast/VSAT, QoS/Drive Test, and PMO/AMOA engineering profiles.`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/assistant', async (req: Request, res: Response) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error:
            'Assistant configuration unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      const body = (req.body || {}) as AssistantRequestBody;
      const message = typeof body.message === 'string' ? body.message.trim() : '';
      if (!message) {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }

      const language: 'fr' | 'en' = body.language === 'en' ? 'en' : 'fr';
      const pageContext: PageContextPayload = body.pageContext || {};
      const history: AssistantTurn[] = Array.isArray(body.history)
        ? body.history
            .filter(
              (turn) =>
                turn &&
                (turn.role === 'user' || turn.role === 'model') &&
                typeof turn.text === 'string' &&
                turn.text.trim().length > 0
            )
            .slice(-8)
        : [];

      const contents = [
        ...history.map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.text }],
        })),
        {
          role: 'user' as const,
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction: buildSystemInstruction(language, pageContext),
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const reply = (response.text || '').trim();
      if (!reply) {
        res.status(502).json({
          error:
            language === 'fr'
              ? 'Aucune réponse générée pour le moment. Veuillez réessayer.'
              : 'No response was generated. Please try again.',
        });
        return;
      }

      res.json({ reply });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unexpected server error';
      console.error('Assistant API error:', errorMessage);
      res.status(500).json({
        error:
          'Unable to reach the SEM engineering assistant right now. Please try again shortly.',
      });
    }
  });

  const newsletterSubscribers = new Set<string>();

  app.post('/api/newsletter', (req: Request, res: Response) => {
    const body = (req.body || {}) as {
      email?: unknown;
      topics?: unknown;
      language?: unknown;
    };
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const language: 'fr' | 'en' = body.language === 'en' ? 'en' : 'fr';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        error:
          language === 'fr'
            ? 'Veuillez saisir une adresse e-mail professionnelle valide.'
            : 'Please enter a valid work email address.',
      });
      return;
    }

    const alreadySubscribed = newsletterSubscribers.has(email);
    newsletterSubscribers.add(email);

    const topics = Array.isArray(body.topics)
      ? body.topics.filter((t): t is string => typeof t === 'string').slice(0, 6)
      : [];

    res.json({
      ok: true,
      email,
      topics,
      alreadySubscribed,
      message: alreadySubscribed
        ? language === 'fr'
          ? 'Votre adresse est déjà inscrite — vos préférences de veille ont été mises à jour.'
          : 'This email is already subscribed — your engineering briefing preferences have been updated.'
        : language === 'fr'
          ? 'Inscription confirmée aux actualités d’ingénierie et projets de SEM.'
          : 'Subscribed to SEM engineering briefings and project dispatches.',
    });
  });

  app.get('/api/brochure', async (req: Request, res: Response) => {
    try {
      const language: 'fr' | 'en' = req.query.lang === 'en' ? 'en' : 'fr';
      const pdfBuffer = await generateSemBrochurePdf(language);
      const filename = getBrochureFilename(language);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', String(pdfBuffer.length));
      res.setHeader('Cache-Control', 'no-store');
      res.send(pdfBuffer);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'PDF generation failed';
      console.error('Brochure API error:', errorMessage);
      res.status(500).json({ error: 'Unable to generate company brochure PDF.' });
    }
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const forwardedProto = req.headers['x-forwarded-proto'];
    const protocol =
      typeof forwardedProto === 'string'
        ? forwardedProto.split(',')[0].trim()
        : req.protocol || 'https';
    const host = req.get('host') || 'www.sem.ma';
    const baseUrl = `${protocol}://${host}`;
    const lastmod = new Date().toISOString().split('T')[0];

    const routes: Array<{ path: string; priority: string; changefreq: string }> = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/domaines-d-activites', priority: '0.9', changefreq: 'monthly' },
      { path: '/portefeuille', priority: '0.9', changefreq: 'monthly' },
      { path: '/mot-du-directeur-general', priority: '0.8', changefreq: 'yearly' },
      { path: '/histoire', priority: '0.7', changefreq: 'yearly' },
      { path: '/mission-et-valeurs', priority: '0.7', changefreq: 'yearly' },
      { path: '/organisation', priority: '0.7', changefreq: 'yearly' },
      { path: '/certifications', priority: '0.8', changefreq: 'yearly' },
      { path: '/partenaires', priority: '0.8', changefreq: 'monthly' },
      { path: '/clients', priority: '0.8', changefreq: 'monthly' },
      { path: '/offres-d-emplois', priority: '0.8', changefreq: 'weekly' },
      { path: '/candidature', priority: '0.7', changefreq: 'monthly' },
      { path: '/nous-contacter', priority: '0.9', changefreq: 'monthly' },
      { path: '/plan-du-site', priority: '0.6', changefreq: 'monthly' },
    ];

    const urlsXml = routes
      .map(
        (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  if (isProduction) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SEM server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
