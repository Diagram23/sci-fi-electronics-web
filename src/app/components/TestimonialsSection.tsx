/**
 * TestimonialsSection — Professional Feedback / Social Proof
 * Ultra-premium editorial layout: featured quote + grid of cards
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useLanguage } from '@/app/context/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
const AMBER    = '196,154,108';
const JADE     = '27,107,90';
const BRONZE   = '184,147,109';

const featured = {
  name:    'Marcus Webb',
  role:    'Mix & Mastering Engineer',
  country: 'London, UK',
  initials:'MW',
  product: 'CTRLFILTER',
  productType: 'Neural Filter Plugin',
  accentRGB: AMBER,
  stars: 5,
  quote: 'CTRLFILTER is the first filter plugin that made me question everything I thought I knew about frequency sculpting. The neural engine responds to material in a way that feels more like working with a top-tier analog console than any digital tool I\'ve used in fifteen years. I\'ve stopped reaching for my vintage hardware.',
};

const cards = [
  {
    name:    'Elena Vasquez',
    role:    'Electronic Music Producer',
    country: 'Berlin, DE',
    initials:'EV',
    product: 'CHROMA',
    productType: 'Sample Pack',
    accentRGB: JADE,
    stars: 5,
    quote: 'The CHROMA kicks have a weight and character I haven\'t found anywhere else. Not sampled from the obvious machines — they feel designed. Three tracks dropped last month and every single A&R asked what I used on the low end.',
  },
  {
    name:    'James Okafor',
    role:    'Film & TV Composer',
    country: 'Los Angeles, CA',
    initials:'JO',
    product: 'CTRLFILTER',
    productType: 'Neural Filter Plugin',
    accentRGB: AMBER,
    stars: 5,
    quote: 'When you\'re scoring under deadline, you need tools that disappear and let you create. CTRLFILTER does exactly that — the modulation is intuitive, the sound is transparent when it needs to be and enormous when it doesn\'t.',
  },
  {
    name:    'Daria Petrov',
    role:    'Sound Designer · AAA Games',
    country: 'Stockholm, SE',
    initials:'DP',
    product: 'CHROMA',
    productType: 'Sample Pack',
    accentRGB: BRONZE,
    stars: 5,
    quote: 'The atmospheric loops in CHROMA opened up a whole new sonic palette for environmental audio. These aren\'t generic ambiences — there\'s a distinct texture and intelligence to each layer that makes them immediately usable and highly distinctive.',
  },
  {
    name:    'Nicolás Ramos',
    role:    'Producer & Mix Engineer',
    country: 'Madrid, ES',
    initials:'NR',
    product: 'CTRLFILTER',
    productType: 'Neural Filter Plugin',
    accentRGB: AMBER,
    stars: 5,
    quote: 'I\'ve been searching for something that does what CTRLFILTER does at the price it does it. The resonance character alone is worth every cent. My sessions sound more expensive in the same amount of time.',
  },
  {
    name:    'Kira Nakamura',
    role:    'DJ & Music Producer',
    country: 'Tokyo, JP',
    initials:'KN',
    product: 'CHROMA',
    productType: 'Sample Pack',
    accentRGB: JADE,
    stars: 5,
    quote: 'The percussion loops have a groove that\'s genuinely rare in sample packs — you can feel the human intent behind each hit. It sits in a mix without fighting, which saves me serious time in the arrangement stage.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ count = 5, rgb }: { count?: number; rgb: string }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={`rgba(${rgb},0.9)`}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, rgb }: { initials: string; rgb: string }) {
  return (
    <div style={{
      width: 48, height: 48, flexShrink: 0,
      border: `1px solid rgba(${rgb},0.30)`,
      background: `linear-gradient(135deg, rgba(${rgb},0.10) 0%, rgba(${rgb},0.04) 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontWeight: 300, fontSize: '1rem',
        color: `rgba(${rgb},0.70)`,
        letterSpacing: '0.03em',
      }}>{initials}</span>
    </div>
  );
}

function ProductBadge({ label, type, rgb }: { label: string; type: string; rgb: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ width: 16, height: 1, background: `rgba(${rgb},0.55)` }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: `rgba(${rgb},0.70)`,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: `rgba(${rgb},0.35)`,
        border: `1px solid rgba(${rgb},0.15)`,
        paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5,
      }}>
        {type}
      </span>
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard() {
  const f = featured;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        border: `1px solid rgba(${f.accentRGB},0.22)`,
        background: `linear-gradient(150deg, rgba(${f.accentRGB},0.07) 0%, rgba(8,7,6,0.0) 50%)`,
        padding: '3.6rem 3.8rem 3.2rem',
        overflow: 'hidden',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, rgba(${f.accentRGB},1) 0%, rgba(${f.accentRGB},0.25) 55%, transparent 100%)`,
      }} />

      {/* Corner decoration */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, rgba(${f.accentRGB},0.06) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2.2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <ProductBadge label={f.product} type={f.productType} rgb={f.accentRGB} />
        <Stars count={f.stars} rgb={f.accentRGB} />
      </div>

      {/* Giant quote mark */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '10rem', lineHeight: 0.5,
        color: `rgba(${f.accentRGB},0.07)`,
        userSelect: 'none',
        marginBottom: '1rem',
        fontStyle: 'italic',
      }}>
        "
      </div>

      {/* Quote */}
      <blockquote style={{
        margin: '0 0 2.4rem',
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
        lineHeight: 1.52,
        color: 'rgba(244,240,233,0.90)',
        maxWidth: '62ch',
      }}>
        {f.quote}
      </blockquote>

      {/* Attribution */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.2rem',
        paddingTop: '1.8rem',
        borderTop: `1px solid rgba(${f.accentRGB},0.12)`,
      }}>
        <Avatar initials={f.initials} rgb={f.accentRGB} />
        <div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontWeight: 600,
            fontSize: '0.95rem', letterSpacing: '0.04em',
            color: 'rgba(244,240,233,0.90)',
          }}>
            {f.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: `rgba(${f.accentRGB},0.60)`,
            marginTop: 4,
          }}>
            {f.role}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            marginTop: 3,
          }}>
            {f.country}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Small card ───────────────────────────────────────────────────────────────

