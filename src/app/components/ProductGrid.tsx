/**
 * ProductGrid — ultra-premium showcase
 * 4 instrument cards con spec strips técnicas, ambient glow,
 * hover states profundos y bundle banner editorial.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PluginVisual, { type PluginVisualVariant } from '@/app/components/visuals/PluginVisual';
import { Shield, ArrowUpRight, Cpu, Zap, Layers } from 'lucide-react';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import GoldCTAButton from '@/app/components/GoldCTAButton';
import { siteConfig } from '@/app/config/siteConfig';

const products = [
  {
    id: 'quantum-reverb',
    serial: '01', category: 'REVERB',
    name: 'QUANTUM\nREVERB',
    nameFlat: 'QUANTUM REVERB',
    tagline: 'Infinite Space Generator',
    description: 'Neural convolution engine that models acoustics beyond physical reality.',
    price: 149,
    visual: 'reverb' as PluginVisualVariant,
    accentColor: '#C49A6C',
    accentRGB: '196,154,108',
    keyFeats: ['AI Space Morphing', '∞ Reverb Tail', '0ms Latency', 'Neural Convolution'],
    specs: [{ label: 'LATENCY', value: '0 ms' }, { label: 'SR', value: '192kHz' }, { label: 'BANDS', value: '∞' }],
    formats: ['VST3', 'AU', 'AAX'],
    badge: 'MOST POPULAR',
  },
  {
    id: 'fractal-delay',
    serial: '02', category: 'DELAY',
    name: 'FRACTAL\nDELAY',
    nameFlat: 'FRACTAL DELAY',
    tagline: 'Time Manipulation Engine',
    description: 'Recursive delay networks that evolve with every repetition.',
    price: 129,
    visual: 'delay' as PluginVisualVariant,
    accentColor: '#1B6B5A',
    accentRGB: '27,107,90',
    keyFeats: ['Recursive Networks', '128 Delay Taps', 'Smart DAW Sync', 'Polyrhythmic Grid'],
    specs: [{ label: 'TAPS', value: '128' }, { label: 'SR', value: '192kHz' }, { label: 'SYNC', value: 'BPM' }],
    formats: ['VST3', 'AU', 'AAX'],
    badge: null,
  },
  {
    id: 'spectral-gate',
    serial: '03', category: 'GATE',
    name: 'SPECTRAL\nGATE',
    nameFlat: 'SPECTRAL GATE',
    tagline: 'Frequency Sculptor',
    description: '4096-band precision gate that learns your audio\'s natural rhythm.',
    price: 99,
    visual: 'gate' as PluginVisualVariant,
    accentColor: '#2A8A72',
    accentRGB: '42,138,114',
    keyFeats: ['4096-Band Precision', 'AI Learning Mode', 'Beat Reactive', 'Multi-Band Sidechain'],
    specs: [{ label: 'BANDS', value: '4096' }, { label: 'SR', value: '192kHz' }, { label: 'ATTACK', value: '<1ms' }],
    formats: ['VST3', 'AU', 'AAX'],
    badge: null,
  },
  {
    id: 'plasma-distortion',
    serial: '04', category: 'DIST.',
    name: 'PLASMA\nDISTORTION',
    nameFlat: 'PLASMA DISTORTION',
    tagline: 'Harmonic Destroyer',
    description: '24 waveshaping algorithms with per-band processing and zero artifacts.',
    price: 79,
    visual: 'distortion' as PluginVisualVariant,
    accentColor: '#B8936D',
    accentRGB: '184,147,109',
    keyFeats: ['Quantum Waveshaping', 'Zero Artifacts', 'Per-Band Processing', '24 Algorithms'],
    specs: [{ label: 'ALGO', value: '24' }, { label: 'SR', value: '192kHz' }, { label: 'BITS', value: '32f' }],
    formats: ['VST3', 'AU', 'AAX'],
    badge: 'BEST ENTRY',
  },
];

const BUNDLE_PRICE = 349;
const INDIVIDUAL   = products.reduce((s, p) => s + p.price, 0);
const SAVINGS      = INDIVIDUAL - BUNDLE_PRICE;
const SAVINGS_PCT  = Math.round((SAVINGS / INDIVIDUAL) * 100);

// ─── Spec strip icons ───────────────────────────────────────────
const SPEC_ICONS = [Cpu, Zap, Layers];

// ─── Single card ───────────────────────────────────────────────
function ProductCard({ p, i }: { p: typeof products[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  const handleAccessRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent(`Access request - ${p.nameFlat}`)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: i * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: hovered ? `rgba(${p.accentRGB},0.04)` : 'rgba(27,23,17,0.98)',
        borderRight: i < 3 ? '1px solid rgba(255,255,255,0.042)' : 'none',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.5s ease',
      }}
    >
      {/* Top accent hairline */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.5, scaleX: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.45 }}
        style={{
          height: 1, transformOrigin: 'center',
          background: `linear-gradient(90deg, transparent, rgba(${p.accentRGB},0.9) 35%, rgba(${p.accentRGB},1) 50%, rgba(${p.accentRGB},0.9) 65%, transparent)`,
        }}
      />

      {/* Ambient glow above visual */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '55%',
          background: `radial-gradient(ellipse at 50% 0%, rgba(${p.accentRGB},0.14) 0%, transparent 68%)`,
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Badge */}
      {p.badge && (
        <div style={{
          position: 'absolute', top: 14, right: 12, zIndex: 5,
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: `rgba(${p.accentRGB},0.95)`,
          border: `1px solid rgba(${p.accentRGB},0.35)`,
          paddingTop: '3px', paddingBottom: '3px',
          paddingLeft: '8px', paddingRight: '8px',
          background: 'rgba(5,4,3,0.97)',
          backdropFilter: 'blur(16px)',
        }}>
          {p.badge}
        </div>
      )}

      {/* Visual area */}
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(0,0,0,0.18)' }}>

        {/* Serial + category tag */}
        <div style={{
          position: 'absolute', top: 13, left: 12, zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: `rgba(${p.accentRGB},0.65)`,
          background: 'rgba(4,3,2,0.88)',
          backdropFilter: 'blur(14px)',
          paddingTop: '3px', paddingBottom: '3px',
          paddingLeft: '8px', paddingRight: '8px',
          border: `1px solid rgba(${p.accentRGB},0.14)`,
        }}>
          {p.serial} · {p.category}
        </div>

        <PluginVisual variant={p.visual} size={330} />

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 96,
          background: `linear-gradient(to top, rgba(27,23,17,0.98) 0%, transparent 100%)`,
          pointerEvents: 'none', zIndex: 2,
        }} />
      </div>

      {/* ── Technical Spec Strip ── */}
      <div style={{
        display: 'flex', position: 'relative', zIndex: 2,
        borderTop: `1px solid rgba(${p.accentRGB},0.1)`,
        borderBottom: `1px solid rgba(${p.accentRGB},0.1)`,
        background: `rgba(${p.accentRGB},0.05)`,
      }}>
        {p.specs.map((spec, si) => {
          const Icon = SPEC_ICONS[si];
          return (
            <div
              key={spec.label}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                paddingTop: '0.75rem', paddingBottom: '0.75rem',
                borderRight: si < p.specs.length - 1 ? `1px solid rgba(${p.accentRGB},0.1)` : 'none',
                gap: 2,
              }}
            >
              <Icon size={9} color={`rgba(${p.accentRGB},0.35)`} strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
                letterSpacing: '-0.02em', lineHeight: 1,
                color: `rgba(${p.accentRGB},0.9)`,
                marginTop: 3,
              }}>
                {spec.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: `rgba(${p.accentRGB},0.35)`,
              }}>
                {spec.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div style={{
        paddingTop: '1.7rem', paddingRight: '1.7rem',
        paddingBottom: '2rem', paddingLeft: '1.7rem',
        display: 'flex', flexDirection: 'column', gap: '1.15rem', flex: 1,
        position: 'relative', zIndex: 2,
      }}>

        {/* Name + tagline */}
        <div>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontStyle: 'normal', fontWeight: 600,
            fontSize: 'clamp(1.1rem, 1.35vw, 1.38rem)',
            letterSpacing: '0.1em', lineHeight: 1.0,
            textTransform: 'uppercase',
            color: 'rgba(244,239,232,0.94)',
            whiteSpace: 'pre-line',
          }}>
            {p.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: `rgba(${p.accentRGB},0.58)`, marginTop: 8,
          }}>
            {p.tagline}
          </div>
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${p.accentRGB},0.2), rgba(${p.accentRGB},0.04) 60%, transparent)` }} />

        {/* Feature list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
          {p.keyFeats.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div style={{
                width: 16, height: 1, flexShrink: 0,
                background: `linear-gradient(90deg, rgba(${p.accentRGB},0.65), rgba(${p.accentRGB},0.1))`,
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem', letterSpacing: '0.01em',
                color: 'rgba(215,202,184,0.8)', fontWeight: 300,
              }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Format pills */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {p.formats.map(fmt => (
            <span key={fmt} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(${p.accentRGB},0.52)`,
              border: `1px solid rgba(${p.accentRGB},0.14)`,
              paddingTop: '2px', paddingBottom: '2px',
              paddingLeft: '7px', paddingRight: '7px',
            }}>
              {fmt}
            </span>
          ))}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.18)',
          }}>
            Win | Mac
          </span>
        </div>

        {/* Price + CTA row */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.6rem' }}>

          {/* Price */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '2.7rem', lineHeight: 1,
              color: p.accentColor, letterSpacing: '-0.02em',
            }}>
              ${p.price}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: `rgba(${p.accentRGB},0.38)`, marginTop: 4,
            }}>
              One-Time
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.45rem' }}>
            <GoldCTAButton
              onClick={handleAccessRequest}
              paddingTop="9px" paddingBottom="9px"
              paddingLeft="18px" paddingRight="18px"
              fontSize="0.58rem" letterSpacing="0.22em"
              borderRadius={1}
            >
              Request Access
            </GoldCTAButton>
            <Link
              to={`/plugins/${p.id}`}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: `rgba(${p.accentRGB},0.42)`, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.22rem',
                transition: 'color 0.22s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = `rgba(${p.accentRGB},0.82)`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = `rgba(${p.accentRGB},0.42)`}
            >
              Details <ArrowUpRight size={9} />
            </Link>
          </div>
        </div>

        {/* Trust line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: `rgba(${p.accentRGB},0.4)`, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: `rgba(${p.accentRGB},0.35)`,
          }}>
            Contact Fallback | Lifetime License
          </span>
        </div>

      </div>

      {/* Subtle bottom scan-line on hover */}
      <motion.div
        animate={{ opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${p.accentRGB},0.5) 40%, rgba(${p.accentRGB},0.5) 60%, transparent)`,
          pointerEvents: 'none', zIndex: 10,
        }}
      />
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────
export default function ProductGrid() {
  const isMobile = useIsMobile();

  const handleBundleRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent('Complete Signal Collection access request')}`;
  };

  return (
    <section data-buildout-section="product-grid" style={{ background: '#1E1B16', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient grid texture */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(196,154,108,0.013) 60px),
          repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(196,154,108,0.013) 60px)
        `,
        zIndex: 0,
      }} />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION HEADER — monumento tipográfico                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── TOP META STRIP ── index · label · specs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingLeft: '7vw', paddingRight: '7vw',
            paddingTop: '6vh', paddingBottom: '2.2rem',
          }}
        >
          {/* Left — index + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              letterSpacing: '0.04em', color: 'rgba(196,154,108,0.25)',
              lineHeight: 1,
            }}>02</span>
            <div style={{ width: 1, height: 16, background: 'rgba(196,154,108,0.18)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
              letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.38)',
            }}>The Instruments</span>
          </div>

          {/* Right — 3 key specs in a row */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '2.4rem', alignItems: 'center' }}>
              {[
                { v: '192kHz', l: 'Sample Rate' },
                { v: 'VST3 | AU | AAX', l: 'Formats' },
                { v: '0 ms', l: 'Latency' },
              ].map((s, i) => (
                <div key={s.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
                    letterSpacing: '0.04em', color: 'rgba(196,154,108,0.55)', lineHeight: 1,
                  }}>{s.v}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.36rem',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.22)',
                  }}>{s.l}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── ENTRY HAIRLINE — full width, anima desde la izquierda ── */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, transformOrigin: 'left',
            background: 'linear-gradient(90deg, rgba(196,154,108,0.35) 0%, rgba(196,154,108,0.10) 50%, transparent 100%)',
            marginLeft: '7vw', marginRight: '7vw',
          }}
        />

        {/* ── HEADLINE ARQUITECTÓNICO ── */}
        <div style={{
          paddingLeft: '7vw', paddingRight: '7vw',
          paddingTop: isMobile ? '2.4rem' : '3rem',
          paddingBottom: 0,
        }}>
          {isMobile ? (
            /* MOBILE — stacked simple */
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                lineHeight: 0.88, textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                fontSize: 'clamp(3rem, 13vw, 5rem)',
              }}
            >
              <span style={{
                display: 'block', fontWeight: 200,
                backgroundImage: 'linear-gradient(110deg, #4A3820 0%, #7A5F38 50%, #4A3820 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Signal</span>
              <span style={{
                display: 'block', fontWeight: 700,
                backgroundImage: 'linear-gradient(135deg, #5A5550 0%, #6E6860 50%, #5A5550 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>System</span>
              <span style={{
                display: 'block', fontWeight: 700,
                backgroundImage: 'linear-gradient(115deg, #8B6F47 0%, #C49A6C 35%, #E8D5B8 50%, #C49A6C 65%, #8B6F47 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Index.</span>
            </motion.h2>
          ) : (
            /* DESKTOP — headline + manifesto lado a lado */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '5vw', alignItems: 'end' }}>

              {/* Headline — escala máxima */}
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 0.86, textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  fontSize: 'clamp(5.5rem, 10.5vw, 12rem)',
                }}
              >
                <span style={{
                  display: 'block', fontWeight: 200,
                  backgroundImage: 'linear-gradient(110deg, #4A3820 0%, #7A5F38 50%, #4A3820 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Signal</span>
                <span style={{
                  display: 'block', fontWeight: 700,
                  backgroundImage: 'linear-gradient(135deg, #5A5550 0%, #6E6860 50%, #5A5550 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>System</span>
                <span style={{ display: 'block' }}>
                  <span style={{
                    fontWeight: 700,
                    backgroundImage: 'linear-gradient(115deg, #8B6F47 0%, #C49A6C 35%, #E8D5B8 50%, #C49A6C 65%, #8B6F47 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>Index.</span>
                </span>
              </motion.h2>

              {/* Right — manifesto + tagline system */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  alignSelf: 'end',
                  paddingBottom: '0.22em',
                  display: 'flex', flexDirection: 'column', gap: '1.4rem',
                  maxWidth: 260,
                }}
              >
                {/* Vertical accent line */}
                <div style={{
                  width: 1, height: 48,
                  background: 'linear-gradient(180deg, transparent, rgba(196,154,108,0.35) 40%, rgba(196,154,108,0.35) 60%, transparent)',
                  alignSelf: 'flex-start',
                }} />

                {/* Manifesto copy */}
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(0.85rem, 1.25vw, 1.12rem)',
                  letterSpacing: '0.01em',
                  color: 'rgba(220,210,193,0.55)',
                  lineHeight: 1.50,
                }}>
                  Space, time,<br />
                  spectrum and<br />
                  harmonic pressure.
                </p>

                {/* Stat cluster */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { v: '4', l: 'Instruments' },
                    { v: '$349', l: 'Full Bundle' },
                    { v: '∞', l: 'Updates' },
                  ].map(s => (
                    <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontWeight: 600,
                        fontSize: '1.15rem', letterSpacing: '-0.01em',
                        color: 'rgba(196,154,108,0.65)', lineHeight: 1,
                      }}>{s.v}</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                        letterSpacing: '0.28em', textTransform: 'uppercase',
                        color: 'rgba(196,154,108,0.28)',
                      }}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* ── PRODUCT INDEX STRIP — los 4 instrumentos como franja editorial ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: isMobile ? '2rem' : '2.8rem',
            paddingLeft: '7vw', paddingRight: '7vw',
          }}
        >
          {/* Hairline above strip */}
          <div style={{
            height: 1, marginBottom: '1.1rem',
            background: 'linear-gradient(90deg, rgba(196,154,108,0.14) 0%, rgba(196,154,108,0.05) 70%, transparent 100%)',
          }} />

          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.7rem' : 0,
            alignItems: isMobile ? 'flex-start' : 'center',
          }}>
            {products.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: 'flex', alignItems: 'center',
                  flex: isMobile ? undefined : 1,
                  gap: '0.8rem',
                  paddingRight: isMobile ? 0 : (i < products.length - 1 ? '0' : '0'),
                }}
              >
                {/* Product entry */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.65rem',
                  flex: 1,
                }}>
                  {/* Accent dot */}
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                    background: `rgba(${p.accentRGB},0.55)`,
                    boxShadow: `0 0 6px rgba(${p.accentRGB},0.35)`,
                  }} />
                  {/* Serial */}
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                    letterSpacing: '0.18em', color: `rgba(${p.accentRGB},0.35)`,
                  }}>
                    {p.serial}
                  </span>
                  {/* Name */}
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: isMobile ? '0.85rem' : 'clamp(0.75rem, 1.1vw, 0.96rem)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: `rgba(${p.accentRGB},0.65)`,
                    lineHeight: 1,
                  }}>
                    {p.nameFlat}
                  </span>
                </div>

                {/* Separator — solo entre items en desktop */}
                {!isMobile && i < products.length - 1 && (
                  <div style={{
                    width: 1, height: 18, flexShrink: 0,
                    background: 'rgba(196,154,108,0.10)',
                    marginLeft: '0.5rem', marginRight: '0.5rem',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Hairline below strip → bridge to cards */}
          <div style={{
            height: 1, marginTop: '1.1rem',
            background: 'linear-gradient(90deg, rgba(196,154,108,0.10) 0%, rgba(196,154,108,0.04) 70%, transparent 100%)',
          }} />
        </motion.div>

      </div>
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* END SECTION HEADER                                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* ── Plugin grid ── */}
      <div style={{ paddingLeft: '7vw', paddingRight: '7vw', position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 0 }}>
          {products.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
        </div>
      </div>

      {/* ── Bundle banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 1,
          marginTop: '5vh', marginRight: '7vw', marginBottom: '4vh', marginLeft: '7vw',
        }}
      >
        <div style={{
          border: '1px solid rgba(196,154,108,0.09)',
          background: 'rgba(196,154,108,0.02)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Top hairline shimmer */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.28) 35%, rgba(196,154,108,0.18) 65%, transparent)' }} />

          {/* Corner brackets */}
          {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(pos => {
            const [v, h] = pos.split('-') as ['top' | 'bottom', 'left' | 'right'];
            return (
              <div key={pos} style={{
                position: 'absolute',
                [v]: 9, [h]: 9,
                width: 10, height: 10,
                borderTop: v === 'top' ? '1px solid rgba(196,154,108,0.16)' : 'none',
                borderBottom: v === 'bottom' ? '1px solid rgba(196,154,108,0.16)' : 'none',
                borderLeft: h === 'left' ? '1px solid rgba(196,154,108,0.16)' : 'none',
                borderRight: h === 'right' ? '1px solid rgba(196,154,108,0.16)' : 'none',
              }} />
            );
          })}

          <div style={{
            paddingTop: 'clamp(1.6rem, 3vh, 2.4rem)',
            paddingBottom: 'clamp(1.6rem, 3vh, 2.4rem)',
            paddingLeft: 'clamp(1.6rem, 3.5vw, 3.2rem)',
            paddingRight: 'clamp(1.6rem, 3.5vw, 3.2rem)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.8rem',
          }}>

            {/* Left — title + chips */}
            <div style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '1rem' : 'clamp(1.4rem, 3.5vw, 3.5rem)',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.36em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.52)', marginBottom: 8,
                }}>
                  Complete Bundle - All 4 Instruments
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic', fontWeight: 300,
                    fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                    color: '#C49A6C', lineHeight: 1,
                  }}>
                    ${BUNDLE_PRICE}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'normal', fontWeight: 300,
                    fontSize: '1.05rem',
                    color: 'rgba(224,213,197,0.3)',
                    textDecoration: 'line-through', lineHeight: 1,
                  }}>
                    ${INDIVIDUAL}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(27,107,90,0.8)',
                    border: '1px solid rgba(27,107,90,0.2)',
                    paddingTop: '3px', paddingBottom: '3px',
                    paddingLeft: '10px', paddingRight: '10px',
                  }}>
                    Save ${SAVINGS} - {SAVINGS_PCT}% off
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {products.map(p => (
                  <div key={p.id} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: p.accentColor, opacity: 0.6,
                    border: `1px solid rgba(${p.accentRGB},0.18)`,
                    paddingTop: '3px', paddingBottom: '3px',
                    paddingLeft: '9px', paddingRight: '9px',
                  }}>
                    {p.category}
                  </div>
                ))}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(224,213,197,0.38)',
                }}>
                  VST3 | AU | AAX | Lifetime Updates
                </div>
              </div>
            </div>

            {/* Right — CTA */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: isMobile ? 'stretch' : 'flex-end',
              gap: '0.65rem',
              width: isMobile ? '100%' : undefined,
            }}>
              <GoldCTAButton
                onClick={handleBundleRequest}
                paddingTop="15px" paddingBottom="15px"
                paddingLeft={isMobile ? '20px' : '44px'}
                paddingRight={isMobile ? '20px' : '44px'}
                width={isMobile ? '100%' : undefined}
                fontSize={isMobile ? '0.78rem' : '0.72rem'}
                letterSpacing="0.26em"
                borderRadius={2}
              >
                Request Bundle Access - ${BUNDLE_PRICE}
              </GoldCTAButton>

              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-end',
                gap: '0.4rem',
              }}>
                <Shield size={11} color="rgba(196,154,108,0.32)" strokeWidth={1.5} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.52)',
                }}>
                  Contact Fallback | No Subscription
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
