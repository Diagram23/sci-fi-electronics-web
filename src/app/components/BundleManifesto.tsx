import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/app/config/siteConfig';

const items = [
  { tag: '01', name: 'QUANTUM REVERB',    desc: 'Infinite Space Generator',    price: 149, color: '#C49A6C' },
  { tag: '02', name: 'FRACTAL DELAY',     desc: 'Time Manipulation Engine',    price: 129, color: '#1B6B5A' },
  { tag: '03', name: 'SPECTRAL GATE',     desc: 'Frequency Sculptor',           price: 99,  color: '#2A8A72' },
  { tag: '04', name: 'PLASMA DISTORTION', desc: 'Harmonic Destroyer',           price: 79,  color: '#B8936D' },
];

const BUNDLE = 349;
const INDIVIDUAL = items.reduce((s, i) => s + i.price, 0); // 456
const SAVINGS = INDIVIDUAL - BUNDLE; // 107
const SAVINGS_PCT = Math.round((SAVINGS / INDIVIDUAL) * 100); // 23

// SVG savings ring — precision donut chart
function SavingsRing() {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const savingsDash = (SAVINGS_PCT / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="160" height="160" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        {/* Full ring */}
        <circle cx="80" cy="80" r={radius} fill="none"
          stroke="rgba(196,154,108,0.15)" strokeWidth="2"
          strokeDasharray={circumference}
        />
        {/* Savings arc */}
        <motion.circle cx="80" cy="80" r={radius} fill="none"
          stroke="url(#savingsGrad)" strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${savingsDash} ${circumference}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          whileInView={{ strokeDasharray: `${savingsDash} ${circumference}` }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
        <defs>
          <linearGradient id="savingsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C49A6C" />
            <stop offset="100%" stopColor="#EDD4A4" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', lineHeight: 1, background: 'linear-gradient(130deg, #C49A6C, #EDD4A4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {SAVINGS_PCT}%
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.4)', marginTop: 4 }}>
          SAVED
        </div>
      </div>
    </div>
  );
}

export default function BundleManifesto() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  const handleBundleRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent('Complete Signal Collection access request')}`;
  };

  return (
    <section ref={ref} id="bundle" data-buildout-section="bundle-manifesto" style={{ position: 'relative', background: '#1E1B16', overflow: 'hidden', padding: '12vh 7vw' }}>
      {/* Background glow — centered, warm */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '70vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(196,154,108,0.038) 0%, transparent 65%)',
        filter: 'blur(80px)', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div style={{ opacity, position: 'relative', zIndex: 1, maxWidth: 920, margin: '0 auto' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.38)', marginBottom: '2rem' }}
        >
          THE COMPLETE COLLECTION
        </motion.div>

        {/* Heading + savings ring */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)', letterSpacing: '-0.025em', lineHeight: 0.88, color: '#FEFCF9', margin: 0 }}>
              Complete Signal System.
            </h2>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 4.8vw, 4.6rem)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '0.3rem 0 0', background: 'linear-gradient(110deg, #C49A6C, #EDD4A4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              One Collection.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(0.9rem, 1.15vw, 0.98rem)', color: 'rgba(224,213,197,0.65)', lineHeight: 1.82, maxWidth: '42ch', marginTop: '1.4rem' }}>
              The complete SCI-FI ELECTRONICS plugin set in one commercial package. The checkout layer is pending, so bundle requests route through contact until production links are approved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SavingsRing />
          </motion.div>
        </div>

        {/* Spec table */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ border: '1px solid rgba(196,154,108,0.1)', borderRadius: 4, overflow: 'hidden' }}
        >
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr 1fr auto', gap: '0 2rem', padding: '0.8rem 1.8rem', borderBottom: '1px solid rgba(196,154,108,0.06)', background: 'rgba(255,255,255,0.014)' }}>
            {['#','INSTRUMENT','FUNCTION','PRICE'].map((h) => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.35)' }}>{h}</div>
            ))}
          </div>

          {/* Items */}
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              style={{
                display: 'grid', gridTemplateColumns: '2rem 1fr 1fr auto',
                gap: '0 2rem', padding: '1.3rem 1.8rem', alignItems: 'center',
                borderBottom: i < items.length - 1 ? '1px solid rgba(196,154,108,0.05)' : 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,154,108,0.024)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em', color: `${item.color}80` }}>{item.tag}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(224,213,197,0.85)' }}>{item.name}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '0.92rem', color: `${item.color}95` }}>{item.desc}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.06em', color: 'rgba(224,213,197,0.72)', textAlign: 'right' }}>${item.price}</span>
            </motion.div>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.18) 30%, rgba(196,154,108,0.1) 70%, transparent)' }} />

          {/* Totals */}
          {[
            { label: 'Individual Pricing', value: `$${INDIVIDUAL}`, dim: true },
            { label: `Bundle Advantage (${SAVINGS_PCT}%)`, value: `−$${SAVINGS}`, accent: true },
          ].map((row) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2rem 1fr auto', gap: '0 2rem', padding: '0.7rem 1.8rem', borderBottom: '1px solid rgba(196,154,108,0.04)' }}>
              <div />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: row.accent ? 'rgba(27,107,90,0.9)' : 'rgba(224,213,197,0.52)' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.06em', color: row.accent ? 'rgba(27,107,90,0.9)' : 'rgba(224,213,197,0.52)', textAlign: 'right' }}>{row.value}</span>
            </div>
          ))}

          {/* Bundle price */}
          <div style={{ display: 'grid', gridTemplateColumns: '2rem 1fr auto', gap: '0 2rem', padding: '1.4rem 1.8rem', background: 'rgba(196,154,108,0.04)' }}>
            <div />
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(224,213,197,0.78)' }}>Complete Bundle</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '2rem', lineHeight: 1, background: 'linear-gradient(130deg, #C49A6C, #EDD4A4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textAlign: 'right' }}>
              $349
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: '2.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem' }}
        >
          <motion.button
            onClick={handleBundleRequest}
            whileHover={{ scale: 1.015, boxShadow: '0 0 30px rgba(196,154,108,0.05)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              cursor: 'pointer', border: 'none',
              background: 'linear-gradient(135deg, #2A1A08 0%, #5E3E18 30%, #9A7040 55%, #5E3E18 80%, #2A1A08 100%)',
              borderRadius: 14, padding: '18px 64px',
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(224,200,160,0.92)',
              width: '100%', maxWidth: 480,
            }}
          >
            Request Bundle Access - $349
          </motion.button>

          {/* Trust signals */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem 2.5rem' }}>
            {['VST3 | AU | AAX', 'macOS | Windows', 'Lifetime Updates', 'No Subscription', 'Contact Fallback'].map((t) => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.68)' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
