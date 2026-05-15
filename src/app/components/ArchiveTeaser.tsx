/**
 * ArchiveTeaser — Homepage section
 * Diseño orientado a conversión: cover premium + audio preview interactivo + CTA de compra claro.
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, ExternalLink, Volume2 } from 'lucide-react';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const COVER_URL =
  'https://images.unsplash.com/photo-1764263703837-3250668eafc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';

const AMBER = '196,154,108';
const JADE  = '27,107,90';

// Waveform bars — alturas predefinidas para parecer audio real
const WAVE_BARS = [
  22,38,55,42,68,80,72,58,44,30,52,66,78,85,70,60,48,36,55,72,
  88,74,62,50,38,66,80,70,56,44,32,58,74,82,68,54,42,30,48,64,
  76,85,72,60,48,36,24,42,58,70,82,68,54,40,28,52,68,80,72,56,
];

function Waveform({ progress, onSeek }: { progress: number; onSeek: (p: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(p);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 2,
        height: 44, cursor: 'pointer', paddingTop: 4, paddingBottom: 4,
        flex: 1,
      }}
    >
      {WAVE_BARS.map((h, i) => {
        const barProgress = i / WAVE_BARS.length;
        const played = barProgress < progress;
        const current = Math.abs(barProgress - progress) < 0.025;
        return (
          <motion.div
            key={i}
            animate={{ height: h * 0.38 + 'px' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              width: 2, flexShrink: 0, borderRadius: 1,
              background: played
                ? current
                  ? `rgba(${AMBER},1)`
                  : `rgba(${AMBER},0.80)`
                : `rgba(${AMBER},0.14)`,
              transition: 'background 0.15s',
            }}
          />
        );
      })}
    </div>
  );
}

const VOLUMES = [
  {
    serial: 'SCI-01',
    title: 'Archive I',
    subtitle: 'Quantum Fields',
    description: 'Electromagnetic textures, particle transients and resonance fields. Source material prepared for future signal-library releases.',
    categories: ['Textures', 'Transients', 'Resonances', 'Noise Fields', 'Signals'],
    sources: 120,
    price: 19,
    status: 'available' as const,
    cover: COVER_URL,
  },
];

const vol = VOLUMES[0];

export default function ArchiveTeaser() {
  const isMobile = useIsMobile();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coverHovered, setCoverHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simula reproducción progresiva
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 1) { setPlaying(false); return 0; }
          return p + 1 / (28 * 60); // ~28 seg de "preview"
        });
      }, 1000 / 60);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  const togglePlay = () => setPlaying(p => !p);

  const formatTime = (p: number) => {
    const secs = Math.floor(p * 28);
    return `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  };

  return (
    <section data-buildout-section="archive-teaser" style={{ background: '#070503', position: 'relative', overflow: 'hidden' }}>

      {/* Top hairline — más intenso que en otras secciones */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, rgba(${AMBER},0.45) 30%, rgba(${AMBER},0.6) 50%, rgba(${AMBER},0.45) 70%, transparent)`,
      }} />

      {/* Ambient glow background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 20% 50%, rgba(${AMBER},0.025) 0%, transparent 55%)`,
      }} />

      <div style={{
        padding: isMobile ? '6vh 1.4rem 7vh' : '8vh 7vw 9vh',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr',
        gap: isMobile ? '3rem' : '6vw',
        alignItems: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* LEFT — Cover artwork                                        */}
        {/* ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ order: isMobile ? 2 : 1 }}
        >
          <div
            onMouseEnter={() => setCoverHovered(true)}
            onMouseLeave={() => setCoverHovered(false)}
            style={{
              position: 'relative',
              outline: `1px solid rgba(${AMBER},${coverHovered ? 0.22 : 0.10})`,
              outlineOffset: -1,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'outline-color 0.35s',
            }}
          >
            <ImageWithFallback
              src={vol.cover}
              alt={`${vol.title} — ${vol.subtitle}`}
              style={{
                width: '100%',
                aspectRatio: isMobile ? '4 / 3' : '3 / 4',
                objectFit: 'cover',
                display: 'block',
                transform: coverHovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                filter: `brightness(${coverHovered ? 0.72 : 0.65}) saturate(0.7)`,
              }}
            />

            {/* Dark overlay gradient */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '60%',
              background: 'linear-gradient(to top, rgba(7,5,3,0.95) 0%, rgba(7,5,3,0.4) 55%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* Top overlay — lighter */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '30%',
              background: 'linear-gradient(to bottom, rgba(7,5,3,0.55) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* Serial badge — top left */}
            <div style={{
              position: 'absolute', top: 14, left: 14, zIndex: 2,
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: `rgba(${AMBER},0.85)`,
              background: 'rgba(5,4,2,0.82)',
              backdropFilter: 'blur(12px)',
              paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10,
              border: `1px solid rgba(${AMBER},0.18)`,
            }}>
              {vol.serial}
            </div>

            {/* Status badge — top right */}
            <div style={{
              position: 'absolute', top: 14, right: 14, zIndex: 2,
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: `rgba(${JADE},0.95)`,
              border: `1px solid rgba(${JADE},0.35)`,
              background: 'rgba(5,4,2,0.80)',
              backdropFilter: 'blur(12px)',
              paddingTop: 4, paddingBottom: 4, paddingLeft: 10, paddingRight: 10,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <div style={{
                width: 4, height: 4, borderRadius: '50%',
                background: `rgba(${JADE},0.9)`,
                boxShadow: `0 0 5px rgba(${JADE},0.6)`,
              }} />
              Available
            </div>

            {/* Bottom info overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '1.4rem', zIndex: 2,
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: `rgba(${AMBER},0.45)`, marginBottom: '0.35rem',
              }}>
                {vol.sources} Sources · WAV 24-bit
              </div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.15rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', lineHeight: 1.1,
                color: 'rgba(244,239,230,0.95)',
              }}>
                {vol.title}
                <span style={{
                  display: 'block', fontWeight: 300, fontStyle: 'italic',
                  fontSize: '0.85rem', letterSpacing: '0.04em',
                  color: `rgba(${AMBER},0.62)`, marginTop: 3,
                }}>
                  {vol.subtitle}
                </span>
              </div>
            </div>

            {/* Corner brackets */}
            {[
              { top: 7, left: 7, borderTop: `1px solid rgba(${AMBER},0.30)`, borderLeft: `1px solid rgba(${AMBER},0.30)` },
              { top: 7, right: 7, borderTop: `1px solid rgba(${AMBER},0.30)`, borderRight: `1px solid rgba(${AMBER},0.30)` },
              { bottom: 7, left: 7, borderBottom: `1px solid rgba(${AMBER},0.30)`, borderLeft: `1px solid rgba(${AMBER},0.30)` },
              { bottom: 7, right: 7, borderBottom: `1px solid rgba(${AMBER},0.30)`, borderRight: `1px solid rgba(${AMBER},0.30)` },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s, pointerEvents: 'none', zIndex: 3 }} />
            ))}
          </div>

          {/* Category strip — debajo de la cover, compacto */}
          <div style={{
            display: 'flex', gap: '0.32rem', flexWrap: 'wrap',
            marginTop: '0.65rem',
          }}>
            {vol.categories.map(cat => (
              <span key={cat} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: `rgba(${AMBER},0.35)`,
                border: `1px solid rgba(${AMBER},0.09)`,
                paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7,
              }}>
                {cat}
              </span>
            ))}
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.16)',
              paddingTop: 3, paddingBottom: 3,
              alignSelf: 'center',
            }}>
              +3 more
            </span>
          </div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* RIGHT — Conversion content                                  */}
        {/* ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ order: isMobile ? 1 : 2, display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {/* Micro label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.4rem' }}>
            <div style={{ width: 22, height: 1, background: `rgba(${AMBER},0.30)`, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              letterSpacing: '0.40em', textTransform: 'uppercase',
              color: `rgba(${AMBER},0.45)`,
            }}>
              Sample Packs · Sonic Source Material
            </span>
          </div>

          {/* Main title — calibrado, no aplasta */}
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontStyle: 'normal', fontWeight: 700,
            fontSize: isMobile ? 'clamp(2.6rem, 12vw, 4.5rem)' : 'clamp(3rem, 5.5vw, 5.2rem)',
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            lineHeight: 0.88,
            backgroundImage: `linear-gradient(140deg, rgba(130,95,38,0.82) 0%, rgba(${AMBER},0.98) 35%, rgba(218,182,132,0.92) 58%, rgba(${AMBER},0.75) 85%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Archive
          </h2>

          {/* Subtitle italic */}
          <p style={{
            margin: '1rem 0 0',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic', fontWeight: 300,
            fontSize: isMobile ? '1rem' : 'clamp(0.95rem, 1.5vw, 1.22rem)',
            letterSpacing: '0.02em',
            color: 'rgba(220,210,193,0.62)',
            lineHeight: 1.45, maxWidth: '28ch',
          }}>
            Raw sonic material —<br />
            not loops, not presets.<br />
            The atoms of sound design.
          </p>

          {/* Description */}
          <p style={{
            margin: '1.1rem 0 0',
            fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 300,
            letterSpacing: '0.01em',
            color: 'rgba(190,175,152,0.52)',
            lineHeight: 1.80, maxWidth: '40ch',
          }}>
            {vol.description}
          </p>

          {/* ── AUDIO PREVIEW ──────────────────────────────────────── */}
          <div style={{ marginTop: '2rem' }}>
            {/* Preview label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <Volume2 size={9} color={`rgba(${AMBER},0.35)`} strokeWidth={1.5} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                letterSpacing: '0.32em', textTransform: 'uppercase',
                color: `rgba(${AMBER},0.35)`,
              }}>
                Preview · 28s
              </span>
            </div>

            {/* Player strip */}
            <div style={{
              border: `1px solid rgba(${AMBER},0.10)`,
              background: `rgba(${AMBER},0.025)`,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Progress fill track */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${progress * 100}%`,
                background: `rgba(${AMBER},0.04)`,
                transition: 'width 0.016s linear',
                pointerEvents: 'none',
              }} />

              <div style={{
                display: 'flex', alignItems: 'center',
                paddingTop: '0.85rem', paddingBottom: '0.85rem',
                paddingLeft: '1.1rem', paddingRight: '1.1rem',
                gap: '1rem', position: 'relative', zIndex: 1,
              }}>
                {/* Play/Pause button */}
                <motion.button
                  onClick={togglePlay}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    border: `1px solid rgba(${AMBER},0.28)`,
                    background: playing ? `rgba(${AMBER},0.14)` : 'rgba(196,154,108,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', outline: 'none',
                    transition: 'background 0.22s, border-color 0.22s',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {playing ? (
                      <motion.span key="pause"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}
                      >
                        <Pause size={13} color={`rgba(${AMBER},0.9)`} strokeWidth={1.5} fill={`rgba(${AMBER},0.9)`} />
                      </motion.span>
                    ) : (
                      <motion.span key="play"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}
                      >
                        <Play size={13} color={`rgba(${AMBER},0.9)`} strokeWidth={1.5} fill={`rgba(${AMBER},0.9)`} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Track info + waveform */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: `rgba(${AMBER},0.70)`, whiteSpace: 'nowrap',
                    }}>
                      QF_001 - Particle Field A
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
                      letterSpacing: '0.08em',
                      color: `rgba(${AMBER},0.38)`, flexShrink: 0, marginLeft: '0.5rem',
                    }}>
                      {formatTime(progress)} / 0:28
                    </span>
                  </div>
                  <Waveform progress={progress} onSeek={setProgress} />
                </div>
              </div>
            </div>

            {/* Player footnote */}
            <div style={{
              marginTop: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: `rgba(${AMBER},0.22)`,
            }}>
              Archive I preview - placeholder waveform
            </div>
          </div>

          {/* ── Format specs row ──────────────────────────────────── */}
          <div style={{
            display: 'flex', gap: 0,
            marginTop: '1.8rem',
            border: `1px solid rgba(${AMBER},0.07)`,
            background: `rgba(${AMBER},0.02)`,
          }}>
            {[
              { label: 'Format', value: 'WAV' },
              { label: 'Bit Depth', value: '24-bit' },
              { label: 'Sample Rate', value: '48 kHz' },
              { label: 'License', value: 'Royalty-Free' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                paddingTop: '0.7rem', paddingBottom: '0.7rem',
                borderRight: i < arr.length - 1 ? `1px solid rgba(${AMBER},0.07)` : 'none',
                gap: 3,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  letterSpacing: '0.02em',
                  color: `rgba(${AMBER},0.75)`, lineHeight: 1,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.38rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: `rgba(${AMBER},0.28)`,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Price + CTAs ─────────────────────────────────────── */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Price row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                color: `rgba(${AMBER},0.95)`, lineHeight: 1, letterSpacing: '-0.02em',
              }}>
                ${vol.price}
              </span>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: `rgba(${AMBER},0.42)`,
                }}>
                  One-Time | No Subscription
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.20)', marginTop: 3,
                }}>
                  Contact fallback | {vol.sources} sources
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>

              {/* PRIMARY — Buy */}
              <motion.a
                href="https://scifielectronics.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                  fontSize: '0.66rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: '#0C0904',
                  background: `rgba(${AMBER},0.92)`,
                  paddingTop: '14px', paddingBottom: '14px',
                  paddingLeft: '30px', paddingRight: '30px',
                  textDecoration: 'none',
                  transition: 'background 0.22s',
                  cursor: 'pointer',
                  border: 'none',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `rgba(${AMBER},1)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `rgba(${AMBER},0.92)`; }}
              >
                Request Archive Access - ${vol.price}
                <ExternalLink size={11} strokeWidth={2} />
              </motion.a>

              {/* SECONDARY — Browse all */}
              <Link
                to="/archive"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.60rem', letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: `rgba(${AMBER},0.52)`,
                  textDecoration: 'none',
                  transition: 'color 0.22s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = `rgba(${AMBER},0.85)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `rgba(${AMBER},0.52)`; }}
              >
                Browse Archive
                <ArrowRight size={11} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Guarantee line */}
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.20)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <div style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.12)' }} />
              Production delivery pending | Contact fallback active
            </div>
          </div>

        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, rgba(${AMBER},0.08) 50%, transparent)`,
      }} />
    </section>
  );
}

