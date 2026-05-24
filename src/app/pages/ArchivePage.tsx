/**
 * ArchivePage — /archive
 *
 * Primera pantalla: idéntica en espíritu al ArchiveTeaser del homepage.
 * "Más ↓" revela la colección completa.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, Play, Square, ChevronDown,
  Shield, Download, Music, Layers, Zap, Radio, Wind, Cpu, Volume2, Package,
} from 'lucide-react';
import Footer from '@/app/components/Footer';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useSEO } from '@/app/hooks/useSEO';
import { seoPages } from '@/app/config/seoConfig';

const BANDCAMP_URL = 'https://scifielectronics.bandcamp.com/';

const COVERS = {
  i:   'https://images.unsplash.com/photo-1577915435603-24d8e3b66d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  ii:  'https://images.unsplash.com/photo-1764263703876-727b48efed07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  iii: 'https://images.unsplash.com/photo-1700105968612-16177029010e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
  iv:  'https://images.unsplash.com/photo-1671625113102-fc52080cf2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
};

const RELEASES = [
  {
    id: 'i', catalog: 'SCI-01', title: 'ARCHIVE I',
    subtitle: 'Quantum Fields', tagline: 'Where sound becomes matter.',
    description: 'The inaugural volume. 120 sonic sources extracted from the frontier where physics meets synthesis: quantum-inspired textures, electromagnetic transients, and resonant structures.',
    price: 19, status: 'available' as const, edition: 'Vol. I', released: 'MMXXIV', sources: 120,
    cover: COVERS.i,
    categories: [
      { name: 'TEXTURES',     count: 22, icon: Layers,  desc: 'Drones, sustained pads, evolving fields' },
      { name: 'TRANSIENTS',   count: 18, icon: Zap,     desc: 'Clicks, impacts, micro-percussions' },
      { name: 'ATMOSPHERES',  count: 16, icon: Wind,    desc: 'Spatial ambiances, room resonances' },
      { name: 'MODULATIONS',  count: 14, icon: Radio,   desc: 'LFO-sculpted waveshaping, slow sweeps' },
      { name: 'NOISE FIELDS', count: 12, icon: Volume2, desc: 'Colored noise, spectral textures' },
      { name: 'RESONANCES',   count: 14, icon: Music,   desc: 'Metallic, glass, membrane tones' },
      { name: 'SIGNALS',      count: 12, icon: Cpu,     desc: 'Electronic beeps, tones, pulses' },
      { name: 'ARTIFACTS',    count: 12, icon: Package, desc: 'Glitch, degraded, warped material' },
    ],
    specs: [
      { label: 'SOURCES',  value: '120' }, { label: 'CATEGORIES', value: '8' },
      { label: 'BIT DEPTH',value: '24-bit' }, { label: 'SAMPLE RATE',value: '48 kHz' },
      { label: 'FORMAT',   value: 'WAV/AIFF' }, { label: 'LICENSE',     value: 'Royalty-Free' },
      { label: 'ACCESS', value: 'Contact' }, { label: 'UPDATES',     value: 'Lifetime' },
    ],
  },
  {
    id: 'ii', catalog: 'SCI-02', title: 'ARCHIVE II',
    subtitle: 'Signal Decay', tagline: 'The entropy of sound, preserved.',
    description: 'Electromagnetic signals captured mid-collapse. Decaying oscillations, magnetic interference patterns, and the sonic architecture of things falling apart with dignity.',
    price: 19, status: 'coming' as const, edition: 'Vol. II', released: '2026', sources: 140,
    cover: COVERS.ii, categories: [], specs: [],
  },
  {
    id: 'iii', catalog: 'SCI-03', title: 'ARCHIVE III',
    subtitle: 'Membrane Resonance', tagline: 'Matter vibrating at the edge of silence.',
    description: 'Surface resonances, contact microphone recordings from materials at their acoustic limits. The physical world reduced to its most essential vibration.',
    price: 19, status: 'coming' as const, edition: 'Vol. III', released: '2026', sources: 160,
    cover: COVERS.iii, categories: [], specs: [],
  },
  {
    id: 'iv', catalog: 'SCI-04', title: 'ARCHIVE IV',
    subtitle: 'Dark Matter', tagline: 'The sound of what cannot be seen.',
    description: 'Speculative acoustics — what would dark matter sound like if it could interact with our instruments?',
    price: 19, status: 'coming' as const, edition: 'Vol. IV', released: '2027', sources: 180,
    cover: COVERS.iv, categories: [], specs: [],
  },
];

// ── Animated waveform ──────────────────────────────────────────
function WaveformCanvas({ width = 300, height = 40 }: { width?: number; height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = width * dpr; c.height = height * dpr;
    c.style.width = `${width}px`; c.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    let t = 0, id: number;
    const bars = 60;
    const P = Array.from({ length: bars }, () => ({
      b: Math.random() * 0.38 + 0.05, f1: Math.random() * 2 + 0.5,
      f2: Math.random() * 4 + 1, p: Math.random() * Math.PI * 2, p2: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const bw = width / bars, cy = height / 2;
      P.forEach((p, i) => {
        const amp = p.b + Math.sin(t * 0.015 * p.f1 + p.p) * 0.2 + Math.sin(t * 0.028 * p.f2 + p.p2) * 0.1;
        const h = Math.max(1, amp * height * 0.88);
        const x = i * bw + bw * 0.18; const w = bw * 0.52;
        const g = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2);
        g.addColorStop(0, 'rgba(196,154,108,0.06)');
        g.addColorStop(0.5, 'rgba(196,154,108,0.50)');
        g.addColorStop(1, 'rgba(196,154,108,0.06)');
        ctx.fillStyle = g; ctx.fillRect(x, cy - h / 2, w, h);
      });
      t++; id = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(id);
  }, [width, height]);
  return <canvas ref={ref} style={{ display: 'block' }} />;
}

// ── Release card ───────────────────────────────────────────────
function Card({ r, selected, onSelect }: {
  r: typeof RELEASES[0]; selected: boolean; onSelect: () => void;
}) {
  const [h, setH] = useState(false);
  const ok = r.status === 'available';
  return (
    <motion.div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={onSelect}
      animate={{ opacity: h || selected ? 1 : 0.82 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'relative', cursor: 'pointer',
        outline: selected ? '1px solid rgba(196,154,108,0.38)' : '1px solid rgba(255,255,255,0.04)',
        outlineOffset: -1,
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}>
        <ImageWithFallback src={r.cover} alt={r.title} style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transform: h ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
          filter: ok ? 'brightness(0.80)' : 'brightness(0.35) saturate(0.3)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '58%',
          background: 'linear-gradient(to top, rgba(6,5,4,0.92), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(196,154,108,0.75)', background: 'rgba(6,5,4,0.74)',
          paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7,
        }}>{r.catalog}</div>
        {ok ? (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.82)', border: '1px solid rgba(196,154,108,0.26)',
            background: 'rgba(6,5,4,0.74)',
            paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7,
          }}>Available</div>
        ) : (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(6,5,4,0.74)',
            paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7,
          }}>{r.released}</div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.9rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.52)', marginBottom: '0.2rem',
          }}>
            {r.edition} · {ok ? `${r.sources} Sources` : 'Coming Soon'}
          </div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(240,235,225,0.92)',
          }}>
            {r.subtitle}
          </div>
        </div>
      </div>
      <div style={{
        background: 'rgba(10,8,6,0.97)',
        paddingTop: '0.75rem', paddingBottom: '0.75rem',
        paddingLeft: '0.85rem', paddingRight: '0.85rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)',
        }}>{r.title}</span>
        {ok ? (
          <span style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontWeight: 300, fontSize: '1rem', color: 'rgba(196,154,108,0.78)',
          }}>${r.price}</span>
        ) : (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)',
          }}>Soon</span>
        )}
      </div>
      {h && (['tl','tr','bl','br'] as const).map(pos => (
        <div key={pos} style={{
          position: 'absolute',
          top:    pos.startsWith('t') ? 0 : undefined,
          bottom: pos.startsWith('b') ? 0 : undefined,
          left:   pos.endsWith('l')   ? 0 : undefined,
          right:  pos.endsWith('r')   ? 0 : undefined,
          width: 10, height: 10,
          borderTop:    pos.startsWith('t') ? '1px solid rgba(196,154,108,0.45)' : 'none',
          borderBottom: pos.startsWith('b') ? '1px solid rgba(196,154,108,0.45)' : 'none',
          borderLeft:   pos.endsWith('l')   ? '1px solid rgba(196,154,108,0.45)' : 'none',
          borderRight:  pos.endsWith('r')   ? '1px solid rgba(196,154,108,0.45)' : 'none',
          pointerEvents: 'none', zIndex: 10,
        }} />
      ))}
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────
export default function ArchivePage() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(RELEASES[0]);
  const [playing, setPlaying] = useState(false);
  const collRef = useRef<HTMLElement>(null);

  useSEO(seoPages.archive);

  const open = useCallback(() => {
    window.open(BANDCAMP_URL, '_blank', 'noopener,noreferrer');
  }, []);
  const scrollDown = () => collRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ background: '#060504', minHeight: '100vh', position: 'relative' }}>

      {/* ══════════════════════════════════════════════════════
          PRIMERA PANTALLA — editorial, misma alma que el teaser
          del homepage. "Más ↓" baja a la colección completa.
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Ambient */}
        <div style={{
          position: 'absolute', top: '5%', right: '5%', pointerEvents: 'none',
          width: '52vw', height: '80%',
          background: 'radial-gradient(ellipse at 65% 35%, rgba(196,154,108,0.05) 0%, transparent 62%)',
          filter: 'blur(100px)',
        }} />

        {/* Meta bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '1.8rem 1.5rem' : '2rem 7vw',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div style={{ width: 18, height: 1, background: 'rgba(196,154,108,0.28)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.50)',
            }}>
              Sample Packs · Sonic Source Material
            </span>
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.15)',
          }}>
            SCI-FI ELECTRONICS
          </span>
        </div>

        {/* Two-column content */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '4rem' : '6vw',
          alignItems: 'center',
          minHeight: '100vh',
          padding: isMobile ? '14vh 1.5rem 10vh' : '0 7vw',
        }}>

          {/* LEFT — portada Archive I como protagonista visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ order: isMobile ? 2 : 1 }}
          >
            {/* Cover with overlay treatment */}
            <div style={{
              position: 'relative',
              outline: '1px solid rgba(196,154,108,0.14)',
              outlineOffset: -1,
              overflow: 'hidden',
            }}>
              <ImageWithFallback
                src={COVERS.i}
                alt="Archive I - Quantum Fields"
                style={{
                  width: '100%',
                  aspectRatio: isMobile ? '4/3' : '1/1',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.75)',
                }}
              />
              {/* Gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                background: 'linear-gradient(to top, rgba(6,5,4,0.90), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Catalog */}
              <div style={{
                position: 'absolute', top: 14, left: 14,
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.80)',
                background: 'rgba(6,5,4,0.76)',
                paddingTop: 4, paddingBottom: 4, paddingLeft: 9, paddingRight: 9,
              }}>SCI-01</div>
              {/* Available */}
              <div style={{
                position: 'absolute', top: 14, right: 14,
                fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.82)',
                border: '1px solid rgba(196,154,108,0.28)',
                background: 'rgba(6,5,4,0.76)',
                paddingTop: 4, paddingBottom: 4, paddingLeft: 9, paddingRight: 9,
              }}>Available</div>
              {/* Title overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.55)', marginBottom: '0.28rem',
                }}>
                  Vol. I · 120 Sources · WAV 24-bit
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 800,
                  fontSize: '1.1rem', letterSpacing: '-0.01em',
                  textTransform: 'uppercase', color: 'rgba(244,239,230,0.95)',
                }}>
                  ARCHIVE I — Quantum Fields
                </div>
              </div>
              {/* Corner brackets */}
              {[
                { top: 8, left: 8, borderTop: '1px solid rgba(196,154,108,0.38)', borderLeft: '1px solid rgba(196,154,108,0.38)' },
                { top: 8, right: 8, borderTop: '1px solid rgba(196,154,108,0.38)', borderRight: '1px solid rgba(196,154,108,0.38)' },
                { bottom: 8, left: 8, borderBottom: '1px solid rgba(196,154,108,0.38)', borderLeft: '1px solid rgba(196,154,108,0.38)' },
                { bottom: 8, right: 8, borderBottom: '1px solid rgba(196,154,108,0.38)', borderRight: '1px solid rgba(196,154,108,0.38)' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
              ))}
            </div>

            {/* Category tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
              {['TEXTURES','TRANSIENTS','ATMOSPHERES','MODULATIONS','NOISE FIELDS','RESONANCES','SIGNALS','ARTIFACTS'].map(cat => (
                <span key={cat} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.38)',
                  border: '1px solid rgba(196,154,108,0.09)',
                  background: 'rgba(196,154,108,0.025)',
                  paddingTop: 3, paddingBottom: 3, paddingLeft: 6, paddingRight: 6,
                }}>{cat}</span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — texto editorial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ order: isMobile ? 1 : 2 }}
          >
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600,
              fontSize: isMobile ? 'clamp(3.15rem, 13.5vw, 4.3rem)' : 'clamp(4rem, 9vw, 8rem)',
              letterSpacing: isMobile ? '0.025em' : '0.12em', textTransform: 'uppercase', lineHeight: 0.88,
              backgroundImage: 'linear-gradient(150deg, rgba(130,95,38,0.80) 0%, rgba(196,154,108,0.96) 38%, rgba(218,182,132,0.88) 58%, rgba(196,154,108,0.72) 82%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Archive
            </h1>

            <p style={{
              margin: '1.3rem 0 0',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
              fontSize: isMobile ? '1.05rem' : 'clamp(1rem, 1.6vw, 1.35rem)',
              letterSpacing: '0.025em', color: 'rgba(220,210,193,0.72)',
              lineHeight: 1.38, maxWidth: '24ch',
            }}>
              Raw sonic material —<br />
              not loops, not presets.<br />
              The atoms of sound design.
            </p>

            <div style={{
              width: 40, height: 1, background: 'rgba(196,154,108,0.22)',
              margin: '1.8rem 0',
            }} />

            <p style={{
              margin: 0,
              fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300,
              letterSpacing: '0.01em', color: 'rgba(200,186,165,0.58)',
              lineHeight: 1.82, maxWidth: '40ch',
            }}>
              Each volume is a curated set of sources extracted from a specific
              sonic research area — designed to extend the vocabulary of our instruments.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              {[
                { value: '120', label: 'Sources' },
                { value: '8', label: 'Categories' },
                { value: '$19', label: 'One-Time' },
              ].map(m => (
                <div key={m.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.8rem', letterSpacing: '0.03em',
                    color: 'rgba(196,154,108,0.76)', lineHeight: 1,
                  }}>{m.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                    letterSpacing: '0.24em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.32)', marginTop: 5,
                  }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Format strip */}
            <div style={{
              display: 'flex', gap: '1.2rem', alignItems: 'center',
              marginTop: '1.4rem', flexWrap: 'wrap',
            }}>
              {['WAV', '24-bit / 48kHz', 'Royalty-Free'].map((s, i) => (
                <span key={s} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: i === 0 ? 'rgba(196,154,108,0.50)' : 'rgba(255,255,255,0.24)',
                }}>{s}</span>
              ))}
            </div>

            {/* CTA row */}
            <div style={{
              display: 'flex', gap: '0.9rem', marginTop: '2.4rem',
              flexWrap: 'wrap', alignItems: 'center',
            }}>
              {/* Más — scroll to collection */}
              <motion.button
                onClick={scrollDown}
                whileHover={{ scale: 1.014 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  background: 'rgba(196,154,108,0.05)',
                  border: '1px solid rgba(196,154,108,0.30)',
                  cursor: 'pointer',
                  paddingTop: '13px', paddingBottom: '13px',
                  paddingLeft: '26px', paddingRight: '26px',
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                  fontSize: '0.65rem', letterSpacing: '0.32em',
                  textTransform: 'uppercase', color: 'rgba(196,154,108,0.72)',
                  transition: 'border-color 0.22s, background 0.22s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(196,154,108,0.55)';
                  el.style.background  = 'rgba(196,154,108,0.10)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(196,154,108,0.30)';
                  el.style.background  = 'rgba(196,154,108,0.05)';
                }}
              >
                Más
                <ChevronDown size={12} strokeWidth={1.5} />
              </motion.button>

              {/* Bandcamp */}
              <motion.button
                onClick={open}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                  letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)', padding: 0,
                }}
              >
                Bandcamp
                <ExternalLink size={10} strokeWidth={1.5} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom hairline */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.14) 40%, rgba(196,154,108,0.20) 50%, rgba(196,154,108,0.14) 60%, transparent)',
        }} />

        {/* Scroll pulse */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          onClick={scrollDown}
          style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer', zIndex: 3,
          }}
        >
          <div style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, transparent, rgba(196,154,108,0.26))',
          }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE COLLECTION — anclada al "Más"
      ═══════════════════════════════════════════════════════ */}
      <section ref={collRef} style={{ padding: isMobile ? '6vh 1.5rem' : '10vh 7vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.9rem' }}>
            <div style={{ width: 22, height: 1, background: 'rgba(196,154,108,0.24)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
              letterSpacing: '0.42em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.42)',
            }}>Signal Archive</span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-ui)', fontWeight: 800,
            fontSize: isMobile ? '1.5rem' : 'clamp(1.6rem, 3vw, 2.5rem)',
            letterSpacing: '-0.02em', color: 'rgba(244,239,230,0.88)', lineHeight: 0.92,
          }}>The Collection</h2>
          <p style={{
            margin: '0.8rem 0 0',
            fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'rgba(200,188,170,0.48)', fontWeight: 300,
            lineHeight: 1.72, maxWidth: '52ch',
          }}>
            Each volume is an editorial signal document. Access and release delivery remain routed through the active archive channel.
          </p>
        </motion.div>

        {/* Grid de portadas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '1px', background: 'rgba(196,154,108,0.05)',
        }}>
          {RELEASES.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              style={{ background: '#060504' }}
            >
              <Card
                r={r}
                selected={selected.id === r.id}
                onSelect={() => setSelected(r)}
              />
            </motion.div>
          ))}
        </div>
        <div style={{
          marginTop: '0.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(196,154,108,0.26)', textAlign: isMobile ? 'center' : 'left',
        }}>
          Select a release to inspect technical details</div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RELEASE DETAIL
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selected.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.42 }}
          style={{
            background: 'rgba(14,11,8,0.97)',
            borderTop: '1px solid rgba(196,154,108,0.07)',
            borderBottom: '1px solid rgba(196,154,108,0.07)',
          }}
        >
          <div style={{
            padding: isMobile ? '5vh 1.5rem' : '7vh 7vw',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '320px 1fr',
            gap: isMobile ? '3rem' : '6rem',
            alignItems: 'start',
          }}>
            {/* Cover + waveform */}
            <div>
              <div style={{
                position: 'relative',
                outline: '1px solid rgba(196,154,108,0.09)', outlineOffset: -1,
              }}>
                <ImageWithFallback
                  src={selected.cover} alt={selected.title}
                  style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(to top, rgba(6,5,4,0.92), transparent)',
                  padding: '1.2rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.50)', marginBottom: '0.25rem',
                  }}>{selected.catalog} · {selected.edition}</div>
                  <div style={{
                    fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.9rem',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: 'rgba(240,235,225,0.92)',
                  }}>{selected.subtitle}</div>
                </div>
                {[
                  { top: 7, left: 7, borderTop: '1px solid rgba(196,154,108,0.28)', borderLeft: '1px solid rgba(196,154,108,0.28)' },
                  { top: 7, right: 7, borderTop: '1px solid rgba(196,154,108,0.28)', borderRight: '1px solid rgba(196,154,108,0.28)' },
                  { bottom: 7, left: 7, borderBottom: '1px solid rgba(196,154,108,0.28)', borderLeft: '1px solid rgba(196,154,108,0.28)' },
                  { bottom: 7, right: 7, borderBottom: '1px solid rgba(196,154,108,0.28)', borderRight: '1px solid rgba(196,154,108,0.28)' },
                ].map((s, i) => (
                  <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...s }} />
                ))}
              </div>
              {/* Waveform */}
              <div style={{
                marginTop: 2, background: 'rgba(8,6,4,0.9)',
                border: '1px solid rgba(196,154,108,0.07)', borderTop: 'none',
                paddingTop: '0.8rem', paddingBottom: '0.8rem',
                paddingLeft: '0.9rem', paddingRight: '0.9rem',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                    letterSpacing: '0.26em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.36)',
                  }}>Preview / Signal</span>
                  {selected.status === 'available' && (
                    <button onClick={() => setPlaying(p => !p)} style={{
                      display: 'flex', alignItems: 'center', gap: '0.28rem',
                      background: 'none', border: '1px solid rgba(196,154,108,0.15)',
                      cursor: 'pointer',
                      paddingTop: '2px', paddingBottom: '2px',
                      paddingLeft: '7px', paddingRight: '7px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'rgba(196,154,108,0.50)',
                    }}>
                      {playing ? <Square size={6} /> : <Play size={6} />}
                      {playing ? 'Stop' : 'Preview'}
                    </button>
                  )}
                </div>
                <WaveformCanvas width={isMobile ? 250 : 288} height={36} />
              </div>
              {selected.status === 'available' && (
                <motion.button
                  whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.97 }}
                  onClick={open}
                  style={{
                    width: '100%', marginTop: '0.5rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'linear-gradient(135deg, #2A1A08 0%, #5E3E18 30%, #9A7040 50%, #5E3E18 70%, #2A1A08 100%)',
                    border: 'none', cursor: 'pointer',
                    paddingTop: '14px', paddingBottom: '14px',
                    paddingLeft: '18px', paddingRight: '18px',
                    fontFamily: 'var(--font-mono)', fontWeight: 700,
                    fontSize: '0.60rem', letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: 'rgba(224,200,160,0.92)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.55)',
                    boxSizing: 'border-box',
                  }}
                >
                  <span>Request Archive Access - ${selected.price}</span>
                  <ExternalLink size={11} />
                </motion.button>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                  letterSpacing: '0.4em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.38)', marginBottom: '0.45rem',
                }}>{selected.catalog} · Sample Pack</div>
                <h2 style={{
                  margin: 0, fontFamily: 'var(--font-ui)', fontWeight: 800,
                  fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  letterSpacing: '-0.018em', color: 'rgba(244,239,230,0.90)', lineHeight: 0.92,
                }}>
                  {selected.title}
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontWeight: 300, fontSize: 'clamp(1rem, 1.6vw, 1.4rem)',
                    letterSpacing: '0.02em', marginTop: '0.18rem',
                    color: 'rgba(196,154,108,0.55)',
                  }}>{selected.subtitle}</span>
                </h2>
                <p style={{
                  margin: '0.9rem 0 0',
                  fontFamily: 'var(--font-body)', fontSize: '0.86rem',
                  color: 'rgba(200,188,170,0.52)', fontWeight: 300,
                  lineHeight: 1.82, maxWidth: '50ch',
                }}>{selected.description}</p>
                <p style={{
                  margin: '0.6rem 0 0',
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontWeight: 300, fontSize: '0.9rem',
                  color: 'rgba(196,154,108,0.40)',
                }}>"{selected.tagline}"</p>
              </div>

              {/* Specs */}
              {selected.specs.length > 0 && (
                <div style={{ marginBottom: '1.8rem' }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
                    letterSpacing: '0.36em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.30)', marginBottom: '0.8rem',
                    paddingBottom: '0.45rem',
                    borderBottom: '1px solid rgba(196,154,108,0.07)',
                  }}>Technical Specifications</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
                    {selected.specs.map((s, i) => (
                      <div key={s.label} style={{
                        paddingTop: '0.8rem', paddingBottom: '0.8rem',
                        paddingLeft:  i % 4 !== 0 ? '0.85rem' : '0',
                        paddingRight: i % 4 !== 3 ? '0.85rem' : '0',
                        borderRight: i % 4 !== 3 ? '1px solid rgba(196,154,108,0.06)' : 'none',
                        borderBottom: i < 4 ? '1px solid rgba(196,154,108,0.06)' : 'none',
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.41rem',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.23)', marginBottom: '0.25rem',
                        }}>{s.label}</div>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                          letterSpacing: '0.06em', color: 'rgba(196,154,108,0.68)',
                        }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {selected.categories.length > 0 && (
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
                    letterSpacing: '0.36em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.30)', marginBottom: '0.8rem',
                    paddingBottom: '0.45rem',
                    borderBottom: '1px solid rgba(196,154,108,0.07)',
                  }}>What's Inside - 8 Categories</div>
                  {selected.categories.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -7 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.26, delay: i * 0.03 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.85rem',
                          paddingTop: '0.72rem', paddingBottom: '0.72rem',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}
                      >
                        <Icon size={10} color="rgba(196,154,108,0.34)" strokeWidth={1.5} />
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'rgba(220,210,195,0.70)',
                          }}>{cat.name}</span>
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.66rem',
                            color: 'rgba(180,168,150,0.38)', marginLeft: '0.6rem', fontWeight: 300,
                          }}>{cat.desc}</span>
                        </div>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
                          color: 'rgba(196,154,108,0.38)',
                        }}>{cat.count}</span>
                      </motion.div>
                    );
                  })}
                  <div style={{ display: 'flex', gap: '1.3rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
                    {[
                      { icon: Shield, label: '30-Day Refund' },
                      { icon: Download, label: 'Archive Access' },
                      { icon: Package, label: 'Lifetime Access' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.36rem' }}>
                        <Icon size={9} color="rgba(196,154,108,0.28)" strokeWidth={1.5} />
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.47rem',
                          letterSpacing: '0.16em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.26)',
                        }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coming soon */}
              {selected.status === 'coming' && (
                <div style={{
                  marginTop: '1.6rem', border: '1px solid rgba(196,154,108,0.08)',
                  padding: '1.6rem', background: 'rgba(196,154,108,0.02)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                    letterSpacing: '0.36em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.38)', marginBottom: '0.6rem',
                  }}>In Development - {selected.released}</div>
                  <p style={{
                    margin: 0, fontFamily: 'var(--font-body)', fontSize: '0.84rem',
                    color: 'rgba(180,168,150,0.46)', fontWeight: 300, lineHeight: 1.78,
                  }}>
                    This volume is currently in production. Follow on Bandcamp to be notified on release.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.97 }}
                    onClick={open}
                    style={{
                      marginTop: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      background: 'none', border: '1px solid rgba(196,154,108,0.16)',
                      cursor: 'pointer',
                      paddingTop: '10px', paddingBottom: '10px',
                      paddingLeft: '16px', paddingRight: '16px',
                      fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'rgba(196,154,108,0.48)',
                    }}
                  >
                    Follow on Bandcamp <ExternalLink size={9} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
          BANDCAMP CTA FINAL
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '7vh 1.5rem' : '8vh 7vw',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '50vw', height: '60%',
          background: 'radial-gradient(ellipse, rgba(196,154,108,0.026) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
            letterSpacing: '0.44em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.34)', marginBottom: '1.2rem',
          }}>Available Now</div>
          <h2 style={{
            margin: '0 0 0.75rem', fontFamily: 'var(--font-ui)', fontWeight: 800,
            fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 3vw, 2.6rem)',
            letterSpacing: '-0.02em', color: 'rgba(244,239,230,0.85)', lineHeight: 0.92,
          }}>Archive I - Quantum Fields</h2>
          <p style={{
            margin: '0 auto 2rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
            color: 'rgba(200,188,170,0.42)', fontWeight: 300, lineHeight: 1.78, maxWidth: '40ch',
          }}>
            120 sources | 8 categories | archive access<br />
            One payment | royalty-free license</p>
          <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.012, y: -1 }} whileTap={{ scale: 0.97 }}
              onClick={open}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'linear-gradient(135deg, #2A1A08 0%, #5E3E18 30%, #9A7040 50%, #5E3E18 70%, #2A1A08 100%)',
                border: 'none', cursor: 'pointer',
                paddingTop: '13px', paddingBottom: '13px',
                paddingLeft: '32px', paddingRight: '32px',
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: '0.66rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(224,200,160,0.92)',
                boxShadow: '0 2px 14px rgba(0,0,0,0.55)',
              }}
            >Get Archive I — $19 <ExternalLink size={11} /></motion.button>
            <motion.button
              whileHover={{ scale: 1.012 }} whileTap={{ scale: 0.97 }}
              onClick={open}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'none', border: '1px solid rgba(196,154,108,0.16)',
                cursor: 'pointer',
                paddingTop: '13px', paddingBottom: '13px',
                paddingLeft: '24px', paddingRight: '24px',
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.44)',
              }}
            >Bandcamp <ArrowRight size={9} /></motion.button>
          </div>
          <div style={{
            marginTop: '1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.15)',
          }}>scifielectronics.bandcamp.com</div>
        </motion.div>
      </section>

      {/* Back */}
      <div style={{ padding: isMobile ? '0 1.5rem 4vh' : '0 7vw 4vh' }}>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)', textDecoration: 'none',
        }}>
          ← SCI-FI ELECTRONICS
        </Link>
      </div>

      <Footer />
    </div>
  );
}
