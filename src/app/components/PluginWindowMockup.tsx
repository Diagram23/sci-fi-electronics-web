import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export type PluginVisualVariant = 'reverb' | 'delay' | 'gate' | 'distortion';

// ─── Per-plugin parameters ──────────────────────────────────────────────────
const PLUGIN_CONFIG: Record<PluginVisualVariant, {
  knobs: Array<{ label: string; value: number }>;
  preset: string;
  cpu: string;
}> = {
  reverb:     { preset: 'STELLAR VOID',      cpu: '4.2%',  knobs: [{ label: 'SIZE', value: 0.72 }, { label: 'DECAY', value: 0.65 }, { label: 'PRE-DLY', value: 0.28 }, { label: 'DIFFUSE', value: 0.58 }, { label: 'MIX', value: 0.75 }] },
  delay:      { preset: 'GOLDEN SPIRAL',     cpu: '7.8%',  knobs: [{ label: 'TIME', value: 0.50 }, { label: 'FEEDBACK', value: 0.45 }, { label: 'SPREAD', value: 0.62 }, { label: 'MOD', value: 0.38 }, { label: 'MIX', value: 0.68 }] },
  gate:       { preset: 'SPECTRAL SCALPEL',  cpu: '11.4%', knobs: [{ label: 'THRESH', value: 0.38 }, { label: 'ATTACK', value: 0.22 }, { label: 'RELEASE', value: 0.55 }, { label: 'BANDS', value: 0.85 }, { label: 'MIX', value: 0.92 }] },
  distortion: { preset: 'PLASMA SURGE',      cpu: '5.9%',  knobs: [{ label: 'DRIVE', value: 0.78 }, { label: 'TONE', value: 0.52 }, { label: 'HARM', value: 0.65 }, { label: 'DYNA', value: 0.44 }, { label: 'MIX', value: 0.80 }] },
};

// ─── Static display visuals — pure CSS/SVG, zero canvas ─────────────────────
const STATIC_BARS: Record<PluginVisualVariant, number[]> = {
  reverb:     [0.12, 0.22, 0.38, 0.52, 0.66, 0.78, 0.88, 0.92, 0.88, 0.78, 0.66, 0.52, 0.38, 0.22, 0.12, 0.08, 0.14, 0.28, 0.44, 0.58, 0.70, 0.60, 0.44, 0.30, 0.18, 0.10],
  delay:      [0.80, 0.40, 0.75, 0.38, 0.68, 0.34, 0.60, 0.30, 0.52, 0.26, 0.45, 0.22, 0.38, 0.19, 0.32, 0.16, 0.26, 0.13, 0.20, 0.10, 0.15, 0.08, 0.11, 0.06, 0.08, 0.04],
  gate:       [0.18, 0.42, 0.88, 0.72, 0.55, 0.90, 0.65, 0.48, 0.82, 0.60, 0.44, 0.76, 0.58, 0.40, 0.72, 0.52, 0.36, 0.68, 0.48, 0.32, 0.62, 0.44, 0.28, 0.55, 0.38, 0.20],
  distortion: [0.95, 0.88, 0.78, 0.92, 0.85, 0.72, 0.88, 0.80, 0.68, 0.82, 0.74, 0.62, 0.76, 0.68, 0.55, 0.70, 0.62, 0.48, 0.64, 0.56, 0.42, 0.58, 0.50, 0.36, 0.52, 0.44],
};

