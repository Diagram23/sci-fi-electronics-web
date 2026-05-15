import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const specs = [
  { value: '192', unit: 'kHz', label: 'Sample Rate' },
  { value: '32', unit: '-bit', label: 'Float Processing' },
  { value: '0', unit: 'ms', label: 'Latency' },
  { value: '4096', unit: '', label: 'Spectral Bands' },
];

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      data-buildout-section="brand-statement"
      className="relative overflow-hidden"
      style={{ position: 'relative', background: '#080604' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.22) 35%, rgba(196,154,108,0.12) 65%, transparent)' }}
      />

      <motion.div style={{ opacity }}>

        {/* ─── Philosophy ─── */}
        <motion.div
          style={{ y }}
          className="max-w-4xl mx-auto px-8 md:px-14 py-28 md:py-40 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-5 mb-14"
          >
            <div className="h-[1px] w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.3))' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', letterSpacing: '0.48em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.38)' }}>
              A Philosophy of Precision
            </span>
            <div className="h-[1px] w-10" style={{ background: 'linear-gradient(90deg, rgba(196,154,108,0.3), transparent)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 4.5vw, 4.8rem)',
                lineHeight: 1.26,
                letterSpacing: '0.01em',
                color: 'rgba(255,255,255,0.84)',
                marginBottom: '0.05em',
              }}
            >
              "We don't make tools.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 4.5vw, 4.8rem)',
                lineHeight: 1.26,
                letterSpacing: '0.01em',
                background: 'linear-gradient(135deg, #C49A6C, #EDD4A4, #B8936D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.05em',
              }}
            >
              We craft instruments
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 4.5vw, 4.8rem)',
                lineHeight: 1.26,
                letterSpacing: '0.01em',
                color: 'rgba(255,255,255,0.84)',
                marginBottom: '0.05em',
              }}
            >
              for those who refuse
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 4.5vw, 4.8rem)',
                lineHeight: 1.26,
                letterSpacing: '0.01em',
                color: 'rgba(224,213,197,0.38)',
              }}
            >
              to compromise."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mt-14"
          >
            <div className="h-[1px] w-6" style={{ background: 'rgba(196,154,108,0.28)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.36)' }}>
              Sci-Fi Electronics | Est. MMXXIV
            </span>
            <div className="h-[1px] w-6" style={{ background: 'rgba(196,154,108,0.28)' }} />
          </motion.div>
        </motion.div>

        {/* ─── Technical spec plate ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="max-w-5xl mx-auto px-8 md:px-14">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className="py-10 px-6 md:px-8"
                  style={{
                    borderRight: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                >
                  <div className="flex items-baseline gap-1 mb-3">
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 300,
                        fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                        background: 'linear-gradient(130deg, #C49A6C, #E0C898)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(196,154,108,0.5)' }}>
                      {s.unit}
                    </span>
                  </div>
                  <div className="h-[1px] w-7 mb-2.5" style={{ background: 'rgba(196,154,108,0.2)' }} />
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(224,213,197,0.52)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Format tags */}
            <div
              className="py-6 flex flex-wrap items-center gap-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(196,154,108,0.28)' }}>
                Formats
              </span>
              {['VST3', 'AU', 'AAX', 'macOS', 'Windows'].map((f) => (
                <div
                  key={f}
                  className="px-3.5 py-1.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.022)', border: '1px solid rgba(255,255,255,0.055)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.32)' }}
                >
                  {f}
                </div>
              ))}
              <div className="flex-1" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.22em', color: 'rgba(196,154,108,0.32)' }}>
                Built for underground producers, sound designers and future-facing labels
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.12) 50%, transparent)' }}
      />
    </section>
  );
}