function SmallCard({ item, index }: { item: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: hovered
          ? `rgba(${item.accentRGB},0.28)`
          : 'rgba(255,255,255,0.07)',
        background: hovered
          ? `linear-gradient(150deg, rgba(${item.accentRGB},0.05) 0%, transparent 60%)`
          : 'rgba(255,255,255,0.015)',
        padding: '2rem 2.2rem 1.8rem',
        transition: 'border-color 0.3s, background 0.3s',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top hairline */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: hovered ? '100%' : '30%', height: 1,
        background: `rgba(${item.accentRGB},0.6)`,
        transition: 'width 0.4s ease',
      }} />

      {/* Stars + product */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
        <Stars count={item.stars} rgb={item.accentRGB} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.50rem',
          letterSpacing: '0.26em', textTransform: 'uppercase',
          color: `rgba(${item.accentRGB},0.55)`,
        }}>
          {item.product}
        </span>
      </div>

      {/* Decorative " */}
      <div style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '4rem', lineHeight: 0.6,
        color: `rgba(${item.accentRGB},0.07)`,
        userSelect: 'none',
        marginBottom: '0.5rem',
      }}>"</div>

      {/* Quote */}
      <p style={{
        margin: '0 0 1.6rem',
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(0.88rem, 1.2vw, 1.02rem)',
        lineHeight: 1.60,
        color: 'rgba(244,240,233,0.78)',
      }}>
        {item.quote}
      </p>

      {/* Attribution */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.8rem',
        paddingTop: '1.2rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Avatar initials={item.initials} rgb={item.accentRGB} />
        <div>
          <div style={{
            fontFamily: 'var(--font-ui)', fontWeight: 600,
            fontSize: '0.85rem', letterSpacing: '0.04em',
            color: 'rgba(244,240,233,0.88)',
          }}>
            {item.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.50rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: `rgba(${item.accentRGB},0.52)`,
            marginTop: 3,
          }}>
            {item.role}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.44rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.24)',
            marginTop: 2,
          }}>
            {item.country}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  return (
    <section data-buildout-section="testimonials" style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #1A1714 0%, #161310 100%)',
      overflow: 'hidden',
    }}>

      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(196,154,108,0.04) 0%, transparent 68%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(196,154,108,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,154,108,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        paddingTop: isMobile ? '7vh' : '11vh',
        paddingRight: isMobile ? '1.5rem' : '7vw',
        paddingBottom: isMobile ? '7vh' : '12vh',
        paddingLeft: isMobile ? '1.5rem' : '7vw',
      }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: isMobile ? '4vh' : '7vh' }}
        >
          {/* Overline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
            <div style={{ width: 32, height: 1, background: 'rgba(196,154,108,0.45)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.55)',
            }}>
              {t.testimonials.sectionLabel}
            </span>
          </div>

          {/* Title */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}>
            <h2 style={{ margin: 0, lineHeight: 0.90 }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                color: 'rgba(254,252,249,0.90)',
              }}>
                {t.testimonials.heading.split(' ').slice(0, -1).join(' ')}{' '}
                <span style={{
                  backgroundImage: 'linear-gradient(135deg, #7A5E2A 0%, #B08A50 38%, #C49A6C 54%, #A8804A 78%, #7A5E2A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {t.testimonials.heading.split(' ').slice(-1)[0]}
                </span>
              </span>
            </h2>

            {/* Stats cluster */}
            {!isMobile && (
              <div style={{ display: 'flex', gap: '2.5rem', flexShrink: 0, paddingBottom: '0.4rem' }}>
                {[
                  { v: 'V1', l: 'Preview Notes'   },
                  { v: '04', l: 'Signal Modules'  },
                  { v: 'Beta', l: 'Feedback Phase' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: '1.85rem', fontWeight: 300,
                      color: 'rgba(196,154,108,0.90)',
                      lineHeight: 1,
                    }}>
                      {s.v}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.50rem',
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.30)',
                      marginTop: 5,
                    }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Cards grid (3 col) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1.2rem' : '1.5rem',
          marginBottom: isMobile ? '2rem' : '2.5rem',
        }}>
          {cards.slice(0, 3).map((item, i) => (
            <SmallCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* ── Secondary cards (2 col) ── */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {cards.slice(3).map((item, i) => (
              <SmallCard key={item.name} item={item} index={i + 3} />
            ))}
          </div>
        )}
        {isMobile && cards.slice(3).map((item, i) => (
          <div key={item.name} style={{ marginTop: '1.2rem' }}>
            <SmallCard item={item} index={i + 3} />
          </div>
        ))}

        {/* ── Bottom trust line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginTop: isMobile ? '4vh' : '6vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.14))' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(196,154,108,0.35)',
            whiteSpace: 'nowrap',
          }}>
            Early producer notes - final public reviews pending launch
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(196,154,108,0.14), transparent)' }} />
        </motion.div>

      </div>
    </section>
  );
}
