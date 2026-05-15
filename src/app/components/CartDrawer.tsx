/**
 * CartDrawer — Slide-in cart panel con upsell integrado
 * "Otros clientes también compran..."
 */
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ChevronRight, Shield, Zap, Plus, Star } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { productsData, type Product } from '@/app/data/productsData';

const AMBER     = '#C49A6C';
const AMBER_RGB = '196,154,108';

// ─── Product accent by id ────────────────────────────────────────────────────
const PRODUCT_META: Record<string, { color: string; rgb: string; emoji: string }> = {
  ctrlfilter: { color: '#C49A6C', rgb: '196,154,108', emoji: '🎛' },
  chroma:     { color: '#2A8A72', rgb: '42,138,114',  emoji: '🎹' },
};

// ─── Upsell engine ───────────────────────────────────────────────────────────
function getUpsells(cartIds: string[]): Product[] {
  const available = productsData.filter(p => p.status === 'available');
  return available.filter(p => !cartIds.includes(p.id));
}

// ─── Cart item row ───────────────────────────────────────────────────────────
function CartItem({ item, onRemove }: { item: { id: string; name: string; price: number }; onRemove: () => void }) {
  const meta = PRODUCT_META[item.id] ?? { color: AMBER, rgb: AMBER_RGB, emoji: '🎵' };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.9rem',
        padding: '0.9rem 1rem',
        background: `rgba(${meta.rgb},0.05)`,
        border: `1px solid rgba(${meta.rgb},0.14)`,
        borderRadius: 12,
        marginBottom: '0.6rem',
      }}
    >
      {/* Color swatch */}
      <div style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, rgba(${meta.rgb},0.35), rgba(${meta.rgb},0.10))`,
        border: `1px solid rgba(${meta.rgb},0.25)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem',
      }}>
        {meta.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-ui)', fontWeight: 700,
          fontSize: '0.88rem', letterSpacing: '0.04em',
          color: '#F4EFE8', margin: 0, lineHeight: 1.2,
        }}>
          {item.name}
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: `rgba(${meta.rgb},0.80)`,
          marginTop: 3, marginBottom: 0,
        }}>
          {item.id === 'ctrlfilter' ? 'Audio Plugin — VST3 · AU · AAX' : 'Sample Pack — WAV 24-bit'}
        </p>
      </div>

      {/* Price + remove */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: '1.2rem', color: meta.color, lineHeight: 1,
        }}>
          ${item.price}
        </span>
        <button
          onClick={onRemove}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(224,213,197,0.35)', padding: 3,
            display: 'flex', alignItems: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E07070')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(224,213,197,0.35)')}
          title="Remove"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Upsell card ─────────────────────────────────────────────────────────────
function UpsellCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  const meta = PRODUCT_META[product.id] ?? { color: AMBER, rgb: AMBER_RGB, emoji: '🎵' };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        padding: '0.85rem 1rem',
        background: `rgba(${meta.rgb},0.04)`,
        border: `1px solid rgba(${meta.rgb},0.14)`,
        borderRadius: 12,
        marginBottom: '0.6rem',
      }}
    >
      {/* Emoji swatch */}
      <div style={{
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        background: `rgba(${meta.rgb},0.10)`,
        border: `1px solid rgba(${meta.rgb},0.20)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem',
      }}>
        {meta.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontWeight: 700,
            fontSize: '0.84rem', letterSpacing: '0.04em',
            color: '#F4EFE8', margin: 0,
          }}>
            {product.name}
          </p>
          {/* Stars */}
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M5 1L6.12 3.58L9 3.82L7 5.62L7.62 8.5L5 7L2.38 8.5L3 5.62L1 3.82L3.88 3.58Z"
                  fill={meta.color} opacity="0.82" />
              </svg>
            ))}
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: `rgba(${meta.rgb},0.75)`, margin: 0,
        }}>
          {product.tagline}
        </p>
      </div>

      {/* Add button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 300,
          fontSize: '1.05rem', color: meta.color,
        }}>
          ${product.price}
        </span>
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '5px 10px',
            background: `rgba(${meta.rgb},0.12)`,
            border: `1px solid rgba(${meta.rgb},0.30)`,
            borderRadius: 7, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: meta.color,
          }}
        >
          <Plus size={11} />
          Add
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main CartDrawer ──────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeFromCart, addToCart, total, openCheckout } = useCart();

  const upsells = getUpsells(items.map(i => i.id));

  const handleAddUpsell = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      gradient: product.gradient,
    });
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            style={{
              position: 'fixed', inset: 0, zIndex: 250,
              background: 'rgba(4,3,2,0.72)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 35 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: 440,
              zIndex: 251,
              background: 'linear-gradient(175deg, #25211A 0%, #1E1B16 100%)',
              borderLeft: `1px solid rgba(${AMBER_RGB},0.14)`,
              display: 'flex', flexDirection: 'column',
              boxShadow: `-30px 0 80px rgba(0,0,0,0.55), -1px 0 0 rgba(${AMBER_RGB},0.06)`,
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, rgba(${AMBER_RGB},0.50), transparent)`,
            }} />

            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.4rem 1.5rem 1.2rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <ShoppingBag size={18} color={AMBER} strokeWidth={1.6} />
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-ui)', fontWeight: 700,
                    fontSize: '1.05rem', letterSpacing: '0.06em',
                    color: '#F4EFE8', margin: 0, textTransform: 'uppercase',
                  }}>
                    Your Cart
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.60rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: `rgba(${AMBER_RGB},0.65)`,
                    margin: 0,
                  }}>
                    {items.length === 0 ? 'Empty' : `${items.length} item${items.length > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.50)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem' }}>

              {/* Empty state */}
              {items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', paddingTop: '4rem', gap: '1rem',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', opacity: 0.3 }}>🛒</div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic',
                    fontSize: '1.1rem', color: 'rgba(224,213,197,0.45)',
                    textAlign: 'center',
                  }}>
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      marginTop: 8, padding: '10px 24px',
                      background: `rgba(${AMBER_RGB},0.10)`,
                      border: `1px solid rgba(${AMBER_RGB},0.24)`,
                      borderRadius: 8, cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: AMBER,
                    }}
                  >
                    Browse Products
                  </button>
                </motion.div>
              )}

              {/* Cart items */}
              {items.length > 0 && (
                <AnimatePresence mode="popLayout">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
                  ))}
                </AnimatePresence>
              )}

              {/* ── UPSELL SECTION ── */}
              {upsells.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{ marginTop: items.length > 0 ? '1.4rem' : '0.5rem' }}
                >
                  {/* Header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    marginBottom: '0.85rem',
                  }}>
                    <Star size={11} fill={AMBER} color={AMBER} />
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                      letterSpacing: '0.26em', textTransform: 'uppercase',
                      color: `rgba(${AMBER_RGB},0.82)`,
                      fontWeight: 600,
                    }}>
                      Customers also buy
                    </span>
                    <div style={{
                      flex: 1, height: 1,
                      background: `linear-gradient(90deg, rgba(${AMBER_RGB},0.18), transparent)`,
                    }} />
                  </div>

                  {/* Social proof */}
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.80rem',
                    color: 'rgba(224,213,197,0.65)', marginBottom: '0.85rem',
                    lineHeight: 1.5,
                  }}>
                    {items.length === 0
                      ? 'Most popular with our producers this week:'
                      : `Producers who bought ${items[0]?.name} also added:`}
                  </p>

                  {upsells.map(product => (
                    <UpsellCard
                      key={product.id}
                      product={product}
                      onAdd={() => handleAddUpsell(product)}
                    />
                  ))}

                  {/* Bundle hint */}
                  {items.length === 1 && upsells.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      style={{
                        marginTop: '0.5rem',
                        padding: '10px 14px',
                        background: `rgba(${AMBER_RGB},0.06)`,
                        border: `1px solid rgba(${AMBER_RGB},0.16)`,
                        borderRadius: 10,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}
                    >
                      <Zap size={13} color={AMBER} strokeWidth={1.8} />
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                        color: 'rgba(224,213,197,0.78)',
                      }}>
                        Get both and save — together just{' '}
                        <strong style={{ color: AMBER }}>
                          ${(items[0]?.price ?? 0) + (upsells[0]?.price ?? 0)}
                        </strong>
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* ── Footer: Summary + CTA ── */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '1.2rem 1.5rem 1.6rem',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(0,0,0,0.22)',
                  flexShrink: 0,
                }}
              >
                {/* Order total */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: '1rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(224,213,197,0.60)',
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 300,
                    fontSize: '1.8rem', color: AMBER, lineHeight: 1,
                  }}>
                    ${total}
                  </span>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={openCheckout}
                  whileHover={{ scale: 1.015, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%', padding: '15px',
                    background: `linear-gradient(135deg, rgba(${AMBER_RGB},0.22), rgba(${AMBER_RGB},0.08))`,
                    border: `1px solid rgba(${AMBER_RGB},0.45)`,
                    borderRadius: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    fontFamily: 'var(--font-ui)', fontSize: '0.82rem',
                    fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase',
                    color: AMBER,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Shimmer */}
                  <motion.div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(105deg, transparent 40%, rgba(196,154,108,0.10) 50%, transparent 60%)',
                      pointerEvents: 'none',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.8, ease: 'linear' }}
                  />
                  <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Proceed to Checkout
                    <ChevronRight size={15} />
                  </span>
                </motion.button>

                {/* Trust row */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '1.2rem', marginTop: '0.85rem', flexWrap: 'wrap',
                }}>
                  {[
                    { icon: Zap, text: 'Instant Download' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Icon size={11} color="rgba(42,138,114,0.90)" strokeWidth={1.8} />
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.60rem',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'rgba(42,138,114,0.85)',
                      }}>
                        {text}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: '0.68rem' }}>🔒</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.60rem',
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: 'rgba(196,154,108,0.72)',
                    }}>
                      Secure · PCI-DSS
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
