/**
 * ═══════════════════════════════════════════════════════════════
 *  SCI-FI ELECTRONICS — LEMON SQUEEZY CONFIG
 *  Archivo de configuración único. Solo edita este archivo.
 * ═══════════════════════════════════════════════════════════════
 *
 *  SETUP EN 5 PASOS:
 *  ──────────────────
 *  1. Ve a https://app.lemonsqueezy.com → Store Settings
 *  2. Copia tu Store Slug (e.g. "sci-fi-electronics") → STORE_SLUG
 *  3. Crea un producto por plugin → Products → Add Product
 *     - Tipo: "Software" (Digital Product)
 *     - Añade una "Variant" por precio
 *     - Copia el Variant ID (lo ves en la URL al editar la variant,
 *       o en Products → tu producto → Variants → "..." → Copy ID)
 *  4. Pega cada Variant ID abajo
 *  5. En LS Dashboard → Settings → Checkout → Success URL → pon:
 *        https://tudominio.com/success
 *
 *  PRECIOS POR PLUGIN (deben coincidir exactamente con los de LS):
 *  ──────────────────────────────────────────────────────────────
 *  - Quantum Reverb:    $149
 *  - Fractal Delay:     $129
 *  - Spectral Gate:     $99
 *  - Plasma Distortion: $79
 *  - Bundle (4 plugins): $349  ← crea un producto "Bundle" en LS
 *  - Archive I:         $19
 *
 *  IMPORTANTE: El precio en LS es el precio final. El descuento
 *  del bundle (de $456 a $349) se maneja desde la UI de LS,
 *  creando el Bundle como producto separado con ese precio.
 * ═══════════════════════════════════════════════════════════════
 */

// ── 1. Tu store slug de Lemon Squeezy ──────────────────────────
// Encuéntralo en: LS Dashboard → Settings → Store → Store URL
// Ejemplo: si tu URL es "sci-fi-electronics.lemonsqueezy.com"
// el slug es "sci-fi-electronics"
export const LS_STORE_SLUG = 'sci-fi-electronics'; // ← REEMPLAZA si es diferente

// ── 2. Variant IDs ─────────────────────────────────────────────
// Para obtenerlos: Products → [tu producto] → Variants → ··· → Copy ID
// Tienen formato UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export const LS_VARIANT_IDS = {
  'quantum-reverb':    'PLACEHOLDER_QUANTUM_REVERB_ID',    // ← REEMPLAZA
  'fractal-delay':     'PLACEHOLDER_FRACTAL_DELAY_ID',     // ← REEMPLAZA
  'spectral-gate':     'PLACEHOLDER_SPECTRAL_GATE_ID',     // ← REEMPLAZA
  'plasma-distortion': 'PLACEHOLDER_PLASMA_DISTORTION_ID', // ← REEMPLAZA
  'bundle':            'PLACEHOLDER_BUNDLE_ID',             // ← REEMPLAZA (4 plugins)
  'archive-i':         'PLACEHOLDER_ARCHIVE_I_ID',          // ← REEMPLAZA
} as const;

// ── 3. Modo de apertura del checkout ──────────────────────────
// 'overlay' → el checkout abre sobre tu web (recomendado)
// 'redirect' → redirige a la página de LS (fallback)
export const LS_CHECKOUT_MODE: 'overlay' | 'redirect' = 'overlay';

// ── DETECCIÓN AUTOMÁTICA DE CONFIGURACIÓN ─────────────────────
// No toques esto. Lo usa el modal para saber si está listo.
const PLACEHOLDER_PREFIX = 'PLACEHOLDER_';

export function isVariantConfigured(variantId: string): boolean {
  return !variantId.startsWith(PLACEHOLDER_PREFIX);
}

export function isStoreConfigured(): boolean {
  return Object.values(LS_VARIANT_IDS).some(id => isVariantConfigured(id));
}

// ── CONSTRUCTOR DE URL DE CHECKOUT ────────────────────────────
export function buildCheckoutUrl(params: {
  variantId: string;
  email?: string;
  discountCode?: string;
  customData?: Record<string, string>;
}): string {
  const { variantId, email, discountCode, customData } = params;

  const base = `https://${LS_STORE_SLUG}.lemonsqueezy.com/checkout/buy/${variantId}`;
  const urlParams = new URLSearchParams();

  // Pre-fill email
  if (email?.trim()) {
    urlParams.set('checkout[email]', email.trim());
  }

  // Código de descuento (útil para afiliados o lanzamiento)
  if (discountCode?.trim()) {
    urlParams.set('checkout[discount_code]', discountCode.trim());
  }

  // Datos custom para tracking (aparecen en el webhook de LS)
  if (customData) {
    Object.entries(customData).forEach(([key, value]) => {
      urlParams.set(`checkout[custom][${key}]`, value);
    });
  }

  // Modo overlay: LS renderiza el checkout como iframe
  if (LS_CHECKOUT_MODE === 'overlay') {
    urlParams.set('embed', '1');
    urlParams.set('media', '0'); // oculta el banner de media
    urlParams.set('logo', '0');  // oculta el logo de LS (más inmersivo)
  }

  const queryString = urlParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}

// ── LOADER DEL SCRIPT DE LS (singleton) ───────────────────────
// El script oficial de LS habilita el overlay. Se carga una sola vez.
let _lsScriptPromise: Promise<void> | null = null;

export function loadLemonSqueezyScript(): Promise<void> {
  if (_lsScriptPromise) return _lsScriptPromise;

  _lsScriptPromise = new Promise((resolve) => {
    if (typeof window === 'undefined') { resolve(); return; }
    if (document.getElementById('lemon-squeezy-js')) { resolve(); return; }

    const script = document.createElement('script');
    script.id     = 'lemon-squeezy-js';
    script.src    = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.defer  = true;
    script.onload  = () => resolve();
    script.onerror = () => { console.warn('[LS] Script failed to load — fallback redirect active'); resolve(); };
    document.head.appendChild(script);
  });

  return _lsScriptPromise;
}

// ── TIPOS ─────────────────────────────────────────────────────
export type LSVariantKey = keyof typeof LS_VARIANT_IDS;
