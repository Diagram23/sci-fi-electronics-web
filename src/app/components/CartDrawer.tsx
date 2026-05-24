import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Plus, ShoppingBag, Star, Trash2, X, Zap } from 'lucide-react';
import { useCart, type CartItem } from '@/app/context/CartContext';
import { getCatalogCartItems, isCompleteBundle } from '@/app/lib/commerceItems';
import { siteConfig } from '@/app/config/siteConfig';

const AMBER = '#C49A6C';
const AMBER_RGB = '196,154,108';

const PRODUCT_META: Record<string, { color: string; rgb: string; label: string; detail: string }> = {
  ctrl4filter: { color: '#C49A6C', rgb: '196,154,108', label: 'CTRL', detail: 'Plugin access - VST3 / AU planned' },
  chroma: { color: '#2A8A72', rgb: '42,138,114', label: 'CHR', detail: 'Sample pack - WAV 24-bit' },
  'quantum-reverb': { color: '#C49A6C', rgb: '196,154,108', label: 'QR', detail: 'Audio plugin - VST3 / AU / AAX' },
  'fractal-delay': { color: '#B8936D', rgb: '184,147,109', label: 'FD', detail: 'Audio plugin - VST3 / AU / AAX' },
  'spectral-gate': { color: '#2A8A72', rgb: '42,138,114', label: 'SG', detail: 'Audio plugin - VST3 / AU / AAX' },
  'plasma-distortion': { color: '#B8936D', rgb: '184,147,109', label: 'PD', detail: 'Audio plugin - VST3 / AU / AAX' },
};

function getMeta(id: string) {
  return PRODUCT_META[id] ?? { color: AMBER, rgb: AMBER_RGB, label: 'SFE', detail: 'SCI-FI ELECTRONICS access' };
}

function getUpsells(cartIds: string[]) {
  return getCatalogCartItems().filter((item) => !cartIds.includes(item.id));
}

