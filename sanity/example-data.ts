/**
 * DATOS DE EJEMPLO PARA POBLAR SANITY
 * 
 * Copia estos datos al crear contenido en el panel de Sanity.
 * Puedes importarlos o crearlos manualmente.
 */

// ─────────────────────────────────────────────────────────
// SETTINGS (Singleton — solo crea UNO)
// ─────────────────────────────────────────────────────────
export const SETTINGS_EXAMPLE = {
  bundlePrice: 349,
  bundleLemonsqueezyUrl: 'https://sci-fi-electronics.lemonsqueezy.com/checkout/buy/bundle',
  
  promoBarEnabled: true,
  promoBarText: 'Limited Time — Complete Bundle $349 · Save $107',
  
  heroHeadline: 'Audio Beyond Reality.',
  heroSubheadline: 'Four neural-powered instruments that don\'t process sound — they reimagine it.',
  
  supportEmail: 'support@sci-fi-electronics.com',
  salesEmail: 'sales@sci-fi-electronics.com',
  
  socialLinks: {
    instagram: 'https://instagram.com/scifielectronics',
    twitter: 'https://twitter.com/scifielectronics',
    youtube: 'https://youtube.com/@scifielectronics',
    discord: 'https://discord.gg/scifielectronics',
  },
  
  siteTitle: 'SCI-FI ELECTRONICS — Neural Audio Instruments',
  siteDescription: 'Four neural-powered audio plugins that reimagine sound processing: Quantum Reverb, Fractal Delay, Spectral Gate, and Plasma Distortion.',
}

// ─────────────────────────────────────────────────────────
// PLUGINS
// ─────────────────────────────────────────────────────────

export const PLUGINS_EXAMPLE = [
  {
    // ── QUANTUM REVERB ───────────────────────────
    id: { current: 'quantum-reverb' },
    name: 'QUANTUM REVERB',
    serial: '01',
    category: 'REVERB',
    price: 149,
    badge: 'MOST POPULAR',
    
    tagline: 'Infinite Space Generator',
    description: 'Neural convolution engine that models acoustic spaces beyond physical reality. Generate reverbs that never existed — from intimate whispers to infinite voids.',
    
    visual: 'reverb',
    accentColor: '#C49A6C',
    accentRGB: '196,154,108',
    
    keyFeatures: [
      'AI Space Morphing',
      '∞ Reverb Tail',
      '0ms Latency',
      'Neural Convolution',
      '4K+ IR Library',
      'Smart Duck Mode'
    ],
    
    specs: [
      { label: 'LATENCY', value: '0 ms' },
      { label: 'SR', value: '192kHz' },
      { label: 'BANDS', value: '∞' }
    ],
    
    formats: ['VST3', 'AU', 'AAX'],
    
    // URLs (reemplaza con las reales)
    lemonsqueezyUrl: 'https://sci-fi-electronics.lemonsqueezy.com/checkout/buy/quantum-reverb',
    downloadLinks: {
      macOS: 'https://your-cdn.com/quantum-reverb-mac.zip',
      windows: 'https://your-cdn.com/quantum-reverb-win.zip'
    },
    
    featured: true,
    order: 1
  },
  
  {
    // ── FRACTAL DELAY ───────────────────────────
    id: { current: 'fractal-delay' },
    name: 'FRACTAL DELAY',
    serial: '02',
    category: 'DELAY',
    price: 129,
    
    tagline: 'Time Manipulation Engine',
    description: 'Recursive delay network with AI-powered pattern generation. Each tap becomes part of a larger network following golden-ratio mathematics.',
    
    visual: 'delay',
    accentColor: '#1B6B5A',
    accentRGB: '27,107,90',
    
    keyFeatures: [
      'Recursive Networks',
      '128 Delay Taps',
      'Smart DAW Sync',
      'Polyrhythmic Grid',
      'Golden Ratio Math',
      'Zero Artifacts'
    ],
    
    specs: [
      { label: 'TAPS', value: '128' },
      { label: 'SR', value: '192kHz' },
      { label: 'SYNC', value: 'BPM' }
    ],
    
    formats: ['VST3', 'AU', 'AAX'],
    
    lemonsqueezyUrl: 'https://sci-fi-electronics.lemonsqueezy.com/checkout/buy/fractal-delay',
    downloadLinks: {
      macOS: 'https://your-cdn.com/fractal-delay-mac.zip',
      windows: 'https://your-cdn.com/fractal-delay-win.zip'
    },
    
    featured: true,
    order: 2
  },
  
  {
    // ── SPECTRAL GATE ───────────────────────────
    id: { current: 'spectral-gate' },
    name: 'SPECTRAL GATE',
    serial: '03',
    category: 'GATE',
    price: 99,
    
    tagline: 'Frequency Sculptor',
    description: '4096-band precision gate that learns your audio\'s natural rhythm. Surgical frequency control with AI learning mode.',
    
    visual: 'gate',
    accentColor: '#2A8A72',
    accentRGB: '42,138,114',
    
    keyFeatures: [
      '4096-Band Precision',
      'AI Learning Mode',
      'Beat Reactive',
      'Multi-Band Sidechain',
      'Spectral Analysis',
      'Zero Phase Shift'
    ],
    
    specs: [
      { label: 'BANDS', value: '4096' },
      { label: 'SR', value: '192kHz' },
      { label: 'ATTACK', value: '<1ms' }
    ],
    
    formats: ['VST3', 'AU', 'AAX'],
    
    lemonsqueezyUrl: 'https://sci-fi-electronics.lemonsqueezy.com/checkout/buy/spectral-gate',
    downloadLinks: {
      macOS: 'https://your-cdn.com/spectral-gate-mac.zip',
      windows: 'https://your-cdn.com/spectral-gate-win.zip'
    },
    
    featured: false,
    order: 3
  },
  
  {
    // ── PLASMA DISTORTION ───────────────────────────
    id: { current: 'plasma-distortion' },
    name: 'PLASMA DISTORTION',
    serial: '04',
    category: 'DIST.',
    price: 79,
    badge: 'BEST ENTRY',
    
    tagline: 'Harmonic Destroyer',
    description: '24 waveshaping algorithms with per-band processing. Zero artifacts, infinite harmonics, pure analog warmth in digital precision.',
    
    visual: 'distortion',
    accentColor: '#B8936D',
    accentRGB: '184,147,109',
    
    keyFeatures: [
      'Quantum Waveshaping',
      'Zero Artifacts',
      'Per-Band Processing',
      '24 Algorithms',
      'Analog Modeling',
      'Dynamic Saturation'
    ],
    
    specs: [
      { label: 'ALGO', value: '24' },
      { label: 'SR', value: '192kHz' },
      { label: 'BITS', value: '32f' }
    ],
    
    formats: ['VST3', 'AU', 'AAX'],
    
    lemonsqueezyUrl: 'https://sci-fi-electronics.lemonsqueezy.com/checkout/buy/plasma-distortion',
    downloadLinks: {
      macOS: 'https://your-cdn.com/plasma-distortion-mac.zip',
      windows: 'https://your-cdn.com/plasma-distortion-win.zip'
    },
    
    featured: false,
    order: 4
  }
]

