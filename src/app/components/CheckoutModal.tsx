/**
 * ─────────────────────────────────────────────────────────────
 *  SCI-FI ELECTRONICS — ULTRA-PREMIUM CHECKOUT MODAL
 *  Powered by Lemon Squeezy
 *
 *  CONFIG: edita /src/app/config/lemonsqueezy.ts
 *  Es el único archivo que necesitas tocar para activar los pagos.
 * ─────────────────────────────────────────────────────────────
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Shield, Sparkles, Zap, RefreshCw, DownloadCloud, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import {
  LS_VARIANT_IDS,
  LS_STORE_SLUG,
  buildCheckoutUrl,
  loadLemonSqueezyScript,
  isVariantConfigured,
} from '@/app/config/lemonsqueezy';

// ─── TYPES ───────────────────────────────────────────────────
declare global {
  interface Window {
    LemonSqueezy?: {
      Url: { Open: (url: string) => void; Close: () => void };
      Setup: (options: { eventHandler?: (event: { event: string }) => void }) => void;
    };
    createLemonSqueezy?: () => void;
  }
}

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  gradient: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  isBundle?: boolean;
}

// ─── PLUGIN ACCENT COLORS (Atelier Obsidian) ─────────────────
const PLUGIN_META: Record<string, { color: string; tagline: string; features: string[] }> = {
  'quantum-reverb': {
    color: '#C49A6C',
    tagline: 'Infinite Space Generator',
    features: ['AI Space Morphing', '∞ Reverb Tail', '4K+ IR Library', '0ms Latency'],
  },
  'fractal-delay': {
    color: '#1B6B5A',
    tagline: 'Time Manipulation Engine',
    features: ['Neural Pattern Gen', '128 Delay Taps', 'Infinite Variations', 'Smart Sync'],
  },
  'spectral-gate': {
    color: '#2A8A72',
    tagline: 'Frequency Sculptor',
    features: ['4096-Band Resolution', 'AI Learning Mode', 'Beat Reactive', 'Zero Artifacts'],
  },
  'plasma-distortion': {
    color: '#B8936D',
    tagline: 'Harmonic Destroyer',
    features: ['Quantum Waveshaping', 'Analog Modeling', 'Per-Band Processing', 'AI Harmonics'],
  },
};

// ─── LEMON SQUEEZY SCRIPT LOADER ─────────────────────────────
let lsScriptPromise: Promise<void> | null = null;

function loadLSScript(): Promise<void> {
  return loadLemonSqueezyScript();
}

// ─── LEMON SQUEEZY SVG BADGE ──────────────────────────────────
function LemonBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase"
      style={{
        background: 'rgba(255,222,55,0.08)',
        border: '1px solid rgba(255,222,55,0.18)',
        color: '#FFDE37',
        fontFamily: 'var(--font-mono, monospace)',
      }}
    >
      {/* Lemon SVG icon */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <ellipse cx="12" cy="12" rx="9" ry="9" fill="#FFDE37" opacity="0.9" />
        <path d="M8 8 Q12 4 16 8 Q20 12 16 16 Q12 20 8 16 Q4 12 8 8Z" fill="#F5C800" />
        <circle cx="9" cy="10" r="1.5" fill="white" opacity="0.5" />
      </svg>
      Lemon Squeezy
    </span>
  );
}

