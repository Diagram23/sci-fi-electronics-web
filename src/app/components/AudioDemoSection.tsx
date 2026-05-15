/**
 * AudioDemoSection — Interactive waveform demo + Audio player placeholder
 * Shows before/after for each plugin with animated canvas waveforms
 * Real audio clips to be inserted when assets are available
 */
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Music, Upload } from 'lucide-react';
import GoldCTAButton from '@/app/components/GoldCTAButton';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { siteConfig } from '@/app/config/siteConfig';

const demos = [
  {
    id: 'quantum-reverb',
    name: 'QUANTUM REVERB',
    tagline: 'Infinite Space Generator',
    price: 149,
    accentColor: '#C49A6C',
    accentRGB: '196,154,108',
    dryLabel: 'DRY SIGNAL',
    wetLabel: 'QUANTUM REVERB',
    dryDesc: 'Dry signal preview placeholder - no spatial depth',
    wetDesc: 'Processed preview placeholder - long tail, zero artifacts',
    waveType: 'reverb',
    specs: ['AI Space Morphing', 'Long Reverb Tail', '4K+ IR Library', '0ms Latency'],
  },
  {
    id: 'fractal-delay',
    name: 'FRACTAL DELAY',
    tagline: 'Time Manipulation Engine',
    price: 129,
    accentColor: '#1B6B5A',
    accentRGB: '27,107,90',
    dryLabel: 'DRY SIGNAL',
    wetLabel: 'FRACTAL DELAY',
    dryDesc: 'Single input preview placeholder - no temporal dimension',
    wetDesc: 'Recursive delay network placeholder - 128 taps, evolving variations',
    waveType: 'delay',
    specs: ['Neural Pattern Gen', '128 Delay Taps', 'Evolving Variations', 'Smart DAW Sync'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BANNER — eliminar cuando los archivos de audio reales estén disponibles
// TODO: reemplazar waveforms simuladas con archivos WAV/MP3 reales y conectar
//       <audio> elements con AnalyserNode para sincronizar la visualización.
// ─────────────────────────────────────────────────────────────────────────────
function AudioComingSoonBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        border: '1px solid rgba(196,154,108,0.10)',
        background: 'rgba(196,154,108,0.03)',
        paddingTop: '8px', paddingBottom: '8px',
        paddingLeft: '14px', paddingRight: '14px',
        marginBottom: '3rem',
      }}
    >
      <Upload size={11} color="rgba(196,154,108,0.40)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.50rem',
        letterSpacing: '0.26em', textTransform: 'uppercase',
        color: 'rgba(196,154,108,0.42)',
      }}>
        Audio demos coming soon - waveform previews are simulated
      </span>
    </motion.div>
  );
}

