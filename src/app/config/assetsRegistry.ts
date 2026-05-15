export type AssetStatus =
  | 'figma-local'
  | 'external'
  | 'placeholder'
  | 'pending-production';

export interface AssetRegistryItem {
  id: string;
  status: AssetStatus;
  pathOrSource: string;
  usedBy: string[];
  notes: string;
}

export const assetsRegistry: AssetRegistryItem[] = [
  {
    id: 'sfe-figma-brand-emblem',
    status: 'figma-local',
    pathOrSource: 'src/assets/6a48319d71f3339b74104ffc5d20862e540ee731.png',
    usedBy: ['BrandIntro', 'Footer'],
    notes:
      'Local Figma Make brand asset. The blocking splash remains disabled; the asset is reused as a subtle brand mark.',
  },
  {
    id: 'archive-cover-unsplash',
    status: 'external',
    pathOrSource: 'ArchiveTeaser / ArchivePage Unsplash image URLs',
    usedBy: ['ArchiveTeaser', 'ArchivePage'],
    notes:
      'External editorial imagery carried by the local export. Replace with owned archive artwork before final launch.',
  },
  {
    id: 'plugin-window-css-mockup',
    status: 'placeholder',
    pathOrSource: 'PluginWindowMockup / PluginVisual',
    usedBy: ['ProductHeroFigmaHybrid', 'ProductGrid', 'PluginDetailPage'],
    notes:
      'CSS/SVG plugin presentation. Production should connect final plugin UI renders or exported product mockups.',
  },
  {
    id: 'audio-demo-files',
    status: 'pending-production',
    pathOrSource: 'No local WAV/MP3 files found',
    usedBy: ['AudioDemoSection', 'ArchiveTeaser'],
    notes:
      'Waveforms and players are visual previews only until real audio files are added.',
  },
  {
    id: 'public-logo-pack',
    status: 'pending-production',
    pathOrSource: 'No public logo pack found',
    usedBy: ['NavbarAdvanced', 'Footer', 'Open Graph'],
    notes:
      'Add production logo variants, favicon, social card and product renders for launch.',
  },
];
