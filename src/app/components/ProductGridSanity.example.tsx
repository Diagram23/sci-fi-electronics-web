/**
 * EJEMPLO: ProductGrid conectado a Sanity CMS
 * 
 * Este archivo muestra cómo adaptar ProductGrid para consumir
 * datos desde Sanity en lugar de datos hardcoded.
 * 
 * PASOS PARA IMPLEMENTAR:
 * 1. Reemplazar el array `products` hardcoded por `useState`
 * 2. Usar `useEffect` para cargar datos de Sanity
 * 3. Actualizar lógica de imágenes con `urlFor()`
 * 
 * NO USES ESTE ARCHIVO DIRECTAMENTE — Es solo referencia.
 * Cuando esté listo Sanity, actualizaremos ProductGrid.tsx real.
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '@/app/context/CartContext'
import { getPlugins, getSettings, urlFor, type Plugin } from '@/lib/sanity'
import PluginVisual, { type PluginVisualVariant } from '@/app/components/visuals/PluginVisual'
import { Shield, ArrowUpRight, Cpu, Zap, Layers } from 'lucide-react'
import { useIsMobile } from '@/app/hooks/useIsMobile'
import GoldCTAButton from '@/app/components/GoldCTAButton'

export default function ProductGridSanity() {
  const { addToCart, openCheckout, clearCart } = useCart()
  const isMobile = useIsMobile()
  
  // ─── ESTADO PARA DATOS DE SANITY ───────────────────────
  const [products, setProducts] = useState<Plugin[]>([])
  const [bundlePrice, setBundlePrice] = useState(349)
  const [loading, setLoading] = useState(true)

  // ─── CARGAR DATOS AL MONTAR ───────────────────────────
  useEffect(() => {
    async function loadData() {
      try {
        const [pluginsData, settings] = await Promise.all([
          getPlugins(),
          getSettings()
        ])
        
        setProducts(pluginsData)
        if (settings?.bundlePrice) {
          setBundlePrice(settings.bundlePrice)
        }
      } catch (error) {
        console.error('Error loading Sanity data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // ─── CALCULAR SAVINGS ───────────────────────────────
  const INDIVIDUAL = products.reduce((sum, p) => sum + p.price, 0)
  const SAVINGS = INDIVIDUAL - bundlePrice
  const SAVINGS_PCT = INDIVIDUAL > 0 ? Math.round((SAVINGS / INDIVIDUAL) * 100) : 0

  // ─── LOADING STATE ───────────────────────────────────
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#1E1B16', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          color: '#C49A6C', 
          fontFamily: 'var(--font-display)', 
          fontSize: '1.5rem' 
        }}>
          Loading...
        </div>
      </div>
    )
  }

  const handleBuyBundle = () => {
    clearCart()
    products.forEach(p => addToCart({ 
      id: p.id, 
      name: p.name, 
      price: p.price, 
      gradient: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}99)` 
    }))
    openCheckout()
  }

  return (
    <section style={{ background: '#1E1B16', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient grid texture */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(196,154,108,0.013) 60px),
          repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(196,154,108,0.013) 60px)
        `,
        zIndex: 0,
      }} />

      {/* ── SECTION HEADER ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingLeft: '7vw', paddingRight: '7vw',
            paddingTop: '6vh', paddingBottom: '2.2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              letterSpacing: '0.04em', color: 'rgba(196,154,108,0.25)',
              lineHeight: 1,
            }}>02</span>
            <div style={{ width: 1, height: 16, background: 'rgba(196,154,108,0.18)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
              letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'rgba(196,154,108,0.38)',
            }}>The Instruments</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1, transformOrigin: 'left',
            background: 'linear-gradient(90deg, rgba(196,154,108,0.35) 0%, rgba(196,154,108,0.10) 50%, transparent 100%)',
            marginLeft: '7vw', marginRight: '7vw',
          }}
        />

        {/* ── HEADLINE ── */}
        <div style={{
          paddingLeft: '7vw', paddingRight: '7vw',
          paddingTop: isMobile ? '2.4rem' : '3rem',
          paddingBottom: 0,
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              lineHeight: 0.88, textTransform: 'uppercase',
              letterSpacing: '-0.025em',
              fontSize: 'clamp(3rem, 13vw, 5rem)',
            }}
          >
            <span style={{
              display: 'block', fontWeight: 200,
              backgroundImage: 'linear-gradient(110deg, #4A3820 0%, #7A5F38 50%, #4A3820 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Gold</span>
            <span style={{
              display: 'block', fontWeight: 700,
              backgroundImage: 'linear-gradient(135deg, #5A5550 0%, #6E6860 50%, #5A5550 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>for</span>
            <span style={{
              display: 'block', fontWeight: 700,
              backgroundImage: 'linear-gradient(115deg, #8B6F47 0%, #C49A6C 35%, #E8D5B8 50%, #C49A6C 65%, #8B6F47 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Producers.</span>
          </motion.h2>
        </div>
      </div>

      {/* ── PLUGIN GRID (desde Sanity) ── */}
      <div style={{ paddingLeft: '7vw', paddingRight: '7vw', position: 'relative', zIndex: 1, marginTop: '3rem' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 0 }}>
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* ── BUNDLE BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          position: 'relative', zIndex: 1,
          marginTop: '5vh', marginRight: '7vw', marginBottom: '4vh', marginLeft: '7vw',
        }}
      >
        <div style={{
          border: '1px solid rgba(196,154,108,0.09)',
          background: 'rgba(196,154,108,0.02)',
          padding: 'clamp(1.6rem, 3vh, 2.4rem)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.8rem',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.36em', textTransform: 'uppercase',
                color: 'rgba(196,154,108,0.52)', marginBottom: 8,
              }}>
                Complete Bundle — All {products.length} Instruments
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                  color: '#C49A6C', lineHeight: 1,
                }}>
                  ${bundlePrice}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'normal', fontWeight: 300,
                  fontSize: '1.05rem',
                  color: 'rgba(224,213,197,0.3)',
                  textDecoration: 'line-through', lineHeight: 1,
                }}>
                  ${INDIVIDUAL}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(27,107,90,0.8)',
                  border: '1px solid rgba(27,107,90,0.2)',
                  paddingTop: '3px', paddingBottom: '3px',
                  paddingLeft: '10px', paddingRight: '10px',
                }}>
                  Save ${SAVINGS} — {SAVINGS_PCT}% off
                </span>
              </div>
            </div>

            <GoldCTAButton
              onClick={handleBuyBundle}
              paddingTop="15px" paddingBottom="15px"
              paddingLeft="44px" paddingRight="44px"
              fontSize="0.72rem"
              letterSpacing="0.26em"
              borderRadius={2}
            >
              Buy Full Bundle — ${bundlePrice}
            </GoldCTAButton>
          </div>
        </div>
      </motion.div>

    </section>
  )
}

// ─── PRODUCT CARD (adaptado para Sanity) ──────────────────
function ProductCard({ product, index }: { product: Plugin; index: number }) {
  const { addToCart, openCheckout, clearCart } = useCart()
  const [hovered, setHovered] = useState(false)

  const handleBuy = () => {
    clearCart()
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      gradient: `linear-gradient(135deg, ${product.accentColor}, ${product.accentColor}99)` 
    })
    openCheckout()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.11, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: hovered ? `rgba(${product.accentRGB},0.04)` : 'rgba(27,23,17,0.98)',
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.042)' : 'none',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.5s ease',
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute', top: 14, right: 12, zIndex: 5,
          fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.32em', textTransform: 'uppercase',
          color: `rgba(${product.accentRGB},0.95)`,
          border: `1px solid rgba(${product.accentRGB},0.35)`,
          paddingTop: '3px', paddingBottom: '3px',
          paddingLeft: '8px', paddingRight: '8px',
          background: 'rgba(5,4,3,0.97)',
        }}>
          {product.badge}
        </div>
      )}

      {/* Visual area */}
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', background: 'rgba(0,0,0,0.18)' }}>
        <div style={{
          position: 'absolute', top: 13, left: 12, zIndex: 4,
          fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: `rgba(${product.accentRGB},0.65)`,
          background: 'rgba(4,3,2,0.88)',
          paddingTop: '3px', paddingBottom: '3px',
          paddingLeft: '8px', paddingRight: '8px',
          border: `1px solid rgba(${product.accentRGB},0.14)`,
        }}>
          {product.serial} · {product.category}
        </div>

        <PluginVisual variant={product.visual as PluginVisualVariant} size={330} />
      </div>

      {/* Content */}
      <div style={{
        paddingTop: '1.7rem', paddingRight: '1.7rem',
        paddingBottom: '2rem', paddingLeft: '1.7rem',
        display: 'flex', flexDirection: 'column', gap: '1.15rem', flex: 1,
        position: 'relative', zIndex: 2,
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.1rem, 1.35vw, 1.38rem)',
            letterSpacing: '0.1em', lineHeight: 1.0,
            textTransform: 'uppercase',
            color: 'rgba(244,239,232,0.94)',
          }}>
            {product.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: `rgba(${product.accentRGB},0.58)`, marginTop: 8,
          }}>
            {product.tagline}
          </div>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${product.accentRGB},0.2), rgba(${product.accentRGB},0.04) 60%, transparent)` }} />

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.52rem' }}>
          {product.keyFeatures.map((f) => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div style={{
                width: 16, height: 1, flexShrink: 0,
                background: `linear-gradient(90deg, rgba(${product.accentRGB},0.65), rgba(${product.accentRGB},0.1))`,
              }} />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem', letterSpacing: '0.01em',
                color: 'rgba(215,202,184,0.8)', fontWeight: 300,
              }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.6rem' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic', fontWeight: 300,
              fontSize: '2.7rem', lineHeight: 1,
              color: product.accentColor, letterSpacing: '-0.02em',
            }}>
              ${product.price}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.45rem' }}>
            <GoldCTAButton
              onClick={handleBuy}
              paddingTop="9px" paddingBottom="9px"
              paddingLeft="18px" paddingRight="18px"
              fontSize="0.58rem" letterSpacing="0.22em"
              borderRadius={1}
            >
              Acquire
            </GoldCTAButton>
            <Link
              to={`/plugins/${product.id}`}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: `rgba(${product.accentRGB},0.42)`, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.22rem',
              }}
            >
              Details <ArrowUpRight size={9} />
            </Link>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Shield size={9} color={`rgba(${product.accentRGB},0.32)`} strokeWidth={1.5} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: `rgba(${product.accentRGB},0.38)`,
          }}>
            30-Day Defect Guarantee
          </span>
        </div>
      </div>
    </motion.div>
  )
}

