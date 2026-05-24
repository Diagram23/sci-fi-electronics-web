/**
 * useSEO - sets page title, canonical, social metadata and JSON-LD.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, defaultSeo, organizationSchema, websiteSchema } from '@/app/config/seoConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: readonly string[];
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertLink(rel: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}

function upsertJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
  let script = document.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  type = 'website',
  structuredData,
}: SEOProps = {}) {
  const location = useLocation();

  useEffect(() => {
    const finalTitle = title ? `${title} | SCI-FI ELECTRONICS` : defaultSeo.title;
    const finalDescription = description ?? defaultSeo.description;
    const finalKeywords = (keywords?.length ? keywords : defaultSeo.keywords).join(', ');
    const finalCanonical = absoluteUrl(canonicalPath ?? location.pathname);
    const finalImage = image ?? defaultSeo.image;

    document.title = finalTitle;

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'description';
      return meta;
    }, finalDescription);

    upsertMeta('meta[name="keywords"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      return meta;
    }, finalKeywords);

    upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      return meta;
    }, 'index, follow, max-image-preview:large');

    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      return meta;
    }, finalTitle);

    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      return meta;
    }, finalDescription);

    upsertMeta('meta[property="og:type"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      return meta;
    }, type === 'product' ? 'product' : type);

    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      return meta;
    }, finalCanonical);

    upsertMeta('meta[property="og:image"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      return meta;
    }, finalImage);

    upsertMeta('meta[name="twitter:card"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:card';
      return meta;
    }, 'summary_large_image');

    upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      return meta;
    }, finalTitle);

    upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      return meta;
    }, finalDescription);

    upsertMeta('meta[name="theme-color"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      return meta;
    }, '#030403');

    upsertLink('canonical', finalCanonical);
    upsertJsonLd('sfe-global-schema', [organizationSchema(), websiteSchema()]);

    if (structuredData) {
      upsertJsonLd('sfe-page-schema', structuredData);
    } else {
      document.querySelector('script#sfe-page-schema')?.remove();
    }
  }, [canonicalPath, description, image, keywords, location.pathname, structuredData, title, type]);
}
