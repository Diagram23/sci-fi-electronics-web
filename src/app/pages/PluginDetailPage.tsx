import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPluginById, getRelatedPlugins } from '@/app/data/pluginsData';
import Footer from '@/app/components/Footer';
import PluginVisual, { type PluginVisualVariant } from '@/app/components/visuals/PluginVisual';
import { ArrowLeft, ArrowRight, Check, Shield, Mail, RefreshCw } from 'lucide-react';
import { useSEO } from '@/app/hooks/useSEO';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { siteConfig } from '@/app/config/siteConfig';

// Per-plugin accent map
const ACCENT: Record<string, { color: string; rgb: string; visual: PluginVisualVariant }> = {
  'quantum-reverb':    { color: '#C49A6C', rgb: '196,154,108', visual: 'reverb' },
  'fractal-delay':     { color: '#1B6B5A', rgb: '27,107,90',   visual: 'delay' },
  'spectral-gate':     { color: '#2A8A72', rgb: '42,138,114',  visual: 'gate' },
  'plasma-distortion': { color: '#B8936D', rgb: '184,147,109', visual: 'distortion' },
};

const GUARANTEES = [
  { icon: Shield,    label: '30-Day Money-Back' },
  { icon: Mail,      label: 'Contact Fallback' },
  { icon: RefreshCw, label: 'Lifetime Updates'  },
];

function Divider({ rgb }: { rgb: string }) {
  return (
    <div style={{
      width: '100%', height: 1,
      background: `linear-gradient(90deg, transparent, rgba(${rgb},0.1) 30%, rgba(${rgb},0.07) 70%, transparent)`,
    }} />
  );
}

