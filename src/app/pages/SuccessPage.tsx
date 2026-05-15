/**
 * SCI-FI ELECTRONICS — SUCCESS PAGE
 * Post-purchase confirmation — Lemon Squeezy integration
 *
 * Lemon Squeezy sends the order data via webhook to your backend.
 * The `order_id` and `email` will be passed as URL params from LS:
 *   /success?order_id=123456&via=lemonsqueezy
 *
 * For production, fetch order details from your backend using the order_id.
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Mail, Download, Shield, ArrowRight, CheckCircle2,
  Headphones, Music2, Layers, Star,
} from 'lucide-react';
import Footer from '@/app/components/Footer';
import { useSEO } from '@/app/hooks/useSEO';

// ─── CANVAS PARTICLE BURST ────────────────────────────────────
function ParticleBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string; decay: number;
    }[] = [];

    const colors = ['#C49A6C', '#B8936D', '#D4B896', '#8B6F47', '#1B6B5A', '#2A8A72', '#F4E4CC'];

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.35;

    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 2 + Math.random() * 4,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        decay: 0.012 + Math.random() * 0.015,
      });
    }

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        if (p.alpha <= 0) continue;
        alive = true;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.12; // gravity
        p.alpha -= p.decay;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (alive) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}

// ─── STEP CARD ────────────────────────────────────────────────
function StepCard({
  icon: Icon,
  title,
  description,
  accent,
  delay,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex items-start gap-5 p-6 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
          border: `1px solid ${accent}30`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div className="flex-1">
        <h3
          className="text-base mb-1.5"
          style={{ color: '#F4EFE8', fontFamily: 'var(--font-ui)', letterSpacing: '0.04em' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
        >
          {description}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function SuccessPage() {
  useSEO({
    title: 'Checkout Confirmation',
    description: 'Prepared purchase confirmation view for future SCI-FI ELECTRONICS checkout flows.',
  });

  const [searchParams] = useSearchParams();
  const orderId     = searchParams.get('order_id')    ?? searchParams.get('session_id') ?? '';
  const customerEmail = searchParams.get('email')     ?? '';
  const via         = searchParams.get('via')          ?? 'lemonsqueezy';

  const [showParticles, setShowParticles] = useState(false);
  const [displayEmail,  setDisplayEmail]  = useState(customerEmail || 'your@email.com');
  const [displayOrder,  setDisplayOrder]  = useState(
    orderId || 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  );
  const [purchasedItems] = useState(['QUANTUM REVERB', 'FRACTAL DELAY']);

  useEffect(() => {
    // Short delay before particle burst
    const t = setTimeout(() => setShowParticles(true), 400);

    /*
     * PRODUCTION: fetch order details from your backend
     *
     * const res = await fetch(`/api/orders/${orderId}`);
     * const data = await res.json();
     * setDisplayEmail(data.customer.email);
     * setDisplayOrder(data.order_number);
     * setPurchasedItems(data.items.map(i => i.name));
     */

    return () => clearTimeout(t);
  }, [orderId]);

  return (
    <div
      className="min-h-screen"
      style={{ paddingTop: '6rem', background: '#1E1B16' }}
    >
      {showParticles && <ParticleBurst />}

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">

          {/* Animated check */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.15 }}
            className="inline-flex items-center justify-center mb-10"
          >
            <div className="relative">
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'rgba(196,154,108,0.15)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              />
              {/* Outer ring */}
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1A120C, #0E0C09)',
                  border: '1.5px solid rgba(196,154,108,0.35)',
                  boxShadow: '0 0 60px rgba(196,154,108,0.12), 0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                <CheckCircle2
                  className="w-12 h-12"
                  style={{ color: '#C49A6C' }}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p
              className="mb-5 text-[10px] uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.5em]"
              style={{ color: 'rgba(196,154,108,0.5)', fontFamily: 'var(--font-ui)' }}
            >
              Checkout Confirmation View
            </p>
            <h1
              className="mx-auto mb-5 max-w-[11ch] text-[clamp(2.35rem,13vw,3.8rem)] leading-[0.95] tracking-wide sm:max-w-none sm:text-[clamp(2.8rem,7vw,6.5rem)]"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 200,
                background: 'linear-gradient(135deg, #F4EFE8 0%, #C49A6C 50%, #D4B896 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Confirmation Ready
            </h1>
            <p
              className="mx-auto mb-6 max-w-[28rem] text-base sm:text-lg"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}
            >
              This screen is prepared for the future purchase confirmation flow.
              <br />No live checkout confirmation is being processed on this site yet.
            </p>

            {/* Order ID */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(196,154,108,0.06)',
                border: '1px solid rgba(196,154,108,0.18)',
              }}
            >
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: 'rgba(196,154,108,0.6)', fontFamily: 'var(--font-ui)' }}
              >
                Reference
              </span>
              <span
                className="text-sm"
                style={{ color: '#C49A6C', fontFamily: 'var(--font-mono)' }}
              >
                #{displayOrder}
              </span>
              {via === 'lemonsqueezy' && (
                <>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(255,222,55,0.5)', fontFamily: 'var(--font-mono)' }}
                  >
                    Lemon Squeezy
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ───────────────────────── */}
      <section className="relative py-16 px-6">
        <div className="max-w-2xl mx-auto">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs tracking-[0.4em] uppercase text-center mb-8"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-ui)' }}
          >
            What happens next
          </motion.p>

          {/* Card container */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #252118 0%, #1E1B16 100%)',
              border: '1px solid rgba(196,154,108,0.1)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top glow line */}
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(196,154,108,0.3), transparent)',
              }}
            />

            <div className="p-8 space-y-4">
              <StepCard
                icon={Mail}
                title="Check your inbox"
                description={`When live checkout is connected, receipts, license keys, and download links will be sent to:`}
                accent="#C49A6C"
                delay={0.8}
              >
                <div
                  className="mt-3 inline-block px-4 py-2 rounded-lg text-sm"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(196,154,108,0.06)',
                    border: '1px solid rgba(196,154,108,0.15)',
                    color: '#C49A6C',
                  }}
                >
                  {displayEmail}
                </div>
                <p
                  className="text-xs mt-2"
                  style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}
                >
                  Sender: <span style={{ color: 'rgba(255,222,55,0.4)' }}>no-reply@lemonsqueezy.com</span>
                  {' '}· Check spam if not received within 5 minutes
                </p>
              </StepCard>

              <StepCard
                icon={Download}
                title="Download delivery"
                description="Future secure download links will be delivered through the real checkout provider once commerce is connected."
                accent="#1B6B5A"
                delay={1.0}
              >
                <div className="flex flex-wrap gap-2 mt-3">
                  {purchasedItems.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(27,107,90,0.1)',
                        border: '1px solid rgba(27,107,90,0.2)',
                        color: '#2A8A72',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.3)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    VST3 · AU · AAX
                  </span>
                </div>
              </StepCard>

              <StepCard
                icon={Shield}
                title="License & Lifetime Updates"
                description="Your personal license key is included in the email. Register it in each DAW to activate. All future updates are free — forever."
                accent="#B8936D"
                delay={1.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEES ──────────────────────────────── */}
      <section
        className="relative py-12 px-6"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(196,154,108,0.02)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '∞', label: 'Free Lifetime Updates', color: '#1B6B5A' },
              { value: '3×', label: 'Machine Activations', color: '#B8936D' },
              { value: '24h', label: 'Premium Support', color: '#2A8A72' },
              { value: 'VST3', label: 'AU · AAX Formats', color: '#C49A6C' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p
                  className="text-3xl mb-1.5"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 200,
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-ui)', lineHeight: 1.4 }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT ─────────────────────────────────── */}
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{
                background: 'rgba(196,154,108,0.08)',
                border: '1px solid rgba(196,154,108,0.15)',
              }}
            >
              <Headphones className="w-6 h-6" style={{ color: '#C49A6C' }} />
            </div>

            <h2
              className="text-3xl mb-3"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 200, color: '#F4EFE8' }}
            >
              Need Assistance?
            </h2>
            <p
              className="mb-8 max-w-lg mx-auto text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}
            >
              Our team is available for installation, activation, and technical questions.
              We typically respond within a few hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@sci-fi-electronics.com"
                className="group px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
                style={{
                  background: 'rgba(196,154,108,0.06)',
                  border: '1px solid rgba(196,154,108,0.15)',
                  color: 'rgba(196,154,108,0.7)',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(196,154,108,0.1)';
                  e.currentTarget.style.color = '#C49A6C';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(196,154,108,0.06)';
                  e.currentTarget.style.color = 'rgba(196,154,108,0.7)';
                }}
              >
                support@sci-fi-electronics.com
              </a>
              <a
                href="#"
                className="px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.04em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                }}
              >
                Help Center
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(196,154,108,0.06), transparent 60%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  style={{ color: '#C49A6C', fill: '#C49A6C' }}
                />
              ))}
            </div>

            <h2
              className="text-[clamp(2rem,5vw,4.5rem)] leading-tight mb-5 tracking-wide"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 200,
                background: 'linear-gradient(135deg, #F4EFE8 30%, rgba(196,154,108,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome to the Future<br />of Sound Design
            </h2>

            <p
              className="text-base mb-6 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}
            >
              You're now part of a global community of producers and artists
              shaping tomorrow's sonic language. Share your creations with
              {' '}
              <span style={{ color: 'rgba(196,154,108,0.6)' }}>#SciFiElectronics</span>
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-12">
              {[
                { n: 'VST3', l: 'AU · AAX' },
                { n: '192kHz', l: 'Max Sample Rate' },
                { n: '∞', l: 'Free Updates' },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-8">
                  {i > 0 && (
                    <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  )}
                  <div className="text-center">
                    <p
                      className="text-2xl"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 200,
                        color: '#C49A6C',
                      }}
                    >
                      {s.n}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-ui)' }}
                    >
                      {s.l}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plugins">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden px-10 py-4 rounded-2xl"
                  style={{ minWidth: '220px' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #C49A6C, #8B6F47)' }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                  />
                  <span
                    className="relative z-10 flex items-center justify-center gap-2.5 text-sm uppercase"
                    style={{ fontFamily: 'var(--font-ui)', letterSpacing: '0.15em', color: '#0B0907' }}
                  >
                    <Music2 className="w-4 h-4" />
                    Explore More Plugins
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-2xl text-sm uppercase transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'var(--font-ui)',
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.5)',
                    minWidth: '220px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(196,154,108,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(196,154,108,0.2)';
                    e.currentTarget.style.color = 'rgba(196,154,108,0.7)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  Return Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
