import { siteConfig } from '@/app/config/siteConfig';

export const seoKeywords = {
  core: [
    'SCI-FI ELECTRONICS',
    'audio plugins',
    'VST plugins',
    'VST3 plugins',
    'AU plugins',
    'AAX plugins',
    'music production tools',
    'electronic music production',
    'underground electronic music',
    'sound design tools',
    'audio software',
  ],
  product: [
    'Fractal Delay',
    'delay VST plugin',
    'creative delay plugin',
    'recursive delay',
    'tempo synced delay',
    'stereo delay plugin',
    'time manipulation delay',
    'delay plugin for electronic music',
  ],
  bundle: [
    'audio plugin bundle',
    'VST plugin bundle',
    'music producer plugin bundle',
    'sound design plugin collection',
    'complete audio plugin collection',
  ],
  archive: [
    'sample packs',
    'sound design samples',
    'royalty free samples',
    '24-bit WAV samples',
    'underground sample packs',
    'electronic music samples',
    'halftime bass samples',
  ],
} as const;

export const defaultSeo = {
  title: `${siteConfig.siteName} - Premium VST Audio Plugins & Future Sound Tools`,
  description:
    'Premium VST3, AU and AAX audio plugins, Fractal Delay, sound design sample packs and future-facing production tools for underground electronic music producers.',
  keywords: [...seoKeywords.core, ...seoKeywords.product, ...seoKeywords.bundle, ...seoKeywords.archive],
  image: `${siteConfig.siteUrl}/og-image.svg`,
} as const;

export const seoPages = {
  home: {
    title: 'Fractal Delay VST Plugin & Premium Audio Tools',
    description:
      'Discover Fractal Delay, a premium delay VST3, AU and AAX plugin for recursive rhythmic textures, stereo movement and underground electronic music production.',
    keywords: [...seoKeywords.core, ...seoKeywords.product, ...seoKeywords.bundle],
    canonicalPath: '/',
  },
  plugins: {
    title: 'Audio Plugins for Electronic Music Producers',
    description:
      'Explore premium VST3, AU and AAX audio plugins for delay, reverb, spectral processing, distortion and future-facing electronic music production.',
    keywords: [...seoKeywords.core, ...seoKeywords.product, ...seoKeywords.bundle],
    canonicalPath: '/plugins',
  },
  fractalDelay: {
    title: 'Fractal Delay - Time Manipulation Delay VST Plugin',
    description:
      'Fractal Delay is a premium creative delay plugin for recursive delay networks, tempo-locked movement, stereo expansion and electronic music sound design.',
    keywords: [...seoKeywords.core, ...seoKeywords.product],
    canonicalPath: '/plugins/fractal-delay',
  },
  archive: {
    title: 'Signal Archive - Royalty-Free Sound Design Sample Packs',
    description:
      'Browse SCI-FI ELECTRONICS Signal Archive sample packs: royalty-free 24-bit WAV textures, transients, atmospheres and source material for sound designers.',
    keywords: [...seoKeywords.core, ...seoKeywords.archive],
    canonicalPath: '/archive',
  },
  contact: {
    title: 'Contact SCI-FI ELECTRONICS',
    description:
      'Contact SCI-FI ELECTRONICS for audio plugin support, commercial licensing, bundle access, collaborations and sound design inquiries.',
    keywords: [...seoKeywords.core, 'audio plugin support', 'plugin licensing', 'music software support'],
    canonicalPath: '/contact',
  },
  faq: {
    title: 'Audio Plugin FAQ',
    description:
      'Answers about SCI-FI ELECTRONICS audio plugins, VST3/AU/AAX compatibility, licensing, install support, downloads and future checkout access.',
    keywords: [...seoKeywords.core, 'audio plugin FAQ', 'VST install help', 'plugin license support'],
    canonicalPath: '/faq',
  },
} as const;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.siteName,
    alternateName: siteConfig.brandShortName,
    url: siteConfig.siteUrl,
    email: siteConfig.generalEmail,
    description: siteConfig.description,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: defaultSeo.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/plugins?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function fractalDelayProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.activeProduct.displayName,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'macOS, Windows',
    softwareVersion: 'VST3, AU, AAX',
    url: absoluteUrl(siteConfig.activeProduct.route),
    description: seoPages.fractalDelay.description,
    brand: {
      '@type': 'Brand',
      name: siteConfig.siteName,
    },
    offers: {
      '@type': 'Offer',
      price: siteConfig.activeProduct.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
      url: absoluteUrl(siteConfig.activeProduct.route),
    },
  };
}

export function bundleProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: siteConfig.activeBundle.name,
    brand: {
      '@type': 'Brand',
      name: siteConfig.siteName,
    },
    description: 'Complete SCI-FI ELECTRONICS signal collection for electronic music producers and sound designers.',
    offers: {
      '@type': 'Offer',
      price: siteConfig.activeBundle.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
      url: absoluteUrl('/plugins'),
    },
  };
}