// Canvas waveform visualizer
function WaveformCanvas({
  waveType,
  isWet,
  accentColor,
  accentRGB,
}: {
  waveType: string;
  isWet: boolean;
  accentColor: string;
  accentRGB: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = H / 2;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (H / 4) * i);
        ctx.lineTo(W, (H / 4) * i);
        ctx.stroke();
      }

      const [r, g, b] = accentRGB.split(',').map(Number);

      // RMS-style background fill
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      if (isWet) {
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(0.3, `rgba(${r},${g},${b},0.06)`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},0.04)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      } else {
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0.02)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const pts = 400;
      const step = W / pts;

      if (!isWet) {
        // DRY — simple, monotone sine
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const x = i * step;
          const wave = Math.sin((i / pts) * Math.PI * 6 + t * 1.2) * (H * 0.28);
          const y = cx + wave;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Mirror subtle
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const x = i * step;
          const wave = Math.sin((i / pts) * Math.PI * 6 + t * 1.2) * (H * 0.28);
          const y = cx - wave;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // WET — complex, animated, rich
        const complexity = waveType === 'reverb' ? 3 : waveType === 'delay' ? 4 : 5;

        // Tail / trails (reverb) or echoes (delay)
        for (let trail = 0; trail < complexity; trail++) {
          const trailOffset = trail * (W / (complexity + 1));
          const trailAlpha = (1 - trail / complexity) * 0.15;

          ctx.beginPath();
          for (let i = 0; i <= pts; i++) {
            const x = i * step;
            let wave = 0;

            if (waveType === 'reverb') {
              const decay = Math.exp(-((i / pts) * 2.5));
              wave = (Math.sin((i / pts) * Math.PI * 8 + t * 1.8 + trail) * 0.5
                + Math.sin((i / pts) * Math.PI * 14 + t * 1.2 + trail * 0.7) * 0.3
                + Math.sin((i / pts) * Math.PI * 22 + t * 0.9) * 0.2) * decay * H * 0.42;
            } else if (waveType === 'delay') {
              const echo = Math.sin((i / pts) * Math.PI * 7 + t * 1.5 - trail * 0.6) * Math.exp(-trail * 0.4) * 0.7
                + Math.sin((i / pts) * Math.PI * 13 + t * 0.8 + trail * 0.3) * 0.3;
              wave = echo * H * 0.38;
            } else {
              // distortion — clipped, harmonic-rich
              const raw = Math.sin((i / pts) * Math.PI * 6 + t * 1.6);
              const clipped = Math.tanh(raw * 3) * 0.6 + Math.sin((i / pts) * Math.PI * 18 + t * 2) * 0.15 + Math.sin((i / pts) * Math.PI * 30 + t * 1.1) * 0.08;
              wave = clipped * H * 0.38;
            }
            const y = cx + wave;
            i === 0 ? ctx.moveTo(x + trailOffset % W, y) : ctx.lineTo(x + trailOffset % W, y);
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${trailAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Main wet line — bright
        ctx.beginPath();
        for (let i = 0; i <= pts; i++) {
          const x = i * step;
          let wave = 0;

          if (waveType === 'reverb') {
            const decay = Math.exp(-((i / pts) * 1.8));
            wave = (Math.sin((i / pts) * Math.PI * 8 + t * 1.8) * 0.5
              + Math.sin((i / pts) * Math.PI * 15 + t * 1.2) * 0.3
              + Math.sin((i / pts) * Math.PI * 24 + t * 0.8) * 0.2) * decay * H * 0.44;
          } else if (waveType === 'delay') {
            wave = (Math.sin((i / pts) * Math.PI * 7 + t * 1.5) * 0.6
              + Math.sin((i / pts) * Math.PI * 14 + t * 0.9) * 0.25
              + Math.sin((i / pts) * Math.PI * 21 + t * 0.5) * 0.15) * H * 0.4;
          } else {
            const raw = Math.sin((i / pts) * Math.PI * 6 + t * 1.6);
            const clipped = Math.tanh(raw * 4);
            wave = (clipped * 0.55 + Math.sin((i / pts) * Math.PI * 18 + t * 2.2) * 0.2 + Math.sin((i / pts) * Math.PI * 36 + t * 1.1) * 0.08) * H * 0.4;
          }

          const y = cx + wave;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        // Gradient stroke
        const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
        lineGrad.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
        lineGrad.addColorStop(0.4, `rgba(${r},${g},${b},0.95)`);
        lineGrad.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
        lineGrad.addColorStop(1, `rgba(${r},${g},${b},0.4)`);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow layer
        ctx.filter = `blur(3px)`;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.filter = 'none';
      }

      // Center baseline
      ctx.beginPath();
      ctx.moveTo(0, cx);
      ctx.lineTo(W, cx);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      timeRef.current = t;
    };

    let lastTime = 0;
    const animate = (ts: number) => {
      if (ts - lastTime > 16) {
        draw(timeRef.current + 0.018);
        lastTime = ts;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isWet, waveType, accentColor, accentRGB]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={160}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

// ── Fake audio player — ready for real clips ──────────────────────
function AudioPlayer({
  label,
  isWet,
  accentColor,
  accentRGB,
  demoName,
}: {
  label: string;
  isWet: boolean;
  accentColor: string;
  accentRGB: string;
  demoName: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && siteConfig.audioDemosEnabled) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setIsPlaying(false); return 0; }
          return p + 0.5;
        });
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const duration = isWet ? '0:18' : '0:18';
  const elapsed = Math.floor((progress / 100) * 18);
  const elapsedStr = `0:${elapsed.toString().padStart(2, '0')}`;

  return (
    <div style={{
      border: `1px solid ${isWet ? `rgba(${accentRGB},0.22)` : 'rgba(255,255,255,0.07)'}`,
      background: isWet ? `rgba(${accentRGB},0.04)` : 'rgba(255,255,255,0.015)',
      borderRadius: 0,
      paddingTop: '1rem', paddingBottom: '1rem',
      paddingLeft: '1.2rem', paddingRight: '1.2rem',
      marginTop: '0.8rem',
    }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Music size={11} color={isWet ? accentColor : 'rgba(255,255,255,0.3)'} strokeWidth={1.5} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: isWet ? `rgba(${accentRGB},0.75)` : 'rgba(255,255,255,0.35)',
          }}>
            {label}
          </span>
        </div>
        {/* Placeholder badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          border: '1px dashed rgba(196,154,108,0.2)',
          padding: '2px 7px',
        }}>
          <Upload size={8} color="rgba(196,154,108,0.35)" strokeWidth={2} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.32)',
          }}>
            Preview Pending
          </span>
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        {/* Play/pause */}
        <motion.button
          onClick={() => siteConfig.audioDemosEnabled && setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          disabled={!siteConfig.audioDemosEnabled}
          aria-label={`${demoName} audio preview pending`}
          style={{
            cursor: siteConfig.audioDemosEnabled ? 'pointer' : 'not-allowed',
            opacity: siteConfig.audioDemosEnabled ? 1 : 0.62,
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            border: `1px solid ${isWet ? `rgba(${accentRGB},0.4)` : 'rgba(255,255,255,0.15)'}`,
            background: isWet ? `rgba(${accentRGB},0.12)` : 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {isPlaying
            ? <Pause size={13} color={isWet ? accentColor : 'rgba(255,255,255,0.5)'} strokeWidth={2} />
            : <Play size={13} color={isWet ? accentColor : 'rgba(255,255,255,0.5)'} strokeWidth={2} style={{ marginLeft: 1 }} />
          }
        </motion.button>

        {/* Progress bar */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            height: 3, borderRadius: 2,
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden', cursor: 'pointer',
          }}
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}
          >
            <motion.div
              style={{
                height: '100%', borderRadius: 2,
                background: isWet
                  ? `linear-gradient(90deg, rgba(${accentRGB},0.7), rgba(${accentRGB},1))`
                  : 'rgba(255,255,255,0.3)',
                width: `${progress}%`,
              }}
              transition={{ duration: 0 }}
            />
          </div>
          {/* Playhead dot */}
          {isPlaying && (
            <motion.div
              style={{
                position: 'absolute', top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 8, height: 8, borderRadius: '50%',
                background: isWet ? accentColor : 'rgba(255,255,255,0.6)',
                boxShadow: isWet ? `0 0 6px ${accentColor}` : 'none',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        {/* Time */}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)',
          flexShrink: 0, minWidth: 38, textAlign: 'right',
        }}>
          {siteConfig.audioDemosEnabled ? (isPlaying ? elapsedStr : `0:00`) : '--:--'} / {duration}
        </span>

        <Volume2 size={12} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
      </div>

      {/* Simulated mini waveform bars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: '0.65rem', height: 20, overflow: 'hidden' }}>
        {Array.from({ length: 60 }).map((_, i) => {
          const h = isWet
            ? Math.abs(Math.sin(i * 0.4) * 0.5 + Math.sin(i * 0.15) * 0.3 + Math.sin(i * 0.9) * 0.2) * 18 + 2
            : Math.abs(Math.sin(i * 0.3)) * 8 + 2;
          const played = (i / 60) * 100 < progress;
          return (
            <div
              key={i}
              style={{
                width: 2, flexShrink: 0,
                height: h,
                borderRadius: 1,
                background: played
                  ? isWet ? `rgba(${accentRGB},0.75)` : 'rgba(255,255,255,0.45)'
                  : isWet ? `rgba(${accentRGB},0.2)` : 'rgba(255,255,255,0.1)',
                transition: 'background 0.1s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function AudioDemoSection() {
  const [active, setActive] = useState(0);
  const [isWet, setIsWet] = useState(true);
  const demo = demos[active];
  const isMobile = useIsMobile();

  const handleAccessRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent(`Audio preview access request - ${demo.name}`)}`;
  };

  return (
    <section data-buildout-section="audio-demo" style={{ position: 'relative', background: '#1A1714', paddingTop: '12vh', paddingBottom: '12vh', overflow: 'hidden' }}>
      {/* Top/Bottom hairlines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.12) 30%, rgba(196,154,108,0.08) 70%, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.08) 30%, rgba(196,154,108,0.06) 70%, transparent)' }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '40vh', background: `radial-gradient(ellipse, rgba(${demo.accentRGB},0.05) 0%, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none', transition: 'background 0.8s' }} />

      <div style={{ position: 'relative', zIndex: 1, paddingLeft: '7vw', paddingRight: '7vw' }}>

        {/* Banner — eliminar cuando audio real esté listo */}
        <AudioComingSoonBanner />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.4)', marginBottom: '0.9rem' }}>
              SOUND IN ACTION
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', letterSpacing: '0.04em', lineHeight: 0.9, textTransform: 'uppercase', color: 'rgba(244,239,232,0.9)', margin: 0 }}>
              Hear the Difference.
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem, 3.2vw, 3.2rem)', letterSpacing: '0.02em', lineHeight: 1, margin: '0.5rem 0 0', backgroundImage: `linear-gradient(110deg, ${demo.accentColor}, #EDD4A4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', transition: 'background-image 0.4s' }}>
              Before &amp; After.
            </h2>
          </motion.div>

          {/* Plugin tab selector */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {demos.map((d, i) => (
              <button
                key={d.id}
                onClick={() => { setActive(i); setIsWet(true); }}
                style={{
                  cursor: 'pointer',
                  border: `1px solid ${i === active ? `rgba(${d.accentRGB},0.5)` : 'rgba(255,255,255,0.08)'}`,
                  background: i === active ? `rgba(${d.accentRGB},0.1)` : 'rgba(255,255,255,0.02)',
                  borderRadius: 0,
                  padding: '0.6rem 1.1rem',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.72rem',
                  fontWeight: i === active ? 700 : 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: i === active ? d.accentColor : 'rgba(224,213,197,0.4)',
                  transition: 'all 0.2s',
                }}
              >
                {d.name.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main demo panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            style={{
              borderRadius: 0,
              border: `1px solid rgba(${demo.accentRGB},0.15)`,
              background: 'rgba(8,8,6,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Top bar — DAW-style title bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.9rem', paddingBottom: '0.9rem', paddingLeft: '1.6rem', paddingRight: '1.6rem', borderBottom: `1px solid rgba(${demo.accentRGB},0.1)`, background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: `rgba(${demo.accentRGB},0.5)` }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${demo.accentRGB},0.7)` }}>
                  SCI-FI ELECTRONICS | {demo.name}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['4K', 'MONO', '44.1'].map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(196,154,108,0.3)', padding: '2px 6px', border: '1px solid rgba(196,154,108,0.1)', borderRadius: 4 }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: 0 }} className="max-lg:grid-cols-1">
              {/* Waveform area */}
              <div style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem', paddingLeft: '1.6rem', paddingRight: '1.6rem', borderRight: `1px solid rgba(${demo.accentRGB},0.08)` }} className="lg:border-r-[1px]">

                {/* DRY / WET toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                  <button
                    onClick={() => setIsWet(false)}
                    style={{
                      cursor: 'pointer',
                      border: `1px solid ${!isWet ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      background: !isWet ? 'rgba(255,255,255,0.06)' : 'transparent',
                      borderRadius: 0,
                      paddingTop: '0.5rem', paddingBottom: '0.5rem',
                      paddingLeft: '1.1rem', paddingRight: '1.1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: !isWet ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {demo.dryLabel}
                  </button>
                  <div style={{ height: 1, width: 30, background: 'rgba(255,255,255,0.1)' }} />
                  <button
                    onClick={() => setIsWet(true)}
                    style={{
                      cursor: 'pointer',
                      border: `1px solid ${isWet ? `rgba(${demo.accentRGB},0.55)` : 'rgba(255,255,255,0.08)'}`,
                      background: isWet ? `rgba(${demo.accentRGB},0.1)` : 'transparent',
                      borderRadius: 0,
                      paddingTop: '0.5rem', paddingBottom: '0.5rem',
                      paddingLeft: '1.1rem', paddingRight: '1.1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: isWet ? demo.accentColor : 'rgba(255,255,255,0.3)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {demo.wetLabel}
                  </button>

                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: isWet ? demo.accentColor : 'rgba(255,255,255,0.4)', boxShadow: isWet ? `0 0 8px ${demo.accentColor}` : 'none', marginLeft: 'auto', flexShrink: 0 }}
                  />
                </div>

                {/* Waveform canvas */}
                <div style={{ height: 172, borderRadius: 0, overflow: 'hidden', background: 'rgba(0,0,0,0.35)', border: `1px solid rgba(${demo.accentRGB},0.1)` }}>
                  <WaveformCanvas
                    waveType={demo.waveType}
                    isWet={isWet}
                    accentColor={demo.accentColor}
                    accentRGB={demo.accentRGB}
                  />
                </div>

                {/* Description */}
                <div style={{ marginTop: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(224,213,197,0.5)', lineHeight: 1.6 }}>
                  {isWet ? demo.wetDesc : demo.dryDesc}
                </div>

                {/* ── Audio players — placeholder UI ready for real clips ── */}
                <div style={{ marginTop: '1.4rem' }}>
                  <AudioPlayer
                    label="Dry Signal"
                    isWet={false}
                    accentColor={demo.accentColor}
                    accentRGB={demo.accentRGB}
                    demoName={demo.name}
                  />
                  <AudioPlayer
                    label={demo.name}
                    isWet={true}
                    accentColor={demo.accentColor}
                    accentRGB={demo.accentRGB}
                    demoName={demo.name}
                  />
                </div>
              </div>

              {/* Right: specs + CTA */}
              <div style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem', paddingLeft: '1.6rem', paddingRight: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em', color: '#FEFCF9', lineHeight: 1, marginBottom: '0.4rem' }}>
                    {demo.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '0.92rem', color: demo.accentColor, opacity: 0.85 }}>
                    {demo.tagline}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {demo.specs.map(spec => (
                    <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: demo.accentColor, opacity: 0.7, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.06em', color: 'rgba(224,213,197,0.6)' }}>
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: `rgba(${demo.accentRGB},0.12)` }} />

                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2.2rem', color: demo.accentColor, lineHeight: 1 }}>
                    ${demo.price}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(196,154,108,0.38)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
                    One-time | No subscription
                  </div>
                </div>

                <GoldCTAButton
                  onClick={handleAccessRequest}
                  paddingTop="13px"
                  paddingBottom="13px"
                  paddingLeft="20px"
                  paddingRight="20px"
                  fontSize="0.68rem"
                  letterSpacing="0.22em"
                  borderRadius={1}
                  width="100%"
                >
                  Request Access - ${demo.price}
                </GoldCTAButton>

                {/* Trust line */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  paddingTop: '0.6rem',
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: `rgba(${demo.accentRGB},0.5)`, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: `rgba(${demo.accentRGB},0.45)` }}>
                    Contact Fallback | No Subscription
                  </span>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
