import { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useCart } from '@/app/context/CartContext';
import { getCompleteBundleCartItems } from '@/app/lib/commerceItems';

const H_DESKTOP = 38;
const H_MOBILE = 40;

export default function PromoBar() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem('sfx_promo_dismissed') !== '1';
    } catch {
      return true;
    }
  });
  const isMobile = useIsMobile();
  const barH = isMobile ? H_MOBILE : H_DESKTOP;
  const { clearCart, addToCart, openCart } = useCart();

  const handleBundleClick = () => {
    clearCart();
    getCompleteBundleCartItems().forEach((item) => addToCart(item));
    openCart();
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--promo-h', visible ? `${barH}px` : '0px');
    return () => {
      document.documentElement.style.setProperty('--promo-h', '0px');
    };
  }, [visible, barH]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="promo-bar"
          initial={{ height: barH, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 210,
            overflow: 'hidden',
            height: barH,
            background:
              'linear-gradient(90deg, rgba(16,14,10,0.98) 0%, rgba(22,18,12,0.99) 50%, rgba(16,14,10,0.98) 100%)',
            borderBottom: '1px solid rgba(196,154,108,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.4), transparent)',
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {!isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                paddingLeft: 16,
                paddingRight: 40,
              }}
            >
              <Zap size={11} color="#C49A6C" strokeWidth={2} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.78)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                Intro Pricing Active
              </span>
              <span style={{ width: 1, height: 10, background: 'rgba(196,154,108,0.22)', flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(224,213,197,0.58)',
                  whiteSpace: 'nowrap',
                }}
              >
                Complete Bundle · <strong style={{ color: '#C49A6C', fontWeight: 600 }}>$349</strong> · Save $107 (23%)
              </span>
              <motion.button
                type="button"
                onClick={handleBundleClick}
                whileHover={{ color: '#EDD4A4' }}
                style={{
                  border: 0,
                  background: 'transparent',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.9)',
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(196,154,108,0.35)',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                Buy Now -&gt;
              </motion.button>
            </div>
          )}

          {isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                paddingLeft: 12,
                paddingRight: 38,
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Zap size={10} color="#C49A6C" strokeWidth={2} style={{ flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(224,213,197,0.58)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  minWidth: 0,
                }}
              >
                Bundle · <strong style={{ color: '#C49A6C', fontWeight: 600 }}>$349</strong> · Save $107
              </span>
              <motion.button
                type="button"
                onClick={handleBundleClick}
                whileHover={{ color: '#EDD4A4' }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,154,108,0.95)',
                  textDecoration: 'none',
                  background: 'rgba(196,154,108,0.1)',
                  border: '1px solid rgba(196,154,108,0.28)',
                  padding: '3px 8px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  lineHeight: 1.5,
                }}
              >
                Buy
              </motion.button>
            </div>
          )}

          <button
            onClick={() => {
              try {
                sessionStorage.setItem('sfx_promo_dismissed', '1');
              } catch {
                // Ignore storage errors in privacy modes.
              }
              setVisible(false);
            }}
            style={{
              position: 'absolute',
              right: 10,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 6,
              color: 'rgba(196,154,108,0.4)',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 0,
            }}
            aria-label="Close intro pricing banner"
          >
            <X size={11} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