// ─────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────

export const TESTIMONIALS_EXAMPLE = [
  {
    author: 'Marcus Chen',
    role: 'Sound Designer',
    credential: 'Early Access Beta',
    plugin: 'QUANTUM REVERB',
    pluginColor: '#C49A6C',
    pluginRGB: '196,154,108',
    quote: 'Quantum Reverb is the only plugin in ten years of scoring that genuinely surprised me. The AI morphing creates spaces I couldn\'t automate manually in a month. It changed how I approach spatial production entirely.',
    rating: 5,
    featured: true,
    order: 1
  },
  {
    author: 'Sofia Rodriguez',
    role: 'Electronic Producer',
    credential: 'Cliente desde 2024',
    plugin: 'FRACTAL DELAY',
    pluginColor: '#1B6B5A',
    pluginRGB: '27,107,90',
    quote: 'Fractal Delay broke my creative block. The recursive patterns are mathematical poetry. I built an entire EP around this plugin — it\'s not an effect, it\'s an instrument.',
    rating: 5,
    featured: true,
    order: 2
  },
  {
    author: 'Alex Novak',
    role: 'Mixing Engineer',
    credential: 'Professional User',
    plugin: 'SPECTRAL GATE',
    pluginColor: '#2A8A72',
    pluginRGB: '42,138,114',
    quote: 'Spectral Gate replaced three plugins in my chain. The 4096-band precision is surgical — I can shape transients without touching phase. Game changer for drum processing.',
    rating: 5,
    featured: true,
    order: 3
  }
]

// ─────────────────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────────────────

export const FAQS_EXAMPLE = [
  // ── PRODUCTO ───────────────────────────────
  {
    question: 'What formats are included?',
    answer: 'All plugins include VST3, AU, and AAX formats for both macOS and Windows.',
    category: 'product',
    order: 1
  },
  {
    question: 'How many computers can I install on?',
    answer: 'Each license allows activation on up to 3 computers simultaneously. You can deactivate and reactivate as needed.',
    category: 'product',
    order: 2
  },
  {
    question: 'Do I get free updates?',
    answer: 'Yes. All future updates within the same major version are free forever. No subscriptions.',
    category: 'product',
    order: 3
  },
  
  // ── TÉCNICO ───────────────────────────────
  {
    question: 'What are the system requirements?',
    answer: 'macOS 11 Big Sur or later / Windows 10 64-bit or later. 8GB RAM minimum, 16GB recommended. Compatible with all major DAWs.',
    category: 'technical',
    order: 1
  },
  {
    question: 'Is there a demo version?',
    answer: 'We offer audio demos on each product page. Due to the nature of digital products, we don\'t offer trial versions, but we have a 30-Day Defect Guarantee.',
    category: 'technical',
    order: 2
  },
  
  // ── COMPRA ───────────────────────────────
  {
    question: 'Which payment methods are accepted?',
    answer: 'We accept all major credit cards, PayPal, and local payment methods through our secure payment processor Lemon Squeezy.',
    category: 'purchase',
    order: 1
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes. All payments are processed by Lemon Squeezy, a certified payment processor. We never see or store your payment information.',
    category: 'purchase',
    order: 2
  },
  
  // ── GARANTÍA ───────────────────────────────
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-Day Defect Guarantee. If the plugin doesn\'t work as specified on your compatible system after technical support, we\'ll issue a full refund within 30 days of purchase.',
    category: 'warranty',
    order: 1
  },
  
  // ── COMPATIBILIDAD ───────────────────────────────
  {
    question: 'Does it work with my DAW?',
    answer: 'Our plugins work with all major DAWs: Ableton Live, Logic Pro, FL Studio, Cubase, Studio One, Pro Tools, Reaper, Bitwig, and more.',
    category: 'compatibility',
    order: 1
  }
]