function StaticDisplay({ variant, accentColor, accentRGB }: {
  variant: PluginVisualVariant;
  accentColor: string;
  accentRGB: string;
}) {
  const bars = STATIC_BARS[variant];
  const threshold = variant === 'gate' ? 0.55 : null;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, rgb(6,8,7), rgb(3,4,3))',
      display: 'flex', alignItems: 'flex-end',
      padding: '12px 14px 14px',
      gap: 2,
      position: 'relative',
    }}>
      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `radial-gradient(ellipse at 50% 82%, rgba(${accentRGB},0.10) 0%, transparent 68%)`,
        pointerEvents: 'none',
      }} />

      {/* Threshold line for gate */}
      {threshold !== null && (
        <div style={{
          position: 'absolute',
          bottom: `calc(14px + ${threshold * 100}%)`,
          left: 14, right: 14,
          height: 1,
          background: `rgba(${accentRGB},0.35)`,
          pointerEvents: 'none',
          zIndex: 2,
        }}>
          <span style={{
            position: 'absolute', right: 0, top: -10,
            fontFamily: 'var(--font-mono)', fontSize: '0.32rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: `rgba(${accentRGB},0.45)`,
          }}>
            THR
          </span>
        </div>
      )}

      {/* Frequency bars */}
      {bars.map((h, i) => {
        const isAbove = threshold !== null ? h > threshold : true;
        const alpha = isAbove
          ? 0.2 + h * 0.65
          : 0.1 + h * 0.25;
        const topAlpha = isAbove ? Math.min(0.95, alpha + 0.15) : 0;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h * 100}%`,
              borderRadius: '3px 3px 1px 1px',
              background: isAbove
                ? `rgba(${accentRGB},${alpha.toFixed(2)})`
                : `rgba(27,107,90,${(0.12 + h * 0.18).toFixed(2)})`,
              position: 'relative',
              minWidth: 0,
            }}
          >
            {/* Top highlight pixel */}
            {topAlpha > 0 && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2, borderRadius: '2px 2px 0 0',
                background: `rgba(230,205,158,${topAlpha.toFixed(2)})`,
              }} />
            )}
          </div>
        );
      })}

      {/* Scan-line overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        opacity: 0.5,
      }} />

      {/* Inner vignette */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)',
      }} />
    </div>
  );
}

// ─── Rotary Knob ─────────────────────────────────────────────────────────────
function Knob({ label, value, accentColor }: { label: string; value: number; accentColor: string }) {
  const filledDeg = value * 270;
  const bg = `conic-gradient(from 135deg, ${accentColor}bb 0deg ${filledDeg}deg, rgba(255,255,255,0.05) ${filledDeg}deg 270deg, transparent 270deg 360deg)`;
  const indicatorRot = -135 + filledDeg;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, userSelect: 'none' }}>
      <div style={{ position: 'relative', width: 36, height: 36, borderRadius: '50%', background: bg }}>
        <div style={{
          position: 'absolute', top: 5, left: 5, width: 26, height: 26,
          borderRadius: '50%',
          background: 'linear-gradient(145deg, rgba(46,43,38,0.97), rgba(20,18,15,0.99))',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <div style={{
            width: 1.5, height: 7, borderRadius: 1,
            background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
            transform: `rotate(${indicatorRot}deg)`,
            transformOrigin: 'center bottom',
            position: 'absolute', top: 3, left: '50%', marginLeft: -0.75,
          }} />
        </div>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(199,162,118,0.48)',
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── VU Meter ────────────────────────────────────────────────────────────────
function VUMeter({ level, accentColor, label }: { level: number; accentColor: string; label: string }) {
  const SEG = 14;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'center' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.35rem', letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(199,162,118,0.42)',
        writingMode: 'vertical-rl',
      }}>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 1.5, width: 7 }}>
        {Array.from({ length: SEG }).map((_, i) => {
          const segLvl = (i + 1) / SEG;
          const active = segLvl <= level;
          const isRed  = i >= SEG * 0.85;
          const isAmb  = i >= SEG * 0.65 && !isRed;
          return (
            <motion.div
              key={i}
              animate={{ opacity: active ? 1 : 0.07 }}
              transition={{ duration: 0.07 }}
              style={{
                height: 3, width: '100%', borderRadius: 1,
                background: active
                  ? isRed ? '#C05050' : isAmb ? '#C49A6C' : accentColor
                  : 'rgba(255,255,255,0.04)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Frequency mini-display ──────────────────────────────────────────────────
function FreqBadge({ accentColor, accentRGB }: { accentColor: string; accentRGB: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 2, padding: '6px 8px',
      background: 'rgba(0,0,0,0.55)',
      border: `1px solid rgba(${accentRGB},0.12)`,
      borderRadius: 4,
    }}>
      {[['SR', '192kHz'], ['BIT', '32-FP'], ['LAT', '0ms']].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.35rem', letterSpacing: '0.2em', color: 'rgba(196,154,108,0.25)' }}>{k}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.1em', color: `rgba(${accentRGB},0.55)` }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main PluginWindowMockup ─────────────────────────────────────────────────
interface Props {
  variant: PluginVisualVariant;
  pluginName: string;
  accentColor: string;
  accentRGB: string;
  motionKey?: string | number;
}

export default function PluginWindowMockup({ variant, pluginName, accentColor, accentRGB, motionKey }: Props) {
  const config = PLUGIN_CONFIG[variant];
  const [vuL, setVuL] = useState(0.68);
  const [vuR, setVuR] = useState(0.72);

  useEffect(() => {
    const id = setInterval(() => {
      setVuL(p => Math.min(0.93, Math.max(0.06, p + (Math.random() - 0.48) * 0.2)));
      setVuR(p => Math.min(0.93, Math.max(0.06, p + (Math.random() - 0.52) * 0.2)));
    }, 110);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={motionKey ?? variant}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          aspectRatio: '1.78 / 1',
          borderRadius: 10,
          overflow: 'hidden',
          background: 'linear-gradient(160deg, rgba(18,17,13,0.99), rgba(8,9,8,0.99))',
          border: `1px solid rgba(${accentRGB},0.22)`,
          boxShadow: `
            0 34px 88px rgba(0,0,0,0.74),
            0 0 0 1px rgba(${accentRGB},0.055),
            0 0 48px rgba(${accentRGB},0.045),
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 -1px 0 rgba(0,0,0,0.5)
          `,
          position: 'relative',
        }}
      >
        {/* Lit top edge */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: `linear-gradient(90deg, transparent, rgba(${accentRGB},0.55) 30%, rgba(255,240,200,0.7) 50%, rgba(${accentRGB},0.55) 70%, transparent)`,
          zIndex: 10,
        }} />

        {/* ══ TITLE BAR ══ */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
          rowGap: 6,
          padding: '8px 13px',
          background: 'linear-gradient(90deg, rgba(14,13,10,0.99), rgba(20,17,13,0.99))',
          borderBottom: `1px solid rgba(${accentRGB},0.15)`,
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {['rgba(220,80,80,0.85)', 'rgba(200,160,50,0.85)', 'rgba(70,180,80,0.85)'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}` }} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(199,162,118,0.45)' }}>
              SCI-FI ELECTRONICS
            </span>
            <span style={{ width: 1, height: 9, background: `rgba(${accentRGB},0.3)`, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${accentRGB},0.92)`, textShadow: `0 0 8px rgba(${accentRGB},0.28)` }}>
              {pluginName}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            {['A/B', 'MIDI', 'AUTO'].map(btn => (
              <span key={btn} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.4rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.26)',
                border: '1px solid rgba(255,255,255,0.075)',
                padding: '2px 6px', borderRadius: 3, cursor: 'pointer',
              }}>
                {btn}
              </span>
            ))}
          </div>
        </div>

        {/* ══ MAIN DISPLAY ══ */}
        <div style={{ display: 'flex', alignItems: 'stretch', background: 'rgba(4,3,2,0.9)', position: 'relative' }}>
          {/* Left VU */}
          <div style={{
            width: 30, padding: '10px 0',
            display: 'flex', alignItems: 'stretch', justifyContent: 'center',
            background: 'rgba(0,0,0,0.45)',
            borderRight: `1px solid rgba(${accentRGB},0.1)`,
          }}>
            <VUMeter level={vuL} accentColor={accentColor} label="L" />
          </div>

          {/* Static display — no canvas */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', height: 'clamp(220px, 23vw, 340px)' }}>
            <StaticDisplay variant={variant} accentColor={accentColor} accentRGB={accentRGB} />
            {/* Freq badge */}
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 3 }}>
              <FreqBadge accentColor={accentColor} accentRGB={accentRGB} />
            </div>
          </div>

          {/* Right VU */}
          <div style={{
            width: 30, padding: '10px 0',
            display: 'flex', alignItems: 'stretch', justifyContent: 'center',
            background: 'rgba(0,0,0,0.45)',
            borderLeft: `1px solid rgba(${accentRGB},0.1)`,
          }}>
            <VUMeter level={vuR} accentColor={accentColor} label="R" />
          </div>
        </div>

        {/* ══ KNOBS ══ */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(16,14,12,0.99), rgba(20,18,14,0.99))',
          borderTop: `1px solid rgba(${accentRGB},0.08)`,
        }}>
          {/* Section label */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '7px', paddingBottom: '5px',
            paddingLeft: '14px', paddingRight: '14px',
            borderBottom: `1px solid rgba(${accentRGB},0.05)`,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
              letterSpacing: '0.30em', textTransform: 'uppercase',
              color: `rgba(${accentRGB},0.42)`,
            }}>
              Parameters
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 4, height: 4, borderRadius: '50%', background: `rgba(${accentRGB},0.65)` }}
              />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.42rem',
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: `rgba(${accentRGB},0.48)`,
              }}>
                Active
              </span>
            </div>
          </div>
          {/* Knobs row */}
          <div style={{
            padding: '10px 14px 13px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1vw, 0.85rem)',
          }}>
            {config.knobs.map(k => (
              <Knob key={k.label} label={k.label} value={k.value} accentColor={accentColor} />
            ))}
          </div>
        </div>

        {/* ══ STATUS BAR ══ */}
        <div style={{
          padding: '6px 12px',
          background: 'rgba(8,7,6,0.99)',
          borderTop: `1px solid rgba(${accentRGB},0.07)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <motion.span
              animate={{ opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ color: accentColor, fontSize: '0.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.16em' }}
            >
              RUN
            </motion.span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: `rgba(${accentRGB},0.68)` }}>
              {config.preset}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {[['CPU', config.cpu], ['FMT', 'VST3 / AU / AAX']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.43rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(199,162,118,0.34)' }}>{k}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', letterSpacing: '0.08em', color: 'rgba(199,162,118,0.58)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