// ─── ANIMATED CHECKMARK ───────────────────────────────────────
function AnimatedCheck({ color = '#C49A6C' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3" />
      <motion.path
        d="M4.5 8L7 10.5L11.5 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  isBundle = false,
}: CheckoutModalProps) {
  const [email, setEmail]               = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lsReady, setLsReady]           = useState(false);
  const [shimmer, setShimmer]           = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Pre-load LS script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadLSScript().then(() => setLsReady(true));
    }
  }, [isOpen]);

  // Shimmer pulse on CTA hover
  const triggerShimmer = useCallback(() => {
    setShimmer(true);
    setTimeout(() => setShimmer(false), 700);
  }, []);

  if (items.length === 0) return null;

  const total    = items.reduce((s, i) => s + i.price, 0);
  const discount = isBundle ? 107 : 0;
  const finalPrice = total - discount;

  // Pick variant ID — ahora desde el config centralizado
  const variantId = isBundle
    ? LS_VARIANT_IDS['bundle']
    : (LS_VARIANT_IDS as Record<string, string>)[items[0]?.id] ?? 'PLACEHOLDER_VARIANT_ID';

  const isConfigured = isVariantConfigured(variantId);

  // Plugin accent color (first item)
  const pluginMeta = PLUGIN_META[items[0]?.id] ?? {
    color: '#C49A6C',
    tagline: 'Premium Audio Plugin',
    features: ['VST3 · AU · AAX', 'macOS & Windows', '0ms Latency', 'Free Updates'],
  };
  const accentColor = isBundle ? '#C49A6C' : pluginMeta.color;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsProcessing(true);

    // Si no está configurado, abre el dashboard de LS directamente
    if (!isConfigured) {
      window.location.href = `mailto:sales@scifielectronics.com?subject=${encodeURIComponent(`Purchase inquiry: ${isBundle ? 'Complete Bundle' : items[0]?.name}`)}&body=${encodeURIComponent(`Email: ${email.trim()}\nProduct: ${isBundle ? 'Complete Bundle' : items.map((item) => item.name).join(', ')}\n\nCheckout is not live yet. Please contact me when purchase links are available.`)}`;
      setIsProcessing(false);
      return;
    }

    const url = buildCheckoutUrl({ variantId, email: email.trim() });

    try {
      if (lsReady && window.LemonSqueezy) {
        window.LemonSqueezy.Setup({
          eventHandler: ({ event }) => {
            if (event === 'Checkout.Success') {
              onClose();
              window.location.href = '/success?via=lemonsqueezy';
            }
          },
        });
        window.LemonSqueezy.Url.Open(url);
        setIsProcessing(false);
      } else {
        window.open(url, '_blank');
        setIsProcessing(false);
      }
    } catch {
      window.open(url, '_blank');
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,4,3,0.88)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              zIndex: 200,
            }}
          />

          {/* ── MODAL SHELL ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 40 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 201,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              className="relative w-full max-w-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #252118 0%, #1E1B16 60%, #222018 100%)',
                border: `1px solid rgba(${accentColor === '#C49A6C' ? '196,154,108' : accentColor === '#1B6B5A' ? '27,107,90' : '184,147,109'}, 0.18)`,
                borderRadius: '24px',
                boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 60px rgba(${accentColor === '#C49A6C' ? '196,154,108' : '27,107,90'}, 0.06)`,
                maxHeight: '92vh',
                overflowY: 'auto',
              }}
            >
              {/* Ambient glow top */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '1px',
                  background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40%',
                  height: '80px',
                  background: `radial-gradient(ellipse at 50% 0%, ${accentColor}18, transparent)`,
                  pointerEvents: 'none',
                }}
              />

              {/* ── HEADER ─────────────────────────────── */}
              <div
                className="relative flex items-start justify-between px-8 pt-8 pb-6"
                style={{ borderBottom: 'none' }}
              >
                <div className="flex flex-col gap-2">
                  {/* Brand row */}
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs tracking-[0.45em] uppercase"
                      style={{ color: 'rgba(196,154,108,0.5)', fontFamily: 'var(--font-ui)' }}
                    >
                      SCI-FI ELECTRONICS
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '12px' }}>·</span>
                    <LemonBadge />
                  </div>

                  {/* Title */}
                  <h2
                    className="text-[clamp(1.4rem,3vw,1.9rem)] tracking-wide leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      color: '#F4EFE8',
                    }}
                  >
                    {isBundle ? 'Complete Bundle' : items[0]?.name}
                  </h2>
                  {!isBundle && (
                    <p
                      className="text-sm mt-0.5"
                      style={{ color: accentColor, fontFamily: 'var(--font-ui)', opacity: 0.8 }}
                    >
                      {pluginMeta.tagline}
                    </p>
                  )}
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="mt-1 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ── BODY ────────────────────────────────── */}
              <div className="grid md:grid-cols-5 gap-0">
                {/* LEFT: Plugin details + trust */}
                <div
                  className="md:col-span-2 px-8 py-4 pb-8 flex flex-col gap-6"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* What's included */}
                  <div>
                    <p
                      className="text-xs tracking-[0.35em] uppercase mb-4"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)' }}
                    >
                      {isBundle ? "What's included" : 'Key Features'}
                    </p>

                    {isBundle ? (
                      <div className="space-y-2">
                        {items.map((item) => {
                          const m = PLUGIN_META[item.id];
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              className="flex items-start gap-3 py-2.5 px-3 rounded-xl"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ background: m?.color ?? '#C49A6C' }}
                              />
                              <div>
                                <p className="text-sm text-white" style={{ fontFamily: 'var(--font-ui)', letterSpacing: '0.04em' }}>
                                  {item.name}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: m?.color ?? '#C49A6C', opacity: 0.7 }}>
                                  {m?.tagline}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {pluginMeta.features.map((f, i) => (
                          <motion.div
                            key={f}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="flex items-center gap-3"
                          >
                            <AnimatedCheck color={accentColor} />
                            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-ui)' }}>
                              {f}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Formats */}
                  <div>
                    <p
                      className="text-xs tracking-[0.35em] uppercase mb-3"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)' }}
                    >
                      Formats & Platforms
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['VST3', 'AU', 'AAX', 'macOS', 'Windows'].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-lg"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.45)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical defect policy */}
                  <div
                    className="mt-auto flex items-start gap-3 p-4 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(${accentColor === '#C49A6C' ? '196,154,108' : '27,107,90'}, 0.06), rgba(11,9,7,0.4))`,
                      border: `1px solid rgba(${accentColor === '#C49A6C' ? '196,154,108' : '27,107,90'}, 0.12)`,
                    }}
                  >
                    <Shield
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <div>
                      <p className="text-sm text-white" style={{ fontFamily: 'var(--font-ui)' }}>
                        Technical Defect Policy
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                        If the product contains a confirmed technical defect on a supported platform after our support team has assisted, we will resolve it or issue a full refund per EU law (Art. 103.m LGDCU).
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Order summary + form */}
                <div className="md:col-span-3 px-8 py-4 pb-8">
                  {/* Order summary */}
                  <div className="mb-6">
                    <p
                      className="text-xs tracking-[0.35em] uppercase mb-4"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)' }}
                    >
                      Order Summary
                    </p>

                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                    >
                      {/* Items */}
                      {items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between px-5 py-3.5"
                          style={{ borderBottom: idx < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: PLUGIN_META[item.id]?.color ?? '#C49A6C' }}
                            />
                            <span
                              className="text-sm"
                              style={{
                                fontFamily: 'var(--font-ui)',
                                letterSpacing: '0.06em',
                                color: 'rgba(255,255,255,0.8)',
                              }}
                            >
                              {item.name}
                            </span>
                            {isBundle && (
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  background: 'rgba(196,154,108,0.08)',
                                  color: '#C49A6C',
                                  fontFamily: 'var(--font-mono)',
                                }}
                              >
                                Bundle
                              </span>
                            )}
                          </div>
                          <span
                            className="text-sm"
                            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}
                          >
                            ${item.price}
                          </span>
                        </div>
                      ))}

                      {/* Pricing breakdown */}
                      <div
                        className="px-5 py-4 space-y-2"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.2)' }}
                      >
                        {discount > 0 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-ui)' }}>
                                Subtotal
                              </span>
                              <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', textDecoration: 'line-through' }}>
                                ${total}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span
                                className="flex items-center gap-1.5"
                                style={{ color: '#1B6B5A', fontFamily: 'var(--font-ui)' }}
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                Bundle Discount
                              </span>
                              <span style={{ color: '#2A8A72', fontFamily: 'var(--font-mono)' }}>
                                −${discount}
                              </span>
                            </div>
                            <div
                              className="text-xs px-3 py-1.5 rounded-lg text-center"
                              style={{
                                background: 'rgba(27,107,90,0.08)',
                                border: '1px solid rgba(27,107,90,0.15)',
                                color: '#2A8A72',
                                fontFamily: 'var(--font-ui)',
                              }}
                            >
                              You're saving <strong>${discount}</strong> with the Complete Bundle
                            </div>
                          </>
                        )}
                        {/* Total */}
                        <div className="flex justify-between items-baseline pt-1">
                          <span
                            className="text-base"
                            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', letterSpacing: '0.05em' }}
                          >
                            TOTAL
                          </span>
                          <span
                            className="text-3xl"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 300,
                              background: `linear-gradient(135deg, ${accentColor}, #F4E4CC)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            ${finalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Checkout form */}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label
                        className="block text-xs tracking-[0.3em] uppercase mb-2"
                        style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ui)' }}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="your@email.com"
                          className="w-full transition-all duration-300 text-sm"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid ${email ? `${accentColor}40` : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '14px',
                            padding: '14px 16px',
                            color: '#F4EFE8',
                            fontFamily: 'var(--font-body)',
                            outline: 'none',
                          }}
                          onFocus={e => {
                            e.currentTarget.style.border = `1px solid ${accentColor}70`;
                            e.currentTarget.style.boxShadow = `0 0 0 3px ${accentColor}12`;
                          }}
                          onBlur={e => {
                            e.currentTarget.style.border = `1px solid ${email ? `${accentColor}40` : 'rgba(255,255,255,0.1)'}`;
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
                        {isConfigured
                          ? 'License key and download links will be sent here by Lemon Squeezy'
                          : 'Live checkout is pending. This email is used for the purchase inquiry.'}
                      </p>
                    </div>

                    {/* LS Info notice */}
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{
                        background: 'rgba(255,222,55,0.04)',
                        border: '1px solid rgba(255,222,55,0.1)',
                      }}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <ellipse cx="12" cy="12" rx="9" ry="9" fill="#FFDE37" opacity="0.9" />
                          <circle cx="9" cy="10" r="1.5" fill="white" opacity="0.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-ui)', lineHeight: 1.6 }}>
                          {isConfigured ? (
                            <>
                              You'll complete your purchase securely through{' '}
                              <span style={{ color: '#FFDE37', opacity: 0.85 }}>Lemon Squeezy</span>
                              {' '}— a PCI-DSS compliant checkout. Your card details are never shared with us.
                            </>
                          ) : (
                            'Live checkout is not connected yet. This request opens a sales email so purchase setup remains explicit.'
                          )}
                        </p>
                      </div>
                    </div>

                    {/* ─── CONSENTIMIENTO LEGAL — CLÁUSULA OBLIGATORIA ─── */}
                    <label
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                        cursor: 'pointer',
                        padding: '0.9rem 1rem',
                        border: `1px solid ${termsAccepted ? 'rgba(196,154,108,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        background: termsAccepted ? 'rgba(196,154,108,0.05)' : 'rgba(255,255,255,0.02)',
                        borderRadius: 10,
                        transition: 'all 0.25s',
                      }}
                    >
                      {/* Custom checkbox */}
                      <div
                        onClick={() => setTermsAccepted(!termsAccepted)}
                        style={{
                          flexShrink: 0, marginTop: 2,
                          width: 16, height: 16,
                          border: `1.5px solid ${termsAccepted ? '#C49A6C' : 'rgba(255,255,255,0.25)'}`,
                          borderRadius: 3,
                          background: termsAccepted ? 'rgba(196,154,108,0.2)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        {termsAccepted && (
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#C49A6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                        aria-label="Accept terms and conditions"
                      />
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.73rem',
                        lineHeight: 1.65, color: 'rgba(255,255,255,0.5)',
                        margin: 0,
                      }}>
                        He leído y acepto los{' '}
                        <a href="/legal/terminos" target="_blank" rel="noopener noreferrer"
                          style={{ color: '#C49A6C', textDecoration: 'underline', textDecorationColor: 'rgba(196,154,108,0.35)' }}>
                          Términos y Condiciones
                        </a>
                        {' '}y la{' '}
                        <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer"
                          style={{ color: '#C49A6C', textDecoration: 'underline', textDecorationColor: 'rgba(196,154,108,0.35)' }}>
                          Política de Privacidad
                        </a>
                        . <strong style={{ color: 'rgba(255,255,255,0.65)' }}>
                          Entiendo que, al acceder al enlace de descarga o activar la clave de licencia, renuncio expresamente a mi derecho de desistimiento
                        </strong>{' '}
                        conforme al artículo 103.m) del RDL 1/2007 y el artículo 16.m) de la Directiva 2011/83/UE, al tratarse de contenido digital de ejecución inmediata.
                      </p>
                    </label>

                    {/* CTA Button */}
                    <motion.button
                      type="submit"
                      disabled={isProcessing || !email.trim() || !termsAccepted}
                      onMouseEnter={triggerShimmer}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full overflow-hidden rounded-2xl transition-opacity"
                      style={{
                        padding: '18px 24px',
                        opacity: (!email.trim() || !termsAccepted) ? 0.4 : 1,
                        cursor: (!email.trim() || !termsAccepted) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {/* Base gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: isBundle
                            ? 'linear-gradient(135deg, #C49A6C 0%, #8B6F47 50%, #1B6B5A 100%)'
                            : `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}99 100%)`,
                        }}
                      />
                      {/* Shimmer sweep */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={shimmer ? { backgroundPosition: ['200% 0', '-100% 0'] } : {}}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Top highlight */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
                      />

                      {/* Content */}
                      <span
                        className="relative z-10 flex items-center justify-center gap-3"
                        style={{ fontFamily: 'var(--font-ui)', letterSpacing: '0.12em', color: '#0B0907' }}
                      >
                        {isProcessing ? (
                          <>
                            <div
                              className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin"
                            />
                            <span className="text-sm uppercase">Opening Secure Checkout…</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span className="text-sm uppercase tracking-[0.18em]">
                              {isConfigured ? `Complete Purchase — $${finalPrice}` : 'Contact Sales'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* ── FOOTER TRUST BAR ─────────────────────── */}
              <div
                className="px-8 py-5 flex flex-wrap items-center justify-between gap-4"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(0,0,0,0.25)',
                }}
              >
                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-5">
                  {[
                    { icon: Lock, label: '256-bit SSL' },
                    { icon: Zap, label: 'Instant Delivery' },
                    { icon: RefreshCw, label: 'Free Updates' },
                    { icon: DownloadCloud, label: 'Lifetime License' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <span
                        className="text-xs"
                        style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)', letterSpacing: '0.03em' }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Payment powered by */}
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-ui)' }}>
                    {isConfigured ? 'Payments secured by' : 'Checkout provider pending'}
                  </span>
                  {isConfigured && <LemonBadge />}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
