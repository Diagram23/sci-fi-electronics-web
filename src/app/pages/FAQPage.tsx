import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, Mail, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useSEO } from '@/app/hooks/useSEO';
import Footer from '@/app/components/Footer';

// ── Fade-in wrapper ──────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HairLine({ opacity = 0.08 }: { opacity?: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: 1,
        background: `linear-gradient(90deg, transparent, rgba(196,154,108,${opacity}) 35%, rgba(196,154,108,${opacity * 0.6}) 65%, transparent)`,
      }}
    />
  );
}

// ── Single accordion item ────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(196,154,108,0.07)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingTop: '1.6rem',
          paddingBottom: '1.6rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            color: open ? 'rgba(224,213,197,0.95)' : 'rgba(224,213,197,0.72)',
            lineHeight: 1.5,
            transition: 'color 0.25s',
            flex: 1,
          }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 0 : 0 }}
          style={{
            flexShrink: 0,
            color: open ? '#C49A6C' : 'rgba(196,154,108,0.4)',
            marginTop: 2,
            transition: 'color 0.25s',
          }}
        >
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                paddingBottom: '1.6rem',
                paddingRight: '2.5rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.875rem',
                lineHeight: 1.9,
                color: 'rgba(224,213,197,0.48)',
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── FAQ category block ───────────────────────────────────────────
function FAQCategory({
  label,
  items,
  delay,
}: {
  label: string;
  items: { q: string; a: React.ReactNode }[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div style={{ marginBottom: '3.5rem' }}>
        {/* Category label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.6rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.55)',
            }}
          >
            {label}
          </div>
          <div style={{ flex: 1, height: 1, background: 'rgba(196,154,108,0.07)' }} />
        </div>

        {/* Items */}
        <div>
          {items.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ DATA
// ═══════════════════════════════════════════════════════════════
const faqData = [
  {
    label: 'License & Activation',
    items: [
      {
        q: 'How many computers can I install the plugin on?',
        a: 'Each license allows activation on up to 2 computers simultaneously — for example, a desktop and a laptop. If you need to move to a third machine, you can deactivate one of the existing activations from your account dashboard at any time.',
      },
      {
        q: 'Can I transfer my license to another person?',
        a: 'Licenses are non-transferable between users. They are tied to the purchasing account. If you need to change the email address associated with your license, contact support at hello@sci-fi-electronics.com.',
      },
      {
        q: 'Is there a separate account I need to create?',
        a: 'Licenses are managed through Lemon Squeezy, our payment and delivery partner. After purchase, you will receive an email with your license key and download link. No separate SCI-FI ELECTRONICS account is required at this time.',
      },
      {
        q: 'What happens to my license if I change my operating system?',
        a: 'Changing your OS does not consume an activation. Deactivate the plugin on the old installation before formatting, then reactivate on the new system. Your license count is unchanged.',
      },
    ],
  },
  {
    label: 'Compatibility',
    items: [
      {
        q: 'Which plugin formats are included with my purchase?',
        a: 'Every purchase includes all three formats: VST3 (Windows & macOS), AU (macOS only), and AAX (Pro Tools on Windows & macOS). You receive access to all of them under a single license.',
      },
      {
        q: 'Which operating systems are supported?',
        a: (
          <span>
            Supported platforms:
            <br />— <strong style={{ color: 'rgba(224,213,197,0.72)' }}>macOS 11 Big Sur or later</strong> (Intel &amp; Apple Silicon native)
            <br />— <strong style={{ color: 'rgba(224,213,197,0.72)' }}>Windows 10 / 11</strong> (64-bit only)
            <br />32-bit hosts are not supported.
          </span>
        ),
      },
      {
        q: 'Which DAWs are supported?',
        a: 'Any 64-bit DAW that supports VST3, AU, or AAX will work: Ableton Live 11+, Logic Pro X+, Pro Tools 2021+, FL Studio 21+, Bitwig Studio 4+, Cubase 12+, Studio One 5+, Reaper, and others. If your DAW supports one of the three formats, the plugin will load.',
      },
      {
        q: 'Are the plugins Apple Silicon native?',
        a: 'Yes. All SCI-FI ELECTRONICS plugins ship as Universal Binaries and run natively on Apple Silicon (M1/M2/M3/M4) without Rosetta. No translation layer, no performance penalty.',
      },
      {
        q: 'What are the minimum system requirements?',
        a: (
          <span>
            <strong style={{ color: 'rgba(224,213,197,0.72)' }}>CPU:</strong> Intel Core i5 4th gen / Apple M1 or equivalent
            <br />
            <strong style={{ color: 'rgba(224,213,197,0.72)' }}>RAM:</strong> 8 GB minimum, 16 GB recommended
            <br />
            <strong style={{ color: 'rgba(224,213,197,0.72)' }}>Disk:</strong> 200 MB per plugin
            <br />
            <strong style={{ color: 'rgba(224,213,197,0.72)' }}>Sample rates:</strong> 44.1 kHz, 48 kHz, 88.2 kHz, 96 kHz, 176.4 kHz, 192 kHz
            <br />
            <strong style={{ color: 'rgba(224,213,197,0.72)' }}>Bit depth:</strong> 32-bit float / 64-bit double precision
          </span>
        ),
      },
    ],
  },
  {
    label: 'Downloads & Updates',
    items: [
      {
        q: 'How do I download my plugins after purchase?',
        a: 'Immediately after checkout, you will receive an email from Lemon Squeezy (our delivery partner) with your license key and a secure download link. The link is valid for 5 days and 3 download attempts. Contact support if you need a new link.',
      },
      {
        q: 'Are updates included with my purchase?',
        a: 'Yes. Every plugin comes with lifetime updates at no additional cost. Bug fixes, performance improvements, and new features for that plugin are always free. Major version upgrades (e.g., v1 → v2) may be offered at a discounted upgrade price, but this will always be communicated clearly in advance.',
      },
      {
        q: 'How will I know when an update is available?',
        a: 'Update notifications are sent to the email address used at checkout. You can also check the version number in the plugin\'s About panel at any time. Joining the newsletter is the fastest way to receive release notes.',
      },
    ],
  },
  {
    label: 'Billing & Refunds',
    items: [
      {
        q: 'Do you offer a free trial?',
        a: 'We do not offer time-limited trials at this time. Audio demos for each plugin are available on the product pages so you can evaluate the sound before purchasing. The ARCHIVE I collection ($19) is also designed as an accessible entry point to the SCI-FI ELECTRONICS sound.',
      },
      {
        q: 'What is your refund policy?',
        a: 'We offer a 30-Day Defect Guarantee. If the plugin does not install correctly, fails to activate, or contains a confirmed technical defect on a supported platform, we will resolve the issue or issue a full refund within 30 days of purchase. Refunds are not provided for change of mind, incompatibility with unsupported systems, or user error. Please review the compatibility requirements before purchasing.',
      },
      {
        q: 'Which payment methods are accepted?',
        a: 'Payments are processed securely by Lemon Squeezy and include: credit and debit cards (Visa, Mastercard, Amex), PayPal, and other regional payment methods depending on your location. All transactions are in USD.',
      },
      {
        q: 'Is the Complete Bundle a one-time payment?',
        a: 'Yes. The Complete Bundle ($349) is a single one-time payment. There are no subscriptions, no recurring charges, and no hidden fees. You own the software permanently.',
      },
      {
        q: 'Do you offer educational or volume discounts?',
        a: 'Educational and volume licensing is available for institutions and studios. Contact us at hello@sci-fi-electronics.com with details about your use case and we will respond within 3 business days.',
      },
    ],
  },
  {
    label: 'Technical Support',
    items: [
      {
        q: 'The plugin does not appear in my DAW. What should I do?',
        a: (
          <span>
            First, verify the plugin was installed to the correct folder for your format and OS:
            <br />— <strong style={{ color: 'rgba(224,213,197,0.72)' }}>VST3 macOS:</strong> /Library/Audio/Plug-Ins/VST3
            <br />— <strong style={{ color: 'rgba(224,213,197,0.72)' }}>VST3 Windows:</strong> C:\Program Files\Common Files\VST3
            <br />— <strong style={{ color: 'rgba(224,213,197,0.72)' }}>AU:</strong> /Library/Audio/Plug-Ins/Components
            <br />Then re-scan your plugin folder in your DAW. If it still does not appear, contact support with your OS version and DAW version.
          </span>
        ),
      },
      {
        q: 'I am experiencing audio glitches or dropouts. How do I fix this?',
        a: 'Increase your DAW buffer size to 256 or 512 samples. This is the most common cause of dropout on CPU-intensive patches. SCI-FI ELECTRONICS plugins are optimized for low CPU usage, but complex patches with high voice counts on older hardware may require a larger buffer.',
      },
      {
        q: 'How do I contact support?',
        a: (
          <span>
            Email us at{' '}
            <a
              href="mailto:hello@sci-fi-electronics.com"
              style={{ color: '#C49A6C', textDecoration: 'none' }}
            >
              hello@sci-fi-electronics.com
            </a>
            . Include your order number, OS version, DAW version, and plugin version. We aim to respond within 2 business days.
          </span>
        ),
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════
export default function FAQPage() {
  useSEO({
    title: 'FAQ',
    description:
      'SCI-FI ELECTRONICS — Frequently asked questions about licenses, compatibility, downloads, refunds, and technical support.',
  });
  const isMobile = useIsMobile();

  return (
    <>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section
        style={{
          paddingTop: isMobile ? '8rem' : '12rem',
          paddingBottom: isMobile ? '4rem' : '6rem',
          paddingLeft: isMobile ? '6vw' : '8vw',
          paddingRight: isMobile ? '6vw' : '8vw',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(ellipse, rgba(196,154,108,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.5)',
              marginBottom: '1.2rem',
            }}
          >
            Support
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: isMobile ? 'clamp(2.2rem,10vw,3rem)' : 'clamp(2.5rem, 5vw, 4.2rem)',
              color: 'rgba(224,213,197,0.95)',
              margin: '0 0 1.5rem 0',
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: isMobile ? '0.9375rem' : 'clamp(0.9375rem, 1.2vw, 1.05rem)',
              lineHeight: 1.85,
              color: 'rgba(224,213,197,0.45)',
              margin: 0,
              maxWidth: '54ch',
            }}
          >
            Everything you need to know about licenses, compatibility, downloads, and support.
            Can't find the answer? Write to{' '}
            <a
              href="mailto:hello@sci-fi-electronics.com"
              style={{ color: 'rgba(196,154,108,0.7)', textDecoration: 'none' }}
            >
              hello@sci-fi-electronics.com
            </a>
            .
          </p>
        </motion.div>
      </section>

      <HairLine opacity={0.07} />

      {/* ─────────────────────── CONTENT ─────────────────────── */}
      <section
        style={{
          paddingTop: isMobile ? '4rem' : '7rem',
          paddingBottom: isMobile ? '4rem' : '7rem',
          paddingLeft: isMobile ? '6vw' : '8vw',
          paddingRight: isMobile ? '6vw' : '8vw',
        }}
      >
        <div
          style={{
            maxWidth: 820,
          }}
        >
          {faqData.map((cat, i) => (
            <FAQCategory key={cat.label} label={cat.label} items={cat.items} delay={i * 0.06} />
          ))}
        </div>
      </section>

      <HairLine opacity={0.07} />

      {/* ─────────────────────── CONTACT BAND ─────────────────────── */}
      <section
        style={{
          paddingTop: isMobile ? '4.5rem' : '7rem',
          paddingBottom: isMobile ? '4.5rem' : '7rem',
          paddingLeft: isMobile ? '6vw' : '8vw',
          paddingRight: isMobile ? '6vw' : '8vw',
        }}
      >
        <Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '2.5rem' : '6rem',
              alignItems: 'center',
              maxWidth: 900,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.42em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.5)',
                  marginBottom: '1.1rem',
                }}
              >
                Still have questions?
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  color: 'rgba(224,213,197,0.9)',
                  margin: '0 0 1.2rem 0',
                  lineHeight: 1.2,
                }}
              >
                Our support team responds within 2 business days.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  fontSize: '0.875rem',
                  lineHeight: 1.85,
                  color: 'rgba(224,213,197,0.42)',
                  margin: 0,
                }}
              >
                Include your order number, OS, DAW version, and a description of the issue.
                We handle every ticket personally — no automated responses.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email card */}
              <a
                href="mailto:hello@sci-fi-electronics.com"
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ x: 4, borderColor: 'rgba(196,154,108,0.2)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1.4rem 1.6rem',
                    border: '1px solid rgba(196,154,108,0.09)',
                    background: 'rgba(255,255,255,0.015)',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(196,154,108,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#C49A6C',
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.56rem',
                        letterSpacing: '0.32em',
                        textTransform: 'uppercase',
                        color: 'rgba(196,154,108,0.5)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      Email Support
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(224,213,197,0.7)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      hello@sci-fi-electronics.com
                    </div>
                  </div>
                  <ArrowRight size={13} color="rgba(196,154,108,0.4)" />
                </motion.div>
              </a>

              {/* Plugins CTA */}
              <Link to="/plugins" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ x: 4, borderColor: 'rgba(196,154,108,0.2)' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    padding: '1.4rem 1.6rem',
                    border: '1px solid rgba(196,154,108,0.09)',
                    background: 'rgba(255,255,255,0.015)',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(196,154,108,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#C49A6C',
                    }}
                  >
                    <ArrowRight size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.56rem',
                        letterSpacing: '0.32em',
                        textTransform: 'uppercase',
                        color: 'rgba(196,154,108,0.5)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      Browse
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(224,213,197,0.7)',
                      }}
                    >
                      View All Plugins
                    </div>
                  </div>
                  <ArrowRight size={13} color="rgba(196,154,108,0.4)" />
                </motion.div>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}

