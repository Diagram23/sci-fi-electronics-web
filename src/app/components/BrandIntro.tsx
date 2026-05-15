import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import logoImage from 'figma:asset/6a48319d71f3339b74104ffc5d20862e540ee731.png';

// Keep the Figma intro available, but do not block the live site by default.
export const ENABLE_BRAND_INTRO = false;

interface BrandIntroProps {
  onComplete: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'reveal' | 'hold' | 'exit'>('enter');
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 300);
    const t2 = setTimeout(() => setPhase('hold'), 1200);
    const t3 = setTimeout(() => setPhase('exit'), 3200);
    const t4 = setTimeout(() => setMounted(false), 4100);
    const t5 = setTimeout(() => handleComplete(), 3800);

    // Progress animation
    let frame: number;
    const startTime = Date.now();
    const duration = 3000;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min(1, elapsed / duration));
      if (elapsed < duration) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
      cancelAnimationFrame(frame);
    };
  }, [handleComplete]);

  if (!mounted) return null;

  const letters = 'SCI-FI ELECTRONICS'.split('');

  return (
    <AnimatePresence>
      <motion.div
        key="brand-intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: '#14110C' }}
        animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'hold' || phase === 'reveal' ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(196, 154, 108, 0.07) 0%, rgba(27, 107, 90, 0.03) 50%, transparent 75%)',
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            opacity: 0.025,
          }}
        />

        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 560, height: 560, border: '1px solid rgba(196, 154, 108, 0.12)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            phase === 'reveal' || phase === 'hold'
              ? { opacity: 1, scale: 1, rotate: 360 }
              : phase === 'enter'
              ? { opacity: 0, scale: 0.5 }
              : { opacity: 0, scale: 1.15 }
          }
          transition={{
            opacity: { duration: 0.8, delay: 0.15 },
            scale: { duration: 1.0, ease: [0.34, 1.56, 0.64, 1] },
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
        />

        {/* Middle ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 430, height: 430, border: '1px solid rgba(184, 147, 109, 0.18)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            phase === 'reveal' || phase === 'hold'
              ? { opacity: 1, scale: 1, rotate: -360 }
              : phase === 'enter'
              ? { opacity: 0, scale: 0.5 }
              : { opacity: 0, scale: 1.08 }
          }
          transition={{
            opacity: { duration: 0.7, delay: 0.3 },
            scale: { duration: 0.95, ease: [0.34, 1.56, 0.64, 1], delay: 0.05 },
            rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
          }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 320, height: 320, border: '1px solid rgba(27, 107, 90, 0.2)' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            phase === 'reveal' || phase === 'hold'
              ? { opacity: 1, scale: 1 }
              : phase === 'enter'
              ? { opacity: 0, scale: 0.5 }
              : { opacity: 0, scale: 1.0 }
          }
          transition={{
            opacity: { duration: 0.6, delay: 0.45 },
            scale: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 },
          }}
        />

        {/* Cardinal ticks */}
        {[0, 90, 180, 270].map((deg) => (
          <motion.div
            key={deg}
            className="absolute pointer-events-none"
            style={{
              width: 2,
              height: 14,
              background: 'rgba(196, 154, 108, 0.45)',
              transformOrigin: '1px 282px',
              transform: `rotate(${deg}deg)`,
              top: '50%',
              left: '50%',
              marginTop: -282,
              marginLeft: -1,
              borderRadius: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
          />
        ))}

        {/* 45-degree ticks (smaller) */}
        {[45, 135, 225, 315].map((deg) => (
          <motion.div
            key={deg}
            className="absolute pointer-events-none"
            style={{
              width: 1,
              height: 7,
              background: 'rgba(196, 154, 108, 0.25)',
              transformOrigin: '0.5px 282px',
              transform: `rotate(${deg}deg)`,
              top: '50%',
              left: '50%',
              marginTop: -282,
              marginLeft: -0.5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'reveal' || phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          />
        ))}

        {/* Logo */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: 200, height: 200 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            phase === 'reveal' || phase === 'hold'
              ? { opacity: 1, scale: 1 }
              : phase === 'enter'
              ? { opacity: 0, scale: 0.4 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{
            opacity: { duration: 0.9, ease: 'easeOut' },
            scale: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
          }}
        >
          {/* Amber halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(196, 154, 108, 0.15) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* SVG Sigil — replaces the organic logo image */}
          <motion.svg
            width="72" height="72" viewBox="0 0 52 52" fill="none"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'relative' }}
          >
            <circle cx="26" cy="26" r="22" stroke="rgba(210,210,218,0.28)" strokeWidth="0.7" />
            <line x1="26" y1="4"  x2="26" y2="9"  stroke="#D8D8E0" strokeWidth="1"   opacity="0.65" />
            <line x1="26" y1="43" x2="26" y2="48" stroke="#D8D8E0" strokeWidth="1"   opacity="0.65" />
            <line x1="4"  y1="26" x2="9"  y2="26" stroke="#D8D8E0" strokeWidth="1"   opacity="0.65" />
            <line x1="43" y1="26" x2="48" y2="26" stroke="#D8D8E0" strokeWidth="1"   opacity="0.65" />
            <line x1="41" y1="11" x2="38" y2="14" stroke="#C8C8D0" strokeWidth="0.7" opacity="0.35" />
            <line x1="11" y1="11" x2="14" y2="14" stroke="#C8C8D0" strokeWidth="0.7" opacity="0.35" />
            <line x1="11" y1="41" x2="14" y2="38" stroke="#C8C8D0" strokeWidth="0.7" opacity="0.35" />
            <line x1="41" y1="41" x2="38" y2="38" stroke="#C8C8D0" strokeWidth="0.7" opacity="0.35" />
            <path d="M26 14 L38 26 L26 38 L14 26 Z" fill="none" stroke="#E0E0E8" strokeWidth="0.9" opacity="0.72" />
            <circle cx="26" cy="26" r="5" fill="none" stroke="rgba(220,220,228,0.5)" strokeWidth="0.6" />
            <circle cx="26" cy="26" r="2.4" fill="#C49A6C" />
            <circle cx="26" cy="26" r="0.9" fill="rgba(255,244,210,0.98)" />
          </motion.svg>
        </motion.div>

        {/* Brand name — letter by letter */}
        <motion.div
          className="absolute flex gap-0 overflow-hidden"
          style={{ bottom: 'calc(50% - 200px)' }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              style={{
                color: letter === ' ' ? 'transparent' : 'rgba(196, 154, 108, 0.7)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.7rem',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                fontWeight: 400,
                minWidth: letter === ' ' ? '1.2em' : 'auto',
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={
                phase === 'reveal' || phase === 'hold'
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              transition={{ duration: 0.5, delay: 0.65 + i * 0.045, ease: 'easeOut' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Founding year */}
        <motion.p
          className="absolute text-[9px] tracking-[0.65em] uppercase"
          style={{
            bottom: 'calc(50% - 230px)',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(196, 154, 108, 0.25)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'hold' ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Est. MMXXIV
        </motion.p>

        {/* Progress bar */}
        <div
          className="absolute bottom-10 left-1/2 overflow-hidden rounded-full"
          style={{
            width: 140,
            height: 1,
            background: 'rgba(255,255,255,0.05)',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(196,154,108,0) 0%, rgba(196,154,108,0.75) 50%, rgba(196,154,108,0) 100%)',
              scaleX: progress,
              transformOrigin: 'left',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