export default function PluginDetailPage() {
  const { pluginId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const plugin = getPluginById(pluginId || '');
  const relatedPlugins = getRelatedPlugins(pluginId || '');

  useSEO(plugin ? {
    title: `${plugin.name} — ${plugin.tagline}`,
    description: plugin.description,
  } : { title: 'Plugin Not Found' });

  if (!plugin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.5)' }}>
          404 — Not Found
        </span>
        <Link to="/" style={{
          fontFamily: 'var(--font-body)', color: '#C49A6C',
          textDecoration: 'none', fontSize: '0.9rem',
        }}>
          Return Home
        </Link>
      </div>
    );
  }

  const accent = ACCENT[plugin.id] ?? { color: '#C49A6C', rgb: '196,154,108', visual: 'reverb' as PluginVisualVariant };

  const handleAccessRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent(`Plugin access request - ${plugin.name}`)}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1E1B16' }}>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        paddingTop: 'calc(var(--promo-h, 0px) + 100px)',
        paddingBottom: '8vh',
        paddingLeft: '7vw', paddingRight: '7vw',
      }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: 0, left: '30%', transform: 'translateX(-50%)',
          width: '70vw', height: '70vh',
          background: `radial-gradient(ellipse at top, rgba(${accent.rgb},0.07) 0%, transparent 60%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -3 }}
          style={{
            cursor: 'pointer', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(224,213,197,0.4)',
            marginBottom: '3.5rem', transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(224,213,197,0.75)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(224,213,197,0.4)'; }}
        >
          <ArrowLeft size={13} />
          Back
        </motion.button>

        {/* Two-column hero */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]"
          style={{
            gap: isMobile ? '2.5rem' : '6vw',
            alignItems: 'center',
          }}
        >
          {/* Left — identity + purchase */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Overline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
              <div style={{ width: 24, height: 1, background: `rgba(${accent.rgb},0.5)` }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.36em', textTransform: 'uppercase',
                color: `rgba(${accent.rgb},0.6)`,
              }}>
                SCI-FI ELECTRONICS
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              margin: '0 0 0.5rem',
              fontFamily: 'var(--font-display)',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: isMobile ? 'clamp(3rem, 15vw, 4.6rem)' : 'clamp(2.8rem, 6vw, 6.5rem)',
              letterSpacing: isMobile ? '0.035em' : '0.06em',
              lineHeight: isMobile ? 0.92 : 0.88,
              textTransform: 'uppercase',
              color: 'rgba(244,239,232,0.93)',
              whiteSpace: 'pre-line',
            }}>
              {isMobile ? plugin.name.replace(' ', '\n') : plugin.name}
            </h1>

            {/* Tagline */}
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
              fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
              color: accent.color, opacity: 0.85,
              marginBottom: '1.6rem',
            }}>
              {plugin.tagline}
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300,
              fontSize: '1rem', lineHeight: 1.78,
              color: 'rgba(224,213,197,0.62)',
              maxWidth: '52ch', margin: '0 0 2.4rem',
            }}>
              {plugin.description}
            </p>

            {/* Formats */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.4rem' }}>
              {plugin.specs.formats.map(f => (
                <span key={f} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: `rgba(${accent.rgb},0.55)`,
                  border: `1px solid rgba(${accent.rgb},0.15)`,
                  padding: '4px 10px',
                }}>
                  {f}
                </span>
              ))}
              {plugin.specs.platforms.map(p => (
                <span key={p} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(224,213,197,0.3)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  padding: '4px 10px',
                }}>
                  {p}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 300,
                  fontSize: '3.8rem', lineHeight: 1, color: accent.color,
                }}>
                  ${plugin.price}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)', marginTop: 4,
                }}>
                  One-time pricing
                </div>
              </div>

              <motion.button
                onClick={handleAccessRequest}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  cursor: 'pointer', border: 'none',
                  background: 'linear-gradient(135deg, #2A1A08 0%, #5E3E18 30%, #9A7040 55%, #5E3E18 80%, #2A1A08 100%)',
                  paddingTop: '1rem', paddingBottom: '1rem',
                  paddingLeft: '2.6rem', paddingRight: '2.6rem',
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                  fontSize: '0.78rem', letterSpacing: '0.24em', textTransform: 'uppercase',
                  color: '#0B0907',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.45)',
                }}
              >
                Request Access
                <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* Guarantees */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
              {GUARANTEES.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Icon size={10} color={`rgba(${accent.rgb},0.45)`} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: `rgba(${accent.rgb},0.42)`,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              top: isMobile ? '-18px' : '-40px',
              right: isMobile ? '-18px' : '-40px',
              bottom: isMobile ? '-18px' : '-40px',
              left: isMobile ? '-18px' : '-40px',
              background: `radial-gradient(ellipse, rgba(${accent.rgb},0.12) 0%, transparent 65%)`,
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative',
              border: `1px solid rgba(${accent.rgb},0.18)`,
              background: 'rgba(0,0,0,0.4)',
              overflow: 'hidden',
            }}>
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, rgba(${accent.rgb},0.6) 40%, rgba(${accent.rgb},0.4) 60%, transparent)` }} />
              <PluginVisual variant={accent.visual} size={isMobile ? 300 : 400} />
            </div>
          </motion.div>
        </div>
      </section>

      <Divider rgb={accent.rgb} />

      {/* ═══════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════ */}
      <section style={{ paddingTop: '8vh', paddingBottom: '8vh', paddingLeft: '7vw', paddingRight: '7vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4vh' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
            <div style={{ width: 20, height: 1, background: `rgba(${accent.rgb},0.45)` }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.36em', textTransform: 'uppercase',
              color: `rgba(${accent.rgb},0.55)`,
            }}>
              Capabilities
            </span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: 'rgba(244,239,232,0.9)',
          }}>
            What it does.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
        }}
          className="max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {plugin.features.map((feat, i) => (
            <motion.div
              key={feat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              style={{
                paddingTop: '1.8rem', paddingBottom: '1.8rem',
                paddingLeft: '2rem', paddingRight: '2rem',
                border: `1px solid rgba(${accent.rgb},0.08)`,
                background: `rgba(${accent.rgb},0.02)`,
                display: 'flex', alignItems: 'flex-start', gap: '0.9rem',
              }}
            >
              <div style={{
                marginTop: 4, width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                border: `1px solid rgba(${accent.rgb},0.35)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={9} color={accent.color} strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'rgba(224,213,197,0.72)', lineHeight: 1.6,
              }}>
                {feat}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider rgb={accent.rgb} />

      {/* ═══════════════════════════════════════════════
          TECHNICAL SPECS + DESCRIPTION — 2-col
      ═══════════════════════════════════════════════ */}
      <section style={{ paddingTop: '8vh', paddingBottom: '8vh', paddingLeft: '7vw', paddingRight: '7vw' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6vw',
        }}
          className="max-lg:grid-cols-1"
        >
          {/* Detailed description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
              <div style={{ width: 20, height: 1, background: `rgba(${accent.rgb},0.45)` }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.36em', textTransform: 'uppercase',
                color: `rgba(${accent.rgb},0.55)`,
              }}>
                The Engineering
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300,
              fontSize: '0.95rem', lineHeight: 1.82,
              color: 'rgba(224,213,197,0.65)',
              margin: 0,
            }}>
              {plugin.detailedDescription}
            </p>
          </motion.div>

          {/* Technical specs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem' }}>
              <div style={{ width: 20, height: 1, background: `rgba(${accent.rgb},0.45)` }} />
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.36em', textTransform: 'uppercase',
                color: `rgba(${accent.rgb},0.55)`,
              }}>
                Specifications
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Formats',    value: plugin.specs.formats.join('  ·  ') },
                { label: 'Platforms',  value: plugin.specs.platforms.join('  ·  ') },
                { label: 'Latency',    value: plugin.specs.latency },
                { label: 'CPU Usage',  value: plugin.specs.cpuUsage },
                { label: 'Resolution', value: plugin.specs.resolution },
              ].map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    gap: '1rem',
                    paddingTop: i === 0 ? 0 : '1rem',
                    paddingBottom: '1rem',
                    borderBottom: `1px solid rgba(${accent.rgb},0.07)`,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: `rgba(${accent.rgb},0.45)`, flexShrink: 0,
                  }}>
                    {row.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    color: 'rgba(224,213,197,0.75)',
                    textAlign: 'right',
                  }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider rgb={accent.rgb} />

      {/* ═══════════════════════════════════════════════
          USE CASES
      ══════════════════════════════════════════════ */}
      <section style={{ paddingTop: '8vh', paddingBottom: '8vh', paddingLeft: '7vw', paddingRight: '7vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4vh' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
            <div style={{ width: 20, height: 1, background: `rgba(${accent.rgb},0.45)` }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.36em', textTransform: 'uppercase',
              color: `rgba(${accent.rgb},0.55)`,
            }}>
              Applications
            </span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: 'rgba(244,239,232,0.9)',
          }}>
            Built for.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
        }}
          className="max-sm:grid-cols-1"
        >
          {plugin.useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{
                padding: '2rem 2.2rem',
                border: `1px solid rgba(${accent.rgb},0.1)`,
                background: `linear-gradient(140deg, rgba(${accent.rgb},0.04) 0%, transparent 55%)`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, height: 2, width: '40%',
                background: `rgba(${accent.rgb},0.5)`,
              }} />
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: `rgba(${accent.rgb},0.6)`, marginBottom: '0.7rem',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                margin: '0 0 0.9rem',
                fontFamily: 'var(--font-ui)', fontWeight: 700,
                fontSize: '1.05rem', letterSpacing: '0.01em',
                color: 'rgba(254,252,249,0.88)',
              }}>
                {uc.title}
              </h3>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-body)', fontWeight: 300,
                fontSize: '0.875rem', lineHeight: 1.72,
                color: 'rgba(224,213,197,0.58)',
              }}>
                {uc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider rgb={accent.rgb} />

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section style={{ paddingTop: '8vh', paddingBottom: '8vh', paddingLeft: '7vw', paddingRight: '7vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4vh' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
            <div style={{ width: 20, height: 1, background: `rgba(${accent.rgb},0.45)` }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.36em', textTransform: 'uppercase',
              color: `rgba(${accent.rgb},0.55)`,
            }}>
              In the Field
            </span>
          </div>
          <h2 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600,
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: 'rgba(244,239,232,0.9)',
          }}>
            What artists say.
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
        }}
          className="max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {plugin.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                padding: '2rem 2rem 1.8rem',
                border: `1px solid rgba(${accent.rgb},0.1)`,
                background: `rgba(${accent.rgb},0.02)`,
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: '1.2rem' }}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={`rgba(${accent.rgb},0.85)`}>
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote style={{
                margin: '0 0 1.4rem',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                fontSize: '0.95rem', lineHeight: 1.72,
                color: 'rgba(224,213,197,0.82)', flex: 1,
              }}>
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.75rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(224,213,197,0.82)',
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: '0.78rem', color: `rgba(${accent.rgb},0.65)`, marginTop: 3,
                }}>
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider rgb={accent.rgb} />

      {/* ═══════════════════════════════════════════════
          RELATED PLUGINS
      ═══════════════════════════════════════════════ */}
      {relatedPlugins.length > 0 && (
        <>
          <section style={{ paddingTop: '8vh', paddingBottom: '8vh', paddingLeft: '7vw', paddingRight: '7vw' }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: '4vh' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.9rem' }}>
                <div style={{ width: 20, height: 1, background: 'rgba(196,154,108,0.4)' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  letterSpacing: '0.36em', textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.5)',
                }}>
                  You Might Also Like
                </span>
              </div>
              <h2 style={{
                margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 600,
                fontSize: 'clamp(1.5rem, 2.4vw, 2.4rem)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                color: 'rgba(244,239,232,0.88)',
              }}>
                Continue building your toolkit.
              </h2>
            </motion.div>

            <div style={{
              display: 'grid', gridTemplateColumns: `repeat(${Math.min(relatedPlugins.length, 3)}, 1fr)`, gap: '1px',
            }}
              className="max-lg:grid-cols-2 max-sm:grid-cols-1"
            >
              {relatedPlugins.map((rel, i) => {
                const ra = ACCENT[rel.id] ?? { color: '#C49A6C', rgb: '196,154,108', visual: 'reverb' as PluginVisualVariant };
                return (
                  <motion.div
                    key={rel.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <Link to={`/plugins/${rel.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          border: `1px solid rgba(${ra.rgb},0.12)`,
                          background: `rgba(${ra.rgb},0.02)`,
                          paddingTop: '2rem', paddingBottom: '2rem',
                          paddingLeft: '2rem', paddingRight: '2rem',
                          cursor: 'pointer',
                          transition: 'border-color 0.25s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(${ra.rgb},0.3)`; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(${ra.rgb},0.12)`; }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                          letterSpacing: '0.28em', textTransform: 'uppercase',
                          color: `rgba(${ra.rgb},0.55)`, marginBottom: '0.6rem',
                        }}>
                          {rel.tagline}
                        </div>
                        <h3 style={{
                          margin: '0 0 0.9rem',
                          fontFamily: 'var(--font-ui)', fontWeight: 800,
                          fontSize: '1.2rem', letterSpacing: '-0.01em',
                          color: 'rgba(254,252,249,0.88)',
                        }}>
                          {rel.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{
                            fontFamily: 'var(--font-display)', fontWeight: 300,
                            fontSize: '1.8rem', color: ra.color,
                          }}>
                            ${rel.price}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: `rgba(${ra.rgb},0.6)` }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                              View
                            </span>
                            <ArrowRight size={11} />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
          <Divider rgb={accent.rgb} />
        </>
      )}

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section style={{
        paddingTop: '10vh', paddingBottom: '10vh',
        paddingLeft: '7vw', paddingRight: '7vw',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw', height: '50vh',
          background: `radial-gradient(ellipse, rgba(${accent.rgb},0.06) 0%, transparent 65%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.36em', textTransform: 'uppercase',
            color: `rgba(${accent.rgb},0.5)`, marginBottom: '1rem',
          }}>
            {plugin.name}
          </div>

          <h2 style={{
            margin: '0 0 1rem',
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
            color: 'rgba(254,252,249,0.88)', lineHeight: 1,
          }}>
            Ready to transform your sound?
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 300,
            fontSize: '1rem', lineHeight: 1.7,
            color: 'rgba(224,213,197,0.52)',
            maxWidth: '38ch', margin: '0 auto 2.8rem',
          }}>
            Request commercial access while checkout and license delivery are finalized.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 300,
                fontSize: '3.2rem', lineHeight: 1, color: accent.color,
              }}>
                ${plugin.price}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', marginTop: 4,
              }}>
                One-time pricing
              </div>
            </div>

            <motion.button
              onClick={handleAccessRequest}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                cursor: 'pointer', border: 'none',
                background: 'linear-gradient(135deg, #2A1A08 0%, #5E3E18 30%, #9A7040 55%, #5E3E18 80%, #2A1A08 100%)',
                paddingTop: '1.1rem', paddingBottom: '1.1rem',
                paddingLeft: '3rem', paddingRight: '3rem',
                fontFamily: 'var(--font-ui)', fontWeight: 700,
                fontSize: '0.85rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                color: '#0B0907',
                display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
                boxShadow: `0 4px 32px rgba(${accent.rgb},0.25)`,
              }}
            >
              Request {plugin.name} - ${plugin.price}
              <ArrowRight size={14} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
