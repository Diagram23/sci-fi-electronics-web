export type ProductStatus = 'available' | 'in-development';

export type ProductType = 'sample-pack' | 'plugin';

interface ProductBase {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  status: ProductStatus;
  category: string;
  shortCopy: string;
  description: string;
  features: string[];
  format: string;
}

export interface SamplePackProduct extends ProductBase {
  type: 'sample-pack';
  bpm: '80 / 85';
  price: 'Configurable';
  buyUrl: string;
  listenUrl: string;
  detailsUrl: string;
}

export interface PluginProduct extends ProductBase {
  type: 'plugin';
  roadmap: string[];
  waitlistUrl: string;
  contactUrl: string;
}

export type Product = SamplePackProduct | PluginProduct;

export const CHROMA: SamplePackProduct = {
  id: 'chroma',
  slug: 'chroma',
  name: 'CHROMA',
  type: 'sample-pack',
  status: 'available',
  category: 'sample pack',
  bpm: '80 / 85',
  format: 'WAV',
  price: 'Configurable',
  buyUrl: '/contact',
  listenUrl: '/contact',
  detailsUrl: '/#sound-packs',
  shortCopy:
    'Futuristic halftime rhythms, sci-fi FX and deep bass tools built for underground producers working around 80 / 85 BPM.',
  description:
    'CHROMA is a focused sound pack for producers exploring halftime, deep bass, cinematic FX and atmospheric club music. Built around movement, space and controlled tension, it gives you production-ready material without pushing you into generic sounds.',
  features: [
    '80 / 85 BPM foundation',
    'Halftime rhythm ideas',
    'Deep bass tools',
    'Sci-fi FX and transitions',
    'Atmospheric loops',
    'Polyrhythmic grooves',
    'WAV format'
  ]
};

export const CTRL4FILTER: PluginProduct = {
  id: 'ctrl4filter',
  slug: 'ctrl4filter',
  name: 'ctrl4filter',
  type: 'plugin',
  status: 'in-development',
  category: 'plugin',
  format: 'VST3 / AU (future)',
  shortCopy:
    'An intelligent multimode filter and modulation system for transforming drums, basses, loops and full buses.',
  description:
    'ctrl4filter is an upcoming audio plugin designed for creative filtering, rhythmic modulation and generative movement. Built for fast sound transformation, it turns static material into pressure, motion and controlled chaos.',
  features: [
    'Multimode filter engine',
    'Deep modulation hub',
    'Rhythmic movement',
    'Generative behavior',
    'Creative randomization',
    'VST3 / AU planned'
  ],
  roadmap: [
    'Core filter and modulation engine',
    'Interface and performance controls',
    'Private testing and feedback round'
  ],
  waitlistUrl: '/contact',
  contactUrl: '/contact'
};

export const productsData: Product[] = [CHROMA, CTRL4FILTER];

export function getProductById(id: string): Product | undefined {
  return productsData.find((product) => product.id === id);
}

export function getSamplePacks(): SamplePackProduct[] {
  return productsData.filter((product): product is SamplePackProduct => product.type === 'sample-pack');
}

export function getPlugins(): PluginProduct[] {
  return productsData.filter((product): product is PluginProduct => product.type === 'plugin');
}

