/**
 * PluginComparisonTable — Side-by-side feature comparison
 * Helps buyers decide which plugin(s) they need first
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { siteConfig } from '@/app/config/siteConfig';

const plugins = [
  {
    id: 'quantum-reverb',
    name: 'QUANTUM\nREVERB',
    shortName: 'REVERB',
    price: 149,
    tagline: 'Infinite Space Generator',
    accentColor: '#C49A6C',
    accentRGB: '196,154,108',
    badge: 'Most Popular',
    bestFor: 'Film · Ambient · Vocals',
  },
  {
    id: 'fractal-delay',
    name: 'FRACTAL\nDELAY',
    shortName: 'DELAY',
    price: 129,
    tagline: 'Time Manipulation Engine',
    accentColor: '#1B6B5A',
    accentRGB: '27,107,90',
    badge: null,
    bestFor: 'Electronic · Rhythm · Guitar',
  },
  {
    id: 'spectral-gate',
    name: 'SPECTRAL\nGATE',
    shortName: 'GATE',
    price: 99,
    tagline: 'Frequency Sculptor',
    accentColor: '#2A8A72',
    accentRGB: '42,138,114',
    badge: null,
    bestFor: 'Mastering · Mixing · Post',
  },
  {
    id: 'plasma-distortion',
    name: 'PLASMA\nDIST.',
    shortName: 'DIST.',
    price: 79,
    tagline: 'Harmonic Destroyer',
    accentColor: '#B8936D',
    accentRGB: '184,147,109',
    badge: 'Best Entry',
    bestFor: 'Bass · Synths · Rock',
  },
];

type FeatureValue = boolean | string;

interface FeatureRow {
  category: string;
  label: string;
  values: FeatureValue[];
  highlight?: boolean;
}

const featureRows: FeatureRow[] = [
  // General
  { category: 'General', label: 'Zero Latency Processing', values: [true, true, true, true] },
  { category: 'General', label: 'Up to 192kHz / 32-bit', values: [true, true, true, true] },
  { category: 'General', label: 'VST3 · AU · AAX', values: [true, true, true, true] },
  { category: 'General', label: 'Lifetime Free Updates', values: [true, true, true, true] },
  { category: 'General', label: 'Offline Activation', values: [true, true, true, true] },

  // AI / Engine
  { category: 'AI Engine', label: 'Neural AI Processing', values: [true, true, true, true], highlight: true },
  { category: 'AI Engine', label: 'AI Space Morphing', values: [true, false, false, false] },
  { category: 'AI Engine', label: 'Neural Pattern Generator', values: [false, true, false, false] },
  { category: 'AI Engine', label: 'AI Learning Mode', values: [false, false, true, false] },
  { category: 'AI Engine', label: 'AI Harmonic Analyzer', values: [false, false, false, true] },

  // Unique per plugin
  { category: 'Unique', label: '∞ Reverb Tail', values: [true, false, false, false], highlight: true },
  { category: 'Unique', label: '4K+ IR Library', values: [true, false, false, false] },
  { category: 'Unique', label: '128 Delay Taps', values: [false, true, false, false], highlight: true },
  { category: 'Unique', label: 'Recursive Networks', values: [false, true, false, false] },
  { category: 'Unique', label: '4096-Band Precision', values: [false, false, true, false], highlight: true },
  { category: 'Unique', label: 'Beat-Reactive Mode', values: [false, false, true, false] },
  { category: 'Unique', label: 'Quantum Waveshaping', values: [false, false, false, true], highlight: true },
  { category: 'Unique', label: 'Per-Band Processing', values: [false, false, false, true] },

  // Use Case
  { category: 'Best For', label: 'Cinematic / Film Scoring', values: ['★★★', '★★', '★★', '★'] },
  { category: 'Best For', label: 'Electronic / Dance Music', values: ['★★', '★★★', '★★', '★★'] },
  { category: 'Best For', label: 'Mix & Master Engineers', values: ['★★', '★', '★★★', '★★★'] },
  { category: 'Best For', label: 'Rock / Guitar Production', values: ['★', '★★', '★', '★★★'] },
];

const categories = Array.from(new Set(featureRows.map(r => r.category)));

function CellValue({ val, accentColor, accentRGB }: { val: FeatureValue; accentColor: string; accentRGB: string }) {
  if (typeof val === 'string') {
    return (
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: `rgba(${accentRGB},0.75)`,
        letterSpacing: '0.05em',
      }}>
        {val}
      </span>
    );
  }
  if (val === true) {
    return <Check size={14} color={`rgba(${accentRGB},0.8)`} strokeWidth={2.5} />;
  }
  return <Minus size={12} color="rgba(255,255,255,0.1)" strokeWidth={1.5} />;
}

export default function PluginComparisonTable() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleAccessRequest = (pluginId: string) => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent(`Plugin access request - ${pluginId}`)}`;
  };

  return (
    <section data-buildout-section="plugin-comparison" style={{ position: 'relative', background: '#1E1B16', overflow: 'hidden' }}>
      {/* Ambient */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(196,154,108,0.025) 0%, transparent 65%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '10vh', paddingBottom: '10vh', paddingLeft: '7vw', paddingRight: '7vw' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          style={{ marginBottom: '5vh' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ width: 28, height: 1, background: 'rgba(196,154,108,0.4)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.4)',
            }}>
              Find Your Instrument
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-ui)', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                letterSpacing: '-0.022em', color: '#FEFCF9', lineHeight: 0.9,
              }}>
                Which plugin do
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(1.7rem, 3.4vw, 3.2rem)',
                backgroundImage: 'linear-gradient(110deg, #C49A6C, #EDD4A4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                lineHeight: 0.95,
              }}>
                you need first?
              </span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300,
              fontSize: '0.9rem', color: 'rgba(224,213,197,0.62)',
              lineHeight: 1.7, maxWidth: '38ch', margin: 0,
            }}>
              Compare the system without pretending checkout is live. Each instrument has a defined role, and sales requests route through contact until launch infrastructure is connected.
            </p>
          </div>
        </motion.div>

        {/* ── Category filter pills ── */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[{ key: null, label: 'All Features' }, ...categories.map(c => ({ key: c, label: c }))].map(({ key, label }) => (
            <button
              key={String(key)}
              onClick={() => setActiveCategory(key)}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: activeCategory === key ? '#C49A6C' : 'rgba(224,213,197,0.35)',
                border: `1px solid ${activeCategory === key ? 'rgba(196,154,108,0.4)' : 'rgba(255,255,255,0.07)'}`,
                background: activeCategory === key ? 'rgba(196,154,108,0.08)' : 'transparent',
                padding: '6px 14px',
                borderRadius: 6,
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            border: '1px solid rgba(196,154,108,0.1)',
            borderRadius: 4, overflow: 'hidden',
            overflowX: 'auto',
          }}
        >
          {/* Plugin header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(4, minmax(120px, 1fr))',
            background: 'rgba(0,0,0,0.4)',
            borderBottom: '1px solid rgba(196,154,108,0.1)',
            minWidth: 640,
          }}>
            <div style={{ padding: '1.2rem 1.6rem' }} />
            {plugins.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: '1.2rem 1rem',
                  textAlign: 'center',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                  position: 'relative',
                }}
              >
                {/* Top accent per plugin */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `rgba(${p.accentRGB},0.6)`,
                }} />
                {p.badge && (
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: `rgba(${p.accentRGB},0.7)`,
                    border: `1px solid rgba(${p.accentRGB},0.2)`,
                    padding: '2px 7px',
                    display: 'inline-block',
                    marginBottom: '0.5rem',
                  }}>
                    {p.badge}
                  </div>
                )}
                <div style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 700,
                  fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: `rgba(${p.accentRGB},0.9)`,
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                }}>
                  {p.shortName}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: '0.72rem', color: `rgba(${p.accentRGB},0.5)`,
                  marginTop: 4,
                }}>
                  Contact
                </div>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ minWidth: 640 }}
            >
              {categories
                .filter(cat => !activeCategory || cat === activeCategory)
                .map((cat) => (
                  <div key={cat}>
                    {/* Category header */}
                    <div style={{
                      padding: '0.55rem 1.6rem',
                      background: 'rgba(196,154,108,0.03)',
                      borderTop: '1px solid rgba(196,154,108,0.06)',
                      borderBottom: '1px solid rgba(196,154,108,0.06)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                        letterSpacing: '0.32em', textTransform: 'uppercase',
                        color: 'rgba(196,154,108,0.35)',
                      }}>
                        {cat}
                      </span>
                    </div>

                    {featureRows
                      .filter(r => r.category === cat)
                      .map((row, ri) => (
                        <div
                          key={row.label}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr repeat(4, minmax(120px, 1fr))',
                            borderBottom: '1px solid rgba(255,255,255,0.035)',
                            background: row.highlight ? 'rgba(196,154,108,0.018)' : 'transparent',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,154,108,0.035)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = row.highlight ? 'rgba(196,154,108,0.018)' : 'transparent'; }}
                        >
                          <div style={{ padding: '0.85rem 1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            {row.highlight && <div style={{ width: 2, height: 12, background: 'rgba(196,154,108,0.4)', flexShrink: 0 }} />}
                            <span style={{
                              fontFamily: 'var(--font-body)', fontWeight: row.highlight ? 400 : 300,
                              fontSize: '0.82rem',
                              color: row.highlight ? 'rgba(224,213,197,0.88)' : 'rgba(224,213,197,0.62)',
                            }}>
                              {row.label}
                            </span>
                          </div>
                          {plugins.map((p, pi) => (
                            <div
                              key={p.id}
                              style={{
                                padding: '0.85rem 1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderLeft: '1px solid rgba(255,255,255,0.03)',
                              }}
                            >
                              <CellValue val={row.values[pi]} accentColor={p.accentColor} accentRGB={p.accentRGB} />
                            </div>
                          ))}
                        </div>
                      ))}
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Buy row ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(4, minmax(120px, 1fr))',
            background: 'rgba(0,0,0,0.4)',
            borderTop: '1px solid rgba(196,154,108,0.12)',
            minWidth: 640,
          }}>
            <div style={{ padding: '1.4rem 1.6rem', display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.58)',
              }}>
                Contact Fallback | No Subscription
              </span>
            </div>
            {plugins.map((p) => (
              <div
                key={p.id}
                style={{
                  padding: '1.4rem 0.8rem',
                  borderLeft: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                }}
              >
                <motion.button
                  onClick={() => handleAccessRequest(p.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    cursor: 'pointer',
                    border: `1px solid rgba(${p.accentRGB},0.45)`,
                    background: `rgba(${p.accentRGB},0.1)`,
                    borderRadius: 6,
                    padding: '8px 12px',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    width: '100%', justifyContent: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: p.accentColor,
                  }}>
                    Contact
                  </span>
                </motion.button>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.50)', textAlign: 'center',
                }}>
                  {p.bestFor}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bundle nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '2rem',
            padding: '1.2rem 1.8rem',
            border: '1px solid rgba(196,154,108,0.15)',
            background: 'linear-gradient(110deg, rgba(196,154,108,0.04) 0%, rgba(196,154,108,0.07) 50%, rgba(196,154,108,0.04) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', color: 'rgba(224,213,197,0.55)' }}>
              Can't decide? The Complete Bundle saves you{' '}
            </span>
            <span style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem',
              backgroundImage: 'linear-gradient(110deg, #C49A6C, #EDD4A4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              $107 (23% off)
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', color: 'rgba(224,213,197,0.55)' }}>
              {' '}vs buying individually.
            </span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.45)',
            border: '1px solid rgba(196,154,108,0.2)',
            padding: '6px 16px',
            whiteSpace: 'nowrap',
          }}>
            Bundle · $349 →
          </div>
        </motion.div>

      </div>
    </section>
  );
}
