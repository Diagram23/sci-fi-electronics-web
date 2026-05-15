import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'sfx_cookie_consent_v1';

type ConsentState = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  timestamp: number;
};

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('sfx-cookie-consent-change', { detail: consent }));
  } catch {
    // Consent persistence is best-effort when storage is blocked.
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loadConsent()) {
      const timer = window.setTimeout(() => setVisible(true), 1400);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const acceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, functional: false, timestamp: Date.now() });
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, functional: true, timestamp: Date.now() });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-3 left-3 right-3 z-[140] w-auto border border-[#B8936D]/18 bg-[#15120e]/92 p-2.5 shadow-[0_18px_62px_rgba(0,0,0,0.58)] backdrop-blur-xl sm:bottom-5 sm:left-auto sm:right-5 sm:w-[calc(100vw-1.5rem)] sm:max-w-[380px] sm:p-4"
          role="dialog"
          aria-modal="false"
          aria-label="Cookie preferences"
        >
          <button
            type="button"
            onClick={acceptNecessary}
            aria-label="Close cookie banner and accept necessary cookies"
            className="absolute right-2.5 top-2.5 inline-flex h-7 w-7 items-center justify-center text-[#8B7355] transition hover:text-[#E8E1D4] focus:outline-none focus:ring-2 focus:ring-[#B8936D]/35"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="flex gap-2.5 pr-7 sm:gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#B8936D]/22 bg-[#B8936D]/[0.055] text-[#C7A276] sm:h-8 sm:w-8">
              <Cookie className="h-3.5 w-3.5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-ui text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8E1D4] sm:text-[12px]">
                Preferencias de cookies
              </h2>
              <p className="mt-1 text-[11px] leading-[1.55] text-[#9A9994] sm:mt-1.5 sm:text-[12px] sm:leading-5">
                Usamos cookies necesarias. La analítica opcional solo se activa con tu consentimiento.
                {' '}
                <Link to="/legal/cookies" className="text-[#C7A276] underline decoration-[#B8936D]/35 underline-offset-4">
                  Política de cookies
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
            <button
              type="button"
              onClick={acceptNecessary}
              className="min-h-9 border border-white/[0.08] bg-white/[0.02] px-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#9A9994] transition hover:border-[#B8936D]/24 hover:text-[#E8E1D4] focus:outline-none focus:ring-2 focus:ring-[#B8936D]/30 sm:min-h-10 sm:px-3 sm:text-[9px] sm:tracking-[0.18em]"
            >
              Solo necesarias
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 border border-[#C7A276]/36 bg-[#B8936D] px-2 font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-[#030403] transition hover:bg-[#C7A276] focus:outline-none focus:ring-2 focus:ring-[#C7A276]/40 sm:min-h-10 sm:gap-2 sm:px-3 sm:text-[9px] sm:tracking-[0.18em]"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={1.8} />
              Aceptar todas
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
