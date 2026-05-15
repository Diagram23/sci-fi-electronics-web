export const HOME_ENTRY_SOURCE = 'user-approved-fractal-delay-entry' as const;
export const HOME_HERO_COMPONENT = 'ProductHeroFigmaHybrid' as const;

export const siteConfig = {
  siteName: 'SCI-FI ELECTRONICS',
  brandShortName: 'SFE',
  tagline: 'Future sound tools',
  description:
    'Premium audio plugins, sound systems and future-facing tools for underground electronic music producers.',
  activeProduct: {
    id: 'fractal-delay',
    name: 'FRACTAL DELAY',
    displayName: 'Fractal Delay',
    tagline: 'Time Manipulation Engine',
    price: 129,
    route: '/plugins/fractal-delay',
  },
  activeBundle: {
    name: 'Complete Signal Collection',
    price: 349,
    compareAtPrice: 456,
  },
  legacyFigmaProducts: ['CHROMA', 'ctrl4filter'],
  supportEmail: 'support@scifielectronics.com',
  salesEmail: 'sales@scifielectronics.com',
  generalEmail: 'hello@scifielectronics.com',
  collaborationsEmail: 'collabs@scifielectronics.com',
  buyMode: 'contact-fallback',
  checkoutEnabled: false,
  audioDemosEnabled: false,
  homeEntrySource: HOME_ENTRY_SOURCE,
  homeHeroComponent: HOME_HERO_COMPONENT,
  enableBrandIntro: false,
  enableDevFigmaReference: true,
  enableDevComponentGallery: true,
  enableDevFigmaOriginalReconstruction: true,
} as const;

export type SiteConfig = typeof siteConfig;
