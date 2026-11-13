import { Language } from '../types/sem';

export async function downloadCompanyBrochure(language: Language): Promise<void> {
  const response = await fetch(`/api/brochure?lang=${language}`, {
    method: 'GET',
    headers: { Accept: 'application/pdf' },
  });

  if (!response.ok) {
    throw new Error(`Brochure download failed (${response.status})`);
  }

  const blob = await response.blob();
  const filename =
    language === 'en'
      ? 'SEM-Company-Presentation-EN.pdf'
      : 'SEM-Presentation-Entreprise-FR.pdf';

  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1500);
}
