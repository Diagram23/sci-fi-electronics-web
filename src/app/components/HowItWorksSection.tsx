/**
 * HowItWorksSection - current access flow and platform compatibility.
 */
import { motion } from 'framer-motion';
import { Mail, KeyRound, SlidersHorizontal, CheckCircle2, Cpu, HardDrive } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: SlidersHorizontal,
    title: 'Choose Signal Path',
    body: 'Select Fractal Delay, a single instrument, the Archive material, or the complete collection. The public checkout is intentionally disabled until final production links are connected.',
    detail: 'Clear scope | No fake checkout',
  },
  {
    num: '02',
    icon: Mail,
    title: 'Contact Sales',
    body: 'Purchase, licensing and early-access requests route through the sales inbox for now. This keeps the page honest while the commercial infrastructure is prepared.',
    detail: 'Manual flow | Real inbox',
  },
  {
    num: '03',
    icon: KeyRound,
    title: 'Receive Assets',
    body: 'When production delivery is enabled, installers, licenses and audio assets will follow the same signal system: clear download, clear license, no confusing launcher layer.',
    detail: 'Production delivery pending',
  },
];

const formats = [
  { name: 'VST3', note: 'Ableton, Cubase, Bitwig, FL Studio, Reaper' },
  { name: 'AU', note: 'Logic Pro X, GarageBand, MainStage' },
  { name: 'AAX', note: 'Pro Tools 11 and above' },
];

const platforms = [
  { icon: '  ', label: 'macOS', versions: 'Ventura | Sonoma | Sequoia', m1: true },
  { icon: '  ', label: 'Windows', versions: 'Windows 10 | 11', m1: false },
];

export default function HowItWorksSection() {
  return (
    <section data-buildout-section="how-it-works" style={{ position: 'relative', background: '#0E0C0A', overflow: 'hidden' }}>
      {/* Top hairline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.15) 30%, rgba(196,154,108,0.08) 70%, transparent)',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '70vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(196,154,108,0.028) 0%, transparent 65%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '10vh', paddingBottom: '10vh', paddingLeft: '7vw', paddingRight: '7vw' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          style={{ marginBottom: '6vh' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ width: 28, height: 1, background: 'rgba(196,154,108,0.4)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.4)',
            }}>
              From Interest to Access
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ margin: 0, lineHeight: 0.92 }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-ui)', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                letterSpacing: '-0.022em', color: '#FEFCF9',
              }}>
                Clear path to
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(1.7rem, 3.4vw, 3.2rem)',
                backgroundImage: 'linear-gradient(110deg, #C49A6C, #EDD4A4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                production access.
              </span>
            </h2>
            {/* Time badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                border: '1px solid rgba(196,154,108,0.2)',
                background: 'rgba(196,154,108,0.05)',
                padding: '1rem 1.6rem',
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: '2.2rem', color: '#C49A6C', lineHeight: 1,
              }}>V1</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.26em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.35)', marginTop: 6,
              }}>Access Flow</div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── 3-step flow ── */}
        <div style={{ display: 'grid', gap: 1 }} className="grid-cols-1 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.65, delay: i * 0.14 }}
                style={{
                  position: 'relative',
                  padding: '2.4rem 2.2rem',
                  background: 'rgba(255,255,255,0.016)',
                  border: '1px solid rgba(196,154,108,0.1)',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, rgba(196,154,108,${0.6 - i * 0.1}) 0%, rgba(196,154,108,0.12) 100%)`,
                }} />

                {/* Step number — large bg ghost */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1.4rem',
                  fontFamily: 'var(--font-display)', fontWeight: 300,
                  fontSize: '5rem', lineHeight: 1,
                  color: 'rgba(196,154,108,0.04)',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '1px solid rgba(196,154,108,0.2)',
                  background: 'rgba(196,154,108,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.4rem',
                }}>
                  <Icon size={18} color="rgba(196,154,108,0.7)" strokeWidth={1.5} />
                </div>

                {/* Step label */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.45)', marginBottom: '0.65rem',
                }}>
                  Step {step.num}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 700,
                  fontSize: '1.05rem', letterSpacing: '-0.01em',
                  color: 'rgba(254,252,249,0.88)', margin: '0 0 0.9rem',
                }}>
                  {step.title}
                </h3>

                {/* Body */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 300,
                  fontSize: '0.88rem', color: 'rgba(224,213,197,0.72)',
                  lineHeight: 1.78, margin: 0,
                }}>
                  {step.body}
                </p>

                {/* Detail pill */}
                <div style={{
                  marginTop: '1.4rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  border: '1px solid rgba(196,154,108,0.15)',
                  padding: '5px 12px',
                }}>
                  <CheckCircle2 size={10} color="rgba(27,107,90,0.7)" strokeWidth={2} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.65)',
                  }}>
                    {step.detail}
                  </span>
                </div>

                {/* Connector arrow — only on first two */}
                {i < 2 && (
                  <div
                    className="hidden md:flex"
                    style={{
                      position: 'absolute', top: '50%', right: -1,
                      transform: 'translateY(-50%)',
                      width: 2, height: 32,
                      background: 'linear-gradient(to bottom, transparent, rgba(196,154,108,0.3), transparent)',
                      zIndex: 2,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Platform & Format grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ marginTop: '4vh' }}
        >
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.12) 30%, rgba(196,154,108,0.06) 70%, transparent)', marginBottom: '3vh' }} />

          <div style={{ display: 'grid', gap: '2rem' }} className="grid-cols-1 md:grid-cols-2">

            {/* Plugin formats */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Cpu size={14} color="rgba(196,154,108,0.45)" strokeWidth={1.5} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.4)' }}>
                  Plugin Formats
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {formats.map(f => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: 48, flexShrink: 0,
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      letterSpacing: '0.12em', fontWeight: 700,
                      color: 'rgba(196,154,108,0.75)',
                      border: '1px solid rgba(196,154,108,0.2)',
                      padding: '3px 8px', textAlign: 'center',
                    }}>
                      {f.name}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(224,213,197,0.62)', fontWeight: 300 }}>
                      {f.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform compatibility */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <HardDrive size={14} color="rgba(196,154,108,0.45)" strokeWidth={1.5} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.4)' }}>
                  Platform Compatibility
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {platforms.map(p => (
                  <div key={p.label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(196,154,108,0.08)',
                    background: 'rgba(255,255,255,0.014)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(224,213,197,0.7)' }}>
                        {p.label}
                      </span>
                      {p.m1 && (
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                          letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'rgba(27,107,90,0.75)',
                          border: '1px solid rgba(27,107,90,0.2)',
                          padding: '2px 7px',
                        }}>
                          Apple Silicon Native
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(224,213,197,0.55)', fontWeight: 300 }}>
                      {p.versions}
                    </span>
                  </div>
                ))}
              </div>
              {/* No iLok note */}
              <div style={{
                marginTop: '0.8rem',
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.65rem 1rem',
                border: '1px solid rgba(27,107,90,0.15)',
                background: 'rgba(27,107,90,0.04)',
              }}>
                <CheckCircle2 size={12} color="rgba(27,107,90,0.65)" strokeWidth={2} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(27,107,90,0.80)' }}>
                  License Delivery Pending | Works Offline Planned
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom hairline */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.1) 30%, rgba(196,154,108,0.06) 70%, transparent)',
      }} />
    </section>
  );
}
