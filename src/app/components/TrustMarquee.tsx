/**
 * TrustMarquee — twin strip
 * Fila 1: DAW compatibility (verificable, real)
 * Fila 2: Especificaciones técnicas del producto (verificables)
 * NOTA: stats de usuarios se añadirán post-lanzamiento con datos reales.
 */
import { motion } from 'framer-motion';

const daws = [
  { name: 'Ableton Live',  note: 'FULL SUPPORT'  },
  { name: 'Logic Pro X',   note: 'FULL SUPPORT'  },
  { name: 'Pro Tools',     note: 'AAX NATIVE'    },
  { name: 'FL Studio',     note: 'VST3'          },
  { name: 'Cubase',        note: 'VST3'          },
  { name: 'Studio One',    note: 'VST3 · AU'     },
  { name: 'Reaper',        note: 'VST3'          },
  { name: 'Bitwig',        note: 'VST3'          },
  { name: 'GarageBand',    note: 'AU'            },
  { name: 'Reason',        note: 'VST3'          },
];

// Specs técnicas verificables — sin afirmaciones de usuarios inventados
const specs = [
  { stat: '192kHz',    label: 'Max Sample Rate'    },
  { stat: '32-bit',    label: 'Float Processing'   },
  { stat: '< 1ms',     label: 'Reported Latency'   },
  { stat: 'VST3',      label: 'AU · AAX'           },
  { stat: 'macOS',     label: 'Windows'            },
  { stat: 'No Sub',    label: 'One-Time Price'      },
  { stat: 'Contact',   label: 'Sales Flow'          },
  { stat: 'Lifetime',  label: 'Free Updates'       },
  { stat: '4 Plugins', label: 'Full Bundle'        },
];

// ─── Fila marquee ─────────────────────────────────────────────
function MarqueeRow({
  items,
  direction = 'left',
  duration = 40,
}: {
  items: { primary: string; secondary: string }[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, zIndex: 1,
        background: 'linear-gradient(to right, #0E0B08, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, zIndex: 1,
        background: 'linear-gradient(to left, #0E0B08, transparent)',
        pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              paddingLeft: '1.8rem', paddingRight: '1.8rem',
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(224,213,197,0.72)',
              whiteSpace: 'nowrap',
            }}>
              {item.primary}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.42)',
              whiteSpace: 'nowrap',
            }}>
              {item.secondary}
            </span>
            <div style={{
              width: 3, height: 3,
              background: 'rgba(196,154,108,0.22)',
              flexShrink: 0,
            }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TrustMarquee() {
  const dawItems = daws.map(d => ({ primary: d.name, secondary: d.note }));
  const specItems = specs.map(s => ({ primary: s.stat, secondary: s.label }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Hairline top */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.08) 30%, rgba(196,154,108,0.06) 70%, transparent)',
      }} />

      {/* Row 1 — DAW compatibility */}
      <div style={{
        paddingTop: '0.85rem', paddingBottom: '0.85rem',
        background: 'rgba(8,6,4,0.7)',
      }}>
        <MarqueeRow items={dawItems} direction="left" duration={38} />
      </div>

      {/* Separator */}
      <div style={{
        height: 1,
        background: 'rgba(255,255,255,0.03)',
      }} />

      {/* Row 2 — Technical specs */}
      <div style={{
        paddingTop: '0.85rem', paddingBottom: '0.85rem',
        background: 'rgba(6,5,3,0.7)',
      }}>
        <MarqueeRow items={specItems} direction="right" duration={44} />
      </div>

      {/* Hairline bottom */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.08) 30%, rgba(196,154,108,0.06) 70%, transparent)',
      }} />
    </div>
  );
}
