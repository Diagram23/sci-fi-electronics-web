/**
 * DawCompatibilityStrip
 * La señal de confianza #1 para DJs y productores:
 * "Funciona en mi DAW?" - answered before producers ask.
 */
import { motion } from 'framer-motion';
import { useIsMobile } from '@/app/hooks/useIsMobile';

const AMBER     = '#C49A6C';
const AMBER_RGB = '196,154,108';

// ─── DAW Icons — geometric representations inspiradas en cada DAW ─────────────
function AbletonIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2"  y="2"  width="9" height="9" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="13" y="2"  width="9" height="9" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="2"  y="13" width="9" height="9" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="13" y="13" width="9" height="9" rx="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function FLStudioIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" fill="currentColor" opacity="0.15" />
      <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function LogicProIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.9" />
      <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
      <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    </svg>
  );
}

function ReaperIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4 L4 20 L8 20 L8 14 L13 20 L17 20 L11 13 Q16 12 16 8 Q16 4 11 4 Z" fill="currentColor" opacity="0.9" />
      <path d="M11 4 Q15 4 15 8 Q15 12 11 12 L8 12 L8 4 Z" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// ─── DAW list ─────────────────────────────────────────────────────────────────
const DAWS = [
  { name: 'Ableton Live', version: '10+', Icon: AbletonIcon },
  { name: 'FL Studio',    version: '20+', Icon: FLStudioIcon },
  { name: 'Logic Pro',    version: 'X+',  Icon: LogicProIcon },
  { name: 'Reaper',       version: '6+',  Icon: ReaperIcon   },
];

// ─── Stats strip ──────────────────────────────────────────────────────────────
const STATS = [
  { value: '4', label: 'Instruments' },
  { value: '∞',      label: 'Updates'   },
];

export default function DawCompatibilityStrip() {
  const isMobile = useIsMobile();

  return (
    <motion.section
      data-buildout-section="daw-compatibility"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(8,6,4,0.96)',
        borderTop: '1px solid rgba(196,154,108,0.07)',
        borderBottom: '1px solid rgba(196,154,108,0.07)',
        overflow: 'hidden',
        paddingTop: isMobile ? '3rem' : '4rem',
        paddingBottom: isMobile ? '3rem' : '4rem',
        paddingLeft: isMobile ? '6vw' : '7vw',
        paddingRight: isMobile ? '6vw' : '7vw',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '200px',
        background: `radial-gradient(ellipse, rgba(${AMBER_RGB},0.04) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '2.5rem' : '3rem',
      }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: `rgba(${AMBER_RGB},0.48)`,
              marginBottom: '0.5rem',
            }}>
              Plugin Compatibility
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: isMobile ? '1.6rem' : 'clamp(1.6rem, 2.2vw, 2.2rem)',
              color: 'rgba(252,248,242,0.92)',
              lineHeight: 1.1,
              margin: 0,
            }}>
              Works in <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(135deg, ${AMBER} 0%, #E8C99A 50%, #B8936D 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>every major DAW</span>
            </h3>
          </div>

          {/* Format badges */}
          <div style={{
            display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {['VST3'].map(fmt => (
              <span key={fmt} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: AMBER,
                border: `1px solid rgba(${AMBER_RGB},0.25)`,
                background: `rgba(${AMBER_RGB},0.06)`,
                paddingTop: 5, paddingBottom: 5,
                paddingLeft: 10, paddingRight: 10,
              }}>
                {fmt}
              </span>
            ))}
          </div>
        </div>

        {/* ── DAW Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '0.8rem' : '1rem',
        }}>
          {DAWS.map(({ name, version, Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                padding: isMobile ? '1rem 0.6rem' : '1.4rem 1rem',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.055)',
                borderRadius: 12,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{
                background: `rgba(${AMBER_RGB},0.06)`,
                borderColor: `rgba(${AMBER_RGB},0.18)`,
                y: -3,
              }}
            >
              {/* Icon */}
              <div style={{ color: `rgba(${AMBER_RGB},0.80)` }}>
                <Icon size={isMobile ? 20 : 24} />
              </div>

              {/* Name */}
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: isMobile ? '0.68rem' : '0.76rem',
                letterSpacing: '0.04em',
                color: 'rgba(224,213,197,0.92)',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {name}
              </span>

              {/* Version */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.60rem',
                letterSpacing: '0.16em',
                color: `rgba(${AMBER_RGB},0.72)`,
                textAlign: 'center',
              }}>
                v{version}
              </span>

              {/* Green verified dot */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.32rem',
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'rgba(27,107,90,0.90)',
                  boxShadow: '0 0 6px rgba(27,107,90,0.5)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(42,138,114,0.88)',
                }}>
                  Target
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '1.5rem' : '3.5rem',
          flexWrap: 'wrap',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(196,154,108,0.06)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '1.5rem' : '3.5rem',
            }}>
              {i > 0 && !isMobile && (
                <div style={{ width: 1, height: 24, background: 'rgba(196,154,108,0.12)' }} />
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontSize: isMobile ? '1.5rem' : '1.9rem',
                  color: AMBER,
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.78)',
                }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── OS compatibility ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          {[
            { os: 'macOS', detail: '10.13 High Sierra +' },
            { os: 'Windows', detail: '10 / 11 (64-bit)' },
          ].map(({ os, detail }) => (
            <div key={os} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'rgba(27,107,90,0.88)',
                boxShadow: '0 0 8px rgba(27,107,90,0.50)',
              }} />
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.80rem',
                fontWeight: 600,
                color: 'rgba(224,213,197,0.92)',
              }}>
                {os}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.64rem',
                letterSpacing: '0.10em',
                color: 'rgba(196,154,108,0.72)',
              }}>
                {detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
