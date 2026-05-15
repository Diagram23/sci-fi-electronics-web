/**
 * StickyBundleCTA — barra fija en la parte inferior
 * Aparece tras hacer scroll 80vh. Layout totalmente distinto en mobile vs desktop.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import GoldCTAButton from '@/app/components/GoldCTAButton';
import { siteConfig } from '@/app/config/siteConfig';

const PLUGINS    = ['QUANTUM REVERB', 'FRACTAL DELAY', 'SPECTRAL GATE', 'PLASMA DISTORTION'];
const INDIVIDUAL = 149 + 129 + 99 + 79;  // 456
const BUNDLE     = 349;
const SAVINGS    = INDIVIDUAL - BUNDLE;    // 107

export default function StickyBundleCTA() {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const hasCookieConsent = () => Boolean(localStorage.getItem('sfx_cookie_consent_v1'));
    const updateChromeState = () => {
      const footer = document.querySelector('footer');
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      setVisible(window.scrollY > window.innerHeight * 0.8);
      setNearFooter(footerTop < window.innerHeight + 96);
      setCookieVisible(!hasCookieConsent());
    };

    updateChromeState();
    const handleScroll = () => updateChromeState();
    const handleConsentChange = () => updateChromeState();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('sfx-cookie-consent-change', handleConsentChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('sfx-cookie-consent-change', handleConsentChange);
    };
  }, []);

  const handleBundleRequest = () => {
    window.location.href = `mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent('Complete Signal Collection access request')}`;
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && !cookieVisible && !nearFooter && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            zIndex: 110,
            background: 'rgba(12,10,7,0.97)',
            borderTop: '1px solid rgba(196,154,108,0.2)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        >
          {/* Top hairline shimmer */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.4) 30%, rgba(196,154,108,0.2) 70%, transparent)',
            pointerEvents: 'none',
          }} />

          {isMobile ? (
            /* ── MOBILE: layout compacto en una fila ── */
            <div style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '12px', paddingBottom: '12px',
              paddingLeft: '5vw', paddingRight: '5vw',
              gap: '0.75rem',
            }}>
              {/* Precio */}
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 300,
                  fontSize: '1.35rem', color: '#C49A6C', lineHeight: 1,
                }}>
                  ${BUNDLE}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.22)', marginTop: 2,
                }}>
                  <s style={{ color: 'rgba(255,255,255,0.2)' }}>${INDIVIDUAL}</s> · one time
                </div>
              </div>

              {/* CTA — ocupa el espacio restante */}
              <GoldCTAButton
                onClick={handleBundleRequest}
                whileTap={{ scale: 0.96 }}
                style={{ flex: 1 }}
                paddingTop="12px"
                paddingBottom="12px"
                paddingLeft="16px"
                paddingRight="16px"
                borderRadius={2}
                fontSize="0.78rem"
                letterSpacing="0.18em"
              >
                Contact Sales
              </GoldCTAButton>

              {/* Garantías — compactas en columna */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(27,107,90,0.7)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(27,107,90,0.65)', whiteSpace: 'nowrap',
                  }}>
                    Contact
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(196,154,108,0.5)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(196,154,108,0.4)', whiteSpace: 'nowrap',
                  }}>
                    Fallback
                  </span>
                </div>
              </div>

              {/* Dismiss */}
                <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss bundle offer"
                style={{
                  border: 'none', background: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.22)', padding: '6px',
                  fontSize: '1.1rem', lineHeight: 1, flexShrink: 0,
                }}
                title="Dismiss"
              >
                ×
              </button>
            </div>

          ) : (
            /* ── DESKTOP: layout completo ── */
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '14px', paddingBottom: '14px',
              paddingLeft: '6vw', paddingRight: '6vw',
              gap: '2rem',
            }}>
              {/* Left — plugin list */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
                {PLUGINS.map((name, i) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    {i > 0 && (
                      <div style={{ width: 1, height: 14, background: 'rgba(196,154,108,0.15)', flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(196,154,108,0.45)',
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Center */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontWeight: 300, fontSize: '0.95rem',
                  color: 'rgba(224,213,197,0.45)', letterSpacing: '0.04em',
                }}>
                  Complete Bundle — Save{' '}
                  <span style={{ color: '#C49A6C' }}>${SAVINGS} ({Math.round((SAVINGS / INDIVIDUAL) * 100)}%)</span>
                </div>
              </div>

              {/* Right — price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 300,
                    fontSize: '1.4rem', color: '#C49A6C', lineHeight: 1,
                  }}>
                    ${BUNDLE}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)', marginTop: 2,
                  }}>
                    <s style={{ color: 'rgba(255,255,255,0.2)' }}>${INDIVIDUAL}</s> · ONE TIME
                  </div>
                </div>

                <GoldCTAButton
                  onClick={handleBundleRequest}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.96 }}
                  paddingTop="11px"
                  paddingBottom="11px"
                  paddingLeft="28px"
                  paddingRight="28px"
                  borderRadius={2}
                  fontSize="0.78rem"
                  letterSpacing="0.18em"
                >
                  Contact Sales
                </GoldCTAButton>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(27,107,90,0.7)', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: 'rgba(27,107,90,0.65)',
                    }}>
                      Contact Fallback
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss bundle offer"
                  style={{
                    border: 'none', background: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.18)', padding: '4px',
                    fontSize: '1rem', lineHeight: 1, flexShrink: 0,
                  }}
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
