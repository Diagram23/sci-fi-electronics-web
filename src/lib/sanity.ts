import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01',
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}

export async function getPlugins() {
  if (!sanityClient) return [];
  return sanityClient.fetch(`
    *[_type == "plugin"] | order(order asc, _createdAt desc) {
      _id,
      "id": id.current,
      name,
      serial,
      category,
      price,
      badge,
      tagline,
      description,
      visual,
      accentColor,
      accentRGB,
      keyFeatures,
      specs,
      formats,
      heroImage,
      gallery,
      demoAudioDry,
      demoAudioWet,
      demoVideoUrl,
      downloadLinks,
      lemonsqueezyUrl,
      featured,
      order
    }
  `);
}

export async function getPluginBySlug(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `
    *[_type == "plugin" && id.current == $slug][0] {
      _id,
      "id": id.current,
      name,
      serial,
      category,
      price,
      badge,
      tagline,
      description,
      visual,
      accentColor,
      accentRGB,
      keyFeatures,
      specs,
      formats,
      heroImage,
      gallery,
      demoAudioDry,
      demoAudioWet,
      demoVideoUrl,
      downloadLinks,
      lemonsqueezyUrl,
      featured
    }
  `,
    { slug }
  );
}

export async function getSettings() {
  if (!sanityClient) return null;
  return sanityClient.fetch(`
    *[_type == "settings"][0] {
      bundlePrice,
      bundleLemonsqueezyUrl,
      promoBarEnabled,
      promoBarText,
      heroHeadline,
      heroSubheadline,
      supportEmail,
      salesEmail,
      socialLinks,
      siteTitle,
      siteDescription,
      ogImage
    }
  `);
}
