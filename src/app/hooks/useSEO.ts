/**
 * useSEO - sets document title and essential meta tags
 */
import { useEffect } from 'react';

const BASE = 'SCI-FI ELECTRONICS';
const DEFAULT_DESCRIPTION =
  'Premium audio plugins, sound systems and future-facing tools for underground electronic music producers.';

interface SEOProps {
  title?: string;
  description?: string;
}

export function useSEO({ title, description }: SEOProps = {}) {
  useEffect(() => {
    const finalTitle = title ? `${title} — ${BASE}` : `${BASE} — Future Sound Tools`;
    const finalDescription = description ?? DEFAULT_DESCRIPTION;

    document.title = finalTitle;

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = finalDescription;

    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = finalTitle;

    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = finalDescription;

    let keywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.name = 'keywords';
      document.head.appendChild(keywords);
    }
    keywords.content =
      'audio plugins, sample packs, halftime, sound design, underground electronic music, sci-fi electronics, VST, production tools';
  }, [title, description]);
}