function ProductRow({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  const meta = getMeta(item.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
      className="mb-3 flex items-center gap-3 rounded-xl border p-3"
      style={{ background: `rgba(${meta.rgb},0.045)`, borderColor: `rgba(${meta.rgb},0.16)` }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border font-mono text-[10px] font-semibold uppercase tracking-[0.12em]"
        style={{ background: `rgba(${meta.rgb},0.10)`, borderColor: `rgba(${meta.rgb},0.24)`, color: meta.color }}
      >
        {meta.label}
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 truncate text-sm font-semibold uppercase tracking-[0.04em] text-[#F4EFE8]">{item.name}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: `rgba(${meta.rgb},0.74)` }}>
          {meta.detail}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-display text-xl font-light leading-none" style={{ color: meta.color }}>
          ${item.price}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-7 w-7 items-center justify-center text-white/35 transition hover:text-[#E07070] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/35"
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}

function UpsellRow({ item, onAdd }: { item: CartItem; onAdd: () => void }) {
  const meta = getMeta(item.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-3 flex items-center gap-3 rounded-xl border p-3"
      style={{ background: `rgba(${meta.rgb},0.035)`, borderColor: `rgba(${meta.rgb},0.14)` }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-[9px] font-semibold"
        style={{ background: `rgba(${meta.rgb},0.08)`, borderColor: `rgba(${meta.rgb},0.20)`, color: meta.color }}
      >
        {meta.label}
      </div>
      <div className="min-w-0 flex-1">
        <p className="m-0 text-sm font-semibold text-[#F4EFE8]">{item.name}</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: `rgba(${meta.rgb},0.74)` }}>
          {meta.detail}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="font-display text-lg font-light" style={{ color: meta.color }}>
          ${item.price}
        </span>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.13em] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/35"
          style={{ background: `rgba(${meta.rgb},0.10)`, borderColor: `rgba(${meta.rgb},0.28)`, color: meta.color }}
        >
          <Plus size={11} /> Add
        </button>
      </div>
    </motion.div>
  );
}

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeFromCart, addToCart, total, openCheckout } = useCart();
  const upsells = getUpsells(items.map((item) => item.id));
  const completeBundle = isCompleteBundle(items);
  const dueNow = completeBundle ? siteConfig.activeBundle.price : total;
  const savings = completeBundle ? total - siteConfig.activeBundle.price : 0;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[250] bg-[#040302]/75 backdrop-blur-xl"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 35 }}
            className="fixed bottom-0 right-0 top-0 z-[251] flex w-full max-w-[440px] flex-col border-l bg-[#201c16] shadow-[-30px_0_80px_rgba(0,0,0,0.55)]"
            style={{ borderColor: `rgba(${AMBER_RGB},0.14)` }}
            aria-label="Shopping cart"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C49A6C]/55 to-transparent" />

            <header className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} color={AMBER} strokeWidth={1.6} />
                <div>
                  <h2 className="m-0 text-base font-bold uppercase tracking-[0.08em] text-[#F4EFE8]">Cart</h2>
                  <p className="m-0 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C49A6C]/70">
                    {items.length === 0 ? 'Empty' : `${items.length} item${items.length === 1 ? '' : 's'}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.05] text-white/50 transition hover:text-[#F4EFE8] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/35"
                aria-label="Close cart"
              >
                <X size={15} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[240px] flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-5 h-10 w-10 text-[#C49A6C]/30" strokeWidth={1.3} />
                  <p className="font-display text-xl italic text-[#E0D5C5]/55">Your cart is empty</p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 rounded-lg border border-[#C49A6C]/25 bg-[#C49A6C]/10 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C49A6C] transition hover:border-[#C49A6C]/45"
                  >
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <ProductRow key={item.id} item={item} onRemove={() => removeFromCart(item.id)} />
                  ))}
                </AnimatePresence>
              )}

              {upsells.length > 0 && (
                <section className={items.length > 0 ? 'mt-6' : 'mt-2'}>
                  <div className="mb-3 flex items-center gap-2">
                    <Star size={12} fill={AMBER} color={AMBER} />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C49A6C]/85">
                      Add to request
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#C49A6C]/20 to-transparent" />
                  </div>
                  <p className="mb-3 text-sm leading-6 text-[#E0D5C5]/60">
                    Add catalogue items to the same access request. No payment is captured until checkout is configured.
                  </p>
                  {upsells.map((item) => (
                    <UpsellRow key={item.id} item={item} onAdd={() => addToCart(item)} />
                  ))}
                </section>
              )}
            </div>

            {items.length > 0 && (
              <footer className="shrink-0 border-t border-white/[0.07] bg-black/20 px-6 py-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E0D5C5]/60">Subtotal</span>
                  <span className="font-display text-2xl font-light leading-none text-[#C49A6C]">${total}</span>
                </div>
                {savings > 0 && (
                  <div className="mb-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-[#2A8A72]">
                    <span>Bundle savings</span>
                    <span>-${savings}</span>
                  </div>
                )}
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E0D5C5]/60">Due now</span>
                  <span className="font-display text-2xl font-light leading-none text-[#C49A6C]">${dueNow}</span>
                </div>

                <motion.button
                  type="button"
                  onClick={openCheckout}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border px-4 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/35"
                  style={{ background: `linear-gradient(135deg, rgba(${AMBER_RGB},0.22), rgba(${AMBER_RGB},0.08))`, borderColor: `rgba(${AMBER_RGB},0.45)` }}
                >
                  {siteConfig.checkoutEnabled ? 'Proceed to Checkout' : 'Review Access Request'}
                  <ChevronRight size={15} />
                </motion.button>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <Zap size={11} color="rgba(42,138,114,0.90)" strokeWidth={1.8} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#2A8A72]/85">
                      {siteConfig.checkoutEnabled ? 'Instant Download' : 'Manual Access'}
                    </span>
                  </div>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
