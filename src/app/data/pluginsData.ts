export interface Plugin {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  gradient: string;
  glowColor: string;
  lemonSqueezyVariantId: string; // ← Lemon Squeezy Variant UUID
  features: string[];
  detailedDescription: string;
  specs: {
    formats: string[];
    platforms: string[];
    cpuUsage: string;
    latency: string;
    resolution: string;
  };
  useCases: {
    title: string;
    description: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    rating: number;
  }[];
  relatedPlugins: string[];
}

export const pluginsData: Plugin[] = [
  {
    id: 'quantum-reverb',
    name: 'QUANTUM REVERB',
    tagline: 'Infinite Space Generator',
    description: 'Revolutionary reverb algorithm that creates impossible acoustic spaces. Real-time morphing between parallel dimensions of sound with neural processing.',
    detailedDescription: 'Quantum Reverb isn\'t just another reverb plugin—it\'s a complete paradigm shift in spatial processing. Using advanced neural networks and quantum-inspired algorithms, it generates acoustic spaces that have never existed in the physical world. Morph seamlessly between cathedral halls, intimate rooms, and abstract sonic dimensions with surgical precision. The AI learns from your mix context and suggests complementary space designs, while the infinite tail algorithm ensures your reverb never cuts off unnaturally. From subtle ambience to massive cinematic spaces, Quantum Reverb delivers pristine quality with zero artifacts.',
    price: 149,
    gradient: 'from-[#C49A6C] via-[#D4B896] to-[#B8936D]',
    glowColor: 'amber',
    lemonSqueezyVariantId: '12345678-1234-1234-1234-123456789012', // ← Lemon Squeezy Variant UUID
    features: ['AI-Powered Space Morphing', '∞ Reverb Tail', '4K+ IR Library', 'Neural Learning Mode', 'Zero Latency', 'Modulation Matrix'],
    specs: {
      formats: ['VST3', 'AU', 'AAX'],
      platforms: ['macOS', 'Windows'],
      cpuUsage: '< 5% (average)',
      latency: '0ms',
      resolution: 'Up to 192kHz / 32-bit'
    },
    useCases: [
      {
        title: 'Cinematic Scoring',
        description: 'Create massive, evolving spaces for film and game soundtracks that respond to your musical dynamics.'
      },
      {
        title: 'Electronic Music',
        description: 'Add depth and dimension to synths and drums with impossible reverbs that morph in real-time.'
      },
      {
        title: 'Vocal Production',
        description: 'From intimate whispers to arena-sized presence, craft the perfect vocal space instantly.'
      },
      {
        title: 'Sound Design',
        description: 'Generate otherworldly spaces and abstract textures for creative sound design work.'
      }
    ],
    testimonials: [
      {
        name: 'Marcus Chen',
        role: 'Film Composer',
        quote: 'Quantum Reverb has become my secret weapon for scoring. The AI morphing saves me hours of automation work.',
        rating: 5
      },
      {
        name: 'Sarah Williams',
        role: 'Electronic Producer',
        quote: 'The infinite tail and zero latency changed everything. I can finally have huge reverbs without any CPU pain.',
        rating: 5
      },
      {
        name: 'James Rodriguez',
        role: 'Mixing Engineer',
        quote: 'Best reverb plugin I\'ve used in 15 years. The quality is pristine and the workflow is genius.',
        rating: 5
      }
    ],
    relatedPlugins: ['fractal-delay', 'spectral-gate']
  },
  {
    id: 'fractal-delay',
    name: 'FRACTAL DELAY',
    tagline: 'Time Manipulation Engine',
    description: 'Recursive delay network with AI-powered pattern generation. Create evolving rhythmic textures that never repeat with quantum-level precision.',
    detailedDescription: 'Fractal Delay reimagines what a delay plugin can be. Instead of simple repeats, it generates infinitely evolving rhythmic patterns using fractal mathematics and neural networks. Each tap becomes part of a larger recursive network that creates organic, musical complexity. The AI pattern generator learns from your input and suggests variations that complement your music. With up to 128 delay taps, modulation on every parameter, and surgical filtering, you can create everything from subtle doubling to complex rhythmic soundscapes. The tempo-sync engine locks perfectly to your DAW while maintaining pristine audio quality.',
    price: 129,
    gradient: 'from-[#8B6F47] via-[#1B6B5A] to-[#5A4030]',
    glowColor: 'bronze',
    lemonSqueezyVariantId: '12345678-1234-1234-1234-123456789013', // ← Lemon Squeezy Variant UUID
    features: ['Neural Pattern Gen', 'Recursive Networks', 'Infinite Variations', '128 Delay Taps', 'Modulation Matrix', 'Smart Sync'],
    specs: {
      formats: ['VST3', 'AU', 'AAX'],
      platforms: ['macOS', 'Windows'],
      cpuUsage: '< 8% (average)',
      latency: '0ms',
      resolution: 'Up to 192kHz / 32-bit'
    },
    useCases: [
      {
        title: 'Rhythmic Production',
        description: 'Generate complex polyrhythmic delays that lock perfectly to your tempo and evolve over time.'
      },
      {
        title: 'Ambient Textures',
        description: 'Create lush, evolving soundscapes with delays that never repeat the same pattern twice.'
      },
      {
        title: 'Guitar & Keys',
        description: 'From classic slapback to otherworldly textures, perfect for melodic instruments.'
      },
      {
        title: 'Drum Processing',
        description: 'Add movement and complexity to percussion with intelligent rhythmic delays.'
      }
    ],
    testimonials: [
      {
        name: 'David Park',
        role: 'Techno Producer',
        quote: 'The pattern generator is pure magic. It creates delays that sound hand-programmed but would take hours manually.',
        rating: 5
      },
      {
        name: 'Emily Watson',
        role: 'Ambient Artist',
        quote: 'I use Fractal Delay on literally everything now. The textures it creates are impossible to replicate elsewhere.',
        rating: 5
      },
      {
        name: 'Tom Anderson',
        role: 'Session Guitarist',
        quote: 'Finally, a delay that\'s musical and inspiring. The modulation options are incredibly deep.',
        rating: 5
      }
    ],
    relatedPlugins: ['quantum-reverb', 'plasma-distortion']
  },
  {
    id: 'spectral-gate',
    name: 'SPECTRAL GATE',
    tagline: 'Frequency Sculptor',
    description: 'Neural-powered frequency gate with 4096-band resolution. Surgical precision meets creative chaos in a visual frequency playground.',
    detailedDescription: 'Spectral Gate gives you unprecedented control over your frequency spectrum. With 4096 individual frequency bands, you can sculpt sound with surgical precision impossible with traditional EQs. The neural learning mode analyzes your audio and automatically creates gates that remove noise, isolate elements, or create rhythmic spectral effects. Draw custom shapes, use AI suggestions, or let the beat-reactive mode create evolving patterns synced to your music. The visual spectrum display shows you exactly what\'s happening in real-time with stunning clarity. From cleaning up recordings to creating abstract glitch effects, Spectral Gate is the ultimate frequency manipulation tool.',
    price: 99,
    gradient: 'from-[#1B6B5A] via-[#2A8A72] to-[#C49A6C]',
    glowColor: 'forest',
    lemonSqueezyVariantId: '12345678-1234-1234-1234-123456789014', // ← Lemon Squeezy Variant UUID
    features: ['4096-Band Resolution', 'AI Learning Mode', 'Visual Spectrum', 'Beat Reactive', 'Custom Shapes', 'Zero Artifacts'],
    specs: {
      formats: ['VST3', 'AU', 'AAX'],
      platforms: ['macOS', 'Windows'],
      cpuUsage: '< 12% (average)',
      latency: '0ms',
      resolution: 'Up to 192kHz / 32-bit'
    },
    useCases: [
      {
        title: 'Noise Removal',
        description: 'Surgically remove unwanted frequencies from recordings with AI-assisted precision.'
      },
      {
        title: 'Creative Gating',
        description: 'Create rhythmic spectral effects that dance with your music in ways impossible with traditional gates.'
      },
      {
        title: 'Mix Cleanup',
        description: 'Carve out frequency space between instruments for crystal-clear mixes.'
      },
      {
        title: 'Sound Design',
        description: 'Transform any sound into something completely new with extreme spectral manipulation.'
      }
    ],
    testimonials: [
      {
        name: 'Lisa Martinez',
        role: 'Mastering Engineer',
        quote: 'Spectral Gate solved problems I\'ve been fighting for years. The precision is unmatched.',
        rating: 5
      },
      {
        name: 'Ryan Foster',
        role: 'EDM Producer',
        quote: 'The beat-reactive mode is insane. Creates effects I\'ve never heard anywhere else.',
        rating: 5
      },
      {
        name: 'Nina Patel',
        role: 'Post-Production',
        quote: 'Essential tool for dialogue cleanup. Removes noise without touching the voice. Pure magic.',
        rating: 5
      }
    ],
    relatedPlugins: ['quantum-reverb', 'plasma-distortion']
  },
  {
    id: 'plasma-distortion',
    name: 'PLASMA DISTORTION',
    tagline: 'Harmonic Destroyer',
    description: 'Quantum harmonic generator with modular waveshaping. From subtle analog warmth to complete sonic annihilation with pristine clarity.',
    detailedDescription: 'Plasma Distortion is a completely new approach to saturation and distortion. Using quantum waveshaping algorithms and modular signal routing, it generates harmonics that enhance rather than destroy your audio. Choose from dozens of distortion algorithms—from vintage tube warmth to digital destruction—and chain them in any order. The AI harmonic analyzer shows you exactly what harmonics are being added and suggests settings for your material. With per-band processing, you can distort different frequencies independently, keeping low end clean while destroying highs. Zero aliasing and pristine oversampling ensure professional results even at extreme settings.',
    price: 79,
    gradient: 'from-[#B8936D] via-[#C49A6C] to-[#7A5535]',
    glowColor: 'gold',
    lemonSqueezyVariantId: '12345678-1234-1234-1234-123456789015', // ← Lemon Squeezy Variant UUID
    features: ['Quantum Waveshaping', 'Analog Modeling', 'Zero Artifacts', 'Modular Routing', 'Per-Band Processing', 'AI Harmonics'],
    specs: {
      formats: ['VST3', 'AU', 'AAX'],
      platforms: ['macOS', 'Windows'],
      cpuUsage: '< 6% (average)',
      latency: '0ms',
      resolution: 'Up to 192kHz / 32-bit'
    },
    useCases: [
      {
        title: 'Mastering Warmth',
        description: 'Add subtle analog character and glue to your master bus without any harshness.'
      },
      {
        title: 'Bass Enhancement',
        description: 'Generate rich harmonics that make bass audible on small speakers without losing power.'
      },
      {
        title: 'Aggressive Distortion',
        description: 'Destroy sounds completely while maintaining clarity and definition.'
      },
      {
        title: 'Parallel Processing',
        description: 'Blend clean and distorted signals for perfect balance between power and precision.'
      }
    ],
    testimonials: [
      {
        name: 'Alex Johnson',
        role: 'Rock Producer',
        quote: 'Best guitar distortion plugin ever made. The analog modeling is scary accurate.',
        rating: 5
      },
      {
        name: 'Chris Lee',
        role: 'Bass Player',
        quote: 'My bass has never sounded so huge. The per-band processing keeps everything tight.',
        rating: 5
      },
      {
        name: 'Sophia Turner',
        role: 'Experimental Artist',
        quote: 'I can finally get extreme distortion without it sounding like garbage. The zero-artifact claim is real.',
        rating: 5
      }
    ],
    relatedPlugins: ['fractal-delay', 'spectral-gate']
  }
];

export function getPluginById(id: string): Plugin | undefined {
  return pluginsData.find(p => p.id === id);
}

export function getRelatedPlugins(pluginId: string): Plugin[] {
  const plugin = getPluginById(pluginId);
  if (!plugin) return [];
  return plugin.relatedPlugins
    .map(id => getPluginById(id))
    .filter((p): p is Plugin => p !== undefined);
}